let mapa;
let marcadorSeleccionado;

// Inicializa el mapa en Buenos Aires
function inicializarMapa() {
    mapa = L.map('mapa').setView([-34.6037, -58.3816], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapa);
}

// Marca un centro en el mapa
function marcarCentro(lat, lng, nombre) {
    if (marcadorSeleccionado) {
        mapa.removeLayer(marcadorSeleccionado);
    }
    marcadorSeleccionado = L.marker([lat, lng]).addTo(mapa)
        .bindPopup(nombre)
        .openPopup();
    mapa.setView([lat, lng], 15);
}

// Permite que otros JS llamen a marcarCentro
window.marcarCentro = marcarCentro;

// Inicializa el mapa al cargar la página
window.addEventListener('DOMContentLoaded', inicializarMapa);
