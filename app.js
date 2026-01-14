// app.js

// 👉 PONÉ ACÁ TU URL DE BACKEND EN RAILWAY
// Ejemplo: const BACKEND_URL = "https://backend-login-production.up.railway.app";
const BACKEND_URL = "https://backend-production-d336.up.railway.app";

// Referencias a elementos del DOM
const registerForm = document.getElementById("register-form");
const registerMessage = document.getElementById("register-message");

const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

const protectedArea = document.getElementById("protected-area");
const logoutBtn = document.getElementById("logout-btn");

// Guardar token en memoria (para algo simple; también podrías usar localStorage)
let authToken = null;

// Manejo del formulario de registro
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  registerMessage.textContent = "";
  registerMessage.className = "message";

  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  try {
    const response = await fetch(`${BACKEND_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Error desde el backend
      registerMessage.textContent = data.error || "Error al registrarse";
      registerMessage.classList.add("error");
    } else {
      registerMessage.textContent = data.message || "Registro exitoso";
      registerMessage.classList.add("success");
      registerForm.reset();
    }
  } catch (error) {
    console.error("Error en fetch /register:", error);
    registerMessage.textContent = "Error de conexión con el servidor";
    registerMessage.classList.add("error");
  }
});

// Manejo del formulario de login
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginMessage.textContent = "";
  loginMessage.className = "message";

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      loginMessage.textContent = data.error || "Error al iniciar sesión";
      loginMessage.classList.add("error");
      authToken = null;
      protectedArea.classList.add("hidden");
    } else {
      loginMessage.textContent = data.message || "Login exitoso";
      loginMessage.classList.add("success");

      // Guardamos el token
      authToken = data.token;

      // Mostramos la zona protegida
      protectedArea.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error en fetch /login:", error);
    loginMessage.textContent = "Error de conexión con el servidor";
    loginMessage.classList.add("error");
  }
});

// Cerrar sesión (simple: borramos token y ocultamos la zona)
logoutBtn.addEventListener("click", () => {
  authToken = null;
  protectedArea.classList.add("hidden");
  loginMessage.textContent = "Sesión cerrada.";
  loginMessage.className = "message success";
});
