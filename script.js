let data = {};

fetch('data.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    mostrarLista('nanda');
  });

function mostrarLista(tipo) {
  const ul = document.getElementById('lista-' + tipo);
  ul.innerHTML = '';
  data[tipo].forEach(el => {
    const li = document.createElement('li');
    li.textContent = `[${el.codigo}] ${el.diagnostico || el.resultado || el.intervencion}`;
    ul.appendChild(li);
  });
}

function buscar(tipo, texto) {
  const ul = document.getElementById('lista-' + tipo);
  ul.innerHTML = '';
  data[tipo].forEach(el => {
    const nombre = el.diagnostico || el.resultado || el.intervencion;
    if (nombre.toLowerCase().includes(texto.toLowerCase())) {
      const li = document.createElement('li');
      li.textContent = `[${el.codigo}] ${nombre}`;
      ul.appendChild(li);
    }
  });
}

function mostrarSeccion(id) {
  document.querySelectorAll('.se
