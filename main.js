'use strict';

document.addEventListener('DOMContentLoaded', function() {

    // --- Cache de Elementos do DOM ---
    const notification = document.getElementById('notification');
    
    // --- Estado da Aplicação e LocalStorage ---
    const defaultUsers = {
        'admin': { password: 'admin123', name: 'Administrador', role: 'Administrador', type: 'admin' },
        'rh': { password: 'rh123', name: 'Maria Silva', role: 'Analista de RH', type: 'rh' },
        'colaborador': { password: 'col123', name: 'João Santos', role: 'Desenvolvedor', type: 'colaborador' }
    };
    let users = JSON.parse(localStorage.getItem('sgrh_users')) || defaultUsers;
    
    function saveUsersToLocalStorage() {
        localStorage.setItem('sgrh_users', JSON.stringify(users));
    }

    if (!localStorage.getItem('sgrh_users')) {
        saveUsersToLocalStorage();
    }

    // --- Funções ---
    function showNotification(message, type = 'success') {
        if (notification) {
            notification.textContent = message;
            notification.className = 'notification';
            notification.classList.add(type, 'show');
            setTimeout(() => notification.classList.remove('show'), 3000);
        }
    }

    function handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const user = users[username];

        if (user && user.password === password) {
            showNotification('Login bem-sucedido! Redirecionando...', 'success');
            setTimeout(() => {
                window.location.href = 'PainelUsuer.html';
            }, 1000);
        } else {
            showNotification('Credenciais inválidas.', 'error');
        }
    }

    function handleRegistration(event) {
        event.preventDefault();
        const name = document.getElementById('regName').value;
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        const userType = document.getElementById('regUserType').value;

        if (!userType) {
            showNotification('Por favor, selecione um tipo de usuário.', 'error');
            return;
        }
        if (password !== confirmPassword) {
            showNotification('As senhas não coincidem.', 'error');
            return;
        }
        if (users[username]) {
            showNotification('Este nome de usuário já existe.', 'error');
            return;
        }

        const roles = { admin: 'Administrador', rh: 'Analista de RH', colaborador: 'Colaborador' };
        users[username] = { password: password, name: name, role: roles[userType], type: userType };
        saveUsersToLocalStorage();
        showNotification('Cadastro realizado com sucesso! Redirecionando...', 'success');
        setTimeout(() => {
            window.location.href = 'Login.html';
        }, 2000);
    }
    
    // --- Event Listeners (Conexão entre HTML e JavaScript) ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }

    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }
});