const LICENCIAS = {
  "ALITAS-2024-AAAA-1111": {
    email: "cliente1@correo.com",
    activa: true,
    vence: "2026-12-31"
  },
  "ALITAS-2024-BBBB-2222": {
    email: "cliente2@correo.com",
    activa: false  // ← suspendida, no puede entrar
  },
};

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { key, email } = req.body;
  const licencia = LICENCIAS[key];

  if (!licencia)
    return res.json({ valid: false, reason: "Licencia no encontrada" });

  if (!licencia.activa)
    return res.json({ valid: false, reason: "Suscripción suspendida. Contacta a tu proveedor." });

  if (licencia.email !== email)
    return res.json({ valid: false, reason: "El correo no coincide con la licencia" });

  if (new Date(licencia.vence) < new Date())
    return res.json({ valid: false, reason: "Tu suscripción ha vencido. Renueva tu plan." });

  return res.json({ valid: true, message: "Licencia activa" });
}
```

---

### Paso 4 — Sube el proyecto a GitHub

1. Ve a **github.com/new** y crea un repositorio llamado `alitas-licencias`
2. Sube los archivos (puedes arrastrarlos directo en la web de GitHub)

---

### Paso 5 — Despliega en Vercel

1. Ve a **vercel.com/new**
2. Conecta tu cuenta de GitHub
3. Selecciona el repositorio `alitas-licencias`
4. Clic en **Deploy** — Vercel lo publica automáticamente

Vercel te dará una URL como:
```
https://alitas-licencias.vercel.app