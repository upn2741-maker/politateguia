// Motor de respuestas de Polita: busca en la base de preguntas (preguntas.js)
// la que más se parece a lo que escribió la persona. Funciona sin internet y sin IA.
//  - Ignora tildes, mayúsculas y signos.
//  - Entiende palabras coloquiales (plata, camello, me echaron…) con SINONIMOS.
//  - Tolera errores de escritura (arl → "alr", cesantias → "sesantias").
import { preguntas } from "./preguntas.js";

// Palabras que no ayudan a distinguir una pregunta de otra.
const VACIAS = new Set(
  ("a al algo algun alguna como con cual cuales cuando de del donde el ella ellos en es esa ese eso esta este esto " +
    "estoy estar fue ha hay la las le les lo los me mi mis muy no o para pero por porque puedo puede pueden que quien se " +
    "ser si sin sobre su sus te ti tu tus un una uno unos y ya yo hacer hago hace tengo tiene tienen tener debo debe deben " +
    "son mas menos sea va voy vas q k xq pq pues bueno entonces osea favor porfa porfavor dime decir quiero saber sabes " +
    "explicame explicar significa signifca nos usted ustedes cuanto cuanta cuantos cuantas otro otra")
    .split(" ")
);

// Saludos y despedidas: se responden aparte.
const SALUDOS = new Set("hola holi buenas buenos dias tardes noches hey saludos ola".split(" "));
const GRACIAS = new Set("gracias graciass thanks agradezco".split(" "));
const ADIOS = new Set("adios chao chau bye hasta luego".split(" "));

// Palabra coloquial o variante → palabra que usa la base de conocimiento.
const SINONIMOS = {
  dinero: ["plata", "billete", "lucas", "money", "platica"],
  trabajo: ["camello", "chamba", "empleo", "chamba", "laburo", "trabajar", "trabaje", "trabajando"],
  sueldo: ["salario", "pago", "paga", "pagan", "pagar", "pagaron", "quincena", "nomina", "mensualidad"],
  jefe: ["patron", "empleador", "supervisor", "jefa"],
  accidente: ["cai", "caer", "caida", "cayo", "golpe", "golpee", "golpeo", "lastime", "lastimo", "herida", "heri", "corte", "accidente", "accidentado", "accidente", "quemadura", "queme", "dano", "lesion", "lesione"],
  estres: ["estresado", "estresada", "estresante"],
  preocupado: ["preocupada", "preocupacion", "preocupa"],
  enfermedad: ["enfermo", "enferma", "enferme", "enfermedad", "dolor", "duele"],
  despido: ["echaron", "echar", "despidieron", "despedir", "despidio", "botaron", "sacaron", "bote", "despedido"],
  renuncia: ["renunciar", "renuncio", "renuncie", "retirarme", "irme", "dejar"],
  medico: ["doctor", "doctora", "medica", "hospital", "clinica"],
  pension: ["pensionar", "pensionarme", "pensiono", "jubilar", "jubilarme", "jubilacion", "pensionado"],
  vejez: ["viejo", "vieja", "anciano", "mayor"],
  cesantia: ["cesantia", "sesantia", "cesantilla"],
  vacacion: ["vacacione", "vacas"],
  contrato: ["contrata", "contratado", "contrataron", "firme"],
  horario: ["jornada", "turno", "horarios"],
  permiso: ["permisos", "permito"],
  eps: ["salud", "epss"],
  arl: ["riesgo", "riesgos"],
  sacar: ["saco", "saque", "retirar", "retire"],
  casa: ["vivienda", "hogar", "apartamento", "apto", "casita"],
  estudio: ["estudiar", "universidad", "carrera", "colegio", "educacion"],
  cita: ["consulta"],
  tarde: ["impuntual", "retraso", "retrase"],
  faltar: ["falte", "falto", "ausencia", "ausente"],
  queja: ["quejarme", "quejar", "reclamo", "reclamar", "denunciar"],
  discriminacion: ["discriminan", "discriminar", "burlan", "burla", "humillan", "gritan", "grita", "maltrato", "maltratan", "acoso", "molestan"],
  liquidacion: ["liquidar", "liquidaron", "liquidan"],
  caja: ["compensar", "colsubsidio", "cafam", "comfama", "comfenalco", "comfandi"],
  discapacidad: ["discapacitado", "discapacitada", "condicion"],
  urgencia: ["emergencia", "urgente"],
  tarjeta: ["debito"],
  prestamo: ["prestan", "prestar", "prestamos"],
  morir: ["muero", "muerte", "fallezco", "fallecer", "fallece", "fallecimiento"],
};

const MAPA_SINONIMOS = new Map();
for (const [canon, variantes] of Object.entries(SINONIMOS)) {
  for (const v of variantes) MAPA_SINONIMOS.set(v, canon);
}

export function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9ñ\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Quita plurales sencillos: "vacaciones" → "vacacion", "derechos" → "derecho".
function raiz(palabra) {
  if (palabra.length > 5 && palabra.endsWith("ones")) return palabra.slice(0, -2);
  if (palabra.length > 4 && palabra.endsWith("s")) return palabra.slice(0, -1);
  return palabra;
}

function canonica(palabra) {
  if (MAPA_SINONIMOS.has(palabra)) return MAPA_SINONIMOS.get(palabra);
  const r = raiz(palabra);
  return MAPA_SINONIMOS.get(r) || r;
}

function palabras(texto) {
  return normalizar(texto)
    .split(" ")
    .filter((p) => p && !VACIAS.has(p))
    .map(canonica);
}

// ── Índice de la base de conocimiento ──
const indice = preguntas.map((q, i) => ({
  i,
  frases: [q.p, ...(q.v || [])].map((f) => new Set(palabras(f))),
  claves: new Set((q.k || []).map((k) => canonica(normalizar(k)))),
}));

const frecuencia = new Map();
for (const d of indice) {
  const todas = new Set([...d.claves, ...d.frases.flatMap((f) => [...f])]);
  for (const t of todas) frecuencia.set(t, (frecuencia.get(t) || 0) + 1);
}
const vocabulario = [...frecuencia.keys()];
const idf = (t) => Math.log(1 + indice.length / (frecuencia.get(t) || indice.length));
const IDF_MAXIMO = Math.log(1 + indice.length);

// Cuántas letras hay que cambiar para pasar de una palabra a otra.
// Cuenta como un solo error cambiar dos letras de lugar ("alr" → "arl").
function distancia(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 99;
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const costo = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + costo);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

// Si la palabra no existe en la base, busca la más parecida (errores de escritura).
// En palabras cortas exige la misma primera letra, para no confundir palabras distintas.
function corregir(palabra) {
  if (frecuencia.has(palabra) || palabra.length < 3) return palabra;
  const maximo = palabra.length >= 7 ? 2 : 1;
  let mejor = null;
  let mejorDist = maximo + 1;
  for (const v of vocabulario) {
    if (palabra.length <= 5 && v[0] !== palabra[0]) continue;
    const d = distancia(palabra, v);
    if (d < mejorDist) {
      mejor = v;
      mejorDist = d;
    }
  }
  return mejor || palabra;
}

// Tipo de pregunta: "qué es…" (definición) o "qué hago / cómo…" (pasos a seguir).
// Ayuda a desempatar entre "¿Qué es un accidente laboral?" y "Me caí, ¿qué hago?".
function intencion(texto) {
  const t = " " + normalizar(texto) + " ";
  if (/ (que|q) (es|son|significa) | para que sirve/.test(t)) return "definicion";
  if (/ (que|q) (hago|debo|hacer) | como /.test(t)) return "accion";
  return null;
}

function puntuar(consulta, capitulo, tipo = null) {
  const corregidas = [...new Set(consulta.map(corregir))];
  const tokens = corregidas.filter((t) => frecuencia.has(t));
  if (!tokens.length) return [];
  // Las palabras desconocidas (ej. "torta") también pesan: así una pregunta
  // de otro tema no se confunde con una del trabajo por una sola palabra.
  const desconocidas = corregidas.length - tokens.length;
  const pesoConsulta = tokens.reduce((s, t) => s + idf(t), 0) + desconocidas * 0.6 * IDF_MAXIMO;

  return indice
    .map((d) => {
      let mejor = 0;
      for (const frase of d.frases) {
        let enConsulta = 0;
        let enFrase = 0;
        for (const t of tokens) {
          if (frase.has(t) || d.claves.has(t)) enConsulta += idf(t);
          if (frase.has(t)) enFrase += idf(t);
        }
        const pesoFrase = [...frase].reduce((s, t) => s + idf(t), 0) || 1;
        const puntaje = 0.55 * (enConsulta / pesoConsulta) + 0.45 * (enFrase / pesoFrase);
        if (puntaje > mejor) mejor = puntaje;
      }
      if (tokens.some((t) => d.claves.has(t))) mejor += 0.15;
      if (capitulo && preguntas[d.i].c === capitulo) mejor += 0.05;
      const p = normalizar(preguntas[d.i].p);
      if (tipo === "definicion" && /^(que es|que son)/.test(p)) mejor += 0.1;
      if (tipo === "accion" && /(que hago|^como)/.test(p)) mejor += 0.1;
      return { pregunta: preguntas[d.i], puntaje: mejor };
    })
    .filter((r) => r.puntaje > 0.15)
    .sort((a, b) => b.puntaje - a.puntaje);
}

const SEGURO = 0.55; // desde aquí Polita responde directamente
const DUDOSO = 0.3; // entre DUDOSO y SEGURO pregunta "¿Quisiste decir…?"

// Devuelve { tipo, texto, pregunta?, sugerencias[] }
//   tipo: "respuesta" | "quisiste" | "saludo" | "gracias" | "adios" | "no-se"
export function responder(texto, capitulo = 0) {
  const todas = normalizar(texto).split(" ").filter(Boolean);
  const esCortesia = (p) => SALUDOS.has(p) || GRACIAS.has(p) || ADIOS.has(p);
  // "Gracias Polita" o "Hola Polita": el nombre no es parte de la pregunta.
  const conCortesia = todas.some(esCortesia);
  const sinSaludos = todas.filter((p) => !esCortesia(p) && !(conCortesia && p === "polita"));
  const consulta = palabras(sinSaludos.join(" "));

  if (!consulta.length) {
    if (todas.some((p) => GRACIAS.has(p))) {
      return { tipo: "gracias", texto: "¡Con mucho gusto! 😊\nSi tienes otra pregunta, aquí estoy.", sugerencias: [] };
    }
    if (todas.some((p) => ADIOS.has(p))) {
      return { tipo: "adios", texto: "¡Hasta pronto! 👋\nRecuerda: conocer tus derechos te ayuda a trabajar tranquilo.", sugerencias: [] };
    }
    return {
      tipo: "saludo",
      texto: "¡Hola! 😊 Soy Polita.\n¿Qué quieres saber sobre tu trabajo?",
      sugerencias: preguntasDelCapitulo(capitulo).slice(0, 3),
    };
  }

  const resultados = puntuar(consulta, capitulo, intencion(texto));
  const [primero] = resultados;

  if (primero && primero.puntaje >= SEGURO) {
    return {
      tipo: "respuesta",
      texto: primero.pregunta.r,
      pregunta: primero.pregunta,
      sugerencias: relacionadas(primero.pregunta, resultados),
    };
  }

  if (primero && primero.puntaje >= DUDOSO) {
    return {
      tipo: "quisiste",
      texto: "No estoy segura de entender tu pregunta. 🤔\n¿Quisiste preguntar alguna de estas?",
      sugerencias: resultados.slice(0, 3).map((r) => r.pregunta),
    };
  }

  return {
    tipo: "no-se",
    texto:
      "Todavía no sé responder esa pregunta. 😅\nYo sé de tus derechos en el trabajo.\nIntenta preguntar con otras palabras, o habla con tu jefe, tu familia o Best Buddies.",
    sugerencias: resultados.length ? resultados.slice(0, 3).map((r) => r.pregunta) : preguntasDelCapitulo(capitulo).slice(0, 3),
  };
}

// Otras preguntas del mismo capítulo que pueden interesar.
function relacionadas(elegida, resultados) {
  const cercanas = resultados.slice(1).map((r) => r.pregunta).filter((q) => q.c === elegida.c && q !== elegida);
  const delCapitulo = preguntas.filter((q) => q.c === elegida.c && q !== elegida && !cercanas.includes(q));
  return [...cercanas, ...delCapitulo].slice(0, 2);
}

export function preguntasDelCapitulo(capitulo) {
  const lista = preguntas.filter((q) => q.c === capitulo);
  if (lista.length) return lista;
  // Sin capítulo: la primera pregunta de cada capítulo.
  return [1, 2, 4, 5, 6, 9].map((c) => preguntas.find((q) => q.c === c));
}
