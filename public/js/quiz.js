// Quiz por capítulo: quiz.html (lista) y quiz.html?id=3 (preguntas del capítulo 3).
// Es una guía para saber cuánto se entendió: si alguien se equivoca, Polita le recuerda
// la idea y le sugiere la parte del capítulo para repasar.
import { capitulos } from "./contenido.js";
import { quizzes } from "./quiz-datos.js";
import { botonEscuchar } from "./voz.js";

const main = document.getElementById("contenido");
const params = new URLSearchParams(location.search);
const idCap = Number(params.get("id"));
const LLAVE = "polita-quiz";

// ---------- utilidades ----------
function el(etiqueta, props = {}, ...hijos) {
  const nodo = Object.assign(document.createElement(etiqueta), props);
  nodo.append(...hijos.filter((h) => h !== null && h !== undefined && h !== false));
  return nodo;
}

function mezclar(lista) {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function leerProgreso() {
  try {
    return JSON.parse(localStorage.getItem(LLAVE)) || {};
  } catch {
    return {};
  }
}

function guardarProgreso(id, aciertos, total) {
  try {
    const p = leerProgreso();
    const antes = p[id];
    // Se guarda el mejor resultado.
    if (!antes || aciertos / total >= antes.aciertos / antes.total) p[id] = { aciertos, total };
    localStorage.setItem(LLAVE, JSON.stringify(p));
  } catch {
    /* si el navegador no deja guardar, el quiz funciona igual */
  }
}

function polita(...contenido) {
  return el(
    "section",
    { className: "globo" },
    el("span", { className: "avatar" }, el("img", { src: "/img/polita-cara.jpg", alt: "" })),
    el("div", {}, ...contenido)
  );
}

function limpiarPantalla() {
  main.replaceChildren();
}

function enfocarTitulo() {
  const h1 = main.querySelector("h1");
  if (h1) {
    h1.tabIndex = -1;
    h1.focus({ preventScroll: true });
  }
  window.scrollTo({ top: 0 });
}

// ---------- pantalla 1: lista de quizzes ----------
function mostrarLista() {
  document.title = "Quiz · Polita Te Guía";
  limpiarPantalla();
  const progreso = leerProgreso();
  const hechos = capitulos.filter((c) => progreso[c.id]).length;

  main.append(
    el("h1", { textContent: "✅ Quiz: ¿qué aprendí?" }),
    polita(
      el("p", { textContent: "¡Hola! Aquí no hay notas ni exámenes." }),
      el("p", { textContent: "Son preguntas para que veas cuánto entendiste. Si algo no te queda claro, yo te lo recuerdo." }),
      el("p", { textContent: "Escoge el capítulo que ya leíste." })
    )
  );

  if (hechos > 0) {
    main.append(el("p", { className: "subtitulo", textContent: `Llevas ${hechos} de ${capitulos.length} capítulos practicados.` }));
  }

  const lista = el("ul", { className: "capitulos" });
  for (const c of capitulos) {
    const p = progreso[c.id];
    const total = quizzes[c.id].length;
    const estado = p
      ? p.aciertos === p.total
        ? `⭐ ¡Lo entendiste todo! (${p.aciertos} de ${p.total})`
        : `Entendiste ${p.aciertos} de ${p.total}. Puedes practicar otra vez.`
      : `${total} preguntas`;
    lista.append(
      el(
        "li",
        {},
        el(
          "a",
          { href: `/quiz?id=${c.id}` },
          el("span", { className: "emoji", ariaHidden: "true", textContent: c.emoji }),
          el(
            "span",
            {},
            el("span", { className: "numero", textContent: `Capítulo ${c.id}` }),
            el("span", { className: "nombre", textContent: c.titulo }),
            el("span", { className: "resumen", textContent: estado })
          )
        )
      )
    );
  }
  main.append(lista);
}

// ---------- pantalla 2: preguntas de un capítulo ----------
function iniciarQuiz(cap, preguntas, esRepaso = false) {
  document.title = `Quiz: ${cap.titulo} · Polita Te Guía`;
  const total = preguntas.length;
  let actual = 0;
  const falladas = [];
  let aciertos = 0;

  function pintarPregunta() {
    limpiarPantalla();
    const p = preguntas[actual];

    // Se mezclan las opciones, menos en Verdadero/Falso.
    const opciones = p.o.map((texto, i) => ({ texto, correcta: i === (p.c ?? 0) }));
    const orden = p.fijo ? opciones : mezclar(opciones);

    const barra = el("progress", { className: "barra", max: total, value: actual });
    barra.setAttribute("aria-label", `Pregunta ${actual + 1} de ${total}`);

    const retro = el("div", { className: "retro", tabIndex: -1 });
    retro.setAttribute("aria-live", "polite");
    const botones = [];

    const responder = (op, boton) => {
      botones.forEach((b) => (b.disabled = true));
      const acerto = op.correcta;
      botones.forEach((b) => {
        if (b._op.correcta) b.classList.add("correcta");
      });
      if (acerto) {
        aciertos++;
        boton.insertAdjacentText("beforeend", " ✔");
      } else {
        boton.classList.add("incorrecta");
        boton.insertAdjacentText("beforeend", " ✖");
        falladas.push(p);
      }
      pintarRetro(acerto);
    };

    function pintarRetro(acerto) {
      retro.className = `retro ${acerto ? "bien" : "mal"}`;
      const textoVoz = acerto ? `¡Muy bien! ${p.bien}` : `Casi. Recuerda: ${p.recuerda}`;
      const contenido = [];
      if (acerto) {
        contenido.push(el("p", {}, el("strong", { textContent: "🎉 ¡Muy bien!" }), ` ${p.bien}`));
      } else {
        contenido.push(
          el("p", {}, el("strong", { textContent: "💛 Casi. Recuerda:" })),
          el("p", { textContent: p.recuerda }),
          el("a", {
            className: "boton secundario pequeno",
            href: `/capitulo?id=${cap.id}#seccion-${p.sec}`,
            textContent: `📖 Repasar: ${cap.secciones[p.sec].titulo}`,
          })
        );
      }
      const ultima = actual === total - 1;
      const siguiente = el("button", {
        type: "button",
        className: "boton",
        textContent: ultima ? "Ver cómo me fue ➡" : "Siguiente pregunta ➡",
      });
      siguiente.addEventListener("click", () => {
        if (ultima) return pintarResultado();
        actual++;
        pintarPregunta();
      });
      retro.append(
        ...contenido,
        el("div", { className: "acciones" }, botonEscuchar(() => textoVoz, "🔊 Escuchar"), siguiente)
      );
      retro.focus({ preventScroll: true });
      retro.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    const grupo = el("div", { className: "opciones" });
    grupo.setAttribute("role", "group");
    grupo.setAttribute("aria-label", "Opciones de respuesta");
    orden.forEach((op, i) => {
      const letra = p.fijo ? "" : `${"ABC"[i]}. `;
      const b = el("button", { type: "button", className: "opcion", textContent: `${letra}${op.texto}` });
      b._op = op;
      b.addEventListener("click", () => responder(op, b));
      botones.push(b);
      grupo.append(b);
    });

    main.append(
      el("p", { className: "subtitulo", textContent: `${cap.emoji} ${cap.titulo}${esRepaso ? " · practicando" : ""}` }),
      el("h1", { textContent: `Pregunta ${actual + 1} de ${total}` }),
      barra,
      el(
        "section",
        { className: "tarjeta pregunta" },
        el("p", { className: "enunciado", textContent: p.q }),
        el("div", { className: "acciones" }, botonEscuchar(() => p.q, "🔊 Escuchar la pregunta")),
        grupo
      ),
      retro
    );
    enfocarTitulo();
  }

  function pintarResultado() {
    // El resultado se guarda solo cuando se hizo el quiz completo.
    if (!esRepaso) guardarProgreso(cap.id, aciertos, total);
    limpiarPantalla();

    const todas = aciertos === total;
    const mensaje = esRepaso
      ? todas
        ? "¡Muy bien! Ahora ya te acuerdas de todo."
        : "Sigue practicando, vas muy bien."
      : todas
        ? "¡Increíble! Entendiste todo el capítulo."
        : aciertos >= Math.ceil(total / 2)
          ? "¡Muy bien! Ya entiendes casi todo."
          : "¡Gracias por intentarlo! Con un repaso te va a ir mejor.";

    main.append(
      el("p", { className: "subtitulo", textContent: `${cap.emoji} ${cap.titulo}` }),
      el("h1", { textContent: todas ? "🌟 ¡Lo lograste!" : "👏 ¡Terminaste!" }),
      polita(
        el("p", { textContent: mensaje }),
        el("p", {}, el("strong", { textContent: `Respondiste bien ${aciertos} de ${total}.` })),
        el("div", { className: "acciones" }, botonEscuchar(() => `${mensaje} Respondiste bien ${aciertos} de ${total}.`))
      )
    );

    if (falladas.length) {
      // Se agrupan por sección para no repetir el mismo enlace.
      const secciones = [...new Set(falladas.map((f) => f.sec))];
      const tarjeta = el("section", { className: "tarjeta" }, el("h2", { textContent: "📖 Te sugiero repasar" }));
      tarjeta.append(el("p", { textContent: "Aquí está la respuesta a lo que te quedó dudoso:" }));
      const ul = el("ul", { className: "repaso" });
      for (const s of secciones) {
        ul.append(
          el(
            "li",
            {},
            el("a", {
              href: `/capitulo?id=${cap.id}#seccion-${s}`,
              textContent: `Capítulo ${cap.id}: ${cap.secciones[s].titulo}`,
            })
          )
        );
      }
      tarjeta.append(ul);
      for (const f of falladas) {
        tarjeta.append(
          el(
            "div",
            { className: "recordatorio" },
            el("p", {}, el("strong", { textContent: f.q })),
            el("p", { textContent: `💛 ${f.recuerda}` })
          )
        );
      }
      main.append(tarjeta);
    }

    const acciones = el("div", { className: "acciones" });
    if (falladas.length) {
      const practicar = el("button", { type: "button", className: "boton", textContent: "💪 Practicar las que fallé" });
      practicar.addEventListener("click", () => iniciarQuiz(cap, [...falladas], true));
      acciones.append(practicar);
      acciones.append(el("a", { className: "boton secundario", href: `/capitulo?id=${cap.id}`, textContent: "📖 Leer el capítulo otra vez" }));
    }
    const otra = el("button", {
      type: "button",
      className: falladas.length ? "boton secundario" : "boton",
      textContent: "🔁 Hacer el quiz otra vez",
    });
    otra.addEventListener("click", () => iniciarQuiz(cap, quizzes[cap.id]));
    acciones.append(otra);

    const sig = capitulos.find((c) => c.id === cap.id + 1);
    if (sig) acciones.append(el("a", { className: "boton secundario", href: `/quiz?id=${sig.id}`, textContent: `${sig.emoji} Quiz del capítulo ${sig.id}` }));
    acciones.append(el("a", { className: "boton secundario", href: "/quiz", textContent: "📋 Todos los quizzes" }));
    main.append(acciones);
    enfocarTitulo();
  }

  pintarPregunta();
}

// ---------- pantalla de entrada de un capítulo ----------
function mostrarEntrada(cap) {
  document.title = `Quiz: ${cap.titulo} · Polita Te Guía`;
  limpiarPantalla();
  const preguntas = quizzes[cap.id];
  const comenzar = el("button", { type: "button", className: "boton", textContent: "▶ Empezar" });
  comenzar.addEventListener("click", () => iniciarQuiz(cap, preguntas));
  main.append(
    el("p", { className: "subtitulo", textContent: `Capítulo ${cap.id} de ${capitulos.length}` }),
    el("h1", { textContent: `${cap.emoji} ${cap.titulo}` }),
    polita(
      el("p", { textContent: `Son ${preguntas.length} preguntas. No hay nota.` }),
      el("p", { textContent: "Si te equivocas, te recuerdo la respuesta y te digo dónde repasar." })
    ),
    el(
      "div",
      { className: "acciones" },
      comenzar,
      el("a", { className: "boton secundario", href: `/capitulo?id=${cap.id}`, textContent: "📖 Leer el capítulo primero" }),
      el("a", { className: "boton secundario", href: "/quiz", textContent: "📋 Todos los quizzes" })
    )
  );
  enfocarTitulo();
}

// ---------- arranque ----------
const cap = capitulos.find((c) => c.id === idCap);
if (cap && quizzes[cap.id]) mostrarEntrada(cap);
else mostrarLista();
