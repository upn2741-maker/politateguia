// "Pregúntale a Polita": recibe la conversación, llama a Claude y devuelve
// la respuesta en lectura fácil, palabra por palabra (streaming).
// La API key vive aquí como secreto de Cloudflare; el navegador nunca la ve.
import Anthropic from "@anthropic-ai/sdk";
import { capitulos, capituloATexto } from "../../../public/js/contenido.js";

const MODELO_POR_DEFECTO = "claude-haiku-5-5";
const MAX_MENSAJES = 12; // últimos mensajes de la conversación que se envían
const MAX_CARACTERES = 500; // largo máximo de cada pregunta
const LIMITE_POR_IP = 20; // preguntas por persona...
const VENTANA_MS = 10 * 60 * 1000; // ...cada 10 minutos

const SISTEMA = `Eres Polita, la guía del sitio "Polita Te Guía". Ayudas a los amigos del alma de Best Buddies Colombia (personas con discapacidad intelectual) a entender sus derechos en el trabajo en Colombia.

Cómo debes escribir (lectura fácil):
- Frases cortas. Una idea por frase.
- Palabras sencillas y de uso diario. Si usas una palabra difícil (como "ARL" o "liquidación"), explícala en la misma respuesta.
- Respuestas cortas: entre 2 y 6 frases. Si hay pasos, usa una lista con "- " al inicio de cada paso.
- Habla de "tú", con un tono cálido, alegre y respetuoso. Nunca infantil.
- Cuando ayude, da un ejemplo de la vida diaria en el trabajo.
- No uses tablas, títulos ni otros formatos. Solo texto y listas con "- ".

Qué puedes responder:
- Responde SOLO con la información de los capítulos que están abajo.
- Si la pregunta no está en los capítulos, o es un caso personal que necesita un experto (por ejemplo, cuánto dinero le deben a la persona), dilo con amabilidad y recomienda preguntar a su jefe, a la oficina de recursos humanos, a su familia o a Best Buddies.
- Si la pregunta no tiene que ver con el trabajo, recuerda con amabilidad que tu tema son los derechos en el trabajo.
- Al final de la respuesta, si aplica, di en qué capítulo puede leer más. Ejemplo: "Puedes leer más en el capítulo 5: Estoy protegido en el trabajo."
- Nunca inventes cifras, fechas ni nombres de entidades.

Contenido de los capítulos:

${capitulos.map(capituloATexto).join("\n\n")}`;

// Límite sencillo por persona. Vive en la memoria de cada servidor de Cloudflare,
// así que es aproximado; el tope real de gasto se pone en la consola de Anthropic.
const visitas = new Map();
function superaLimite(ip) {
  const ahora = Date.now();
  const recientes = (visitas.get(ip) || []).filter((t) => ahora - t < VENTANA_MS);
  recientes.push(ahora);
  visitas.set(ip, recientes);
  return recientes.length > LIMITE_POR_IP;
}

function respuestaTexto(texto, status) {
  return new Response(texto, { status, headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

function validarMensajes(mensajes) {
  if (!Array.isArray(mensajes) || mensajes.length === 0) return null;
  const limpios = mensajes.slice(-MAX_MENSAJES).map((m) => ({
    role: m?.role === "assistant" ? "assistant" : "user",
    content: String(m?.content ?? "").slice(0, m?.role === "assistant" ? 4000 : MAX_CARACTERES),
  }));
  // La conversación debe empezar y terminar con un mensaje del usuario.
  while (limpios.length && limpios[0].role !== "user") limpios.shift();
  if (!limpios.length || limpios.at(-1).role !== "user" || !limpios.at(-1).content.trim()) return null;
  return limpios;
}

export async function onRequestPost({ request, env }) {
  if (!env.ANTHROPIC_API_KEY) {
    return respuestaTexto("Polita no está disponible en este momento. Falta configurar la llave del asistente.", 500);
  }

  const ip = request.headers.get("CF-Connecting-IP") || "local";
  if (superaLimite(ip)) {
    return respuestaTexto("Hiciste muchas preguntas seguidas. Descansa un momento y vuelve a preguntar en unos minutos. 😊", 429);
  }

  let cuerpo;
  try {
    cuerpo = await request.json();
  } catch {
    return respuestaTexto("No entendí el mensaje. Intenta otra vez.", 400);
  }
  const mensajes = validarMensajes(cuerpo?.mensajes);
  if (!mensajes) return respuestaTexto("No entendí el mensaje. Intenta otra vez.", 400);

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  const encoder = new TextEncoder();

  const salida = new ReadableStream({
    async start(controller) {
      try {
        const stream = client.messages.stream({
          model: env.MODELO || MODELO_POR_DEFECTO,
          max_tokens: 2048, // respuestas cortas a propósito (lectura fácil)
          output_config: { effort: "low" }, // chat sencillo: rápido y económico
          system: [{ type: "text", text: SISTEMA, cache_control: { type: "ephemeral" } }],
          messages: mensajes,
        });

        for await (const evento of stream) {
          if (evento.type === "content_block_delta" && evento.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(evento.delta.text));
          }
        }

        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(encoder.encode("\n\nNo puedo responder esa pregunta. Pregúntame sobre tus derechos en el trabajo."));
        }
      } catch (err) {
        console.error("Error al llamar a Claude:", err);
        const msg =
          err instanceof Anthropic.RateLimitError
            ? "Polita está atendiendo a muchas personas. Intenta otra vez en un minuto."
            : "Polita tuvo un problema para responder. Intenta otra vez.";
        controller.enqueue(encoder.encode(msg));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(salida, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
