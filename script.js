// ============================================
// COMPOSANTS REACT
// ============================================

const ProjectCard = ({ title, tech, description, icon, projectId }) => {
  const voirDetails = () => {
    $(".project-card").css("opacity", "0.6");
    setTimeout(() => {
      window.location.href = `project${projectId}.html`;
    }, 200);
  };

  return React.createElement(
    "div",
    { className: "project-card", onClick: voirDetails },
    React.createElement(
      "div",
      { className: "project-icon" },
      React.createElement("i", { className: `fas ${icon}` }),
    ),
    React.createElement("h3", null, title),
    React.createElement("div", { className: "project-tech" }, tech),
    React.createElement(
      "p",
      { className: "project-desc" },
      description.length > 90
        ? description.substring(0, 90) + "..."
        : description,
    ),
    React.createElement(
      "button",
      { className: "project-btn" },
      "Voir les détails →",
    ),
  );
};

const ContactForm = () => {
  const [nom, setNom] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const openModal = () => {
    $("#thankyou-modal").fadeIn(300).css("display", "flex");
  };

  window.closeModal = () => {
    $("#thankyou-modal").fadeOut(300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!$.trim(nom) || !$.trim(email) || !$.trim(message)) {
      alert("❌ Veuillez remplir tous les champs.");
      return;
    }

    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("❌ Veuillez entrer un email valide.");
      return;
    }

    setNom("");
    setEmail("");
    setMessage("");
    openModal();
  };

  return React.createElement(
    "form",
    { className: "contact-form", onSubmit: handleSubmit },
    React.createElement("input", {
      type: "text",
      placeholder: "📝 Votre nom complet",
      value: nom,
      onChange: (e) => setNom(e.target.value),
      className: "form-input",
    }),
    React.createElement("input", {
      type: "email",
      placeholder: "✉️ Votre adresse email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      className: "form-input",
    }),
    React.createElement("textarea", {
      placeholder: "💬 Votre message...",
      value: message,
      onChange: (e) => setMessage(e.target.value),
      className: "form-textarea",
      rows: 4,
    }),
    React.createElement(
      "button",
      { type: "submit", className: "form-btn" },
      "📨 Envoyer le message",
    ),
  );
};

const projets = [
  {
    id: 1,
    title: "Plateforme E-commerce",
    tech: "Python (Flask), Jinja2, JavaScript",
    description:
      "Application web dynamique pour la gestion et la vente d'ordinateurs avec panier interactif et filtrage en temps réel.",
    icon: "fa-store",
  },
  {
    id: 2,
    title: "Jeu de Cachette 2D",
    tech: "C++, SFML, Programmation Orientée Objet",
    description:
      "Endless runner 2D avec collisions précises, difficulté progressive et animations fluides.",
    icon: "fa-gamepad",
  },
  {
    id: 3,
    title: "Infrastructure Sécurisée",
    tech: "Nginx, Docker, SSL/TLS, Linux",
    description:
      "Reverse proxy avec conteneurisation Docker, load balancing et chiffrement SSL/TLS.",
    icon: "fa-cloud",
  },
];

const projectsContainer = document.getElementById("projects-root");
const contactContainer = document.getElementById("contact-root");

if (projectsContainer) {
  const projectCards = projets.map((p) =>
    React.createElement(ProjectCard, {
      key: p.id,
      title: p.title,
      tech: p.tech,
      description: p.description,
      icon: p.icon,
      projectId: p.id,
    }),
  );
  ReactDOM.render(
    React.createElement("div", { className: "projects-grid" }, projectCards),
    projectsContainer,
  );
}

if (contactContainer) {
  ReactDOM.render(React.createElement(ContactForm, null), contactContainer);
}

// ============================================
// ANIMATIONS JQUERY
// ============================================

$(document).ready(function () {
  // Animation fade-up au scroll
  const checkFade = () => {
    $(".fade-up").each(function () {
      const elementTop = $(this).offset().top;
      const windowBottom = $(window).scrollTop() + $(window).height() - 100;
      if (windowBottom > elementTop) {
        $(this).addClass("visible");
      }
    });
  };

  $(window).on("scroll", checkFade);
  checkFade();

  // Animation des cartes projet
  $(".project-card").hover(
    function () {
      $(this).find(".project-btn").css("background", "#3b82f6");
    },
    function () {
      $(this).find(".project-btn").css("background", "#1e3a5f");
    },
  );

  // Animation des cartes certification
  $(".cert-card").hover(
    function () {
      $(this).css("transform", "translateY(-3px)");
    },
    function () {
      $(this).css("transform", "translateY(0)");
    },
  );

  // Animation des liens de contact
  $(".contact-item").click(function (e) {
    const href = $(this).attr("href");
    if (href && href.startsWith("http")) {
      e.preventDefault();
      setTimeout(() => {
        window.open(href, "_blank");
      }, 150);
    }
  });

  // Gestion de la modal
  $(window).click(function (e) {
    if ($(e.target).is("#thankyou-modal")) {
      window.closeModal();
    }
  });

  // Animation des barres de progression des langues
  setTimeout(() => {
    $(".lang-progress-bar").each(function () {
      const width = $(this).css("width");
      $(this).css("width", "0%");
      setTimeout(() => {
        $(this).css("width", width);
      }, 100);
    });
  }, 500);

  // Console
  console.log(
    "%c🚀 CV Mohamed Jaa - Design Professionnel",
    "color: #1e3a5f; font-size: 14px; font-weight: bold;",
  );
  console.log(
    "%c✅ React + jQuery | Animations | Responsive",
    "color: #3b82f6; font-size: 12px;",
  );
});
