function matheusificar() {
  // Pega a URL segura da imagem dentro da própria extensão
  const matheusImgUrl = chrome.runtime.getURL("matheus.png");

  // 1. Substitui tags <img> normais
  const imagens = document.querySelectorAll("img");
  imagens.forEach(img => {
    if (img.src !== matheusImgUrl) {
      img.src = matheusImgUrl;
      img.srcset = ""; // Limpa variações de tamanho para não bugar
    }
  });

  // 2. Substitui imagens de fundo (Background Images) feitas via CSS
  const todosElementos = document.querySelectorAll("*");
  todosElementos.forEach(el => {
    const bgImg = window.getComputedStyle(el).backgroundImage;
    if (bgImg && bgImg !== "none" && !bgImg.includes("matheus.png")) {
      el.style.backgroundImage = `url('${matheusImgUrl}')`;
    }
  });
}

// Roda assim que a página carrega
matheusificar();

// Roda a cada 2 segundos para garantir que novas imagens (ao rolar a página) também mudem
setInterval(matheusificar, 2000);
