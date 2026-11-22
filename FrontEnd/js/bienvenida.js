const form = document.getElementById("form-inicio");
const divError = document.getElementById("contenedor-error");
const fillText = document.getElementById("fill-text");

form.addEventListener("submit", event => {
    const nombreUser = fillText.value;

    if (nombreUser.length > 3) {
        sessionStorage.setItem("nombreUsuario", nombreUser);
        window.location.href("/productos.html");
    } else {
        event.preventDefault(); // mostrar mensaje error sino envia
        mostrarError();
        divError.classList.remove("oculto");
    };

});

function mostrarError() {
    console.log();
    divError.innerHTML = `<p class="mensajerror">¡El nombre debe tener mas de 3 caracteres!</p>`;
    setTimeout(() => { divError.classList.add("oculto"); }, 3000);
}
