const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth"
        });
        menu.classList.remove("show");
      }
    }
  });
});

function AlturaCards() {
  const cards = document.querySelectorAll(".topico");

  cards.forEach(card => {
    card.style.height = "auto";
  });

  const fechados = [];
  const abertos = [];

  cards.forEach(card => {
    const completo = card.querySelector(".texto-completo");
    if (completo.style.display === "block") {
      abertos.push(card);
    } else {
      fechados.push(card);
    }
  });

  function ajustarAltura(grupo) {
    if (grupo.length === 0) return;
    let maior = 0;
    grupo.forEach(card => {
      const altura = card.offsetHeight;
      if (altura > maior) maior = altura;
    });
    grupo.forEach(card => {
      card.style.height = `${maior}px`;
    });
  }

  ajustarAltura(fechados);
  ajustarAltura(abertos);
}

document.querySelectorAll(".toggle-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".topico");
    const curto = card.querySelector(".texto-curto");
    const completo = card.querySelector(".texto-completo");
    const isOpen = completo.style.display === "block";

    if (isOpen) {
      completo.style.display = "none";
      curto.style.display = "block";
      btn.textContent = "Ler mais";
    } else {
      completo.style.display = "block";
      curto.style.display = "none";
      btn.textContent = "Ler menos";
    }

    AlturaCards(); 
  });
});

window.addEventListener("load", AlturaCards);
window.addEventListener("resize", AlturaCards);
