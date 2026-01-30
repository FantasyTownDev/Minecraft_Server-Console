/**
 * F-MCSC Loading Page - Minecraft Style
 */

(function () {
    'use strict';

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        setupCountdown();
        setupProgressBar();
        setupStatusText();
    }

    function setupCountdown() {
        const countdownElement = document.querySelector('.countdown');
        if (!countdownElement) return;

        const totalSeconds = parseInt(countdownElement.getAttribute('data-seconds'), 10);
        if (isNaN(totalSeconds) || totalSeconds <= 0) return;

        let remaining = totalSeconds;

        const timer = setInterval(function () {
            remaining--;

            if (remaining < 0) {
                clearInterval(timer);
                return;
            }

            countdownElement.textContent = remaining;

            // 最后 3 秒变红色警告
            if (remaining <= 3) {
                countdownElement.style.color = '#d13636';
                countdownElement.style.borderColor = '#d13636';
            }
        }, 1000);
    }

    function setupProgressBar() {
        const progressBar = document.querySelector('.mc-progress-bar');
        if (!progressBar) return;

        const duration = progressBar.getAttribute('data-duration');
        if (duration && !isNaN(duration)) {
            progressBar.style.animationDuration = duration + 's';
        }
    }

    function setupStatusText() {
        const statusText = document.querySelector('.status');
        if (!statusText) return;

        const states = ['验证中', '验证中.', '验证中..', '验证中...'];
        let index = 0;

        setInterval(() => {
            index = (index + 1) % states.length;
            statusText.textContent = states[index];
        }, 500);
    }

    window.FMCSC = window.FMCSC || {};
    window.FMCSC.Loading = {
        refresh: function () {
            location.reload();
        }
    };
})();