// DARK MODE TOGGLE
const darkToggle = document.getElementById('darkModeToggle');
const updateThemeIcon = () => {
    document.body.classList.contains('dark')
        ? document.body.classList.add('dark')
        : document.body.classList.remove('dark');
};
darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcon();
});
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
    updateThemeIcon();
    fadeInOnScroll();
    // Simple 3D sphere background
    const canvas = document.getElementById('bg3d');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({canvas, alpha:true});
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        const geometry = new THREE.SphereGeometry(2, 32, 32);
        const material = new THREE.MeshStandardMaterial({color: 0x7f5cff, roughness: 0.3, metalness: 0.7});
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        const light = new THREE.PointLight(0x00ffe7, 1, 100);
        light.position.set(5, 5, 5);
        scene.add(light);
        camera.position.z = 6;
        function animate() {
            requestAnimationFrame(animate);
            sphere.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();
    }
});

// FADE-IN ON SCROLL
const fadeEls = document.querySelectorAll('.fade-in');
const fadeInOnScroll = () => {
    fadeEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.style.animationPlayState = 'running';
        }
    });
};
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('DOMContentLoaded', fadeInOnScroll);

// PARALLAX EFFECT
document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.parallax').forEach(el => {
        const speed = 10;
        const x = (window.innerWidth / 2 - e.clientX) / speed;
        const y = (window.innerHeight / 2 - e.clientY) / speed;
        el.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    });
});
window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach(el => {
        const speed = 0.2;
        const offset = window.scrollY * speed;
        el.style.backgroundPosition = `center ${offset}px`;
    });
});

window.addEventListener('load', () => {
    document.getElementById('loader').style.opacity = 0;
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 500);
});

function typeWriterEffect(element, text, speed = 70) {
    let i = 0;
    function typing() {
        if (i <= text.length) {
            element.textContent = text.slice(0, i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}
window.addEventListener('DOMContentLoaded', () => {
    const tw = document.getElementById('typewriter');
    if (tw) typeWriterEffect(tw, "Rama Pratama", 90);
});

function splitTextAnimation(selector, delay = 0.05) {
    document.querySelectorAll(selector).forEach(el => {
        const chars = el.textContent.split('');
        el.innerHTML = '';
        chars.forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${i * delay}s`;
            el.appendChild(span);
        });
        el.classList.add('split-text');
    });
}
window.addEventListener('DOMContentLoaded', () => {
    splitTextAnimation('.hero-subtitle');
});

const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('.navbar ul');
if (menuToggle && navUl) {
    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('open');
    });
}

// SECTION TITLE ANIMATION
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => {
    observer.observe(section);
});

function revealSectionsOnScroll() {
    document.querySelectorAll('.section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            section.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealSectionsOnScroll);
window.addEventListener('DOMContentLoaded', revealSectionsOnScroll);

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = "Sending...";
        btn.classList.add('loading');
        setTimeout(() => {
            btn.disabled = false;
            btn.textContent = "Send";
            btn.classList.remove('loading');
            alert("Message sent!");
            contactForm.reset();
        }, 1800);
    });
}