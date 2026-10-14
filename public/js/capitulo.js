// Muestra un capítulo según el número en la dirección: capitulo.html?id=3
import { capitulos, capituloATexto } from "./contenido.js";
import { botonEscuchar } from "./voz.js";

const main = document.getElementById("contenido");
const id = Number(new URLSearchParams(location.search).get("id"));
const indice = capitulos.findIndex((c) => c.id === id);
const c = capitulos[indice];

function el(etiqueta, props = {}, ...hijos) {
  const nodo = Object.assign(document.createElement(etiqueta), props);
  nodo.append(...hijos.filter(Boolean));
  return nodo;
}

// "Término: explicación" → el término va en negrita.
function itemLista(texto) {
  const i = texto.indexOf(": ");
  if (i > 0 && i < 45) {
    return el("li", {}, el("strong", { textContent: texto.slice(0, i + 1) }), texto.slice(i + 1));
  }
  return el("li", { textContent: texto });
}

if (!c) {
  main.append(
    el("h1", { textContent: "No encontramos ese capítulo" }),
    el("a", { className: "boton", href: "/capitulos", textContent: "📚 Ver todos los capítulos" })
  );
} else {
  document.title = `${c.titulo} · Polita Te Guía`;

  main.append(
    el("p", { className: "subtitulo", textContent: `Capítulo ${c.id} de ${capitulos.length}` }),
    el("h1", { textContent: `${c.emoji} ${c.titulo}` }),
    el("div", { className: "acciones" }, botonEscuchar(() => capituloATexto(c), "🔊 Escuchar todo el capítulo"))
  );

  for (const s of c.secciones) {
    const tarjeta = el("section", { className: "tarjeta" });
    const texto = [s.titulo, ...(s.texto || []), ...(s.lista || [])].join(". ");
    tarjeta.append(
      el("div", { className: "seccion-cabecera" }, el("h2", { textContent: s.titulo }), botonEscuchar(() => texto)),
      ...(s.texto || []).map((t) => el("p", { textContent: t }))
    );
    if (s.lista) tarjeta.append(el("ul", {}, ...s.lista.map(itemLista)));
    main.append(tarjeta);
  }

  // Video de Polita
  const video = el("div", { className: "video" });
  if (c.video.youtubeId) {
    video.append(
      el("iframe", {
        src: `https://www.youtube-nocookie.com/embed/${c.video.youtubeId}`,
        title: `Video de Polita: ${c.titulo}`,
        allowFullscreen: true,
      })
    );
  } else {
    video.append(el("p", { textContent: "🎬 Muy pronto verás aquí el video de Polita." }));
  }
  main.append(
    el(
      "section",
      { className: "globo" },
      el("span", { className: "avatar", ariaHidden: "true" }, el("img", { src: "/img/polita-cara.jpg", alt: "" })),
      el("div", {}, el("h2", { textContent: "Polita te muestra un ejemplo" }), el("p", { textContent: c.video.descripcion }))
    ),
    video
  );

  // ¿Dudas? → chat con preguntas sugeridas de este capítulo
  main.append(
    el(
      "section",
      { className: "tarjeta" },
      el("h2", { textContent: "¿Tienes dudas?" }),
      el("p", { textContent: "Pregúntale a Polita. Ella te responde con palabras fáciles." }),
      el("a", { className: "boton", href: `/chat?capitulo=${c.id}`, textContent: "💬 Pregúntale a Polita" })
    )
  );

  // Anterior / siguiente
  const anterior = capitulos[indice - 1];
  const siguiente = capitulos[indice + 1];
  main.append(
    el(
      "nav",
      { className: "navegacion-capitulos", ariaLabel: "Otros capítulos" },
      anterior
        ? el("a", { className: "boton secundario", href: `/capitulo?id=${anterior.id}`, textContent: `⬅ ${anterior.titulo}` })
        : el("span"),
      siguiente
        ? el("a", { className: "boton", href: `/capitulo?id=${siguiente.id}`, textContent: `${siguiente.titulo} ➡` })
        : el("a", { className: "boton", href: "/quiz", textContent: "✅ Ir al quiz ➡" })
    )
  );
}
