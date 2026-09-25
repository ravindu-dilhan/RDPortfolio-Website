// ==========================================
// Ravindu Dilhan - Portfolio Script
// ==========================================


// ==========================================
// HERO PARTICLE BACKGROUND
// ==========================================

const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
    x: null,
    y: null
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {

    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 1.8 + 0.5;

        this.vx = Math.random() * 0.45 - 0.225;
        this.vy = Math.random() * 0.45 - 0.225;
    }

    update() {

        this.x += this.vx;
        this.y += this.vy;

        // Bounce from edges
        if (this.x < 0 || this.x > canvas.width) {
            this.vx *= -1;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.vy *= -1;
        }

        // Mouse interaction
        if (mouse.x !== null) {

            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;

            const distance = Math.hypot(dx, dy);

            if (distance < 140) {

                this.vx += dx / 18000;
                this.vy += dy / 18000;

            }
        }
    }

    draw() {

        ctx.fillStyle = "rgba(102, 227, 180, 0.65)";

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
}


// Create particles
function initParticles() {

    particles = [];

    const count = Math.min(
        95,
        Math.floor(
            canvas.width * canvas.height / 15000
        )
    );

    for (let i = 0; i < count; i++) {

        particles.push(
            new Particle()
        );

    }
}


// Connect nearby particles
function connectParticles() {

    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const distance = Math.hypot(
                particles[i].x - particles[j].x,
                particles[i].y - particles[j].y
            );

            if (distance < 105) {

                ctx.strokeStyle =
                    `rgba(102, 227, 180, ${0.16 * (1 - distance / 105)})`;

                ctx.lineWidth = 0.6;

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.stroke();
            }
        }
    }
}


// Animate particles
function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(particle => {

        particle.update();
        particle.draw();

    });

    connectParticles();

    requestAnimationFrame(
        animateParticles
    );
}


// Mouse movement
window.addEventListener(
    "mousemove",
    event => {

        mouse.x = event.clientX;
        mouse.y = event.clientY;

    }
);


// Mouse leave
window.addEventListener(
    "mouseleave",
    () => {

        mouse.x = null;
        mouse.y = null;

    }
);


// Resize
window.addEventListener(
    "resize",
    () => {

        resizeCanvas();
        initParticles();

    }
);



// ==========================================
// TYPING ANIMATION
// ==========================================

const texts = [
    "Software Engineering Student",
    "Aspiring Web Developer",
    "Frontend Developer",
    "UI Enthusiast",
    "Always Learning"
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement =
    document.getElementById("typing-text");


function type() {

    const text = texts[textIndex];

    typingElement.textContent =
        deleting
            ? text.slice(0, charIndex - 1)
            : text.slice(0, charIndex + 1);

    charIndex += deleting ? -1 : 1;


    // Finished typing
    if (
        !deleting &&
        charIndex === text.length
    ) {

        deleting = true;

        setTimeout(
            type,
            1300
        );

        return;
    }


    // Finished deleting
    if (
        deleting &&
        charIndex === 0
    ) {

        deleting = false;

        textIndex =
            (textIndex + 1) % texts.length;

        setTimeout(
            type,
            400
        );

        return;
    }


    setTimeout(
        type,
        deleting ? 38 : 72
    );
}



// ==========================================
// PROJECT DATA
// ==========================================

const projects = [

    {
        title: "Personal Portfolio",

        number: "01 / PROJECT",

        image: "RD.",

        description:
            "A modern responsive portfolio focused on clean UI, smooth animations, responsive layouts and interactive project details.",

        tech: [
            "Tailwind CSS",
            "JavaScript",
            "Responsive UI"
        ],

        liveLink: "index.html"
    },


    {
        title: "Task Manager",

        number: "02 / PROJECT",

        image: "✓",

        description:
            "A simple task management interface with add, edit, delete and local storage functionality.",

        tech: [
            "JavaScript",
            "Tailwind CSS",
            "localStorage"
        ],

        liveLink: "#"
    },


    {
        title: "Fashion Store",

        number: "03 / PROJECT",

        image: "🛒",

        description:
            "A clean e-commerce landing page designed around product presentation, spacing and responsive layouts.",

        tech: [
            "Tailwind CSS",
            "UI Design"
        ],

        liveLink: "#"
    }

];



// ==========================================
// PROJECT MODAL
// ==========================================

function showProjectModal(index) {

    const project = projects[index];

    document.getElementById(
        "modal-number"
    ).textContent = project.number;


    document.getElementById(
        "modal-image"
    ).textContent = project.image;


    document.getElementById(
        "modal-title"
    ).textContent = project.title;


    document.getElementById(
        "modal-description"
    ).textContent = project.description;


    document.getElementById(
        "modal-tech"
    ).innerHTML =
        project.tech
            .map(
                tech => `<span>${tech}</span>`
            )
            .join("");


    document.getElementById(
        "modal-live-link"
    ).href = project.liveLink;


    document.getElementById(
        "project-modal"
    ).classList.remove("hidden");
}



// Close modal
function closeModal() {

    document
        .getElementById("project-modal")
        .classList.add("hidden");

}


// Close modal when clicking outside
document
    .getElementById("project-modal")
    .addEventListener(
        "click",
        event => {

            if (
                event.target.id ===
                "project-modal"
            ) {

                closeModal();

            }

        }
    );


// Close modal with ESC
document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);



// ==========================================
// MOBILE MENU
// ==========================================

const mobileBtn =
    document.getElementById(
        "mobile-menu-btn"
    );

const mobileMenu =
    document.getElementById(
        "mobile-menu"
    );


mobileBtn.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "hidden"
        );

    }
);



// ==========================================
// DARK / LIGHT THEME
// ==========================================

const themeToggle =
    document.getElementById(
        "theme-toggle"
    );

const html =
    document.documentElement;



function updateThemeIcon() {

    themeToggle.innerHTML =
        html.classList.contains("light")

            ? '<i class="fa-solid fa-moon"></i>'

            : '<i class="fa-solid fa-sun"></i>';

}



function applyTheme(theme) {

    html.classList.toggle(
        "light",
        theme === "light"
    );

    html.classList.toggle(
        "dark",
        theme !== "light"
    );

    localStorage.setItem(
        "theme",
        theme
    );

    updateThemeIcon();

}



function initTheme() {

    const savedTheme =
        localStorage.getItem(
            "theme"
        );

    applyTheme(
        savedTheme || "dark"
    );

}



themeToggle.addEventListener(
    "click",
    () => {

        applyTheme(
            html.classList.contains("light")
                ? "dark"
                : "light"
        );

    }
);



// ==========================================
// SMOOTH SCROLL
// ==========================================

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const target =
                    document.querySelector(
                        link.getAttribute("href")
                    );

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                    mobileMenu.classList.add(
                        "hidden"
                    );

                }

            }
        );

    });



// ==========================================
// CONTACT FORM - WEB3FORMS
// ==========================================

const form =
    document.getElementById(
        "contact-form"
    );


form.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const button =
            document.getElementById(
                "submit-btn"
            );

        const submitText =
            document.getElementById(
                "submit-text"
            );


        button.disabled = true;

        submitText.textContent =
            "Sending...";


        try {

            const response =
                await fetch(
                    "https://api.web3forms.com/submit",
                    {
                        method: "POST",
                        body: new FormData(form)
                    }
                );


            const data =
                await response.json();


            if (data.success) {

                alert(
                    "Message sent successfully! I will get back to you soon."
                );

                form.reset();

            } else {

                alert(
                    "Could not send the message. Please try again."
                );

            }

        } catch (error) {

            console.error(error);

            alert(
                "Network error. Please check your connection and try again."
            );

        } finally {

            button.disabled = false;

            submitText.textContent =
                "Send Message";

        }

    }
);



// ==========================================
// CURRENT YEAR
// ==========================================

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();



// ==========================================
// PAGE LOAD
// ==========================================

window.addEventListener(
    "load",
    () => {

        initTheme();

        resizeCanvas();

        initParticles();

        animateParticles();

        setTimeout(
            type,
            700
        );

    }
);
