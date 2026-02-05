// 等待页面内容加载完毕
document.addEventListener('DOMContentLoaded', function() {
    // 1. 移动端菜单切换功能
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const isMenuOpen = navLinks.style.display === 'flex';
            navLinks.style.display = isMenuOpen ? 'none' : 'flex';
            if (!isMenuOpen) {
                // 当菜单展开时，设置样式使其垂直排列并覆盖在内容上方
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                navLinks.style.gap = '15px';
                navLinks.style.zIndex = '1000';
            }
        });
    }

    // 2. 常见问题 (FAQ) 折叠功能
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // 关闭所有其他打开的项目
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const icon = item.querySelector('.faq-question i');
                if(icon) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });

            // 如果点击的不是已激活的，则打开它
            if (!isActive) {
                faqItem.classList.add('active');
                const icon = this.querySelector('i');
                if(icon) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            }
        });
    });

    // 3. 平滑滚动（修复因固定导航栏导致的锚点偏移）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return; // 忽略空链接

            e.preventDefault(); // 阻止默认跳转
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20; // 额外偏移20像素，视觉更舒适

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // 如果是手机端，点击后自动关闭菜单
                if (window.innerWidth <= 768 && navLinks) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // 4. 页面加载后，如果URL中已有锚点，也应用偏移滚动
    setTimeout(() => {
        if (window.location.hash) {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo(0, targetElement.offsetTop - navbarHeight - 20);
            }
        }
    }, 100);
});

// 5. 示例函数：用于未来扩展（如点击视频卡片）
function viewVideoDemo(videoTitle) {
    alert(`查看 ${videoTitle} 的详情\n\n这是一个示例功能。当您有真实球员视频时，可以在这里嵌入播放器。`);
}

console.log('足球人生数字平台脚本加载成功！');
