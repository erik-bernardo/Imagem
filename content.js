// Função que escolhe uma imagem aleatória JPG da extensão
function obterImagemAleatoria() {
  const numeroAleatorio = Math.floor(Math.random() * 24) + 1; // Sorteia de 1 a 24
  return chrome.runtime.getURL(`${numeroAleatorio}.jpeg`);
}

function matheusificarAleatorio() {
  // 1. Substitui tags <img> normais
  const imagens = document.querySelectorAll("img");
  imagens.forEach(img => {
    // Marcamos as imagens já alteradas com uma classe para não ficarem piscando/trocando toda hora
    if (!img.classList.contains("matheusificado")) {
      img.src = obterImagemAleatoria();
      img.srcset = ""; 
      img.classList.add("matheusificado");
    }
  });

  // 2. Substitui imagens de fundo (Background Images) via CSS
  const todosElementos = document.querySelectorAll("*");
  todosElementos.forEach(el => {
    const bgImg = window.getComputedStyle(el).backgroundImage;
    if (bgImg && bgImg !== "none" && !el.classList.contains("bg-matheusificado")) {
      el.style.backgroundImage = `url('${obterImagemAleatoria()}')`;
      el.classList.add("bg-matheusificado");
    }
  });
}

// Roda assim que a página carrega
matheusificarAleatorio();

// Roda a cada 2 segundos para páginas com rolagem infinita (como redes sociais)
setInterval(matheusificarAleatorio, 2000);