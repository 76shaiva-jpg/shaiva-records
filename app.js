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
            header.style.background = 'rgba(10, 11, 13, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            header.style.padding = '0';
            header.style.background = 'rgba(10, 11, 13, 0.7)';
            header.style.boxShadow = 'none';
        }
    });
});
