const preguntas = [
    {
        pregunta: "¿Cuál es el río más largo del mundo?",
        opciones: ["Amazonas", "Yangtsé", "Misisipi", "Nilo"],
        respuesta: "Nilo"
    },
    {
        pregunta: "¿Cuál es la película más taquillera de todos los tiempos?",
        opciones: ["Avatar", "Titanic", "Avengers: Endgame", "Star Wars: El despertar de la fuerza"],
        respuesta: "Avengers: Endgame"
    },
    {
        pregunta: "¿Quién escribió 'Don Quijote de la Mancha'?",
        opciones: ["Cervantes", "Shakespeare", "García Márquez", "Tolstói"],
        respuesta: "Cervantes"
    },
    {
        pregunta: "¿Quién fue Manuel Belgrano?",
        opciones: ["Un explorador europeo", "Un prócer de la Independencia Argentina", "Un líder revolucionario francés", "El que mando a River a la B"],
        respuesta: "Un prócer de la Independencia Argentina"
    },
    {
        pregunta: "¿Cuándo cayó el Muro de Berlín?",
        opciones: ["1989", "1991", "1993", "1987"],
        respuesta: "1989"
    },
    {
        pregunta: "¿Cuál es el pogo más grande del mundo?",
        opciones: ["El 38-Divididos", "Nos Siguen Pegando Abajo-Charly García", "Ji Ji Ji-Los Redondos", "El Rebelde-La Renga"],
        respuesta: "Ji Ji Ji-Los Redondos"
    },
    {
        pregunta: "¿Cuál es el club más grande de Argentina?",
        opciones: ["Boca Juniors", "River Plate", "Independiente", "Racing Club"],
        respuesta: "Boca Juniors"
    },
    {
        pregunta: "¿Quién es Diosito?",
        opciones: ["Maradona", "Personaje de 'Breaking Bad'", "Personaje de 'El Marginal'", "Ninguna de las anteriores"],
        respuesta: "Personaje de 'El Marginal'"
    },
    {
        pregunta: "¿Cuál es la montaña más alta del mundo?",
        opciones: ["Monte Everest", "K2", "Kangchenjunga", "Lhotse"],
        respuesta: "Monte Everest"
    }
];

// Variable para almacenar el puntaje del jugador
let puntaje = 0;

// Variable para almacenar las respuestas del usuario
let respuestasUsuario = [];

// Definir niveles y puntos por nivel
const niveles = {
    1: {
        nombre: "Nivel 1",
        puntosPorPregunta: 50,
        cantidadPreguntas: preguntas.length / 2 // Mitad de las preguntas para el nivel 1
    },
    2: {
        nombre: "Nivel 2",
        puntosPorPregunta: 100,
        cantidadPreguntas: preguntas.length - (preguntas.length / 2) // Resto de las preguntas para el nivel 2
    }
};

// Función para solicitar nombre y apellido del jugador
function ingresarNombre() {
    let nombre, apellido;
    do {
        nombre = prompt("Por favor, ingresa tu nombre:");
        if (!nombre || !isNaN(nombre)) {
            alert("Error: Por favor, ingresa un nombre válido.");
        }
    } while (!nombre || !isNaN(nombre));

    do {
        apellido = prompt("Por favor, ingresa tu apellido:");
        if (!apellido || !isNaN(apellido)) {
            alert("Error: Por favor, ingresa un apellido válido.");
        }
    } while (!apellido || !isNaN(apellido));

    return nombre + " " + apellido;
}

// Función para obtener un arreglo de preguntas en orden aleatorio
function obtenerPreguntasAleatorias(preguntas) {
   
    const preguntasAleatorias = preguntas.slice();
    

    for (let i = preguntasAleatorias.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [preguntasAleatorias[i], preguntasAleatorias[j]] = [preguntasAleatorias[j], preguntasAleatorias[i]];
    }
    
    return preguntasAleatorias;
}

// Función para presentar las preguntas y evaluar las respuestas
function jugar() {
    const nombreCompleto = ingresarNombre();
    if (!nombreCompleto) {
        alert("Nombre y apellido no ingresados. El juego se ha cancelado.");
        return;
    }

    alert(`¡Bienvenido a TriviaPuch, ${nombreCompleto}!`);

    // Obtener preguntas aleatorias
    const preguntasAleatorias = obtenerPreguntasAleatorias(preguntas);

    let nivelActual = 1;
    let preguntasRespondidas = 0;

    // Iterar sobre cada pregunta en orden aleatorio
    for (let i = 0; i < preguntasAleatorias.length; i++) {
        const pregunta = preguntasAleatorias[i];

        const respuestaUsuario = prompt(`${pregunta.pregunta}\nOpciones:\n1. ${pregunta.opciones[0]}\n2. ${pregunta.opciones[1]}\n3. ${pregunta.opciones[2]}\n4. ${pregunta.opciones[3]}\nPara cancelar el juego, ingresa 0:`);

        // Verificar si el usuario ingresó una respuesta válida y evaluarla
        if (respuestaUsuario === null) {
            // El usuario ha cancelado el juego
            alert("Juego cancelado por el jugador.");
            break;
        }

        if (respuestaUsuario >= 1 && respuestaUsuario <= 4) {
            const respuestaElegida = pregunta.opciones[respuestaUsuario - 1];
            evaluarRespuesta(pregunta, respuestaElegida, niveles[nivelActual].puntosPorPregunta);
            respuestasUsuario.push({ pregunta: pregunta.pregunta, respuesta: respuestaElegida });
            preguntasRespondidas++;

            // Verificar si es necesario avanzar al siguiente nivel
            if (preguntasRespondidas >= niveles[nivelActual].cantidadPreguntas && nivelActual < 2) {
                nivelActual++;
                preguntasRespondidas = 0;
                alert(`¡Felicidades! Has avanzado al ${nivelActual}.`);

                // Reiniciar el contador de preguntas respondidas para el nuevo nivel
                preguntasRespondidas = 0;
            }
        } else {
            alert("Por favor, ingresa un número válido correspondiente a una opción o 0 para cancelar el juego.");
            i--; 
        }
    }

    // Mostrar el puntaje final al jugador
    alert(`¡Juego terminado, ${nombreCompleto}!\nPuntaje final: ${puntaje}`);

    // Preguntar si desea canjear premios
    const respuestaPremios = prompt("¿Deseas canjear premios con tus puntos ganados? (Sí/No)").toLowerCase();
    if (respuestaPremios === "sí" || respuestaPremios === "si") {
        alert("¡Genial! Te has ganado unos premios. Puedes canjearlos aquí.");
        // Aquí podrías implementar la lógica para canjear premios
    } else {
        alert("¡Gracias por jugar! ¡Hasta la próxima!");
    }
}

// Función para evaluar la respuesta del usuario y actualizar el puntaje
function evaluarRespuesta(pregunta, respuestaUsuario, puntos) {
    if (respuestaUsuario === pregunta.respuesta) {
        alert("¡Respuesta correcta!");
        puntaje += puntos; // Sumar los puntos correspondientes
    } else {
        alert(`Respuesta incorrecta. La respuesta correcta es: ${pregunta.respuesta}`);
    }
}

// Llamar a la función para iniciar el juego
jugar();