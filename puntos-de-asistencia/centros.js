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

    // Elementos del DOM
    const filterName = document.getElementById('filter-name');
    const filterLocation = document.getElementById('filter-location');
    const filterStartTime = document.getElementById('filter-start-time');
    const filterEndTime = document.getElementById('filter-end-time');
    const listaCentros = document.getElementById('lista-centros');

    // Inicializa el select de ubicaciones con nombres únicos
    function initializeFilters() {
        const nombresUnicos = Array.from(new Set(puntos.map(p => p.nombre)));
        filterLocation.innerHTML = '<option value="">Todas las ubicaciones</option>';
        nombresUnicos.forEach(nombre => {
            const option = document.createElement('option');
            option.value = nombre;
            option.textContent = nombre;
            filterLocation.appendChild(option);
        });
        applyFilters();
    }

    // Convierte una hora (HH:MM) a minutos
    function timeToMinutes(timeStr) {
        if (!timeStr) return 0;
        const [hours, minutes] = timeStr.split(':').map(Number);
        return (hours * 60) + minutes;
    }

    // Aplica los filtros y actualiza la lista
    function applyFilters() {
        const nameValue = filterName.value.toLowerCase().trim();
        const locationValue = filterLocation.value;
        const startTimeMinutes = timeToMinutes(filterStartTime.value);
        const endTimeMinutes = timeToMinutes(filterEndTime.value);

        const filteredData = puntos.filter(p => {
            // Filtro por nombre
            const nameMatch = p.nombre.toLowerCase().includes(nameValue);
            // Filtro por ubicación
            const locationMatch = !locationValue || p.nombre === locationValue;
            // Filtro por horario
            const horarioRegex = /(\d{1,2}:\d{2})/g;
            const horarios = p.horarios.match(horarioRegex);
            let itemTimeMinutes = horarios ? timeToMinutes(horarios[0]) : 0;
            let itemEndMinutes = horarios ? timeToMinutes(horarios[1]) : 1440;
            let timeMatch;
            if (startTimeMinutes > endTimeMinutes) {
                timeMatch = itemTimeMinutes >= startTimeMinutes || itemEndMinutes <= endTimeMinutes;
            } else {
                timeMatch = itemTimeMinutes >= startTimeMinutes && itemEndMinutes <= endTimeMinutes;
            }
            return nameMatch && locationMatch && timeMatch;
        });
        renderResults(filteredData);
    }

    // Renderiza la lista de resultados filtrados
    function renderResults(data) {
        listaCentros.innerHTML = '';
        if (data.length === 0) {
            const noRes = document.createElement('li');
            noRes.textContent = 'No se encontraron resultados.';
            noRes.className = 'text-center py-4 text-gray-500';
            listaCentros.appendChild(noRes);
            return;
        }
        data.forEach(punto => {
            const item = document.createElement('li');
            item.className = "p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between transition duration-150 ease-in-out hover:shadow-md border border-gray-100 mb-2";
            item.innerHTML = `<div><p class='text-lg font-bold text-blue-600'>${punto.nombre}</p><p class='text-sm text-gray-500'>${punto.direccion}</p></div><div class='text-left sm:text-right'><p class='text-xl font-extrabold text-green-700'>${punto.horarios}</p></div>`;
            item.style.cursor = 'pointer';
            item.onclick = () => {
                const [lat, lng] = punto.coordenadas.split(',').map(Number);
                window.marcarCentro(lat, lng, punto.nombre);
            };
            listaCentros.appendChild(item);
        });
    }

    // --- Filtros plegables funcionales ---
    function setupToggleButton() {
        const toggleBtn = document.getElementById('toggle-filters-btn');
        const advancedContent = document.getElementById('advanced-filters-content');
        let isAdvancedOpen = false;
        toggleBtn.addEventListener('click', function toggleHandler(e) {
            e.preventDefault();
            isAdvancedOpen = !isAdvancedOpen;
            if (isAdvancedOpen) {
                advancedContent.classList.add('open');
                toggleBtn.classList.add('bg-blue-700');
                toggleBtn.classList.remove('bg-blue-600');
                toggleBtn.querySelector('span')?.remove(); // Remove old text if any
                toggleBtn.innerHTML = `<img src='images/icono-filtrado.jpg' alt='icono filtro' style='height:22px;width:22px;vertical-align:middle;margin-right:8px;'> Ocultar Filtros`;
            } else {
                advancedContent.classList.remove('open');
                toggleBtn.classList.remove('bg-blue-700');
                toggleBtn.classList.add('bg-blue-600');
                toggleBtn.querySelector('span')?.remove();
                toggleBtn.innerHTML = `<img src='images/icono-filtrado.jpg' alt='icono filtro' style='height:22px;width:22px;vertical-align:middle;margin-right:8px;'> Filtros Avanzados`;
            }
            // Reconectar el evento después de cambiar el innerHTML
            setupToggleButton();
        }, { once: true });
    }

    filterName.addEventListener('input', applyFilters);
    filterLocation.addEventListener('change', applyFilters);
    filterStartTime.addEventListener('input', applyFilters);
    filterEndTime.addEventListener('input', applyFilters);

    initializeFilters();
    setupToggleButton();
});