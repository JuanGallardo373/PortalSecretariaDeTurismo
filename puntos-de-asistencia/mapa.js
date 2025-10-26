let mapa;

let marcadorSeleccionado;

// Inicializa el mapa en Buenos Aires
function inicializarMapa() {
    mapa = L.map('mapa').setView([-34.6000, -58.3816], 13.5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '� OpenStreetMap contributors'
    }).addTo(mapa);
    window.dibujarCentrosEnMapa();
}

// Crea un centro en el mapa
function crearCentro(latitud, long, nombre) {
    L.marker([latitud, long]).addTo(mapa)
        .bindPopup(nombre).openPopup().addEventListener('click', function() {
            mapa.setView([latitud, long], 15);
            marcarEnLista(nombre);
        });
}

function marcarEnLista(nombre) {
    const lista = document.getElementById('lista-centros');
    const items = lista.getElementsByTagName('li');
    eliminarClaseResaltadoDeTodos();
    for (let item of items) {
        if (item.textContent.includes(nombre)) {
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            item.classList.add('resaltado');
        }
    }
}

function eliminarClaseResaltadoDeTodos() {
    const lista = document.getElementById('lista-centros');
    const items = lista.getElementsByTagName('li');
    for (let item of items) {
        item.classList.remove('resaltado');
    }
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

function mapaExiste(){
    return mapa;
}
// Permite que otros JS llamen a crearCentro
window.crearCentro = crearCentro;

// Permite que otros JS llamen a marcarCentro
window.marcarCentro = marcarCentro;

// Permite que otros JS verifiquen si el mapa existe
window.mapaExiste = mapaExiste;

// Inicializa el mapa al cargar la p�gina
window.addEventListener('DOMContentLoaded', inicializarMapa);
