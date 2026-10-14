// Contenido de los 9 capítulos en lectura fácil.
// Este archivo lo usan las páginas del sitio Y el asistente "Pregúntale a Polita"
// (functions/api/chat.js), así el bot responde solo con esta información.
// Si cambias algo aquí, cambia en los dos lugares.

export const capitulos = [
  {
    id: 1,
    emoji: "📝",
    titulo: "Consigo mi trabajo",
    resumen: "Contrato, horario, funciones y derechos.",
    video: { youtubeId: "", descripcion: "Polita empieza a trabajar y te cuenta cuáles son sus acuerdos, su horario y sus funciones." },
    secciones: [
      {
        titulo: "El contrato de trabajo",
        texto: [
          "El contrato de trabajo es un acuerdo entre tú y tu empleador.",
          "Puede ser escrito o verbal.",
          "En el contrato están los acuerdos principales sobre:",
        ],
        lista: [
          "El tipo de trabajo que vas a hacer.",
          "La fecha en que empiezas a trabajar.",
          "Cuánto te van a pagar y qué día te pagan.",
          "Cuánto tiempo dura el contrato: por tiempo fijo, indefinido o por obra.",
        ],
      },
      {
        titulo: "El horario de trabajo",
        texto: ["Es el tiempo en el que debes hacer tus tareas en la empresa."],
        lista: [
          "Jornada de trabajo: son tus horas de entrada y de salida.",
          "Tiempos de descanso: el tiempo para comer y tus días de descanso en la semana.",
          "Horas extra: es el tiempo que trabajas fuera de tu horario. Te las deben pagar con un valor adicional.",
        ],
      },
      {
        titulo: "Tus funciones",
        texto: [
          "Las funciones son las tareas que debes hacer en tu trabajo.",
          "Tus funciones deben estar claras desde el primer día.",
          "Tu jefe te explicará cómo hacer cada tarea de forma segura y correcta.",
        ],
      },
      {
        titulo: "Tus derechos como trabajador",
        texto: ["Cuando trabajas, la ley te da estos derechos:"],
        lista: [
          "Sueldo justo: recibir tu pago a tiempo, en las fechas acordadas.",
          "Seguridad social: la empresa debe pagar tu salud (EPS), tu pensión y tus riesgos laborales (ARL).",
          "Prestaciones sociales: recibir primas, cesantías y vacaciones pagadas.",
          "Trato digno: trabajar en un lugar seguro, con respeto y sin discriminación.",
        ],
      },
    ],
    preguntas: ["¿Qué es un contrato?", "¿Qué son las horas extra?", "¿Cuáles son mis derechos?"],
  },
  {
    id: 2,
    emoji: "💵",
    titulo: "Recibo mi sueldo",
    resumen: "Sueldo, fechas de pago y banco.",
    video: { youtubeId: "", descripcion: "Polita te muestra cómo sabe qué días le pagan, cómo es su tarjeta, cómo saca su dinero del cajero y consejos de seguridad." },
    secciones: [
      {
        titulo: "¿Cuándo me pagan?",
        texto: ["El día de pago depende de tu contrato y del banco de tu empresa."],
        lista: [
          "Cada 15 días: te pagan los días 15 y 30 de cada mes.",
          "Una vez al mes: te pagan al final del mes o en los primeros 5 días del mes siguiente.",
          "Días festivos: si el día de pago es domingo o festivo, te pagan el día hábil anterior.",
        ],
      },
      {
        titulo: "¿Dónde saco mi dinero?",
        texto: ["Puedes sacar tu sueldo en los cajeros o en las oficinas de tu banco."],
        lista: [
          "En cajeros de tu mismo banco: sacar dinero no tiene costo.",
          "En cajeros de otro banco: sacar dinero tiene un costo adicional.",
        ],
      },
      {
        titulo: "Tú eliges tu banco",
        lista: [
          "La empresa debe respetar el banco que tú elijas.",
          "No estás obligado a abrir una cuenta en el banco de tu empresa.",
          "Puedes pedir que te paguen en tu cuenta de siempre.",
        ],
      },
    ],
    preguntas: ["¿Qué día me pagan?", "¿Cuesta sacar plata del cajero?", "¿Puedo elegir mi banco?"],
  },
  {
    id: 3,
    emoji: "📋",
    titulo: "Conozco las reglas",
    resumen: "Reglamento, horarios, permisos y qué pasa si no cumplo una regla.",
    video: { youtubeId: "", descripcion: "Polita te muestra a dos personas: una no sigue las reglas y la otra sí sigue el reglamento." },
    secciones: [
      {
        titulo: "El Reglamento Interno de Trabajo",
        texto: [
          "Es un documento con las normas de la empresa.",
          "Ayuda a organizar el trabajo y a resolver dudas del día a día.",
        ],
      },
      {
        titulo: "¿Para qué sirve el reglamento?",
        texto: ["El reglamento no es solo para decir qué está prohibido. Te sirve para:"],
        lista: [
          "Conocer cómo funciona tu lugar de trabajo.",
          "Saber qué hacer para hacer bien tu trabajo.",
        ],
      },
      {
        titulo: "¿Qué dice el reglamento?",
        lista: [
          "Horarios: horas de entrada, de salida y de descanso.",
          "Tus responsabilidades: lo que debes hacer en tu trabajo.",
          "Convivencia: cómo llevarte bien con tus compañeros y jefes.",
          "Permisos y ausencias: qué hacer si necesitas faltar o pedir un permiso.",
          "Vacaciones y licencias: cuándo y cómo tomar tus días de descanso.",
          "Lo que no está permitido: cosas que no debes hacer en la empresa.",
          "Faltas y consecuencias: qué pasa si no cumples las normas.",
          "Reclamos: los pasos para poner una queja o resolver un problema.",
          "Seguridad y salud: normas para cuidarte y evitar accidentes.",
        ],
      },
    ],
    preguntas: ["¿Qué es el reglamento?", "¿Cómo pido un permiso?", "¿Qué pasa si no cumplo una regla?"],
  },
  {
    id: 4,
    emoji: "🩺",
    titulo: "Cuido mi salud",
    resumen: "EPS e IPS.",
    video: { youtubeId: "", descripcion: "Polita te muestra qué hacer en diferentes situaciones: un examen de sangre, una cita médica y una urgencia." },
    secciones: [
      {
        titulo: "¿Qué es una EPS?",
        texto: ["Las EPS son las empresas que organizan los servicios de salud para las personas."],
      },
      {
        titulo: "¿Qué hacen las EPS?",
        lista: [
          "Afilian a las personas a la salud.",
          "Aceptan a quien cumpla los requisitos.",
          "Reciben el dinero que pagan los afiliados.",
          "Deciden qué hospitales y médicos te atienden.",
          "Autorizan los servicios médicos.",
          "Enseñan a cuidar la salud y a prevenir enfermedades.",
        ],
      },
      {
        titulo: "Algunas EPS",
        lista: ["Aliansalud", "Capital Salud", "Nueva EPS", "Famisanar", "Sanitas", "Sura", "Salud Total"],
      },
      {
        titulo: "¿Qué es una IPS?",
        texto: [
          "Las EPS no te atienden directamente.",
          "Te atienden en las IPS: Instituciones Prestadoras de Servicios de Salud.",
          "Las IPS son:",
        ],
        lista: ["Hospitales.", "Clínicas.", "Laboratorios.", "Centros médicos."],
      },
    ],
    preguntas: ["¿Qué es una EPS?", "¿Cuál es la diferencia entre EPS e IPS?", "¿Dónde me hago un examen?"],
  },
  {
    id: 5,
    emoji: "🦺",
    titulo: "Estoy protegido en el trabajo",
    resumen: "ARL, accidente laboral y enfermedad laboral.",
    video: { youtubeId: "", descripcion: "Polita te muestra qué pasa cuando avisas que tuviste un accidente en el trabajo, quién te ayuda, qué papeles llenar y qué pasa si no avisas." },
    secciones: [
      {
        titulo: "¿Qué es la ARL?",
        texto: [
          "ARL significa Administradora de Riesgos Laborales.",
          "La ARL te protege de los riesgos, accidentes y enfermedades que pueden pasar en tu trabajo.",
        ],
      },
      {
        titulo: "¿Qué es un accidente laboral?",
        texto: [
          "Es algo que pasa de repente mientras haces tu trabajo.",
          "Causa una lesión en tu cuerpo o en tu salud.",
        ],
      },
      {
        titulo: "¿Qué es una enfermedad laboral?",
        texto: ["Es una enfermedad que te da por el tipo de trabajo que haces o por el lugar donde trabajas."],
      },
    ],
    preguntas: ["¿Qué es la ARL?", "Me caí en el trabajo, ¿qué hago?", "¿Qué pasa si no aviso de un accidente?"],
  },
  {
    id: 6,
    emoji: "🐷",
    titulo: "Ahorro mientras trabajo",
    resumen: "Cesantías: para qué sirven y cuándo las puedo usar.",
    video: { youtubeId: "", descripcion: "Polita te muestra cuándo puedes usar tus cesantías, por ejemplo para arreglar tu casa o pagar tus estudios." },
    secciones: [
      {
        titulo: "¿Qué son los fondos de cesantías?",
        texto: [
          "Son las empresas que guardan y cuidan tu dinero de ahorro.",
          "En Colombia hay dos tipos de fondos:",
        ],
      },
      {
        titulo: "1. Fondos privados",
        texto: ["Son empresas privadas que guardan tu dinero. Las principales son:"],
        lista: ["Porvenir", "Protección", "Colfondos", "Skandia"],
      },
      {
        titulo: "2. Fondo público",
        texto: [
          "Fondo Nacional del Ahorro (FNA): es una empresa del Estado.",
          "Es bueno si quieres usar tu ahorro para pedir un crédito de vivienda.",
        ],
      },
      {
        titulo: "¿Cómo saco mis cesantías?",
        texto: [
          "Para sacar tu dinero debes tener una razón que permita la ley.",
          "Haces el trámite con tu fondo de cesantías o con tu empleador.",
        ],
        lista: [
          "Retiro total (sacar todo): cuando termina tu contrato, cuando haces el servicio militar o si el trabajador fallece.",
          "Retiro parcial (sacar una parte): para tu vivienda o para pagar estudios.",
        ],
      },
    ],
    preguntas: ["¿Qué son las cesantías?", "¿Cuándo puedo sacar mis cesantías?", "¿Puedo usarlas para estudiar?"],
  },
  {
    id: 7,
    emoji: "👵",
    titulo: "Pienso en mi futuro",
    resumen: "Pensión: para qué sirve y qué significa.",
    video: { youtubeId: "", descripcion: "Polita te muestra casos de \"¿qué pasa si...?\" y las mejores soluciones para cada situación." },
    secciones: [
      {
        titulo: "¿Qué es la pensión?",
        texto: [
          "La pensión es un dinero que recibes cada mes cuando ya no trabajas.",
          "El Sistema General de Pensiones te protege para que recibas dinero cuando:",
        ],
        lista: [
          "Llegas a la vejez.",
          "Tienes una invalidez por enfermedad o accidente.",
          "Si falleces, protege a tu familia.",
        ],
      },
      {
        titulo: "¿Cómo se construye la pensión?",
        texto: [
          "Mientras trabajas, tú y tu empresa guardan un dinero cada mes.",
          "Ese dinero se llama aporte pensional.",
        ],
      },
      {
        titulo: "¿Dónde se guarda?",
        lista: [
          "Fondo público (Colpensiones): lo maneja el Estado.",
          "Fondos privados: los manejan empresas privadas.",
        ],
      },
      {
        titulo: "Tipos de pensión",
        lista: [
          "Pensión por vejez: cuando cumples la edad y has trabajado el tiempo suficiente. Mujeres a los 57 años y hombres a los 62 años. Debes tener al menos 1.300 semanas cotizadas.",
          "Pensión de invalidez: si pierdes el 50 % o más de tu capacidad para trabajar por enfermedad o accidente. Jóvenes de 14 a 26 años: al menos 26 semanas en el último año. Personas con discapacidad: al menos 50 semanas en los últimos 3 años.",
          "Pensión de sobrevivientes: si un trabajador o pensionado fallece, el dinero se le da a su familia (esposo, esposa o hijos).",
          "Pensión familiar: si una pareja no alcanza las semanas por separado, puede sumarlas para tener una pensión juntos.",
          "Pensión subsidiada: ayuda del Estado para personas con pocos recursos. Debes estar en el régimen subsidiado de salud y tener al menos 500 semanas.",
          "Pensión para padres con hijos con discapacidad: pueden pensionarse sin importar su edad. Deben tener 1.300 semanas y demostrar que el hijo depende de ellos.",
        ],
      },
      {
        titulo: "¿Qué pasa si no completo las semanas?",
        texto: [
          "Si llegas a la edad de pensión pero no tienes las semanas necesarias:",
        ],
        lista: [
          "No recibes una pensión cada mes.",
          "El fondo te devuelve todo tu dinero ahorrado en un solo pago.",
        ],
      },
    ],
    preguntas: ["¿Qué es la pensión?", "¿A qué edad me pensiono?", "¿Qué pasa si no completo las semanas?"],
  },
  {
    id: 8,
    emoji: "🎁",
    titulo: "Tengo otros beneficios",
    resumen: "Caja de compensación, subsidios, recreación y educación.",
    video: { youtubeId: "", descripcion: "Polita te muestra su caja de compensación, qué puede hacer con ella y cómo puedes escoger la tuya." },
    secciones: [
      {
        titulo: "¿Qué es la Caja de Compensación Familiar?",
        texto: [
          "Es una organización que ayuda a mejorar la vida de los trabajadores y sus familias.",
          "No busca ganar dinero y el Estado la vigila.",
        ],
      },
      {
        titulo: "Ayudas que puedes recibir",
        lista: [
          "Cuota monetaria: dinero cada mes por cada hijo o familiar a tu cargo. Es para trabajadores con sueldos bajos o medios.",
          "Subsidio de vivienda: ayuda para comprar, construir o arreglar tu casa.",
          "Subsidio educativo: ayuda para útiles, uniformes o zapatos para el colegio.",
        ],
      },
      {
        titulo: "Servicios para ti y tu familia",
        texto: ["Tienen precios más bajos según tu sueldo:"],
        lista: [
          "Recreación y turismo: entradas más baratas a parques, hoteles y centros vacacionales.",
          "Educación: cursos, talleres y escuelas deportivas.",
          "Créditos: préstamos con intereses bajos.",
          "Agencia de empleo: ayuda gratis para buscar trabajo si te quedas sin empleo.",
        ],
      },
    ],
    preguntas: ["¿Qué es una caja de compensación?", "¿Qué es la cuota monetaria?", "¿Me ayudan a buscar trabajo?"],
  },
  {
    id: 9,
    emoji: "🚪",
    titulo: "Mi trabajo termina o cambia",
    resumen: "Renuncia, fin del contrato, liquidación y documentos.",
    video: { youtubeId: "", descripcion: "Polita te cuenta por qué renunció a su trabajo anterior, cómo fue el proceso y responde preguntas como: ¿pierdo mi dinero?" },
    secciones: [
      {
        titulo: "La renuncia",
        texto: ["Renunciar es cuando tú decides dejar tu trabajo."],
        lista: [
          "Carta de renuncia: debes avisar a tu empresa por escrito y decir la fecha en que te vas.",
          "Tu dinero: aunque renuncies, la empresa debe pagarte el dinero por el tiempo que trabajaste.",
        ],
      },
      {
        titulo: "El fin del contrato",
        texto: ["El contrato puede terminar por estas razones:"],
        lista: [
          "Se cumple la fecha final del contrato.",
          "Se termina la obra o tarea para la que te contrataron.",
          "Despido: la empresa decide terminar el contrato.",
          "Mutuo acuerdo: tú y la empresa firman que los dos están de acuerdo en terminar.",
        ],
      },
      {
        titulo: "La liquidación",
        texto: ["Es el último pago que te da la empresa cuando termina tu contrato. Incluye:"],
        lista: [
          "Sueldo pendiente: los días que trabajaste y no te han pagado.",
          "Prestaciones: prima, cesantías e intereses de cesantías.",
          "Vacaciones: los días de descanso que no tomaste.",
          "Indemnización: solo si la empresa te despide sin una causa justa.",
        ],
      },
      {
        titulo: "Documentos que te deben dar",
        lista: [
          "Paz y salvo: dice que no le debes dinero ni herramientas a la empresa.",
          "Certificado laboral: dice cuándo empezaste, cuándo saliste, tu cargo y tu sueldo.",
          "Comprobante de liquidación: explica cuánto te pagan y por qué.",
          "Examen médico de retiro: una orden para revisar tu salud al salir.",
        ],
      },
    ],
    preguntas: ["¿Si renuncio pierdo mi dinero?", "¿Qué es la liquidación?", "¿Qué papeles me deben dar?"],
  },
];

// Convierte un capítulo a texto plano (para leer en voz alta y para el asistente).
export function capituloATexto(c) {
  const partes = [`Capítulo ${c.id}. ${c.titulo}.`];
  for (const s of c.secciones) {
    partes.push(`${s.titulo}.`);
    if (s.texto) partes.push(...s.texto);
    if (s.lista) partes.push(...s.lista.map((i) => `- ${i}`));
  }
  return partes.join("\n");
}
