// Lectura en voz alta con la voz del navegador (gratis, sin servicios externos).

let botonActivo = null;

function elegirVoz() {
  const voces = speechSynthesis.getVoices().filter((v) => v.lang.startsWith("es"));
  return (
    voces.find((v) => v.lang === "es-CO") ||
    voces.find((v) => v.lang === "es-US" || v.lang === "es-MX") ||
    voces[0] ||
    null
  );
}

// Quita símbolos que no se deben leer (viñetas, emojis, asteriscos).
function limpiar(texto) {
  return texto
    .replace(/\*\*/g, "")
    .replace(/^\s*[-•]\s*/gm, "")
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "");
}

function marcar(boton, activo) {
  if (!boton) return;
  boton.setAttribute("aria-pressed", activo ? "true" : "false");
  boton.textContent = activo ? "⏹ Parar" : boton.dataset.etiqueta;
}

export function vozDisponible() {
  return "speechSynthesis" in window;
}

// Lee el texto. Si el mismo botón se presiona otra vez, para la lectura.
export function leer(texto, boton) {
  if (!vozDisponible()) return;
  const eraElMismo = botonActivo === boton && speechSynthesis.speaking;
  speechSynthesis.cancel();
  marcar(botonActivo, false);
  botonActivo = null;
  if (eraElMismo) return;

  const frase = new SpeechSynthesisUtterance(limpiar(texto));
  frase.lang = "es-CO";
  frase.rate = 0.9; // un poco más despacio para entender mejor
  const voz = elegirVoz();
  if (voz) frase.voice = voz;
  frase.onend = frase.onerror = () => {
    if (botonActivo === boton) {
      marcar(boton, false);
      botonActivo = null;
    }
  };
  botonActivo = boton;
  marcar(boton, true);
  speechSynthesis.speak(frase);
}

// Crea un botón "🔊 Escuchar" que lee lo que devuelva obtenerTexto().
export function botonEscuchar(obtenerTexto, etiqueta = "🔊 Escuchar") {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "boton secundario pequeno";
  boton.dataset.etiqueta = etiqueta;
  boton.textContent = etiqueta;
  boton.setAttribute("aria-pressed", "false");
  boton.addEventListener("click", () => leer(obtenerTexto(), boton));
  if (!vozDisponible()) boton.hidden = true;
  return boton;
}

if (vozDisponible()) speechSynthesis.getVoices(); // precarga las voces
