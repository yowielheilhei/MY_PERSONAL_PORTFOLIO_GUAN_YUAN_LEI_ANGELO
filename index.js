
document.addEventListener("DOMContentLoaded", () => {
    const projectParagraphs = document.querySelectorAll('.project-item p');
    const paragraphObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-text');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.2 
    });

    projectParagraphs.forEach(p => {
        paragraphObserver.observe(p);
    });
    

    const images = document.querySelectorAll('.gallery-carousel img');
    const projectTitle = document.querySelector('.project-item.full-width h3');
    const projectDesc = document.querySelector('.project-item.full-width p');
    
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let positions = ['pos-1', 'pos-2', 'pos-3', 'pos-4', 'pos-5'];

    const projectDetails = [
        { 
            title: "F L O W E R S", 
            desc: "A visual project serves as a dedicated study on how precise color grading can fundamentally transform the mood and narrative of a scene. By manipulating the hue, saturation, and luminance of botanical subjects, I demonstrate the technical process of turning flat, raw footage into a vibrant and cinematic experience. The video deliberately shifts between various color palettes—from warm, nostalgic tones to cool, dramatic atmospheres—to highlight how subtle visual adjustments directly influence a viewer's emotional perception. This project required a meticulous eye for detail and a deep understanding of digital color theory, allowing me to isolate specific floral elements and enhance their natural textures. Blending my analytical mindset with creative visual design, I approached the grading software not just as an artistic tool, but as a system of visual data to be precisely calibrated. Ultimately, 'FLOWERS' showcases my ability to elevate standard multimedia production into a compelling, high-fidelity visual story purely through advanced post-production techniques." 
        },
        { 
            title: "R I Z A L", 
            desc: "This historical short film is a narrative recreation dedicated to bringing the life and legacy of the Philippine national hero to a modern digital audience. The project meticulously replicates the atmosphere of the past, focusing on authentic storytelling that captures the pivotal moments and profound struggles of his historical journey. By combining careful historical research with my technical proficiency in multimedia production, I worked to ensure that the period-accurate details were both visually compelling and technically polished." 
        },
        { 
            title: "M E D Y O   S H O R T   F I L M", 
            desc: "This project is an intimate visual exploration of the authentic bonds and shared experiences that define true friendship. The narrative centers on the simple yet profound beauty of the time we spend together, highlighting the natural connections that form in everyday settings. Through candid camerawork and mindful pacing, the video captures the raw, unfiltered emotions and fleeting moments that often go unnoticed in the rush of daily life. I focused on preserving the genuine atmosphere of these interactions, allowing the laughter, quiet pauses, and collective energy to organically drive the story forward. Rather than relying on a complex script, the film utilizes the power of nostalgia and the unspoken understanding between peers to resonate deeply with the viewer. Ultimately, this project serves as a heartfelt time capsule, seamlessly blending technical video production with a highly personal, slice-of-life storytelling approach." 
        },
        { 
            title: "P L A T E S", 
            desc: "This short film captures the immersive experience and shared moments behind the meticulous creation of technical drafting projects. The narrative steps away from the final output to focus instead on the human element of design—the late nights, the rigorous attention to detail, and the collaborative energy shared among peers. Through dynamic camerawork and thoughtful pacing, the video highlights the tactile, hands-on process of translating complex technical concepts onto the drafting board. By blending my background in technical operations with visual storytelling, I aimed to showcase the dedication required in our academic journey, turning a routine assignment into a compelling cinematic narrative. The project effectively captures the unspoken camaraderie and the raw emotional progression of working through challenging design problems from the initial sketch to the final submission. Ultimately, 'PLATES' serves as a tribute to the creative grind, demonstrating my ability to uncover authentic stories within highly technical environments and present them through polished multimedia production." 
        },
        { 
            title: "H A R A N A", 
            desc: "This deeply personal short film captures my own experience of reviving the traditional Filipino serenade to express my affection for my long-distance partner, Kyla. The narrative steps in front of the lens, documenting my authentic vulnerability as I bridge the physical distance between us through music and genuine emotion. Utilizing intimate camera framing and a warm, nostalgic color palette, the video is designed to visually translate the profound intimacy of a private, romantic moment into a cinematic format. I placed a strong emphasis on clean audio capture and precise sound design, ensuring that the acoustic performance remains the immersive and emotional focal point of the scene. By merging my technical proficiency in multimedia production with my own heartfelt dedication, I transformed a timeless romantic gesture into a compelling digital love letter. Ultimately, this project stands as a testament to my ability to synchronize delicate audio-visual elements to tell a highly personal story, proving that the most impactful technical execution is driven by true emotional resonance." 
        }
    ];

    function renderImages() {
        if (!images.length) return; 
        images.forEach((img, index) => {
            img.classList.remove('pos-1', 'pos-2', 'pos-3', 'pos-4', 'pos-5');
            img.classList.add(positions[index]);
        });
    }

    function updateCarouselText() {
        const centerIndex = positions.indexOf('pos-3');
        if (projectTitle && projectDesc) {
            projectTitle.classList.add('fade-out');
            projectDesc.classList.add('fade-out');
            setTimeout(() => {
                projectTitle.textContent = projectDetails[centerIndex].title;
                projectDesc.textContent = projectDetails[centerIndex].desc;
                projectTitle.classList.remove('fade-out');
                projectDesc.classList.remove('fade-out');
            }, 300); 
        }
    }

    renderImages();

    images.forEach((img, index) => {
        img.addEventListener('mouseenter', () => {
            if (positions[index] === 'pos-3') {
                img.style.cursor = 'alias'; 
            } else {
                img.style.cursor = 'pointer';
            }
        });

        img.addEventListener('click', () => {
            let currentPos = positions[index];

            if (currentPos === 'pos-3') {
                const link = img.getAttribute('data-link');
                if (link && link !== "#") {
                    window.open(link, '_blank'); 
                }
                return; 
            } 

            if (currentPos === 'pos-4') { positions.unshift(positions.pop()); } 
            else if (currentPos === 'pos-5') { positions.unshift(positions.pop()); positions.unshift(positions.pop()); } 
            else if (currentPos === 'pos-2') { positions.push(positions.shift()); } 
            else if (currentPos === 'pos-1') { positions.push(positions.shift()); positions.push(positions.shift()); }
            
            renderImages();
            updateCarouselText();
        });
    });

    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            positions.unshift(positions.pop());
            renderImages();
            updateCarouselText();
        });

        prevBtn.addEventListener('click', () => {
            positions.push(positions.shift());
            renderImages();
            updateCarouselText();
        });
    }


    const modal = document.getElementById('artistModal');
    const badge = document.getElementById('artistBadge');
    const closeBtn = document.querySelector('.close-modal');

    if (modal && badge && closeBtn) {
        badge.addEventListener('click', () => {
            modal.classList.add('show');
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('show');
            }
        });
    }

    const hiddenElements = document.querySelectorAll('.hidden-scroll');
    
    if (hiddenElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-scroll');
                }
            });
        });

        hiddenElements.forEach((el) => observer.observe(el));
    }

    const wheel = document.getElementById('scrollWheel');
    const wheelLabels = document.querySelectorAll('.wheel-label');
    const sections = document.querySelectorAll('section');

    if (wheel && wheelLabels.length > 0) {
        
        wheelLabels.forEach(label => {
            label.addEventListener('click', () => {
                const targetId = label.getAttribute('data-target');
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        const wheelObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.id;
                    
                    wheelLabels.forEach(label => {
                        if (label.getAttribute('data-target') === activeId) {
                            label.classList.add('active');
                            const angle = label.getAttribute('data-angle');
                            wheel.style.transform = `rotate(${angle}deg)`;                            
                        } else {
                            label.classList.remove('active');
                        }
                    });
                }
            });
        }, { threshold: 0.5 }); 

        sections.forEach(section => {
            wheelObserver.observe(section);
        });
    }

    const sideNav = document.querySelector('.side-scroll-nav');
    let scrollTimer;

    if (sideNav) {
        sideNav.classList.add('is-visible');
        
        scrollTimer = setTimeout(() => {
            sideNav.classList.remove('is-visible');
        }, 2000);

        window.addEventListener('scroll', () => {
            sideNav.classList.add('is-visible');
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                sideNav.classList.remove('is-visible');
            }, 500); 
        });
    }

    const aboutModal = document.getElementById('aboutImageModal');
    const aboutImgBtn = document.getElementById('aboutImage');
    const closeAboutBtn = document.getElementById('closeAboutModal');

    if (aboutModal && aboutImgBtn && closeAboutBtn) {
        
        aboutImgBtn.addEventListener('click', () => {
            aboutModal.classList.add('show');
        });

        closeAboutBtn.addEventListener('click', () => {
            aboutModal.classList.remove('show');
        });

        window.addEventListener('click', (event) => {
            if (event.target === aboutModal) {
                aboutModal.classList.remove('show');
            }
        });
    }

    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('mobile-active');
        });

        const navLinks = navLinksContainer.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('mobile-active');
            });
        });
    }

}); // <--- All logic is now safely closed and contained right here!
