# Modo IA (opcional, desactivado)

Aquí está guardado el código para que Polita responda con IA (Claude) en lugar de la base de preguntas.
Está fuera del sitio para que Cloudflare no lo publique mientras no se use.

Para activarlo en el futuro:

1. Comprar créditos de la API en https://console.anthropic.com (el plan Pro de Claude no los incluye).
2. Mover la carpeta `opcional-ia/functions` a la raíz del proyecto (`PolitaGuia/functions`)
   y en `functions/api/chat.js` cambiar la ruta `../../../public/js/contenido.js` por `../../public/js/contenido.js`.
3. En Cloudflare → proyecto → Settings → Build: poner **Build command** = `npm install`.
4. En Cloudflare → Settings → Variables and Secrets: agregar el secreto `ANTHROPIC_API_KEY`.
5. En `public/js/chat.js` cambiar `USAR_IA = false` por `USAR_IA = true`.
6. Subir los cambios con `git push`.
