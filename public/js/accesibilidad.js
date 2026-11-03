// Barra de accesibilidad: tamaño de letra, alto contraste y espaciado para leer mejor.
// Se carga en todas las páginas y recuerda la elección de cada persona en su navegador.

const LLAVE = "polita-accesibilidad";
const ESCALAS = [0.9, 1, 1.15, 1.3, 1.5]; // 90 %, 100 %, 115 %, 130 %, 150 %
const INICIAL = { escala: 1, contraste: false, espaciado: false };

const raiz = document.documentElement;
let estado = { ...INICIAL };

function cargar() {
  try {
    const guardado = JSON.parse(localStorage.getItem(LLAVE));
    if (guardado && typeof guardado === "object") estado = { ...INICIAL, ...guardado };
    if (!Number.isInteger(estado.escala) || estado.escala < 0 || estado.escala >= ESCALAS.length) estado.escala = 1;
  } catch {
    /* sin almacenamiento: funciona igual, solo no se recuerda */
  }
}

function guardar() {
  try {
    localStorage.setItem(LLAVE, JSON.stringify(estado));
  } catch {
    /* nada */
  }
}

function aplicar() {
  raiz.style.setProperty("--escala", ESCALAS[estado.escala]);
  raiz.classList.toggle("alto-contraste", estado.contraste);
  raiz.classList.toggle("lectura-amplia", estado.espaciado);
}

cargar();
aplicar(); // se aplica de una vez para que no parpadee

function el(etiqueta, props = {}, ...hijos) {
  const nodo = Object.assign(document.createElement(etiqueta), props);
  nodo.append(...hijos.filter(Boolean));
  return nodo;
}

function construir() {
  const estadoLetra = el("span", { className: "acc-estado" });
  estadoLetra.setAttribute("aria-live", "polite");

  const boton = (icono, texto, alHacerClic, extra = {}) => {
    const b = el(
      "button",
      { type: "button", className: "acc-boton", ...extra },
      el("span", { className: "acc-icono", ariaHidden: "true", textContent: icono }),
      el("span", { textContent: texto })
    );
    b.addEventListener("click", alHacerClic);
    return b;
  };

  const menos = boton("A−", "Letra más pequeña", () => cambiarEscala(-1));
  const mas = boton("A+", "Letra más grande", () => cambiarEscala(+1));
  const contraste = boton("🌓", "Colores con más contraste", () => {
    estado.contraste = !estado.contraste;
    refrescar();
  });
  const espaciado = boton("↕️", "Más espacio entre letras y líneas", () => {
    estado.espaciado = !estado.espaciado;
    refrescar();
  });
  const reiniciar = boton("↺", "Volver a como estaba", () => {
    estado = { ...INICIAL };
    refrescar();
  });
  contraste.setAttribute("aria-pressed", "false");
  espaciado.setAttribute("aria-pressed", "false");

  const panel = el(
    "div",
    { className: "acc-panel", id: "acc-panel", hidden: true },
    el("p", { className: "acc-titulo", textContent: "Leer más fácil" }),
    estadoLetra,
    menos,
    mas,
    contraste,
    espaciado,
    reiniciar
  );
  panel.setAttribute("role", "region");
  panel.setAttribute("aria-label", "Ayudas para leer");

  const pestana = el(
    "button",
    { type: "button", className: "acc-pestana" },
    el("span", { className: "acc-pestana-icono", ariaHidden: "true", textContent: "Aa" }),
    el("span", { className: "acc-pestana-texto", textContent: "Leer más fácil" })
  );
  pestana.setAttribute("aria-expanded", "false");
  pestana.setAttribute("aria-controls", "acc-panel");
  pestana.setAttribute("aria-label", "Ayudas para leer: letra, colores y espacio");

  const caja = el("aside", { className: "acc" }, pestana, panel);

  function abrir(abierto) {
    panel.hidden = !abierto;
    pestana.setAttribute("aria-expanded", String(abierto));
    caja.classList.toggle("abierto", abierto);
    if (abierto) menos.focus();
  }

  function cambiarEscala(paso) {
    estado.escala = Math.min(ESCALAS.length - 1, Math.max(0, estado.escala + paso));
    refrescar();
  }

  function refrescar() {
    aplicar();
    guardar();
    estadoLetra.textContent = `Tamaño de letra: ${Math.round(ESCALAS[estado.escala] * 100)} %`;
    menos.disabled = estado.escala === 0;
    mas.disabled = estado.escala === ESCALAS.length - 1;
    contraste.setAttribute("aria-pressed", String(estado.contraste));
    espaciado.setAttribute("aria-pressed", String(estado.espaciado));
  }

  pestana.addEventListener("click", () => abrir(panel.hidden));
  caja.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) {
      abrir(false);
      pestana.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (!panel.hidden && !caja.contains(e.target)) abrir(false);
  });

  document.body.append(caja);
  refrescar();
}

if (document.body) construir();
else document.addEventListener("DOMContentLoaded", construir);

// ---- Emojis decorativos: los lectores de pantalla no deben leerlos ("cara sonriente", "libros"…).
// Se esconden los que van al comienzo de títulos, menú y botones. El texto sigue igual para quien ve.
const EMOJI_INICIAL = /^(\s*(?:\p{Extended_Pictographic}️?(?:‍\p{Extended_Pictographic}️?)*|[↺↕➡⬅➤⏹▶✔✖])+\s*)/u;
const SELECTOR = "h1, h2, h3, .menu a, .boton, .acc-boton, .acc-pestana, .sugerencias button, .capitulos .nombre";

function ocultarEmojis(raiz) {
  raiz.querySelectorAll?.(SELECTOR).forEach((nodo) => {
    const primero = nodo.firstChild;
    if (!primero || primero.nodeType !== Node.TEXT_NODE) return;
    const m = primero.nodeValue.match(EMOJI_INICIAL);
    if (!m) return;
    const marca = document.createElement("span");
    marca.setAttribute("aria-hidden", "true");
    marca.textContent = m[1].trimEnd();
    primero.nodeValue = " " + primero.nodeValue.slice(m[1].length);
    nodo.insertBefore(marca, primero);
  });
}

function vigilarEmojis() {
  ocultarEmojis(document);
  let pendiente = false;
  new MutationObserver(() => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => {
      pendiente = false;
      ocultarEmojis(document);
    });
  }).observe(document.body, { childList: true, subtree: true });
}

if (document.body) vigilarEmojis();
else document.addEventListener("DOMContentLoaded", vigilarEmojis);
