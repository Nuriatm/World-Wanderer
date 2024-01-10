var isAdditionalContentVisible = false;

function discoverHome() {
  var additionalContentDiv = document.getElementById("additional-content");

  if (!additionalContentDiv) {
    additionalContentDiv = document.createElement("div");
    additionalContentDiv.id = "additional-content";
    additionalContentDiv.innerHTML = `
        <h3>More Content</h3>
        <p>This is additional content that appears when you click the box.</p>
      `;

    // Adicione à div "box-inicio"
    var boxInicioDiv = document.getElementById("box-inicio");
    boxInicioDiv.appendChild(additionalContentDiv);

    // Inicialize o estado
    isAdditionalContentVisible = true;

    // Role até a div adicionada
    additionalContentDiv.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    // Se a div já existir, altere o estado
    isAdditionalContentVisible = !isAdditionalContentVisible;

    // Altere a exibição com base no estado
    additionalContentDiv.style.display = isAdditionalContentVisible
      ? "block"
      : "none";

    if (isAdditionalContentVisible) {
      additionalContentDiv.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
}
