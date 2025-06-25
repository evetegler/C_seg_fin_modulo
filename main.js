// main.js - Funcionalidades para la página de Ciberseguridad

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔒 Página de Ciberseguridad cargada correctamente');
    
    // Inicializar todas las funcionalidades
    initNavbarEffects();
    initScrollEffects();
    initImageEffects();
    initSecurityTips();
    initResponsiveFeatures();
});

// Efectos para la barra de navegación
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    
    // Cambiar opacidad del navbar al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = '';
        }
    });

    // Smooth scroll para los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Solo aplicar smooth scroll si es un enlace interno
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Cerrar el menú móvil al hacer clic en un enlace
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

// Efectos de scroll y animaciones
function initScrollEffects() {
    // Animación de aparición para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animaciones a elementos específicos
    const elementsToAnimate = document.querySelectorAll('h1, .lead, section');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Botón "Volver arriba"
    createBackToTopButton();
}

// Crear botón "Volver arriba"
function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'btn btn-primary position-fixed';
    backToTopBtn.style.cssText = `
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: none;
        font-size: 20px;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(backToTopBtn);

    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
}

// Efectos para la imagen principal
function initImageEffects() {
    const heroImage = document.querySelector('main img');
    const overlay = document.querySelector('.position-absolute');
    
    if (heroImage && overlay) {
        // Efecto parallax ligero
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        });

        // Efecto hover en la imagen
        heroImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });

        heroImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        // Animación del overlay
        overlay.style.opacity = '0';
        overlay.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
            overlay.style.transition = 'opacity 1s ease, transform 1s ease';
        }, 500);
    }
}

// Consejos de seguridad dinámicos
function initSecurityTips() {
    const securityTips = [
        "💡 Usa contraseñas únicas para cada cuenta",
        "🔒 Mantén tu software actualizado",
        "📧 Verifica siempre los remitentes de emails",
        "🛡️ Usa autenticación de dos factores",
        "🌐 Navega solo en sitios HTTPS seguros",
        "💾 Realiza copias de seguridad regularmente",
        "🚫 No hagas clic en enlaces sospechosos",
        "📱 Mantén tu dispositivo con antivirus actualizado"
    ];

    // Crear elemento para mostrar consejos
    const tipContainer = document.createElement('div');
    tipContainer.className = 'alert alert-info mt-4 text-center';
    tipContainer.style.cssText = `
        position: relative;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    // Insertar después de la imagen principal
    const mainSection = document.querySelector('main section:last-child');
    if (mainSection) {
        mainSection.appendChild(tipContainer);
    }

    let currentTipIndex = 0;
    
    function showNextTip() {
        tipContainer.innerHTML = `
            <strong>Consejo de Seguridad:</strong> ${securityTips[currentTipIndex]}
            <small class="d-block mt-1">Haz clic para ver el siguiente consejo</small>
        `;
        currentTipIndex = (currentTipIndex + 1) % securityTips.length;
    }

    // Mostrar primer consejo
    showNextTip();

    // Cambiar consejo al hacer clic
    tipContainer.addEventListener('click', showNextTip);

    // Cambiar consejo automáticamente cada 5 segundos
    setInterval(showNextTip, 5000);

    // Efecto hover
    tipContainer.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 4px 15px rgba(0,123,255,0.3)';
    });

    tipContainer.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '';
    });
}

// Características responsivas adicionales
function initResponsiveFeatures() {
    // Ajustar tamaño de fuente según el dispositivo
    function adjustFontSizes() {
        const screenWidth = window.innerWidth;
        const title = document.querySelector('.display-4');
        
        if (title) {
            if (screenWidth < 768) {
                title.style.fontSize = '2.5rem';
            } else if (screenWidth < 992) {
                title.style.fontSize = '3rem';
            } else {
                title.style.fontSize = '';
            }
        }
    }

    adjustFontSizes();
    window.addEventListener('resize', adjustFontSizes);

    // Optimizar imagen para dispositivos móviles
    const heroImage = document.querySelector('main img');
    if (heroImage) {
        function optimizeImage() {
            const screenWidth = window.innerWidth;
            if (screenWidth < 768) {
                heroImage.style.height = '250px';
            } else {
                heroImage.style.height = '400px';
            }
        }

        optimizeImage();
        window.addEventListener('resize', optimizeImage);
    }
}

// Utilidades adicionales
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Mostrar notificación
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Ocultar notificación después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Detectar si el usuario es nuevo
function checkFirstVisit() {
    const hasVisited = localStorage.getItem('cybersecurity-visited');
    if (!hasVisited) {
        setTimeout(() => {
            showNotification('¡Bienvenido! Explora nuestros consejos de ciberseguridad', 'success');
            localStorage.setItem('cybersecurity-visited', 'true');
        }, 1000);
    }
}

// Función de error para manejo de imágenes
function handleImageError() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.backgroundColor = '#f8f9fa';
            this.style.border = '2px dashed #dee2e6';
            this.innerHTML = 'Imagen no disponible';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = '#6c757d';
        });
    });
}

// Inicializar verificación de primera visita y manejo de errores
setTimeout(() => {
    checkFirstVisit();
    handleImageError();
}, 500);