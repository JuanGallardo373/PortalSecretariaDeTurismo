document.addEventListener('DOMContentLoaded', () => {
  const filtros = document.getElementById('filtros');
  const boton = document.getElementById('filtro-btn');

  boton.addEventListener('click', function () {
    filtros.classList.toggle('oculto');
  });
});




