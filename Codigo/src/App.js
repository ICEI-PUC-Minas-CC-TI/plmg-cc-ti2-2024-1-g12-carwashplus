import React, { useState } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import ServicosScreen from './screens/ServicosScreen';

function App() {
  // Novo estado para gerenciar qual tela exibir
  const [currentScreen, setCurrentScreen] = useState('login'); // Opções: 'login', 'welcome', 'servicos'
  const [userName, setUserName] = useState(''); // Aqui você armazenará o nome de usuário após o login

  const handleLoginSuccess = (user) => {
    setUserName(user); // Defina o nome do usuário obtido do login
    setCurrentScreen('welcome'); // Muda para a tela de boas-vindas após o login
  };

  const handleService = () => {
    setCurrentScreen('servicos'); // Muda para a tela de serviços
  };

  let renderedScreen;

  switch(currentScreen) {
    case 'login':
      renderedScreen = <LoginScreen onLoginSuccess={handleLoginSuccess} />;
      break;
    case 'welcome':
      renderedScreen = <WelcomeScreen userName={userName} onHandleService={handleService} />;
      break;
    case 'servicos':
      renderedScreen = <ServicosScreen />;
      break;
    default:
      renderedScreen = <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div>
      {renderedScreen}
    </div>
  );
}

export default App;
