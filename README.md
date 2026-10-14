# Polita Te Guía

**Tus derechos en el trabajo, fáciles de entender.**

Sitio web para los amigos del alma de Best Buddies Colombia, con 9 capítulos en lectura fácil, lectura en voz alta, videos de Polita, un quiz y el asistente de IA **"Pregúntale a Polita"**.

Universidad Pedagógica Nacional · Licenciatura en Educación Especial

## Cómo está hecho

```
PolitaGuia/
├── public/                  ← la página web (lo que ven los usuarios)
│   ├── index.html           ← inicio y bienvenida de Polita
│   ├── capitulos.html       ← lista de los 9 capítulos
│   ├── capitulo.html        ← muestra un capítulo (capitulo?id=1 … 9)
│   ├── chat.html            ← "Pregúntale a Polita"
│   ├── preguntas.html       ← todas las preguntas y respuestas (preguntas frecuentes)
│   ├── quiz.html            ← quiz final (pendiente de agregar)
│   ├── css/estilos.css
│   └── js/
│       ├── contenido.js     ← ⭐ TODO el texto de los capítulos (editar aquí)
│       ├── capitulo.js
│       ├── preguntas.js     ← ⭐ base de conocimiento de Polita (preguntas y respuestas)
│       ├── motor.js         ← busca la pregunta más parecida (entiende errores y sinónimos)
│       ├── chat.js
│       └── voz.js           ← lectura en voz alta (gratis, voz del navegador)
├── functions/api/chat.js    ← (opcional) modo IA: llama a Claude con la API key secreta
├── wrangler.toml            ← configuración de Cloudflare Pages
└── .dev.vars.example        ← ejemplo para guardar la API key en tu computador
```

- **Hosting:** Cloudflare Pages (gratis) + Pages Functions para el chat.
- **Asistente:** responde desde la base de preguntas de `preguntas.js`. **Es gratis y no necesita API.** Entiende errores de escritura ("alr" → ARL), palabras coloquiales ("plata", "me echaron", "camello") y, si no está segura, sugiere preguntas parecidas.
- **Modo IA (opcional):** si algún día tienen créditos de la API de Anthropic, se activa con `USAR_IA = true` en `public/js/chat.js` (usa Claude Haiku 5.5).
- **Audio:** la voz del navegador (Web Speech API). No cuesta nada.

## Mejorar las respuestas de Polita

Todo está en `public/js/preguntas.js`. Cada pregunta es un bloque así:

```js
{
  c: 5,                                  // capítulo (0 = general)
  p: "¿Qué es la ARL?",                  // pregunta principal
  v: ["para que sirve la arl", "..."],   // otras formas de preguntarlo
  k: ["arl", "riesgo"],                  // palabras clave
  r: "ARL significa...
La ARL te...",   // respuesta (
 = nueva línea, "- " = lista)
},
```

- **Si Polita no entiende una pregunta**, agrega esa frase a `v` de la pregunta correcta.
- **Si la pregunta es nueva**, copia un bloque, cámbialo y guarda.
- **Si una palabra coloquial no la entiende**, agrégala a `SINONIMOS` en `public/js/motor.js`.
- **Para revisar todas las respuestas**, abre `/preguntas?revisar=1`. Las marcadas con *revisar: info general* usan información que no está en el documento original (por ejemplo, días de vacaciones o fechas de la prima): confírmenlas con una fuente oficial.
- Una buena práctica: pídanle a varios amigos del alma que escriban preguntas como ellos las harían, y agreguen esas frases a `v`.

## Tareas frecuentes

| Quiero… | Qué hacer |
|---|---|
| Cambiar el texto de un capítulo | Editar `public/js/contenido.js`. El asistente usa el mismo texto automáticamente. |
| Poner el video de un capítulo | Subir el video a YouTube como **no listado** y copiar su ID (lo que va después de `v=`) en `video.youtubeId` del capítulo en `contenido.js`. |
| Poner el video de bienvenida | Pegar el ID en `VIDEO_BIENVENIDA` dentro de `public/index.html`. |
| Agregar el quiz | Copiar `mis-derechos-en-el-trabajo.html` a `public/` y enlazarlo desde `public/quiz.html`. |
| Cambiar la imagen de Polita | Reemplazar `public/img/polita.jpg` (imagen completa) y `public/img/polita-cara.jpg` (cara, cuadrada) con el mismo nombre. |
| Activar el modo IA | Comprar créditos en console.anthropic.com, configurar la llave y poner `USAR_IA = true` en `public/js/chat.js`. |

## Probar en tu computador

Necesitas [Node.js](https://nodejs.org) instalado.

1. Instalar dependencias (solo la primera vez):
   ```bash
   npm install
   ```
2. Iniciar el sitio:
   ```bash
   npm run dev
   ```
3. Abrir http://localhost:8788

## Publicar en internet (politateguia.pages.dev)

> Como Polita funciona sin IA, también puedes publicar arrastrando la carpeta `public` en el panel de Cloudflare (Workers & Pages → Create → Pages → Upload assets). Los comandos de abajo sirven igual y además dejan listo el modo IA para el futuro.

1. Crear una cuenta gratis en https://dash.cloudflare.com (con el correo del proyecto).
2. Iniciar sesión desde la terminal:
   ```bash
   npx wrangler login
   ```
3. Crear el proyecto (solo la primera vez). Si el nombre `politateguia` ya está ocupado, usa otro, por ejemplo `polita-te-guia`, y cámbialo también en `wrangler.toml`:
   ```bash
   npx wrangler pages project create politateguia --production-branch main
   ```
4. Publicar (cada vez que hagas cambios):
   ```bash
   npm run deploy
   ```

## Costos

Con el modo sin IA (el que está activo), **todo es gratis**: Cloudflare Pages, la voz del navegador y las respuestas de Polita.

Si activan el modo IA: pongan un **límite de gasto mensual** en console.anthropic.com. El chat ya limita a cada persona a 20 preguntas cada 10 minutos.

## Antes de publicar: revisar el contenido

- **Capítulo 7 (pensión):** en Colombia hubo una reforma pensional (Ley 2381 de 2024). Revisen con una fuente oficial que las edades y semanas sigan vigentes, porque Polita repite lo que dice `contenido.js`.
- Pidan a algunos amigos del alma que prueben la página y el chat antes de enviarles el enlace a todos.
