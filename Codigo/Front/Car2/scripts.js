document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const cpf = document.getElementById('loginCpf').value;
        const senha = document.getElementById('loginSenha').value;
        
        const response = await loginUser(cpf, senha);
        
        if (response.ok) {
            alert('Login realizado com sucesso!');
        } else {
            alert('Falha no login. Verifique suas credenciais.');
        }
    });

    const loginUser = async (cpf, senha) => {
        const response = await fetch('https://localhost:44381/api/Usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ CPF: cpf, Senha: senha })
        });
        return response;
    };
});
