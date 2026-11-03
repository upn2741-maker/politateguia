// Preguntas del quiz, un grupo por capítulo.
// Es una guía para que cada persona vea cuánto entendió, no un examen.
//
// Cada pregunta:
//   q:        la pregunta
//   o:        opciones (la correcta puede ir en cualquier lugar; indícala con "c")
//   c:        posición de la correcta dentro de "o" (si no se pone, es 0 = la primera)
//   fijo:     true = no mezclar las opciones (para Verdadero / Falso)
//   bien:     frase corta de Polita cuando acierta (refuerza lo aprendido)
//   recuerda: lo que Polita le recuerda a quien se equivoca
//   sec:      número de la sección del capítulo donde está la respuesta (0 = la primera)
//
// Todo debe salir de public/js/contenido.js. Si cambias un capítulo, revisa sus preguntas.

export const quizzes = {
  1: [
    {
      q: "¿Qué es el contrato de trabajo?",
      o: ["Un acuerdo entre tú y tu empleador", "Un permiso para faltar al trabajo", "Un papel que te da el banco"],
      bien: "Es un acuerdo entre tú y tu empleador.",
      recuerda: "El contrato de trabajo es un acuerdo entre tú y tu empleador. Puede ser escrito o verbal.",
      sec: 0,
    },
    {
      q: "Si trabajas fuera de tu horario, la empresa no te debe pagar nada extra.",
      o: ["Verdadero", "Falso"],
      c: 1,
      fijo: true,
      bien: "Las horas extra se pagan con un valor adicional.",
      recuerda: "Las horas extra son el tiempo que trabajas fuera de tu horario. Te las deben pagar con un valor adicional.",
      sec: 1,
    },
    {
      q: "¿Cuándo deben estar claras tus funciones?",
      o: ["Desde el primer día", "Cuando pasen unos meses", "Nunca, las debo adivinar"],
      bien: "Desde el primer día, y tu jefe te explica cómo hacerlas.",
      recuerda: "Tus funciones deben estar claras desde el primer día. Tu jefe te explicará cómo hacer cada tarea de forma segura y correcta.",
      sec: 2,
    },
    {
      q: "¿Cuál de estas cosas es un derecho tuyo como trabajador?",
      o: ["Recibir tu pago a tiempo", "Pagar tú solo tu salud y tu ARL", "Trabajar sin ningún descanso"],
      bien: "Recibir tu pago a tiempo es un derecho.",
      recuerda: "Tienes derecho a un sueldo justo: recibir tu pago a tiempo, en las fechas acordadas.",
      sec: 3,
    },
    {
      q: "¿Quién debe pagar tu salud (EPS), tu pensión y tus riesgos laborales (ARL)?",
      o: ["La empresa debe pagarlos", "Solo tú, de tu bolsillo", "Nadie, son opcionales"],
      bien: "La seguridad social es un derecho que la empresa debe cumplir.",
      recuerda: "La seguridad social es un derecho: la empresa debe pagar tu salud (EPS), tu pensión y tus riesgos laborales (ARL).",
      sec: 3,
    },
  ],

  2: [
    {
      q: "Si te pagan cada 15 días, ¿qué días del mes te pagan?",
      o: ["Los días 15 y 30", "Los días 1 y 10", "Solo el último día"],
      bien: "Cada 15 días te pagan los días 15 y 30 de cada mes.",
      recuerda: "Si te pagan cada 15 días, te pagan los días 15 y 30 de cada mes.",
      sec: 0,
    },
    {
      q: "El día de pago cae domingo o festivo. ¿Cuándo te pagan?",
      o: ["El día hábil anterior", "Dos semanas después", "No te pagan ese mes"],
      bien: "Te pagan el día hábil anterior.",
      recuerda: "Si el día de pago es domingo o festivo, te pagan el día hábil anterior.",
      sec: 0,
    },
    {
      q: "¿Dónde sacar tu dinero sin pagar costo adicional?",
      o: ["En cajeros de tu mismo banco", "En cajeros de cualquier otro banco", "No se puede sacar sin costo"],
      bien: "En cajeros de tu mismo banco no se paga nada.",
      recuerda: "En cajeros de tu mismo banco, sacar dinero no tiene costo. En cajeros de otro banco sí hay un costo adicional.",
      sec: 1,
    },
    {
      q: "Estás obligado a abrir una cuenta en el banco de tu empresa.",
      o: ["Verdadero", "Falso"],
      c: 1,
      fijo: true,
      bien: "Tú eliges tu banco. La empresa debe respetarlo.",
      recuerda: "Tú eliges tu banco. La empresa debe respetarlo y puedes pedir que te paguen en tu cuenta de siempre.",
      sec: 2,
    },
  ],

  3: [
    {
      q: "¿Qué es el Reglamento Interno de Trabajo?",
      o: ["Un documento con las normas de la empresa", "Una lista de los compañeros", "El recibo de tu sueldo"],
      bien: "Es el documento con las normas de la empresa.",
      recuerda: "El Reglamento Interno de Trabajo es un documento con las normas de la empresa. Ayuda a organizar el trabajo y a resolver dudas.",
      sec: 0,
    },
    {
      q: "El reglamento solo sirve para decir lo que está prohibido.",
      o: ["Verdadero", "Falso"],
      c: 1,
      fijo: true,
      bien: "También te ayuda a conocer tu lugar de trabajo y a hacer bien tus tareas.",
      recuerda: "El reglamento no es solo para decir qué está prohibido. Te sirve para conocer cómo funciona tu lugar de trabajo y saber qué hacer para hacer bien tu trabajo.",
      sec: 1,
    },
    {
      q: "Necesitas faltar al trabajo. ¿Dónde puedes ver qué hacer?",
      o: ["En el reglamento, en permisos y ausencias", "En ningún lado, solo no voy", "En el recibo de pago"],
      bien: "El reglamento explica cómo pedir un permiso.",
      recuerda: "El reglamento tiene una parte de permisos y ausencias: dice qué hacer si necesitas faltar o pedir un permiso.",
      sec: 2,
    },
    {
      q: "¿Dónde puedes saber qué pasa si no cumples una norma?",
      o: ["En el reglamento, en faltas y consecuencias", "En la cartelera del banco", "No se puede saber"],
      bien: "Las faltas y sus consecuencias están en el reglamento.",
      recuerda: "El reglamento tiene una parte de faltas y consecuencias: dice qué pasa si no cumples las normas.",
      sec: 2,
    },
  ],

  4: [
    {
      q: "¿Qué es una EPS?",
      o: ["Una empresa que organiza los servicios de salud", "Un hospital donde te operan", "Un banco para guardar tu dinero"],
      bien: "Las EPS organizan los servicios de salud.",
      recuerda: "Las EPS son las empresas que organizan los servicios de salud para las personas.",
      sec: 0,
    },
    {
      q: "¿Quién te atiende directamente cuando vas al médico?",
      o: ["Una IPS", "La EPS", "La caja de compensación"],
      bien: "Te atienden en las IPS: hospitales, clínicas, laboratorios y centros médicos.",
      recuerda: "Las EPS no te atienden directamente. Te atienden en las IPS: Instituciones Prestadoras de Servicios de Salud.",
      sec: 3,
    },
    {
      q: "¿Cuál de estos lugares es una IPS?",
      o: ["Un laboratorio", "Sanitas", "Sura"],
      bien: "Los laboratorios son IPS. Sanitas y Sura son EPS.",
      recuerda: "Las IPS son hospitales, clínicas, laboratorios y centros médicos. Sanitas y Sura son EPS.",
      sec: 3,
    },
    {
      q: "La EPS autoriza los servicios médicos.",
      o: ["Verdadero", "Falso"],
      fijo: true,
      bien: "La EPS autoriza los servicios y decide qué hospitales y médicos te atienden.",
      recuerda: "Entre las cosas que hacen las EPS están: autorizar los servicios médicos y decidir qué hospitales y médicos te atienden.",
      sec: 1,
    },
  ],

  5: [
    {
      q: "¿Qué significa ARL?",
      o: ["Administradora de Riesgos Laborales", "Asociación de Rutas Libres", "Agencia de Remedios Locales"],
      bien: "ARL es la Administradora de Riesgos Laborales.",
      recuerda: "ARL significa Administradora de Riesgos Laborales. Te protege de los riesgos, accidentes y enfermedades que pueden pasar en tu trabajo.",
      sec: 0,
    },
    {
      q: "Te resbalas en el trabajo y te lastimas el pie. ¿Qué es?",
      o: ["Un accidente laboral", "Una enfermedad laboral", "Un permiso"],
      bien: "Es algo que pasa de repente mientras trabajas: un accidente laboral.",
      recuerda: "Un accidente laboral es algo que pasa de repente mientras haces tu trabajo y causa una lesión en tu cuerpo o en tu salud.",
      sec: 1,
    },
    {
      q: "Te enfermas por el tipo de trabajo que haces o el lugar donde trabajas. ¿Qué es?",
      o: ["Una enfermedad laboral", "Un accidente laboral", "Una vacación"],
      bien: "Es una enfermedad laboral.",
      recuerda: "Una enfermedad laboral es una enfermedad que te da por el tipo de trabajo que haces o por el lugar donde trabajas.",
      sec: 2,
    },
    {
      q: "Tuviste un golpe pequeño en el trabajo. ¿Qué haces?",
      o: ["Aviso a mi jefe, aunque parezca pequeño", "No digo nada para no meterme en problemas", "Espero a ver si me duele más tarde"],
      bien: "Siempre se avisa. Avisar es tu derecho y no te mete en problemas.",
      recuerda: "Siempre avisa a tu jefe, aunque el golpe parezca pequeño. Si no avisas, es más difícil que la ARL te atienda y te cubra.",
      sec: 1,
    },
  ],

  6: [
    {
      q: "¿Qué son los fondos de cesantías?",
      o: ["Empresas que guardan y cuidan tu dinero de ahorro", "Lugares donde te hacen exámenes", "Tiendas con descuentos"],
      bien: "Son las empresas que guardan y cuidan tu ahorro.",
      recuerda: "Los fondos de cesantías son las empresas que guardan y cuidan tu dinero de ahorro.",
      sec: 0,
    },
    {
      q: "¿Cuál es el fondo público de cesantías?",
      o: ["El Fondo Nacional del Ahorro (FNA)", "Porvenir", "Colfondos"],
      bien: "El FNA es una empresa del Estado.",
      recuerda: "El Fondo Nacional del Ahorro (FNA) es el fondo público, una empresa del Estado. Porvenir, Protección, Colfondos y Skandia son fondos privados.",
      sec: 2,
    },
    {
      q: "¿Para qué puedes sacar una parte de tus cesantías?",
      o: ["Para tu vivienda o para pagar estudios", "Para salir de paseo", "Para comprar ropa"],
      bien: "El retiro parcial es para vivienda o estudios.",
      recuerda: "El retiro parcial (sacar una parte) es para tu vivienda o para pagar estudios.",
      sec: 3,
    },
    {
      q: "¿Cuándo puedes sacar todas tus cesantías?",
      o: ["Cuando termina tu contrato", "Cuando quieras, sin razón", "Cada mes"],
      bien: "Cuando termina el contrato puedes sacar todo.",
      recuerda: "Para sacar tu dinero debes tener una razón que permita la ley. El retiro total es cuando termina tu contrato, cuando haces el servicio militar o si el trabajador fallece.",
      sec: 3,
    },
  ],

  7: [
    {
      q: "¿Qué es la pensión?",
      o: ["Un dinero que recibes cada mes cuando ya no trabajas", "Un premio por llegar temprano", "Un préstamo del banco"],
      bien: "Es un dinero mensual para cuando ya no trabajas.",
      recuerda: "La pensión es un dinero que recibes cada mes cuando ya no trabajas.",
      sec: 0,
    },
    {
      q: "¿Cómo se construye tu pensión?",
      o: ["Tú y tu empresa guardan un dinero cada mes", "Solo la empresa guarda un dinero", "No se guarda nada, el Estado la regala"],
      bien: "Ese dinero se llama aporte pensional.",
      recuerda: "Mientras trabajas, tú y tu empresa guardan un dinero cada mes. Ese dinero se llama aporte pensional.",
      sec: 1,
    },
    {
      q: "¿Cuál fondo de pensiones maneja el Estado?",
      o: ["Colpensiones", "Un fondo privado", "La caja de compensación"],
      bien: "Colpensiones es el fondo público.",
      recuerda: "El fondo público de pensiones es Colpensiones, lo maneja el Estado. Los fondos privados los manejan empresas privadas.",
      sec: 2,
    },
    {
      q: "Si un trabajador fallece, ¿qué pensión protege a su familia?",
      o: ["La pensión de sobrevivientes", "La pensión de vejez", "La pensión familiar"],
      bien: "La pensión de sobrevivientes es para esposo, esposa o hijos.",
      recuerda: "Con la pensión de sobrevivientes, si un trabajador o pensionado fallece, el dinero se le da a su familia (esposo, esposa o hijos).",
      sec: 3,
    },
    {
      q: "Llegas a la edad de pensión pero no completaste las semanas. ¿Qué pasa?",
      o: ["El fondo te devuelve tu dinero ahorrado en un solo pago", "Pierdes todo tu dinero", "Recibes la pensión igual cada mes"],
      bien: "No pierdes tu ahorro: te lo devuelven en un solo pago.",
      recuerda: "Si no tienes las semanas necesarias, no recibes una pensión cada mes, pero el fondo te devuelve todo tu dinero ahorrado en un solo pago.",
      sec: 4,
    },
  ],

  8: [
    {
      q: "¿Qué es la Caja de Compensación Familiar?",
      o: ["Una organización que ayuda a los trabajadores y a sus familias", "Un banco que cobra intereses altos", "Una empresa de transporte"],
      bien: "Ayuda a mejorar la vida de los trabajadores y sus familias.",
      recuerda: "La Caja de Compensación es una organización que ayuda a mejorar la vida de los trabajadores y sus familias. No busca ganar dinero y el Estado la vigila.",
      sec: 0,
    },
    {
      q: "¿Qué es la cuota monetaria?",
      o: ["Dinero cada mes por cada hijo o familiar a tu cargo", "Un descuento en el sueldo", "Un curso de cocina"],
      bien: "Es dinero cada mes por cada hijo o familiar a tu cargo.",
      recuerda: "La cuota monetaria es dinero cada mes por cada hijo o familiar a tu cargo. Es para trabajadores con sueldos bajos o medios.",
      sec: 1,
    },
    {
      q: "Necesitas útiles, uniformes o zapatos para el colegio. ¿Qué ayuda te sirve?",
      o: ["El subsidio educativo", "El subsidio de vivienda", "La agencia de empleo"],
      bien: "El subsidio educativo ayuda con útiles, uniformes o zapatos.",
      recuerda: "El subsidio educativo es una ayuda para útiles, uniformes o zapatos para el colegio.",
      sec: 1,
    },
    {
      q: "Te quedaste sin empleo. ¿Qué servicio de la caja te puede ayudar?",
      o: ["La agencia de empleo, que es gratis", "Los créditos", "La recreación y el turismo"],
      bien: "La agencia de empleo te ayuda gratis a buscar trabajo.",
      recuerda: "La agencia de empleo te ayuda gratis a buscar trabajo si te quedas sin empleo.",
      sec: 2,
    },
  ],

  9: [
    {
      q: "¿Cómo debes avisar que renuncias?",
      o: ["Por escrito, con una carta y la fecha en que te vas", "No hace falta avisar", "Solo con un mensaje a un compañero"],
      bien: "Se avisa por escrito y diciendo la fecha en que te vas.",
      recuerda: "Debes avisar a tu empresa por escrito, con una carta de renuncia, y decir la fecha en que te vas.",
      sec: 0,
    },
    {
      q: "Si renuncias, pierdes el dinero del tiempo que trabajaste.",
      o: ["Verdadero", "Falso"],
      c: 1,
      fijo: true,
      bien: "No lo pierdes. La empresa debe pagarte.",
      recuerda: "Aunque renuncies, la empresa debe pagarte el dinero por el tiempo que trabajaste.",
      sec: 0,
    },
    {
      q: "¿Qué es la liquidación?",
      o: ["El último pago que te da la empresa cuando termina tu contrato", "Una multa por irte", "El primer pago de tu trabajo"],
      bien: "Es el último pago de la empresa.",
      recuerda: "La liquidación es el último pago que te da la empresa cuando termina tu contrato. Incluye sueldo pendiente, prestaciones y vacaciones.",
      sec: 2,
    },
    {
      q: "¿Cuándo te deben pagar una indemnización?",
      o: ["Solo si la empresa te despide sin una causa justa", "Siempre que termina un contrato", "Cuando tú renuncias"],
      bien: "La indemnización es solo si te despiden sin una causa justa.",
      recuerda: "La indemnización es solo si la empresa te despide sin una causa justa.",
      sec: 2,
    },
    {
      q: "¿Qué documento dice cuándo empezaste, cuándo saliste, tu cargo y tu sueldo?",
      o: ["El certificado laboral", "El paz y salvo", "El examen médico de retiro"],
      bien: "El certificado laboral cuenta tu historia en la empresa.",
      recuerda: "El certificado laboral dice cuándo empezaste, cuándo saliste, tu cargo y tu sueldo. El paz y salvo dice que no le debes nada a la empresa.",
      sec: 3,
    },
  ],
};
