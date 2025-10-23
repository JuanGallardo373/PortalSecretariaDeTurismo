document.addEventListener('DOMContentLoaded', () => {
    const puntos = [
        {
            "nombre": "Centro de Información Turística - Recoleta",
            "direccion": "Av. Pres. Manuel Quintana 600, CABA",
            "coordenadas": "-34.58688896050507, -58.39088559311662",
            "horarios": "Lunes a viernes: 8:00 a 21:00hs",
            "tipo": "C"
        }, {
            "nombre": "Centro de Atención al Turista - Peatonal Florida",
            "direccion": "Florida 1000, CABA",
            "coordenadas": "-34.59565052592706, -58.37646603772084",
            "horarios": "Todos los dias: 8:00 a 20:00hs",
            "tipo": "C"
        }, {
            "nombre": "Centro de información turística - Microcentro",
            "direccion": "Florida 50, CABA",
            "coordenadas": "-34.60575344196803, -58.37552190019598",
            "horarios": "Lunes a viernes: 8:00 a 22:00hs",
            "tipo": "C"
        }, {
            "nombre": "Centro de Asistencia Arenales",
            "direccion": "Arenales 1611, CABA",
            "coordenadas": "-34.594594476677656, -58.390332025074265",
            "horarios": "Todos los dias: 8:00 a 18:00hs",
            "tipo": "C"
        }, {
            "nombre": "Centro de Asistencia Monserrat",
            "direccion": "Av. Hipólito Yrigoyen 1210, CABA",
            "coordenadas": "-34.60894968898661, -58.38358358011618",
            "horarios": "Martes a domingos: 8:00 a 18:00hs",
            "tipo": "C"
        }, {
            "nombre": "Centro de Asistencia Barrio Norte",
            "direccion": "Av. Córdoba 1712, CABA",
            "coordenadas": "-34.59838792666516, -58.391394174022025",
            "horarios": "Todos los dias: 8:00 a 21:00hs",
            "tipo": "C"
        }, {
            "nombre": "Unidad Movil de Asistencia 1",
            "direccion": "San Luis 2740, CABA",
            "coordenadas": "-34.598882487369515, -58.40512708423985",
            "horarios": "Todos los dias: 8:00 a 13:00hs",
            "tipo": "M"
        }, {
            "nombre": "Unidad Movil de Asistencia 2",
            "direccion": "Av. Pueyrredón 1341, CABA",
            "coordenadas": "-34.59492536514492, -58.402507209743774",
            "horarios": "Todos los dias: 8:00 a 16:00hs",
            "tipo": "M"
        }, {
            "nombre": "Unidad Movil de Asistencia 3",
            "direccion": "Av. del Libertador 2200, CABA",
            "coordenadas": "-34.58155910747439, -58.40373860289271",
            "horarios": "Todos los dias: 16:00 a 20:00hs",
            "tipo": "M"
        }, {
            "nombre": "Unidad Movil de Asistencia 4",
            "direccion": "Av. Estado de Israel 4200, CABA",
            "coordenadas": "-34.5979738116593, -58.42453371801481",
            "horarios": "Todos los dias: 9:00 a 20:00hs",
            "tipo": "M"
        }
    ];

    const listaCentros = document.getElementById("lista-centros");
    const cbCentros = document.getElementById("cb-centros");
    const cbMoviles = document.getElementById("cb-moviles");

    filtrarPuntos(cbCentros, cbMoviles, puntos, listaCentros);

});

function listarPuntos(puntos, listaCentros) {
    puntos.forEach(punto => {
        const item = document.createElement('li');
        item.innerHTML = `<h3>${punto.nombre}</h3>${punto.direccion}<br>Horario: ${punto.horarios}<hr>`;
        listaCentros.appendChild(item);
    });
}

function listarCentros(puntos, listaCentros) {
    listaCentros.innerHTML = '';
    puntos.forEach(punto => {
        if (punto.tipo == 'C') {
            const item = document.createElement('li');
            item.innerHTML = `<h3>${punto.nombre}</h3>${punto.direccion}<br>Horario: ${punto.horarios}<hr>`;
            listaCentros.appendChild(item);
        }
    });
}

function listarMoviles(puntos, listaCentros) {
    listaCentros.innerHTML = '';
    puntos.forEach(punto => {
        if (punto.tipo == 'M') {
            const item = document.createElement('li');
            item.innerHTML = `<h3>${punto.nombre}</h3>${punto.direccion}<br>Horario: ${punto.horarios}<hr>`;
            listaCentros.appendChild(item);
        }

    });
}

function filtrarPuntos(cbCentros, cbMoviles, puntos, listaCentros) {
    cbCentros.addEventListener('change', function () {
        if (cbCentros.checked) {
            listarCentros(puntos, listaCentros);
        }
    });
    cbMoviles.addEventListener('change', function () {
        if (cbMoviles.checked) {
            listarMoviles(puntos, listaCentros);
        }
    });

    if (!cbCentros.checked && !cbMoviles.checked) {
        listarPuntos(puntos, listaCentros);
        return;
    }
}