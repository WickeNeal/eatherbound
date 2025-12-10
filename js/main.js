// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Custom Cursor --- */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with lag which we can animate with GSAP
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    // Magnetic Buttons & Links
    const magnetics = document.querySelectorAll('.magnetic');
    magnetics.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });


    /* --- 2. Hero Animations (Logo) --- */
    const heroTl = gsap.timeline();

    // Initial Reveal - Logo
    heroTl.from(".hero-logo-large", { y: 50, opacity: 0, duration: 1.5, ease: "power3.out" })
        .from(".subtitle", { y: 20, opacity: 0, duration: 1, ease: "power3.out" }, "-=1")
        .from(".cta-group", { y: 20, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8");

    // Scroll Text Fade
    gsap.to(".text-layer", {
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: "50%",
        opacity: 0
    });


    /* --- 3. Guide Sections Slide In --- */
    // Animate text elements separately
    gsap.utils.toArray('.guide-card').forEach(card => {
        // Animate Header
        gsap.from(card.querySelector('h3'), {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            },
            x: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // Animate Paragraph with slight delay
        gsap.from(card.querySelector('p'), {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            },
            x: -100,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out"
        });

        /* --- 3D Tilt Effect (Kept as it is subtle and interactive but not "moving stuff") --- */
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Reduced rotation intensity for subtler effect (5deg instead of 10deg)
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            gsap.to(card, {
                duration: 0.2, // Faster response to avoid "lag" or "floaty" feel
                rotateX: rotateX,
                rotateY: rotateY,
                scale: 1.02, // Subtler scale
                ease: "power2.out", // Smoother ease
                transformPerspective: 1000,
                overwrite: 'auto'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.5,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                ease: "power2.out",
                overwrite: 'auto'
            });
        });
    });

    // Parallax overlap REMOVED per feedback
    /*
    gsap.utils.toArray('.section-title').forEach(title => {
       ...
    });
    */


    /* --- 4. Particles Restored (Gentle) --- */
    initParticles();
});


/* --- Particle System (Gentle) --- */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    const particleCount = 60; // Moderate count

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // Very slow drift
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = (Math.random() - 0.5) * 0.2;
            this.size = Math.random() * 2 + 1;
            this.alpha = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Simple wrap around
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    init();
    animate();
}

    // --- Newsletter Form Handler ---
    const form = document.getElementById("newsletter-form");
    const formStatus = document.getElementById("form-status");

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        // Visual Loading State
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "SUMMONING...";
        btn.disabled = true;

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                formStatus.innerHTML = "You have been summoned. Welcome to the Vanguard.";
                formStatus.className = "form-status success";
                form.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.innerHTML = "The ritual failed. Please try again.";
                    }
                    formStatus.className = "form-status error";
                    btn.innerText = originalText;
                    btn.disabled = false;
                })
            }
        }).catch(error => {
            formStatus.innerHTML = "Connection to the Void lost. Check your internet.";
            formStatus.className = "form-status error";
            btn.innerText = originalText;
            btn.disabled = false;
        });
    }

    if (form) {
        form.addEventListener("submit", handleSubmit);
    }
