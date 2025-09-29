const API_BASE = "https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev";

// ----------- Login -----------
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const codigo = document.getElementById("codigo").value;
  const clave = document.getElementById("clave").value;

  try {
    const resp = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo, clave })
    });

    if (!resp.ok) throw new Error("Credenciales inválidas");

    const user = await resp.json();
    localStorage.setItem("user", JSON.stringify(user));

    mostrarUsuario(user);
    cargarNotas(user);
  } catch (err) {
    document.getElementById("login-error").textContent = "Error en login: " + err.message;
  }
});

// ----------- Mostrar usuario -----------
function mostrarUsuario(user) {
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("user-container").classList.remove("hidden");

  document.getElementById("user-codigo").textContent = user.codigo;
  document.getElementById("user-nombre").textContent = user.nombre;
  document.getElementById("user-email").textContent = user.email;
}

// ----------- Cerrar sesión -----------
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("user");
  document.getElementById("login-container").classList.remove("hidden");
  document.getElementById("user-container").classList.add("hidden");
});

// ----------- Mantener sesión iniciada -----------
window.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");
  if (user) {
    const parsedUser = JSON.parse(user);
    mostrarUsuario(parsedUser);
    cargarNotas(parsedUser);
  }
});
