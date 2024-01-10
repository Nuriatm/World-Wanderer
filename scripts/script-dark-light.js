function toggleDarkMode() {
  var body = document.body;
  var isDarkMode = body.classList.toggle("dark-mode");

  // Atualize o botão Dark Mode com base no modo atual
  var darkLightButton = document.getElementById("dark-light");
  darkLightButton.innerHTML = isDarkMode
    ? '<i class="fa fa-moon"></i>'
    : '<i class="fa fa-sun"></i>';

  // Salve a preferência do usuário no localStorage
  localStorage.setItem("darkMode", isDarkMode.toString());
}

document.addEventListener("DOMContentLoaded", function () {
  var body = document.body;
  var isDarkMode = localStorage.getItem("darkMode") === "true";

  // Atualize o ícone com base na preferência inicial
  var darkLightButton = document.getElementById("dark-light");
  darkLightButton.innerHTML = isDarkMode
    ? '<i class="fa fa-moon"></i>'
    : '<i class="fa fa-sun"></i>';

  // Se o usuário tiver uma preferência salva, aplique-a
  if (isDarkMode) {
    body.classList.add("dark-mode");
  }
});
