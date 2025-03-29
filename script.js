document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const input = document.getElementById("busquedaInput");
      const contenedorResultados = document.getElementById("resultados");

      input.addEventListener("input", () => {
        const filtro = input.value.trim().toLowerCase();

        if (filtro.length === 0) {
          contenedorResultados.style.display = "none";
        } else {
          contenedorResultados.style.display = "block";
          mostrarResultados(data, filtro);
        }
      });

      // Al cargar, ocultamos resultados
      contenedorResultados.style.display = "none";
    });
});

function mostrarResultados(data, filtro) {
  const nandaLista = document.getElementById("nandaLista");
  const nocLista = document.getElementById("nocLista");
  const nicLista = document.getElementById("nicLista");

  nandaLista.innerHTML = "";
  nocLista.innerHTML = "";
  nicLista.innerHTML = "";

  // NANDA
  const nandaResultados = data.nanda.filter((item) =>
    item.codigo.toLowerCase().includes(filtro) ||
    item.diagnostico.toLowerCase().includes(filtro) ||
    item.definicion?.toLowerCase().includes(filtro)
  );

  if (nandaResultados.length > 0) {
    nandaResultados.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.codigo} – ${item.diagnostico}</strong><br><small>${item.definicion}</small>`;
      nandaLista.appendChild(li);
    });
  } else {
    nandaLista.innerHTML = "<li>No se encontraron diagnósticos NANDA.</li>";
  }

  // NOC
  const nocResultados = data.noc.filter((item) =>
    item.codigo.toLowerCase().includes(filtro) ||
    item.resultado.toLowerCase().includes(filtro) ||
    item.definicion?.toLowerCase().includes(filtro)
  );

  if (nocResultados.length > 0) {
    nocResultados.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.codigo} – ${item.resultado}</strong><br><small>${item.definicion}</small>`;
      nocLista.appendChild(li);
    });
  } else {
    nocLista.innerHTML = "<li>No se encontraron resultados NOC.</li>";
  }

  // NIC
  const nicResultados = data.nic.filter((item) =>
    item.codigo.toLowerCase().includes(filtro) ||
    item.intervencion.toLowerCase().includes(filtro) ||
    item.definicion?.toLowerCase().includes(filtro)
  );

  if (nicResultados.length > 0) {
    nicResultados.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.codigo} – ${item.intervencion}</strong><br><small>${item.definicion}</small>`;
      nicLista.appendChild(li);
    });
  } else {
    nicLista.innerHTML = "<li>No se encontraron intervenciones NIC.</li>";
  }
}
