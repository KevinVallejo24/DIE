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
  data[tipo].forEach((el, i) => {
    const nombre = el.diagnostico || el.resultado || el.intervencion;
    const item = document.createElement('li');
    item.innerHTML = `
      <div class="item-header" onclick="toggleDetalle('${tipo}-${i}')">
        <strong>[${el.codigo}]</strong> ${nombre} <i class="fas fa-chevron-down"></i>
      </div>
      <div class="item-detalle" id="${tipo}-${i}">
        <p><strong>Definición:</strong> ${el.definicion}</p>
        ${el.dominio ? `<p><strong>Dominio:</strong> ${el.dominio}</p>` : ''}
        ${el.caracteristicas ? `<p><strong>Características:</strong> ${el.caracteristicas.join(', ')}</p>` : ''}
        ${el.indicadores ? `<p><strong>Indicadores:</strong> ${el.indicadores.join(', ')}</p>` : ''}
        ${el.actividades ? `<p><strong>Actividades:</strong> ${el.actividades.join(', ')}</p>` : ''}
        ${el.relacionados ? generarRelacionados(el.relacionados) : ''}
      </div>
    `;
    ul.appendChild(item);
  });
}

function buscar(tipo, texto = '') {
  const ul = document.getElementById('lista-' + tipo);
  ul.innerHTML = '';
  const filtroDominio = document.getElementById('filtroDominio')?.value || '';
  const textoLower = texto.toLowerCase();

  let encontrados = 0;

  data[tipo].forEach((el, i) => {
    const campos = [
      el.codigo,
      el.diagnostico,
      el.resultado,
      el.intervencion,
      el.definicion,
      ...(el.caracteristicas || []),
      ...(el.indicadores || []),
      ...(el.actividades || [])
    ];

    const dominioOk = filtroDominio === '' || (el.dominio && el.dominio.includes(filtroDominio));
    const textoOk = campos.some(campo => campo?.toLowerCase().includes(textoLower));

    if (dominioOk && textoOk) {
      encontrados++;
      const nombre = el.diagnostico || el.resultado || el.intervencion;
      const item = document.createElement('li');
      item.innerHTML = `
        <div class="item-header" onclick="toggleDetalle('${tipo}-${i}')">
          <strong>[${el.codigo}]</strong> ${nombre} <i class="fas fa-chevron-down"></i>
        </div>
        <div class="item-detalle" id="${tipo}-${i}">
          <p><strong>Definición:</strong> ${el.definicion}</p>
          ${el.dominio ? `<p><strong>Dominio:</strong> ${el.dominio}</p>` : ''}
          ${el.caracteristicas ? `<p><strong>Características:</strong> ${el.caracteristicas.join(', ')}</p>` : ''}
          ${el.indicadores ? `<p><strong>Indicadores:</strong> ${el.indicadores.join(', ')}</p>` : ''}
          ${el.actividades ? `<p><strong>Actividades:</strong> ${el.actividades.join(', ')}</p>` : ''}
          ${el.relacionados ? generarRelacionados(el.relacionados) : ''}
        </div>
      `;
      ul.appendChild(item);
    }
  });

  if (encontrados === 0) {
    const li = document.createElement('li');
    li.innerHTML = `<em>No se encontraron resultados.</em>`;
    ul.appendChild(li);
  }
}

function toggleDetalle(id) {
  const div = document.getElementById(id);
  div.style.display = (div.style.display === "block") ? "none" : "block";
}

function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  mostrarLista(id);
}

function generarRelacionados(rel) {
  let contenido = '';

  if (rel.noc && rel.noc.length > 0) {
    const nocRelacionados = rel.noc.map(cod => {
      const item = data.noc.find(n => n.codigo === cod);
      return item ? `[${item.codigo}] ${item.resultado}` : `[${cod}]`;
    });
    contenido += `<p><strong>Resultados relacionados (NOC):</strong> ${nocRelacionados.join(', ')}</p>`;
  }

  if (rel.nic && rel.nic.length > 0) {
    const nicRelacionados = rel.nic.map(cod => {
      const item = data.nic.find(n => n.codigo === cod);
      return item ? `[${item.codigo}] ${item.intervencion}` : `[${cod}]`;
    });
    contenido += `<p><strong>Intervenciones relacionadas (NIC):</strong> ${nicRelacionados.join(', ')}</p>`;
  }

  return contenido;
}
