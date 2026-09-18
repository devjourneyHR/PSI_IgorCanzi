document.addEventListener('DOMContentLoaded', () => {
    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    const handleScrollHeader = () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScrollHeader, { passive: true });
    handleScrollHeader();

    // --- Mobile Menu with Accessible Backdrop & Keydown handling ---
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('nav-mobile');
    const navBackdrop = document.getElementById('nav-backdrop');
    const mobileLinks = document.querySelectorAll('.nav-mobile a');

    const openMenu = () => {
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        navMobile.classList.add('active');
        navMobile.setAttribute('aria-hidden', 'false');
        if (navBackdrop) navBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navMobile.classList.remove('active');
        navMobile.setAttribute('aria-hidden', 'true');
        if (navBackdrop) navBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (hamburger && navMobile) {
        hamburger.addEventListener('click', () => {
            const isOpen = navMobile.classList.contains('active');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        if (navBackdrop) {
            navBackdrop.addEventListener('click', closeMenu);
        }

        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMobile.classList.contains('active')) {
                closeMenu();
                hamburger.focus();
            }
        });
    }

    // --- Live WhatsApp Preview & Conversational Experience (Overdrive) ---
    const whatsappForm = document.getElementById('whatsapp-form');
    const submitBtn = document.getElementById('btn-submit');
    const submitText = document.getElementById('submit-text');

    const inputFirst = document.getElementById('firstname');
    const inputLast = document.getElementById('lastname');
    const inputEmail = document.getElementById('email');
    const selectSubject = document.getElementById('subject');

    const previewName = document.getElementById('preview-name');
    const previewEmail = document.getElementById('preview-email');
    const previewSubject = document.getElementById('preview-subject');
    const previewTime = document.getElementById('preview-time');
    const waBubble = document.getElementById('wa-bubble');

    // Real-time time formatting (HH:MM)
    const updatePreviewTime = () => {
        if (!previewTime) return;
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        previewTime.textContent = `${hours}:${minutes}`;
    };
    updatePreviewTime();

    const updateLivePreview = () => {
        const first = inputFirst ? inputFirst.value.trim() : '';
        const last = inputLast ? inputLast.value.trim() : '';
        const email = inputEmail ? inputEmail.value.trim() : '';
        const subject = selectSubject ? selectSubject.value : '';

        if (previewName) {
            if (first || last) {
                previewName.textContent = `${first} ${last}`.trim();
                previewName.style.color = 'var(--primary-color)';
            } else {
                previewName.textContent = 'Seu Nome';
                previewName.style.color = 'var(--text-muted)';
            }
        }

        if (previewEmail) {
            if (email) {
                previewEmail.textContent = email;
                previewEmail.style.color = 'var(--primary-color)';
            } else {
                previewEmail.textContent = 'seu@email.com';
                previewEmail.style.color = 'var(--text-muted)';
            }
        }

        if (previewSubject) {
            if (subject) {
                previewSubject.textContent = subject;
                previewSubject.style.color = 'var(--primary-color)';
            } else {
                previewSubject.textContent = 'Selecione um assunto';
                previewSubject.style.color = 'var(--text-muted)';
            }
        }

        if (waBubble) {
            waBubble.style.transform = 'scale(1.01)';
            setTimeout(() => {
                waBubble.style.transform = 'scale(1)';
            }, 180);
        }
    };

    [inputFirst, inputLast, inputEmail].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                updateLivePreview();
            });
        }
    });

    if (selectSubject) {
        selectSubject.addEventListener('change', () => {
            updateLivePreview();
        });
    }

    // Interactive Spring 3D Tilt on Desktop Cards
    if (window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
        const interactiveCards = document.querySelectorAll('#contact-card, #wa-phone-frame');
        interactiveCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const rotX = -(y / rect.height) * 5;
                const rotY = (x / rect.width) * 5;
                card.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    // Form submission with cinematic send trajectory
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const firstName = inputFirst ? inputFirst.value.trim() : '';
            const lastName = inputLast ? inputLast.value.trim() : '';
            const email = inputEmail ? inputEmail.value.trim() : '';
            const subject = selectSubject ? selectSubject.value : '';
            
            if (!firstName) return;

            // Cinematic sending animation on preview bubble
            if (waBubble) {
                waBubble.style.transform = 'translateY(-12px) scale(0.97)';
                waBubble.style.opacity = '0.85';
            }

            // Immediate user feedback
            if (submitBtn && submitText) {
                submitBtn.disabled = true;
                const originalHtml = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Mensagem pronta! Abrindo WhatsApp...</span>';
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalHtml;
                    if (waBubble) {
                        waBubble.style.transform = 'scale(1)';
                        waBubble.style.opacity = '1';
                    }
                }, 2800);
            }
            
            const phoneNumber = "5521972343812";
            const message = `Olá Igor Canzi,\n\nGostaria de agendar um atendimento.\n\n*Dados do Contato:*\n- Nome: ${firstName} ${lastName}\n- E-mail: ${email}\n- Assunto de interesse: ${subject}\n\nAguardo seu retorno.`;
            
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            setTimeout(() => {
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            }, 350);
        });
    }

    // --- Scroll-Spy for Active Nav Link ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-desktop .nav-link');

    const updateActiveNavLink = () => {
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });

    // --- Smooth Scrolling for Anchor Links with Header Offset ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 75;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Fade-in Intersection Observer ---
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
});