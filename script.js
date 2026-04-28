// 1. Array con nuestras 5 preguntas
const preguntas = [
    {
        pregunta: "¿Qué significa HTML?",
        opciones: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks Text Language"],
        respuestaCorrecta: "HyperText Markup Language"
    },
    {
        pregunta: "¿Qué lenguaje se encarga del diseño web?",
        opciones: ["JavaScript", "HTML", "CSS"],
        respuestaCorrecta: "CSS"
    },
    {
        pregunta: "¿Cómo se declara una variable en JavaScript?",
        opciones: ["var", "let", "Ambas son correctas"],
        respuestaCorrecta: "Ambas son correctas"
    },
    {
        pregunta: "¿Qué etiqueta HTML se usa para insertar JavaScript?",
        opciones: ["<javascript>", "<script>", "<js>"],
        respuestaCorrecta: "<script>"
    },
    {
        pregunta: "¿Qué símbolo se usa para un ID en CSS?",
        opciones: [".", "*", "#"],
        respuestaCorrecta: "#"
    },
    {
        pregunta: "¿Skibidi sabe programar?",
        opciones: ["si", "no", "tal vez"],
        respuestaCorrecta: "si"
    },
    {
        pregunta:"josias es infiel?",
        opciones:["si","no","tal vez"],
        respuestaCorrecta:"si"
    }
];

// 2. Variables de estado
let indicePreguntaActual = 0;
let puntuacion = 0;
let tiempoRestante = 60;
let intervaloTemporizador;

// 3. Referencias al HTML
const elementoTiempo = document.getElementById("tiempo");
const elementoPregunta = document.getElementById("pregunta");
const contenedorOpciones = document.getElementById("opciones");
const areaQuiz = document.getElementById("area-quiz");
const areaResultado = document.getElementById("area-resultado");
const elementoPuntuacion = document.getElementById("puntuacion");
const btnReiniciar = document.getElementById("btn-reiniciar");

// 4. Función para iniciar el juego
function iniciarJuego() {
    indicePreguntaActual = 0;
    puntuacion = 0;
    tiempoRestante = 60;
    
    areaResultado.style.display = "none";
    areaQuiz.style.display = "block";
    
    elementoTiempo.textContent = tiempoRestante;
    
    mostrarPregunta();
    iniciarTemporizador();
}

// 5. Función de la cuenta regresiva
function iniciarTemporizador() {
    // Limpiamos cualquier temporizador anterior por seguridad
    clearInterval(intervaloTemporizador);
    
    intervaloTemporizador = setInterval(function() {
        tiempoRestante--;
        elementoTiempo.textContent = tiempoRestante;
        
        // Si el tiempo llega a cero, termina el juego
        if (tiempoRestante <= 0) {
            terminarJuego();
        }
    }, 1000); // 1000 milisegundos = 1 segundo
}

// 6. Función para mostrar la pregunta actual
function mostrarPregunta() {
    const preguntaActual = preguntas[indicePreguntaActual];
    elementoPregunta.textContent = preguntaActual.pregunta;
    
    // Limpiamos las opciones anteriores
    contenedorOpciones.innerHTML = "";
    
    // Creamos un botón por cada opción
    preguntaActual.opciones.forEach(function(opcion) {
        const boton = document.createElement("button");
        boton.textContent = opcion;
        boton.classList.add("btn-opcion");
        
        // Agregamos el evento clic para verificar la respuesta
        boton.addEventListener("click", function() {
            verificarRespuesta(opcion, preguntaActual.respuestaCorrecta);
        });
        
        contenedorOpciones.appendChild(boton);
    });
}

// 7. Función para verificar la respuesta
function verificarRespuesta(opcionElegida, respuestaCorrecta) {
    if (opcionElegida === respuestaCorrecta) {
        puntuacion++;
    }
    
    indicePreguntaActual++;
    
    // Si aún hay preguntas, mostramos la siguiente. Si no, terminamos.
    if (indicePreguntaActual < preguntas.length) {
        mostrarPregunta();
    } else {
        terminarJuego();
    }
}

// 8. Función para finalizar
function terminarJuego() {
    // Detenemos el reloj
    clearInterval(intervaloTemporizador);
    
    // Ocultamos las preguntas y mostramos el resultado
    areaQuiz.style.display = "none";
    areaResultado.style.display = "block";
    
    elementoPuntuacion.textContent = puntuacion;
}

// 9. Evento para el botón de reiniciar
btnReiniciar.addEventListener("click", iniciarJuego);

// ¡Iniciamos el juego por primera vez al cargar!
iniciarJuego();
