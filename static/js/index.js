// Service details
const serviceDetails = {
    'api-dev': {
        description: "Custom API development services tailored to your specific needs. From RESTful APIs to GraphQL endpoints, I build scalable and secure solutions that power your applications.",
        features: [
            "REST API Design & Development",
            "GraphQL Schema Design",
            "API Documentation (Swagger/OpenAPI)",
            "Authentication & Authorization",
            "Rate Limiting & Caching",
            "Performance Optimization"
        ],
        technologies: ["Node.js", "Express", "Python", "Django", "GraphQL", "JWT"],
        image: "https://source.unsplash.com/random/800x500/?api,development"
    },
    'db-arch': {
        description: "Database architecture and optimization services for both relational and NoSQL databases. I design efficient data models and optimize queries for maximum performance.",
        features: [
            "SQL & NoSQL Database Design",
            "Query Optimization",
            "Data Modeling",
            "Indexing Strategies",
            "Migration Planning",
            "Performance Tuning"
        ],
        technologies: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "SQLite", "Firestore"],
        image: "https://source.unsplash.com/random/800x500/?database,architecture"
    },
    'server-setup': {
        description: "Cloud infrastructure setup and deployment services. I configure servers, set up CI/CD pipelines, and ensure your applications are scalable and highly available.",
        features: [
            "Cloud Infrastructure (AWS/GCP/Azure)",
            "Docker & Kubernetes",
            "CI/CD Pipelines",
            "Load Balancing",
            "Auto-scaling",
            "Monitoring & Logging"
        ],
        technologies: ["AWS", "Docker", "Kubernetes", "Nginx", "GitHub Actions", "Terraform"],
        image: "https://source.unsplash.com/random/800x500/?server,cloud"
    }
};

// Typewriter effect words
const typewriterWords = ["APIs", "Databases", "Servers", "Microservices", "Node.js", "Python"];

let darkMode = true; // Default to dark mode

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typewriter effect
    initTypewriter();
    
    // Load saved theme preference
    loadThemePreference();
    
    // Set up form submissions
    setupForms();
    
    // Initialize animations
    initAnimations();
    
    // Setup mobile menu
    setupMobileMenu();
});

// Initialize animations
function initAnimations() {
    const animateElements = document.querySelectorAll('.animate-float');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Setup mobile menu
function setupMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// Typewriter effect
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    function type() {
        if (isWaiting) return;
        
        const currentWord = typewriterWords[wordIndex];
        const speed = isDeleting ? 50 : 100;
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isWaiting = true;
            setTimeout(() => {
                isWaiting = false;
                isDeleting = true;
                setTimeout(type, 500);
            }, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % typewriterWords.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 1000);
}

// Toggle dark/light theme
function toggleTheme() {
    darkMode = !darkMode;
    if (darkMode) {
        document.body.classList.remove('light-mode');
        document.getElementById('theme-icon').className = 'fas fa-moon';
    } else {
        document.body.classList.add('light-mode');
        document.getElementById('theme-icon').className = 'fas fa-sun';
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode);
}

// Load theme preference
function loadThemePreference() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'false') {
        darkMode = false;
        document.body.classList.add('light-mode');
        document.getElementById('theme-icon').className = 'fas fa-sun';
    }
}

// Open modal for service inquiry
function openModal(title, price, serviceId) {
    const modal = document.getElementById('serviceModal');
    const service = serviceDetails[serviceId];
    
    document.getElementById('modalServiceTitle').textContent = title;
    document.getElementById('modalServiceImage').src = service.image;
    document.getElementById('modalServiceDescription').textContent = service.description;
    
    const featuresList = document.getElementById('modalServiceFeatures');
    featuresList.innerHTML = '';
    
    service.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    const techContainer = document.getElementById('modalServiceTech');
    techContainer.innerHTML = '';
    
    service.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        techContainer.appendChild(tag);
    });  
    
    // Reset form
    document.getElementById('serviceForm').reset();
    
    // Show modal
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// Close modal
function closeModal() {
    const modal = document.getElementById('serviceModal');
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Show service details
function showDetails(serviceId) {
    const service = serviceDetails[serviceId];
    const modal = document.getElementById('serviceModal');
    
    document.getElementById('modalServiceTitle').textContent = serviceId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    document.getElementById('modalServiceImage').src = service.image;
    document.getElementById('modalServiceDescription').textContent = service.description;
    
    const featuresList = document.getElementById('modalServiceFeatures');
    featuresList.innerHTML = '';
    
    service.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    const techContainer = document.getElementById('modalServiceTech');
    techContainer.innerHTML = '';
    
    service.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        techContainer.appendChild(tag);
    });
    
    // Hide the form for details view
    document.getElementById('serviceForm').style.display = 'none';
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Add close button functionality
    document.querySelector('.close-modal').onclick = function() {
        closeModal();
        // Show the form again when modal is closed
        document.getElementById('serviceForm').style.display = 'block';
    };
}

// Setup form submissions
function setupForms() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        });
    }
    
    // Service inquiry form
    const serviceForm = document.getElementById('serviceForm');
    if (serviceForm) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitService();
        });
    }
}

// Submit service inquiry
function submitService() {
    // Here you would typically send the data to a server
    // For this example, we'll just show a success message
    
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your inquiry has been sent successfully!';
    successMessage.style.animation = 'fadeIn 0.5s ease-out';
    
    const modalContent = document.querySelector('.modal-content');
    modalContent.insertBefore(successMessage, modalContent.firstChild);
    
    // Reset form
    document.getElementById('serviceForm').reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }, 5000);
    
    // Close modal after submission (optional)
    setTimeout(() => {
        closeModal();
    }, 3000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('serviceModal');
    if (e.target === modal) {
        closeModal();
        // Show the form again when modal is closed
        document.getElementById('serviceForm').style.display = 'block';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('serviceModal');
        if (modal.classList.contains('active')) {
            closeModal();
            // Show the form again when modal is closed
            document.getElementById('serviceForm').style.display = 'block';
        }
    }
});

// Update form submissions to use real backend
function setupForms() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (data.success) {
                    const successMessage = document.getElementById('successMessage');
                    successMessage.style.display = 'block';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    // Service inquiry form
    const serviceForm = document.getElementById('serviceForm');
    if (serviceForm) {
        serviceForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('service-name').value,
                email: document.getElementById('service-email').value,
                phone: document.getElementById('service-phone').value,
                company: document.getElementById('service-company').value,
                serviceType: document.getElementById('modalServiceTitle').textContent,
                details: document.getElementById('service-details').value
            };

            try {
                const response = await fetch('/api/services', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (data.success) {
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your inquiry has been sent successfully!';
                    
                    const modalContent = document.querySelector('.modal-content');
                    modalContent.insertBefore(successMessage, modalContent.firstChild);
                    
                    serviceForm.reset();
                    
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        setTimeout(() => {
                            successMessage.remove();
                            closeModal();
                        }, 500);
                    }, 3000);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
}