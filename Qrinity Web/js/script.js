document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================================
    // 1. LOADING ANIMATION (Dengan pengamanan null)
    // =========================================================
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }, 1000);
    }

    // =========================================================
    // 2. STICKY NAVBAR & ACTIVE MENU
    // =========================================================
    const header = document.getElementById("header");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        // Sticky Header Check
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add("sticky");
            } else {
                header.classList.remove("sticky");
            }
        }

        // Active Menu Item on Scroll
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 150)) {
                const id = section.getAttribute("id");
                if (id) current = id; // Cegah id bernilai null masuk ke logic
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            // Cek apakah ada current id dan href cocok
            if (current && href && href.includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // =========================================================
    // 3. MOBILE MENU
    // =========================================================
    const hamburger = document.getElementById("hamburger");
    const navbar = document.querySelector(".navbar");

    if (hamburger && navbar) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navbar.classList.toggle("active");
        });

        // Close mobile menu saat link diklik
        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navbar.classList.remove("active");
        }));
    }

    // =========================================================
    // 4. SCROLL REVEAL ANIMATION (Intersection Observer)
    // =========================================================
    const reveals = document.querySelectorAll(".reveal");

    if (reveals.length > 0) {
        const revealOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        reveals.forEach(reveal => {
            revealOnScroll.observe(reveal);
        });
    }

    // =========================================================
    // 5. COUNTER ANIMATION
    // =========================================================
    const statsSection = document.querySelector('.statistics');
    if (statsSection) {
        const counters = document.querySelectorAll('.counter');
        let hasCounted = false;

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasCounted) {
                    counters.forEach(counter => {
                        const updateCount = () => {
                            const target = +counter.getAttribute('data-target');
                            const count = +counter.innerText;
                            const speed = 200; 
                            const inc = target / speed;

                            if (count < target) {
                                counter.innerText = Math.ceil(count + inc);
                                setTimeout(updateCount, 20);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCount();
                    });
                    hasCounted = true;
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(statsSection);
    }

    // =========================================================
    // 6. FAQ ACCORDION
    // =========================================================
    const accordionItems = document.querySelectorAll('.accordion-item');

    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            if (header) {
                header.addEventListener('click', () => {
                    const currentlyActive = document.querySelector('.accordion-item.active');
                    
                    if(currentlyActive && currentlyActive !== item) {
                        currentlyActive.classList.remove('active');
                        currentlyActive.querySelector('.accordion-content').style.maxHeight = null;
                    }
                    
                    item.classList.toggle('active');
                    const content = item.querySelector('.accordion-content');
                    
                    if (item.classList.contains('active')) {
                        content.style.maxHeight = content.scrollHeight + "px";
                    } else {
                        content.style.maxHeight = null;
                    }
                });
            }
        });
    }

    // =========================================================
    // 7. BACK TO TOP BUTTON & SMOOTH SCROLL
    // =========================================================
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("active");
            } else {
                backToTopBtn.classList.remove("active");
            }
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================================
    // 8. VIDEO MODAL
    // =========================================================
    const videoModal = document.getElementById("videoModalContainer");
    const openVideoBtn = document.getElementById("openVideoBtn");
    const openVideoBtnHero = document.getElementById("openVideoBtnHero");
    const closeModal = document.querySelector(".close-modal");

    if (videoModal) {
        function openModal(e) {
            if(e) e.preventDefault();
            videoModal.style.display = "flex";
            document.body.style.overflow = "hidden";
        }

        function closeVideoModal() {
            videoModal.style.display = "none";
            document.body.style.overflow = "auto";
        }

        if(openVideoBtn) openVideoBtn.addEventListener("click", openModal);
        if(openVideoBtnHero) openVideoBtnHero.addEventListener("click", openModal);
        if(closeModal) closeModal.addEventListener("click", closeVideoModal);

        window.addEventListener("click", (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }

});