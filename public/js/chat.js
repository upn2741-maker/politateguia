// Chat "Pregúntale a Polita".
// Por defecto responde con la base de preguntas (preguntas.js + motor.js): gratis y sin internet.
// Si algún día tienen créditos de la API de Anthropic, cambien USAR_IA a true y
// sigan los pasos de opcional-ia/LEEME.md; entonces Polita responde con IA.
import { capitulos } from "./contenido.js";
import { responder, preguntasDelCapitulo } from "./motor.js";
import { botonEscuchar } from "./voz.js";

const USAR_IA = false;

const chat = document.getElementById("chat");
const formulario = document.getElementById("formulario");
const campo = document.getElementById("pregunta");
const enviar = document.getElementById("enviar");
const sugerencias = document.getElementById("sugerencias");

const idCapitulo = Number(new URLSearchParams(location.search).get("capitulo")) || 0;
const capitulo = capitulos.find((c) => c.id === idCapitulo);
const historial = []; // solo se usa con IA
let ocupado = false;

// Convierte el texto en HTML seguro: párrafos, listas con "- " y **negritas**.
function formatear(texto) {
  const escapar = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  let html = "";
  let enLista = false;
  for (const linea of texto.split("\n")) {
    const item = linea.match(/^\s*[-•*]\s+(.*)/);
    if (item) {
      if (!enLista) { html += "<ul>"; enLista = true; }
      html += `<li>${escapar(item[1])}</li>`;
      continue;
    }
    if (enLista) { html += "</ul>"; enLista = false; }
    if (linea.trim()) html += `<p>${escapar(linea)}</p>`;
  }
  return html + (enLista ? "</ul>" : "");
}

function agregarMensaje(rol, texto = "") {
  const fila = document.createElement("div");
  fila.className = `mensaje ${rol === "user" ? "usuario" : "polita"}`;
  const contenido = document.createElement("div");
  contenido.className = "contenido";
  if (rol === "user") {
    contenido.textContent = texto;
    fila.append(contenido);
  } else {
    const avatar = document.createElement("span");
    avatar.className = "avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.innerHTML = `<img src="/img/polita-cara.jpg" alt="">`;
    contenido.innerHTML = formatear(texto);
    fila.append(avatar, contenido);
  }
  chat.append(fila);
  fila.scrollIntoView({ behavior: "smooth", block: "end" });
  return contenido;
}

function agregarEscuchar(contenido, texto) {
  const herramientas = document.createElement("div");
  herramientas.className = "herramientas";
  herramientas.append(botonEscuchar(() => texto));
  contenido.append(herramientas);
}

// Botones con preguntas; al tocarlos, Polita responde esa pregunta directamente.
function botonesPreguntas(lista, titulo) {
  const caja = document.createElement("div");
  if (titulo) {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${titulo}</strong>`;
    caja.append(p);
  }
  const fila = document.createElement("div");
  fila.className = "sugerencias";
  for (const q of lista) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = q.p;
    b.addEventListener("click", () => preguntarDirecto(q));
    fila.append(b);
  }
  caja.append(fila);
  return caja;
}

function enlaceCapitulo(c) {
  const cap = capitulos.find((x) => x.id === c);
  if (!cap) return null;
  const p = document.createElement("p");
  p.innerHTML = `📖 <a href="/capitulo?id=${cap.id}">Lee más en el capítulo ${cap.id}: ${cap.titulo}</a>`;
  return p;
}

const pausa = (ms) => new Promise((r) => setTimeout(r, ms));

async function mostrarRespuesta(resultado) {
  const burbuja = agregarMensaje("assistant");
  burbuja.classList.add("escribiendo");
  await pausa(500 + Math.min(resultado.texto.length * 3, 700)); // Polita "escribe"
  burbuja.classList.remove("escribiendo");
  burbuja.innerHTML = formatear(resultado.texto);

  const extra = [];
  if (resultado.tipo === "respuesta") {
    extra.push(enlaceCapitulo(resultado.pregunta.c));
    if (resultado.sugerencias.length) extra.push(botonesPreguntas(resultado.sugerencias, "También te puede servir:"));
  } else if (resultado.sugerencias.length) {
    extra.push(botonesPreguntas(resultado.sugerencias));
  }
  burbuja.append(...extra.filter(Boolean));
  agregarEscuchar(burbuja, resultado.texto);
  burbuja.closest(".mensaje").scrollIntoView({ behavior: "smooth", block: "start" });
}

function empezar(texto) {
  if (ocupado) return false;
  ocupado = true;
  enviar.disabled = true;
  campo.value = "";
  agregarMensaje("user", texto);
  return true;
}

function terminar() {
  ocupado = false;
  enviar.disabled = false;
  campo.focus();
}

// La persona tocó una pregunta sugerida: se responde exactamente esa.
async function preguntarDirecto(q) {
  if (USAR_IA) return preguntar(q.p);
  if (!empezar(q.p)) return;
  const otras = preguntasDelCapitulo(q.c).filter((x) => x !== q).slice(0, 2);
  await mostrarRespuesta({ tipo: "respuesta", texto: q.r, pregunta: q, sugerencias: otras });
  terminar();
}

async function preguntar(texto) {
  texto = texto.trim();
  if (!texto || !empezar(texto)) return;
  if (USAR_IA) await preguntarIA(texto);
  else await mostrarRespuesta(responder(texto, idCapitulo));
  terminar();
}

// ── Modo IA (opcional): requiere créditos de la API y la llave configurada ──
async function preguntarIA(texto) {
  historial.push({ role: "user", content: texto });
  const burbuja = agregarMensaje("assistant");
  burbuja.classList.add("escribiendo");
  let respuesta = "";
  try {
    const r = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensajes: historial }),
    });
    const lector = r.body.getReader();
    const decoder = new TextDecoder();
    for (;;) {
      const { value, done } = await lector.read();
      if (done) break;
      respuesta += decoder.decode(value, { stream: true });
      burbuja.classList.remove("escribiendo");
      burbuja.innerHTML = formatear(respuesta);
    }
    if (r.ok) historial.push({ role: "assistant", content: respuesta });
    else historial.pop();
  } catch {
    respuesta = "No me pude conectar. Revisa tu internet e intenta otra vez.";
    historial.pop();
  }
  burbuja.classList.remove("escribiendo");
  burbuja.innerHTML = formatear(respuesta);
  agregarEscuchar(burbuja, respuesta);
}

// ── Inicio ──
const iniciales = preguntasDelCapitulo(idCapitulo).slice(0, idCapitulo ? 4 : 6);
sugerencias.replaceWith(botonesPreguntas(iniciales));

const saludo = capitulo
  ? `¡Hola! Soy Polita. 😊\nVeo que estás leyendo el capítulo "${capitulo.titulo}".\n¿Qué quieres saber?`
  : "¡Hola! Soy Polita. 😊\nPregúntame lo que quieras sobre tus derechos en el trabajo.\nTe respondo con palabras fáciles.";
agregarEscuchar(agregarMensaje("assistant", saludo), saludo);

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  preguntar(campo.value);
});

// Enter envía; Shift + Enter hace un salto de línea.
campo.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    preguntar(campo.value);
  }
});
