//Animations
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
tl.to(".slider", { y: "-100%", duration: 1.5, delay: 1 });
tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");
tl.fromTo("nav", { opacity: 0 }, { opacity: 1, duration: 2 });
tl.fromTo("#name", { opacity: 0 }, { opacity: 1, duration: 2 }, "-=2");
tl.fromTo(".cursor", { opacity: 0 }, { opacity: 1, duration: 2 }, "-=2");

/* (ES-5 yazılım)
const TypeWriter = function(txtElement, words, wait = 3000) {'constructorun içi' - type() metoduna kadar olan kısım} */
// (ES-6 yazılım) - class oluşturarak.
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }
  /* (ES-5 yazılım)
    TypeWriter.prototype.type = function() {'type metodunun içi' - TypeWriterın içinde değil} */
  // (ES-6 yazılım) - classın içinde metod ile.
  type() {
    const currentWords = this.wordIndex % this.words.length;
    const fullTxt = this.words[currentWords];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = ` <span class="txt"> ${this.txt}</span>`;

    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 4;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      typeSpeed = 500;
      this.wordIndex++;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  new TypeWriter(txtElement, words, wait);
}

// navbar ıcon
const align1 = document.getElementById("align1");
const align2 = document.getElementById("align2");
const navs = document.querySelector(".nav-links");

align1.addEventListener("click", openNavs);

function openNavs() {
  navs.style.visibility = "visible";
  align1.style.display = "none";
  align2.style.display = "block";
  navs.classList.add("fade-in");
  navs.classList.remove("fade-out");
}

align2.addEventListener("click", closeNavs);

function closeNavs() {
  align1.style.display = "block";
  align2.style.display = "none";
  navs.classList.remove("fade-in");
  navs.classList.add("fade-out");
}

//Cursor animation
let mouseCursor = document.querySelector(".cursor");
let navLinks = document.querySelectorAll("nav a");
let navIcons = document.querySelectorAll("nav i");
let logo = document.querySelector("#logo");
let name = document.querySelector("#name");

window.addEventListener("mousemove", cursor);

function cursor(e) {
  mouseCursor.style.top = e.pageY + "px";
  mouseCursor.style.left = e.pageX + "px";
}

logo.addEventListener("mouseover", () => {
  mouseCursor.classList.add("link-grow");
});
logo.addEventListener("mouseleave", () => {
  mouseCursor.classList.remove("link-grow");
});

name.addEventListener("mouseover", () => {
  mouseCursor.classList.add("link-grow");
});
name.addEventListener("mouseleave", () => {
  mouseCursor.classList.remove("link-grow");
});

navLinks.forEach((link) => {
  link.addEventListener("mouseover", () => {
    mouseCursor.classList.add("link-grow");
  });
  link.addEventListener("mouseleave", () => {
    mouseCursor.classList.remove("link-grow");
  });
});

navIcons.forEach((icon) => {
  icon.addEventListener("mouseover", () => {
    mouseCursor.classList.add("align-grow");
  });
  icon.addEventListener("mouseleave", () => {
    mouseCursor.classList.remove("align-grow");
  });
});
