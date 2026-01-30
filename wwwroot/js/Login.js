/**
 * F-MCSC Login - Minecraft Style
 * 适配 3D 按钮和 MC 风格交互
 */

document.addEventListener('DOMContentLoaded', function () {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const inputs = document.querySelectorAll('.mc-input');

    // 密码可见性切换
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            if (type === 'text') {
                eyeIcon.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`;
                togglePassword.style.color = '#5A9E3D';
            } else {
                eyeIcon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
                togglePassword.style.color = '';
            }
        });
    }

    // 表单提交
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = passwordInput.value;

            if (!username || !password) {
                shakeButton();
                highlightEmptyInputs();
                return;
            }

            setLoadingState(true);

            try {
                await simulateLogin(username, password);
                showSuccess();
            } catch (error) {
                showError();
            } finally {
                setTimeout(() => resetButtonState(), 2000);
            }
        });
    }

    // 输入框聚焦效果
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'scale(1)';
        });

        input.addEventListener('input', function () {
            this.style.borderColor = '';
        });
    });

    function shakeButton() {
        loginBtn.classList.remove('shake');
        void loginBtn.offsetWidth;
        loginBtn.classList.add('shake');
    }

    function highlightEmptyInputs() {
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#d13636';
                input.style.animation = 'shake 0.4s steps(4)';
                setTimeout(() => {
                    input.style.borderColor = '';
                    input.style.animation = '';
                }, 2000);
            }
        });
    }

    function setLoadingState(loading) {
        const spinner = loginBtn.querySelector('.loading-spinner');
        const btnText = loginBtn.querySelector('.btn-text');

        if (loading) {
            loginBtn.classList.add('loading');
            btnText.textContent = '登录中...';
            loginBtn.disabled = true;
        } else {
            loginBtn.classList.remove('loading');
            btnText.textContent = '登 录';
            loginBtn.disabled = false;
        }
    }

    function simulateLogin(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.1 ? resolve({ success: true }) : reject(new Error('凭据无效'));
            }, 1500);
        });
    }

    function showSuccess() {
        const btnText = loginBtn.querySelector('.btn-text');
        const btnContent = loginBtn.querySelector('.btn-content');

        btnText.textContent = '登录成功';
        btnContent.style.background = '#5A9E3D';

        setTimeout(() => {
            // window.location.href = '/console';
        }, 500);
    }

    function showError() {
        const btnText = loginBtn.querySelector('.btn-text');
        const btnContent = loginBtn.querySelector('.btn-content');

        loginBtn.classList.add('error');
        btnText.textContent = '登录失败';
        btnContent.style.background = '#a02722';

        shakeButton();
    }

    function resetButtonState() {
        setLoadingState(false);
        loginBtn.classList.remove('error');
        const btnContent = loginBtn.querySelector('.btn-content');
        btnContent.style.background = '';
    }

    // 记住我功能
    const rememberCheckbox = document.getElementById('rememberMe');
    const savedUsername = localStorage.getItem('fmcsc_username');

    if (savedUsername) {
        document.getElementById('username').value = savedUsername;
        if (rememberCheckbox) rememberCheckbox.checked = true;
    }

    if (rememberCheckbox) {
        rememberCheckbox.addEventListener('change', function () {
            const username = document.getElementById('username').value.trim();
            if (this.checked && username) {
                localStorage.setItem('fmcsc_username', username);
            } else {
                localStorage.removeItem('fmcsc_username');
            }
        });
    }

    // Ctrl+Enter 快捷键
    document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (loginForm) loginForm.dispatchEvent(new Event('submit'));
        }
    });
});