function buscar(tipo, texto = '') {
  const ul = document.getElementById('lista-' + tipo);
  ul.innerHTML = '';
  const filtroDominio = document.getElementById('filtroDominio')?.value || '';

  let encontrados = 0;

  data[tipo].forEach((el, i) => {
    const nombre = el.diagnostico || el.resultado || el.intervencion;
    const dominioOk = filtroDominio === '' || (el.dominio && el.dominio.includes(filtroDominio));
    const textoOk = nombre.toLowerCase().includes(texto.toLowerCase());

    if (dominioOk && textoOk) {
      encontrados++;
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
