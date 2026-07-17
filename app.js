document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       CATALOG FILTERING LOGIC
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all') {
                    card.style.display = 'flex';
                    // Trigger reflow for transition
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else if (cardCategory === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    // Use timeout to let transition complete before hiding display
                    setTimeout(() => {
                        if (button.getAttribute('data-filter') !== 'all' && cardCategory !== filterValue) {
                            card.style.display = 'none';
                        }
                    }, 200);
                }
            });
        });
    });

    /* ==========================================================================
       YOUTUBE MODAL PLAYER LOGIC
       ========================================================================== */
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoPlayer');
    const closeModalBtn = document.querySelector('.close-modal');
    const demoButtons = document.querySelectorAll('.btn-card-demo');

    // Open Modal and Play Video
    demoButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const videoId = btn.getAttribute('data-video-id');
            if (videoId) {
                // Set the YouTube embed URL with autoplay
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Disable background scroll
            }
        });
    });

    // Close Modal and Stop Video
    const closeModal = () => {
        modal.classList.remove('active');
        // Reset iframe src to empty string to stop audio/video playback
        iframe.src = '';
        document.body.style.overflow = 'auto'; // Re-enable background scroll
    };

    closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the video container
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    /* ==========================================================================
       NAVBAR SCROLL EFFECT
       ========================================================================== */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.background = 'rgba(8, 8, 10, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            header.style.padding = '0';
            header.style.background = 'rgba(8, 8, 10, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    /* ==========================================================================
       CLIPBOARD COPY LOGIC (SBERBANK CARD)
       ========================================================================== */
    const btnCopy = document.getElementById('btnCopy');
    const cardNum = document.getElementById('cardNum');
    const tooltip = document.getElementById('copyTooltip');
    const cardBox = document.querySelector('.card-number-box');

    if (btnCopy && cardNum && tooltip) {
        btnCopy.addEventListener('click', () => {
            const cardNumber = cardNum.textContent.replace(/\s+/g, ''); // remove any spaces
            
            navigator.clipboard.writeText(cardNumber).then(() => {
                // Show tooltip feedback
                tooltip.classList.add('show');
                cardBox.classList.add('focused');
                
                // Reset feedback after 2 seconds
                setTimeout(() => {
                    tooltip.classList.remove('show');
                    cardBox.classList.remove('focused');
                }, 2000);
            }).catch(err => {
                console.error('Ошибка копирования: ', err);
                
                // Fallback for older browsers or blocking environments
                const textArea = document.createElement('textarea');
                textArea.value = cardNumber;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    tooltip.classList.add('show');
                    setTimeout(() => {
                        tooltip.classList.remove('show');
                    }, 2000);
                } catch (fallbackErr) {
                    alert('Не удалось скопировать карту. Пожалуйста, выделите её и скопируйте вручную.');
                }
                document.body.removeChild(textArea);
            });
        });
    }

    /* ==========================================================================
       LANGUAGE SWITCHER LOGIC (RU / EN)
       ========================================================================== */
    const langSwitchers = document.querySelectorAll('.lang-switcher');
    const htmlElement = document.documentElement;

    // Load language from localStorage or default to Russian
    const savedLang = localStorage.getItem('site-lang') || 'ru';
    setLanguage(savedLang);

    langSwitchers.forEach(switcher => {
        const buttons = switcher.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                setLanguage(lang);
            });
        });
    });

    function setLanguage(lang) {
        htmlElement.setAttribute('lang', lang);
        localStorage.setItem('site-lang', lang);
        
        langSwitchers.forEach(switcher => {
            const buttons = switcher.querySelectorAll('.lang-btn');
            buttons.forEach(btn => {
                if (btn.getAttribute('data-lang') === lang) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        });
    }
});
