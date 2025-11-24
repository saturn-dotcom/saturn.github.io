document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const nextBtn = document.querySelector(`.carousel-btn.next[data-target="${carousel.id}"]`);
        const prevBtn = document.querySelector(`.carousel-btn.prev[data-target="${carousel.id}"]`);

        let currentIndex = 0;

        const updateCarousel = () => {
            const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;
            const gap = 20; // Matches CSS gap
            const moveAmount = (itemWidth + gap) * currentIndex;
            track.style.transform = `translateX(-${moveAmount}px)`;

            // Update button states
            const itemsToShow = Math.floor(carousel.offsetWidth / itemWidth);
            const totalItems = track.children.length;
            const maxIndex = totalItems - itemsToShow;

            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxIndex;

            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;
                const itemsToShow = Math.floor(carousel.offsetWidth / itemWidth);
                const totalItems = track.children.length;
                const maxIndex = totalItems - itemsToShow;

                if (currentIndex < maxIndex) {
                    currentIndex++;
                    updateCarousel();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
        }

        // Initial update
        // Timeout to ensure layout is settled
        setTimeout(updateCarousel, 100);

        // Update on resize
        window.addEventListener('resize', () => {
            currentIndex = 0; // Reset to start on resize to avoid layout issues
            updateCarousel();
        });
    });

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.carousel-item img, .carousel-item video');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxContent.innerHTML = ''; // Clear previous content

            const clone = item.cloneNode(true);
            clone.controls = true; // Ensure video controls are enabled
            clone.style.cursor = 'default'; // Reset cursor
            lightboxContent.appendChild(clone);

            // If it's a video, try to play it
            if (clone.tagName === 'VIDEO') {
                clone.play().catch(e => console.log('Auto-play prevented:', e));
            }
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        const video = lightboxContent.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
        lightboxContent.innerHTML = '';
    };

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});