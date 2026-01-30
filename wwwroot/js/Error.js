/**
 * F-MCSC Error Page - Minecraft Style
 * TNT 动画控制与交互增强
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        initKeyboardShortcuts();
        initTNTAnimation();
    });

    /**
     * 切换错误详情
     */
    window.toggleDetails = function () {
        const details = document.getElementById('error-details');
        const toggleBtn = document.querySelector('.details-toggle');

        if (!details || !toggleBtn) return;

        const isHidden = details.classList.contains('hidden');

        if (isHidden) {
            details.classList.remove('hidden');
            toggleBtn.classList.add('active');
            toggleBtn.querySelector('span').textContent = '隐藏错误详情';

            setTimeout(() => {
                details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        } else {
            details.classList.add('hidden');
            toggleBtn.classList.remove('active');
            toggleBtn.querySelector('span').textContent = '查看错误详情';
        }
    };

    /**
     * 复制错误详情
     */
    window.copyDetails = function () {
        const codeBlock = document.querySelector('.details-content code');
        if (!codeBlock) return;

        navigator.clipboard.writeText(codeBlock.textContent).then(() => {
            showToast('已复制到剪贴板');

            const copyBtn = document.querySelector('.copy-btn');
            if (copyBtn) {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = '✓ 已复制';
                copyBtn.style.background = '#3C8527';
                copyBtn.style.borderColor = '#5A9E3D';

                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.background = '';
                    copyBtn.style.borderColor = '';
                }, 2000);
            }
        }).catch(err => {
            console.error('复制失败:', err);
            showToast('复制失败');
        });
    };

    /**
     * 键盘快捷键
     */
    function initKeyboardShortcuts() {
        let tntClicks = 0;

        document.addEventListener('keydown', (e) => {
            // ESC 返回首页
            if (e.key === 'Escape') {
                window.location.href = '/';
            }

            // B 返回上一页
            if (e.key === 'b' || e.key === 'B') {
                if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    history.back();
                }
            }

            // 连续按 T N T 触发彩蛋
            if (e.key.toLowerCase() === 't' || e.key.toLowerCase() === 'n') {
                tntClicks++;
                if (tntClicks >= 3) {
                    explodeTNT();
                    tntClicks = 0;
                }
                setTimeout(() => tntClicks = 0, 1000);
            }
        });

        // 点击 TNT 也有响应
        const tnt = document.querySelector('.error-tnt');
        if (tnt) {
            tnt.addEventListener('click', explodeTNT);
        }
    }

    /**
     * TNT 爆炸动画（视觉彩蛋）
     */
    function explodeTNT() {
        const tnt = document.querySelector('.error-tnt');
        if (!tnt) return;

        tnt.style.animation = 'none';
        tnt.offsetHeight; // 强制重绘

        const body = document.querySelector('.tnt-body');
        const originalBg = body.style.background;

        // 闪烁白色
        let flashes = 0;
        const flash = setInterval(() => {
            body.style.background = flashes % 2 === 0 ? '#fff' : 'var(--mc-red)';
            flashes++;
            if (flashes > 5) {
                clearInterval(flash);
                body.style.background = originalBg;
                tnt.style.animation = 'tnt-bounce 1s steps(4) infinite';

                // 屏幕震动效果
                document.body.style.animation = 'shake 0.3s steps(4)';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 300);
            }
        }, 100);
    }

    /**
     * 初始化 TNT 动画状态
     */
    function initTNTAnimation() {
        // 随机延迟，让闪烁不同步
        const spark = document.querySelector('.spark');
        if (spark) {
            spark.style.animationDelay = Math.random() + 's';
        }
    }

    /**
     * Toast 提示 - MC 风格
     */
    function showToast(message) {
        const existing = document.querySelector('.mc-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'mc-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: #2a2a2a;
            color: #fff;
            padding: 12px 24px;
            border: 3px solid #000;
            box-shadow: 0 4px 0 rgba(0,0,0,0.5);
            font-family: 'Noto Sans SC', sans-serif;
            font-size: 0.9rem;
            z-index: 1000;
            animation: toast-in 0.3s steps(4) forwards;
            font-weight: 500;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toast-out 0.3s steps(4) forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes toast-in {
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        @keyframes toast-out {
            to { transform: translateX(-50%) translateY(20px); opacity: 0; }
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

    // 全局 API
    window.FMCSC = window.FMCSC || {};
    window.FMCSC.ErrorPage = {
        goHome: () => window.location.href = '/',
        goBack: () => history.back(),
        getRequestId: () => document.querySelector('.id-code')?.textContent
    };
})();