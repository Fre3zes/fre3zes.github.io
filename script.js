(function() {
    // 1. ПРОВЕРКА ДОМЕНА
    if (!window.location.hostname.includes("fre3zes.space") && window.location.hostname !== "localhost") {
        document.body.innerHTML = "<h1 style='color:white;text-align:center;margin-top:20%'>Доступ запрещен. Оригинал на golden-naiad-23a3e4.netlify.app</h1>";
        return;
    }
    if(window.top !== window.self){ window.top.location = window.self.location; }

    // 2. ИНЪЕКЦИЯ СТИЛЕЙ
    const style = document.createElement('style');
    style.textContent = `
        :root { --accent: #fff; --spotify: #1DB954; --ease: cubic-bezier(0.34, 1.56, 0.64, 1); }
        * { margin: 0; padding: 0; box-sizing: border-box; user-select: none !important; -webkit-user-select: none !important; cursor: none !important; }
        body { background: #040404; color: #eaeaea; font-family: 'Segoe UI', Roboto, sans-serif; overflow: hidden; height: 100vh; }
        #bg-canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; }
        #cur-dot, #cur-ring { position: fixed; pointer-events: none; border-radius: 50%; z-index: 9999; will-change: transform; }
        #cur-dot { width: 6px; height: 6px; background: #fff; }
        #cur-ring { width: 30px; height: 30px; border: 1px solid rgba(255, 255, 255, .3); transition: width 0.3s var(--ease), height 0.3s var(--ease), border-color 0.3s var(--ease); }
        body.hovering #cur-ring { width: 60px; height: 60px; border-color: var(--accent); background: rgba(255, 255, 255, 0.05); }
        body.hovering #cur-dot { opacity: 0; }
        .container { height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; z-index: 10; }
        .card { position: relative; width: 380px; background: rgba(15, 15, 15, .8); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255, 0.08); padding: 40px 30px; text-align: center; border-radius: 28px; box-shadow: 0 20px 50px rgba(0, 0, 0, .8); z-index: 10; }
        .avatar-wrapper { width: 100px; height: 100px; margin: 0 auto 20px; position: relative; border-radius: 50%; outline: 4px solid rgba(255, 255, 255, 0.1); overflow: hidden; background: #111; }
        .avatar { position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px; background-size: cover !important; background-position: center !important; }
        h1 { font-size: 24px; margin-bottom: 8px; font-weight: 600; }
        .status { font-size: 13px; color: #bbb; margin-bottom: 30px; display: flex; align-items: center; justify-content: center; gap: 8px; min-height: 24px; }
        .status-dot { width: 9px; height: 9px; border-radius: 50%; }
        .online { background: #23a55a; box-shadow: 0 0 10px rgba(35, 165, 90, 0.6); }
        .idle { background: #f0b232; }
        .dnd { background: #f23f43; }
        .offline { background: #80848e; }
        .spotify-box { display: flex; align-items: center; gap: 8px; color: var(--spotify); font-weight: 500; }
        .spotify-box i { font-size: 16px; animation: spotify-pulse 2s infinite; }
        @keyframes spotify-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        .links { display: flex; flex-direction: column; gap: 12px; position: relative; z-index: 20; }
        .link { width: 100%; padding: 18px 22px; border-radius: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); text-decoration: none; color: #999; font-size: 15px; display: flex; align-items: center; gap: 15px; transition: background 0.35s var(--ease), color 0.35s var(--ease), border-color 0.35s var(--ease), transform 0.4s var(--ease), box-shadow 0.35s var(--ease); position: relative; overflow: hidden; }
        .link::before { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0) 100%); transform: translateX(-100%); transition: transform 0.5s ease; }
        .link:hover::before { transform: translateX(100%); }
        .link:hover { background: rgba(220,220,220,0.13); color: #ddd; border-color: rgba(255,255,255,0.18); transform: translateY(-4px) scale(1.02); box-shadow: 0 12px 32px rgba(0,0,0,0.5); }
        .link:active { transform: translateY(-2px) scale(0.99); transition-duration: 0.1s; }
        .link i { transition: transform 0.4s var(--ease); }
        .link:hover i { transform: scale(1.2) rotate(-5deg); }
        .cat { position: fixed; width: 100px; height: 70px; background: url('https://media.tenor.com/9Xn1H6GJvQ0AAAAi/nyan-cat-run.gif') no-repeat center/contain; pointer-events: none; z-index: 1; }
        /* SECRET EASTER EGG */
        #secret-overlay { position: fixed; inset: 0; z-index: 9990; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0); pointer-events: none; transition: background 0.5s ease; }
        #secret-overlay.active { background: rgba(0,0,0,0.7); pointer-events: all; }
        #secret-box { background: rgba(15,15,15,0.95); border: 1px solid rgba(255,255,255,0.12); border-radius: 24px; padding: 40px 36px; text-align: center; max-width: 320px; width: 90%; transform: scale(0.6) translateY(40px); opacity: 0; transition: transform 0.5s var(--ease), opacity 0.4s ease; }
        #secret-overlay.active #secret-box { transform: scale(1) translateY(0); opacity: 1; }
        #secret-box h2 { font-size: 22px; margin-bottom: 8px; color: #fff; }
        #secret-box p { font-size: 14px; color: #888; margin-bottom: 24px; line-height: 1.6; }
        #secret-close { display: inline-block; padding: 12px 28px; border-radius: 12px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); color: #ccc; font-size: 14px; cursor: none; transition: background 0.3s ease, color 0.3s ease; }
        #secret-close:hover { background: #fff; color: #000; }
        #secret-emoji { font-size: 48px; margin-bottom: 16px; display: block; animation: spin-emoji 1s var(--ease); }
        @keyframes spin-emoji { 0% { transform: scale(0) rotate(-180deg); } 100% { transform: scale(1) rotate(0deg); } }

    `;
    document.head.appendChild(style);

    // 3. ГЕНЕРАЦИЯ HTML-СТРУКТУРЫ
    const content = `
        <canvas id="bg-canvas"></canvas>
        <div id="cur-dot"></div>
        <div id="cur-ring"></div>
        <div class="cat" id="cat"></div>
        <div id="secret-overlay">
            <div id="secret-box">
                <span id="secret-emoji">👾</span>
                <h2>ты нашёл секрет</h2>
                <p>не многие знают этот код.</p>
                <div id="secret-close">закрыть</div>
            </div>
        </div>
        <div id="konami-hint"></div>
        <div class="container">
            <div class="card">
                <div class="avatar-wrapper"><div class="avatar" id="userAvatar"></div></div>
                <h1>fre3zes</h1>
                <div id="discordStatus" class="status">...</div>
                <div class="links">
                    <div class="link" data-url="https://discord.com/users/632495909409783829"><i class="fa-brands fa-discord"></i><span>Discord</span></div>
                    <div class="link" data-url="https://t.me/MyBigFame"><i class="fa-brands fa-telegram"></i><span>Telegram</span></div>
                    <div class="link" data-url="https://youtube.com/@fre3zes"><i class="fa-brands fa-youtube"></i><span>YouTube</span></div>
                    <div class="link" data-url="https://open.spotify.com/user/317kmfqkqfuo6tkjd7no7blce7i4?si=ee1ee423bf5f47f4"><i class="fa-brands fa-spotify"></i><span>Spotify</span></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', content);

    // 4. ЗАЩИТА КОНСОЛИ
    setInterval(() => { console.clear(); console.log("%cSTOP!", "color:red;font-size:40px;font-weight:bold;"); }, 100);

    // 4b. СЕКРЕТНЫЙ КОД: fre3zes
    const SECRET = 'fre3zes';
    let secretBuffer = '';
    let hintTimer = null;
    const hint = document.getElementById('konami-hint');

    document.addEventListener('keydown', e => {
        if ((e.ctrlKey && [67, 86, 85, 83, 73, 74].includes(e.keyCode)) || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }

        if (e.key.length === 1) {
            secretBuffer = (secretBuffer + e.key).slice(-SECRET.length);

            // Flash hint
            hint.classList.add('flash');
            clearTimeout(hintTimer);
            hintTimer = setTimeout(() => hint.classList.remove('flash'), 600);

            if (secretBuffer === SECRET) {
                secretBuffer = '';
                const overlay = document.getElementById('secret-overlay');
                overlay.classList.add('active');
                // Restart emoji animation
                const emoji = document.getElementById('secret-emoji');
                emoji.style.animation = 'none';
                emoji.offsetHeight;
                emoji.style.animation = 'spin-emoji 1s var(--ease)';
            }
        }
    });

    document.getElementById('secret-close').addEventListener('click', () => {
        document.getElementById('secret-overlay').classList.remove('active');
    });
    document.getElementById('secret-overlay').addEventListener('click', e => {
        if (e.target === document.getElementById('secret-overlay'))
            document.getElementById('secret-overlay').classList.remove('active');
    });

    // 5. КАСТОМНЫЙ КУРСОР
    const dot = document.getElementById('cur-dot'), ring = document.getElementById('cur-ring');
    let mx = -100, my = -100, rx = -100, ry = -100, dx = -100, dy = -100;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    function render() {
        dx += (mx - dx) * 0.4; dy += (my - dy) * 0.4;
        rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
        dot.style.transform = `translate3d(${dx}px,${dy}px,0) translate(-50%,-50%)`;
        ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
        requestAnimationFrame(render);
    }
    render();
    document.querySelectorAll('.link').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        el.addEventListener('click', () => { const u = el.dataset.url; if (u) window.open(u, '_blank'); });
    });

    // 6. ИНТЕРАКТИВНЫЙ ФОН — ЧАСТИЦЫ
    (function initParticles() {
        const canvas = document.getElementById('bg-canvas');
        const ctx = canvas.getContext('2d');
        let W = canvas.width = window.innerWidth;
        let H = canvas.height = window.innerHeight;
        let mouse = { x: W / 2, y: H / 2 };

        window.addEventListener('resize', () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        });

        document.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        const COUNT = 90;
        const CONNECT_DIST = 140;
        const MOUSE_DIST = 120;
        const MOUSE_FORCE = 0.025;

        const particles = Array.from({ length: COUNT }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.5 + 0.2
        }));

        function drawFrame() {
            ctx.clearRect(0, 0, W, H);

            // Radial vignette
            const grad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W, H) * 0.75);
            grad.addColorStop(0, 'rgba(17,17,17,0.0)');
            grad.addColorStop(1, 'rgba(4,4,4,0.85)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, W, H);

            for (let i = 0; i < COUNT; i++) {
                const p = particles[i];

                // Mouse repulsion
                const mdx = p.x - mouse.x;
                const mdy = p.y - mouse.y;
                const md = Math.sqrt(mdx * mdx + mdy * mdy);
                if (md < MOUSE_DIST && md > 0) {
                    const force = (MOUSE_DIST - md) / MOUSE_DIST;
                    p.vx += (mdx / md) * force * MOUSE_FORCE * 8;
                    p.vy += (mdy / md) * force * MOUSE_FORCE * 8;
                }

                // Drift
                p.vx *= 0.98;
                p.vy *= 0.98;
                p.x += p.vx;
                p.y += p.vy;

                // Wrap edges
                if (p.x < 0) p.x = W;
                if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H;
                if (p.y > H) p.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < COUNT; j++) {
                    const q = particles[j];
                    const dx = p.x - q.x;
                    const dy = p.y - q.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECT_DIST) {
                        const opacity = (1 - dist / CONNECT_DIST) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }

                // Mouse connection glow
                if (md < MOUSE_DIST * 1.5) {
                    const opacity = (1 - md / (MOUSE_DIST * 1.5)) * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            requestAnimationFrame(drawFrame);
        }

        drawFrame();
    })();

    // 7. LANYARD API (DISCORD STATUS)
    async function loadDiscord() {
        const sEl = document.getElementById('discordStatus'), aEl = document.getElementById('userAvatar'), uid = "632495909409783829";
        try {
            const r = await fetch(`https://api.lanyard.rest/v1/users/${uid}`), j = await r.json();
            if (!j.success) return;
            const d = j.data;
            if (d.discord_user.avatar) aEl.style.background = `url(https://cdn.discordapp.com/avatars/${uid}/${d.discord_user.avatar}.png?size=256) center/cover`;
            if (d.listening_to_spotify && d.spotify) {
                sEl.innerHTML = `<div class="spotify-box"><i class="fa-brands fa-spotify"></i><span>Spotify: ${d.spotify.song}</span></div>`;
            } else {
                const s = d.discord_status;
                sEl.innerHTML = `<span class="status-dot ${s}"></span><span>${s}</span>`;
            }
        } catch (e) { sEl.innerText = "offline"; }
    }
    loadDiscord();
    setInterval(loadDiscord, 10000);
})();
