let datos = {};

fetch('data.json')
  .then(response => response.json())
  .then(json => {
    datos = json;
  });

function buscar() {
  const input = document.getElementById("busqueda").value.toLowerCase();
  const lista = document.getElementById("resultados");
  lista.innerHTML = '';

  datos.nanda.forEach(item => {
    if (item.diagnostico.toLowerCase().includes(input)) {
      const li = document.createElement("li");
      li.textContent = `[${item.codigo}] ${item.diagnostico}`;
      lista.appendChild(li);
    }
  });
}

