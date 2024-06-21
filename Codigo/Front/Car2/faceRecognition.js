require('dotenv').config();
const { CognitiveServicesCredentials } = require("@azure/ms-rest-js");
const Face = require("@azure/cognitiveservices-face");
const { v4: uuidv4 } = require("uuid");

const endpoint = process.env.FACE_ENDPOINT;
const apiKey = process.env.FACE_APIKEY;
const credentials = new CognitiveServicesCredentials(apiKey);
const client = new Face.FaceClient(credentials, endpoint);
const personGroupId = uuidv4();

async function createPersonGroup() {
  console.log(`Creating a person group with ID: ${personGroupId}`);
  await client.personGroup.create(personGroupId, { name: personGroupId, recognitionModel: "recognition_04" });
}

async function addFacesToPersonGroup() {
  const imageBaseUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/Face/images/";
  const personDictionary = {
    "Family1-Dad": ["Family1-Dad1.jpg", "Family1-Dad2.jpg"],
    "Family1-Mom": ["Family1-Mom1.jpg", "Family1-Mom2.jpg"],
    "Family1-Son": ["Family1-Son1.jpg", "Family1-Son2.jpg"],
    "Family1-Daughter": ["Family1-Daughter1.jpg", "Family1-Daughter2.jpg"],
    "Family2-Lady": ["Family2-Lady1.jpg", "Family2-Lady2.jpg"],
    "Family2-Man": ["Family2-Man1.jpg", "Family2-Man2.jpg"],
  };

  for (const [name, images] of Object.entries(personDictionary)) {
    console.log(`Creating person: ${name}`);
    const person = await client.personGroupPerson.create(personGroupId, { name });
    for (const image of images) {
      const url = `${imageBaseUrl}${image}`;
      console.log(`Adding face to ${name} from image ${image}`);
      await client.personGroupPerson.addFaceFromUrl(personGroupId, person.personId, { url });
    }
  }
}

async function trainPersonGroup() {
  console.log(`Training person group: ${personGroupId}`);
  await client.personGroup.train(personGroupId);
  await waitForTraining();
}

async function waitForTraining() {
  while (true) {
    const status = await client.personGroup.getTrainingStatus(personGroupId);
    console.log(`Training status: ${status.status}`);
    if (status.status === "succeeded") {
      break;
    } else if (status.status === "failed") {
      throw new Error("Training failed");
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

async function identifyFaces() {
  const imageBaseUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/Face/images/";
  const image = `${imageBaseUrl}identification1.jpg`;
  const detectedFaces = await client.face.detectWithUrl(image, { detectionModel: "detection_03", recognitionModel: "recognition_04" });
  const faceIds = detectedFaces.map(face => face.faceId);

  if (faceIds.length > 0) {
    const results = await client.face.identify(faceIds, { personGroupId });
    for (const result of results) {
      if (result.candidates.length > 0) {
        const person = await client.personGroupPerson.get(personGroupId, result.candidates[0].personId);
        console.log(`Person identified: ${person.name}, Confidence: ${result.candidates[0].confidence}`);
      } else {
        console.log(`No person identified for face ID ${result.faceId}`);
      }
    }
  } else {
    console.log("No faces detected.");
  }
}

async function main() {
  try {
    await createPersonGroup();
    await addFacesToPersonGroup();
    await trainPersonGroup();
    await identifyFaces();
  } catch (error) {
    console.error(error);
  } finally {
    console.log(`Deleting person group: ${personGroupId}`);
    await client.personGroup.deleteMethod(personGroupId);
    console.log("Done.");
  }
}

main();
