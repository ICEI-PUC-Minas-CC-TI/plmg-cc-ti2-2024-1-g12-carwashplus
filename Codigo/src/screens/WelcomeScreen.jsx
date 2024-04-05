import React from 'react';


function WelcomeScreen({ userName, onHandleService }) {

  return (
   
    <div style={styles.container}>
      <h1 style={styles.title}>Bem-vindo, {userName}!</h1>
      <div style={styles.content}>
        <h2 style={styles.subtitle}>O que você gostaria de fazer hoje?</h2>
        {/* Aqui você pode adicionar links ou botões que levam a diferentes partes do aplicativo */}
        <button style={styles.button} onClick={onHandleService}>
          Nossos Serviços
        </button>
        {/* Adicione mais botões ou links conforme necessário */}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  title: {
    margin: '20px 0',
    fontSize: '24px',
  },
  subtitle: {
    margin: '10px 0',
    fontSize: '20px',
    fontWeight: 'normal',
  },
  content: {
    textAlign: 'center',
  },
  button: {
    padding: '10px 15px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    fontSize: '18px',
  }
};

export default WelcomeScreen;
