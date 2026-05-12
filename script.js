const textarea = document.querySelector("textarea");

const generateBtn = document.querySelector(".generate-btn");

const wallpaperText = document.querySelector(".wallpaper p");

const futuristicBtn = document.querySelector("#futuristic");

const animeBtn = document.querySelector("#anime");

const technologyBtn = document.querySelector("#technology");

const gymBtn = document.querySelector("#gym");

const wallpaper = document.querySelector(".wallpaper");

const downloadBtn = document.querySelector(".download-btn");

const refreshBtn = document.querySelector(".refresh-btn");

const loading = document.querySelector(".loading");


// Atualização em tempo real

textarea.addEventListener("input", () => {

  if (textarea.value.trim() === "") {

    wallpaperText.innerText =
      "Um novo dia, uma nova chance.";

  } else {

    wallpaperText.innerText = textarea.value;

  }

});

let currentCategory = "futuristic";

async function changeWallpaperTheme(category) {

  currentCategory = category;

  loading.style.display = "block";

  wallpaper.style.opacity = "0";

  wallpaper.style.transform = "scale(0.96)";

  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${category}&per_page=20`,
    {
      headers: {
        Authorization:
          "z3EGEy2jmkIWFERiiYkIidpXlD4yYexqeNd1TUcRGrIw54jiVhlIKry8"
      }
    }
  );

  const data = await response.json();

  const randomIndex =
    Math.floor(Math.random() * data.photos.length);

  const imageUrl =
    data.photos[randomIndex].src.portrait;

  wallpaper.style.background = `
    linear-gradient(
      rgba(0,0,0,0.25),
      rgba(0,0,0,0.45)
    ),
    url('${imageUrl}')
  `;

  wallpaper.style.backgroundSize = "cover";

  wallpaper.style.backgroundPosition = "center";

  setTimeout(() => {

  wallpaper.style.opacity = "1";

  wallpaper.style.transform = "scale(1)";

  loading.style.display = "none";

}, 300);

}

// Tema Futurista

futuristicBtn.addEventListener("click", () => {

  changeWallpaperTheme("cyberpunk neon");

});

// Tema Anime

animeBtn.addEventListener("click", () => {

  changeWallpaperTheme("anime");

});

// Tema Tecnologia

technologyBtn.addEventListener("click", () => {

  changeWallpaperTheme("technology");

});

// Tema Academia

gymBtn.addEventListener("click", () => {

  changeWallpaperTheme("fitness gym");

});

downloadBtn.addEventListener("click", () => {

  html2canvas(wallpaper).then((canvas) => {

    const link = document.createElement("a");

    link.download = "wallpaper-wallgen.png";

    link.href = canvas.toDataURL();

    link.click();

  });

});

refreshBtn.addEventListener("click", () => {

  changeWallpaperTheme(currentCategory);

});

wallpaper.addEventListener("mousemove", (event) => {

  const rect =
    wallpaper.getBoundingClientRect();

  const x =
    event.clientX - rect.left;

  const y =
    event.clientY - rect.top;

  const centerX =
    rect.width / 2;

  const centerY =
    rect.height / 2;

  const moveX =
    (x - centerX) / 25;

  const moveY =
    (y - centerY) / 25;

  wallpaper.style.transform = `
    rotateY(${moveX}deg)
    rotateX(${-moveY}deg)
    scale(1.03)
  `;

});

wallpaper.addEventListener("mouseleave", () => {

  wallpaper.style.transform = `
    rotateY(0deg)
    rotateX(0deg)
    scale(1)
  `;

}); 

const introScreen =
  document.querySelector(".intro-screen");


window.addEventListener("load", () => {

  setTimeout(() => {

    introScreen.style.opacity = "0";

    introScreen.style.visibility = "hidden";

  }, 3000);

});

if ("serviceWorker" in navigator) {

  navigator.serviceWorker
    .register("service-worker.js")

    .then(() => {

      console.log(
        "Service Worker registrado"
      );

    });

}