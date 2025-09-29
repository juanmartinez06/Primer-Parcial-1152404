// ----------- Cargar notas desde API -----------
async function cargarNotas(user) {
  const tablaBody = document.getElementById("tabla-body");
  tablaBody.innerHTML = "<tr><td colspan='7'>Cargando notas...</td></tr>";

  try {
    const resp = await fetch(`${API_BASE}/students/${user.codigo}/notas`);
    if (!resp.ok) throw new Error("No se encontraron notas");

    const notas = await resp.json();
    if (!Array.isArray(notas) || notas.length === 0) throw new Error("Notas vacías");

    renderNotas(notas);
  } catch (err) {
    tablaBody.innerHTML = `<tr><td colspan="7">No se pudieron cargar las notas</td></tr>`;
  }
}

// ----------- Renderizar notas y promedio -----------
function renderNotas(notas) {
  const tablaBody = document.getElementById("tabla-body");
  tablaBody.innerHTML = "";

  let sumaPonderada = 0;
  let sumaCreditos = 0;

  notas.forEach(nota => {
    const definitiva = (((nota.p1 + nota.p2 + nota.p3) / 3) * 0.7 + (nota.ef * 0.3)).toFixed(2);

    sumaPonderada += parseFloat(definitiva) * nota.creditos;
    sumaCreditos += nota.creditos;

    const fila = `
      <tr>
        <td>${nota.asignatura}</td>
        <td>${nota.creditos}</td>
        <td>${nota.p1}</td>
        <td>${nota.p2}</td>
        <td>${nota.p3}</td>
        <td>${nota.ef}</td>
        <td>${definitiva}</td>
      </tr>
    `;
    tablaBody.innerHTML += fila;
  });

  const promedio = (sumaPonderada / sumaCreditos).toFixed(2);
  document.getElementById("promedio").textContent = promedio;
}
