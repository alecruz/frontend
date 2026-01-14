// app.js

// 👉 PONÉ ACÁ TU URL DE BACKEND EN RAILWAY
// Ejemplo: const BACKEND_URL = "https://backend-login-production.up.railway.app";
const BACKEND_URL = "https://backend-production-d336.up.railway.app";

const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const loginButton = document.getElementById("login-button");

// Si quisieras usar token luego:
let authToken = null;

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  loginMessage.textContent = "";
  loginMessage.className = "message";

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    loginMessage.textContent = "Completa email y contraseña.";
    loginMessage.classList.add("error");
    return;
  }

  // Estado de "cargando"
  loginButton.disabled = true;
  const originalText = loginButton.textContent;
  loginButton.textContent = "Autenticando...";

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
    } else {
      loginMessage.textContent = data.message || "Login exitoso";
      loginMessage.classList.add("success");

      // Guardar token (podrías usar localStorage si querés persistirlo)
      authToken = data.token;
      console.log("Token recibido:", authToken);

      // Ejemplo: podrías redirigir a otra página
      // window.location.href = "/dashboard.html";
    }
  } catch (error) {
    console.error("Error en fetch /login:", error);
    loginMessage.textContent = "Error de conexión con el servidor";
    loginMessage.classList.add("error");
  } finally {
    // Restaurar botón
    loginButton.disabled = false;
    loginButton.textContent = originalText;
  }
});
