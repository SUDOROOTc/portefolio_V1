document.addEventListener('DOMContentLoaded', () => {
    
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');

    // =======================================================
    // 1. GESTION DU MENU MOBILE (Intuitivité)
    // =======================================================
    menuIcon.onclick = () => {
        navbar.classList.toggle('active');
        const icon = menuIcon.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times'); // Utilisation de la croix pour fermer
    };

    // Fermer le menu après un clic sur un lien
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
    // 2. SCROLL REVEAL (Esthétique / Fluidité)
    // =======================================================
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.15 // 15% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    scrollRevealElements.forEach(el => {
        observer.observe(el);
    });
    
    // =======================================================
    // 3. NAVIGATION ACTIVE ET FLUIDE LORS DU DÉFILEMENT
    // =======================================================
    window.onscroll = () => {
        let sections = document.querySelectorAll('section');
        let navLinks = document.querySelectorAll('.header .navbar a');
        let top = window.scrollY;

        sections.forEach(sec => {
            let offset = sec.offsetTop - 150; 
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                // Met en surbrillance le lien actif
                navLinks.forEach(links => links.classList.remove('active'));
                document.querySelector('.header .navbar a[href*=' + id + ']').classList.add('active');
            }
        });

        // Afficher/Cacher l'icône de retour en haut
        const footerIcon = document.querySelector('.footer-icon-top');
        if (top > 500) {
            footerIcon.style.display = 'flex';
        } else {
            footerIcon.style.display = 'none';
        }
    };

    // 4. GESTION DE FORMULAIRE (UX)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Message envoyé ! (La connexion à un service d'envoi d'e-mail est requise pour la fonctionnalité réelle)");
            contactForm.reset();
        });
    }
});