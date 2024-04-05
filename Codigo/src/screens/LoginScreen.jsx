import React, { useState } from 'react';

// Suponha que este seja o componente que você passará para App.js
function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para armazenar mensagens de erro

  const handleLogin = () => {
    console.log('Login attempt with', email, password);

    // Aqui você iria verificar as credenciais do usuário
    // Este é apenas um exemplo de lógica de validação de exemplo
    if (email === 'user@example.com' && password === '1234') {
      onLoginSuccess(); // Chamando a função passada como prop quando o login for bem-sucedido
    } else {
      setError('O e-mail ou a senha estão incorretos'); // Definindo a mensagem de erro
    }
  };

  return (
    <div style={styles.container}>
      <h2>Wash Car Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <input
        style={styles.input}
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} style={styles.button}>Entrar</button>
    </div>
  );
}

// Estilos para o componente LoginScreen
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    width: '20%',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  }
};

export default LoginScreen;
