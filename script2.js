document.addEventListener('DOMContentLoaded', () => {

    // =======================================================
    // 1. MENU MOBILE
    // =======================================================
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');

    menuIcon.onclick = () => {
        navbar.classList.toggle('active');
        const icon = menuIcon.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    };

    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                const icon = menuIcon.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // =======================================================
    // 2. NAVIGATION ACTIVE AU SCROLL
    // =======================================================
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.header .navbar a');
        const top = window.scrollY;

        sections.forEach(sec => {
            const offset = sec.offsetTop - 150;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');
            if (top >= offset && top < offset + height) {
                navLinks.forEach(l => l.classList.remove('active'));
                const activeLink = document.querySelector(`.header .navbar a[href*=${id}]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    });

    // =======================================================
    // 3. HERO TITLE — ANIMATION FADE-IN (CSS)
    // =======================================================
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        setTimeout(() => heroTitle.classList.add('visible'), 100);
    }

    // =======================================================
    // 4. TEXT REVEAL AU SCROLL (Intersection Observer)
    // Tous les éléments avec la classe text-reveal apparaissent
    // avec un glissement vers le haut au scroll.
    // =======================================================
    const textRevealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.text-reveal').forEach(el => textRevealObserver.observe(el));

    // =======================================================
    // 5. FADE-IN UP AU SCROLL (Intersection Observer)
    // =======================================================
    const fadeUpElements = document.querySelectorAll('.scroll-reveal');

    const fadeObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Délai en cascade selon l'index dans le parent
                const siblings = [...entry.target.parentElement.children];
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.08}s`;

                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.12          // ← Modifier ici le % visible avant déclenchement (0 à 1)
    });

    fadeUpElements.forEach(el => fadeObserver.observe(el));

    // =======================================================
    // 5. MAGNETIC BUTTONS
    // Ajoute l'attribut data-magnetic sur n'importe quel bouton/lien.
    // Le bouton est attiré vers le curseur dans un rayon de proximité.
    // Modifier `strength` pour la force d'attraction (défaut: 0.4)
    // Modifier `radius` pour le rayon de détection en px (défaut: 80)
    // =======================================================
    const MAGNETIC_STRENGTH = 0.4;  // ← Force d'attraction (0 = aucune, 1 = max)
    const MAGNETIC_RADIUS   = 80;   // ← Rayon de détection en pixels

    document.querySelectorAll('[data-magnetic]').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * MAGNETIC_STRENGTH;
            const deltaY = (e.clientY - centerY) * MAGNETIC_STRENGTH;

            btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            // Retour en douceur à la position initiale
            btn.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
            btn.style.transform = 'translate(0, 0)';
            setTimeout(() => { btn.style.transition = ''; }, 500);
        });
    });

    // =======================================================
    // 6. TILT 3D SUR LES CARTES PROJETS (JS pur)
    // Modifier `MAX_TILT` pour la force d'inclinaison en degrés (défaut: 12)
    // Modifier `SCALE` pour le zoom au survol (défaut: 1.04)
    // Modifier `PERSPECTIVE` pour la profondeur 3D en px (défaut: 800)
    // =======================================================
    const MAX_TILT   = 12;    // ← Degrés max d'inclinaison
    const SCALE      = 1.04;  // ← Zoom au survol
    const PERSPECTIVE = 800;  // ← Profondeur 3D (plus petit = plus prononcé)

    document.querySelectorAll('.projet-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Position relative de la souris dans la carte (de -0.5 à 0.5)
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const rotateX = -y * MAX_TILT;  // Axe X inversé pour effet naturel
            const rotateY =  x * MAX_TILT;

            card.style.transition = 'transform 0.1s ease';
            card.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${SCALE})`;
        });

        card.addEventListener('mouseleave', () => {
            // Retour fluide à plat
            card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            card.style.transform = `perspective(${PERSPECTIVE}px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    // =======================================================
    // 7. FORMULAIRE DE CONTACT -> WHATSAPP
    // Quand quelqu'un soumet le formulaire, WhatsApp s'ouvre
    // avec un message prérempli contenant ses infos.
    // =======================================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nom     = document.getElementById('name').value.trim();
            const message = document.getElementById('message').value.trim();

            const texte = `Bonjour Cherif ! 👋%0A%0A*Nom :* ${encodeURIComponent(nom)}%0A%0A*Message :*%0A${encodeURIComponent(message)}`;

            window.open(`https://wa.me/22666248140?text=${texte}`, '_blank');

            contactForm.reset();
        });
    }

});
