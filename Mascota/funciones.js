document.addEventListener('DOMContentLoaded', function() {

    // Obtener el elemento de la mascota
    const mascota = document.querySelector('.mascota');
    // Obtener el botón para abrir el menú de comida
    const btnComida = document.getElementById('btnComida');

    // Obtener el elemento de audio para las cosquillas
    const cosquillasAudio = document.getElementById('cosquillasAudio');
    // Obtener el elemento de audio para comer
    const audioComida = document.getElementById('audioComida');

    // Obtener el modal de comida y el botón para cerrarlo
    const modalComida = document.getElementById('modalComida');
    const cerrarModal = document.getElementById('cerrarModal');

        // Obtener la lista de comida y los botones "Dar"
        const listaComida = document.getElementById('listaComida');
        const botonesDar = document.querySelectorAll('.btn-dar');

    // Agregar un evento de clic al botón de comida para mostrar el modal
    btnComida.addEventListener('click', () => {
        modalComida.style.display = 'block'; // Mostrar el modal
    });

    // Agregar un evento de clic al botón "Cerrar" del modal para cerrarlo
    cerrarModal.addEventListener('click', () => {
        modalComida.style.display = 'none'; // Ocultar el modal
    });

    // Agregar un evento de clic a la mascota
    mascota.addEventListener('click', () => {
        // Reproducir el sonido de cosquillas
        cosquillasAudio.currentTime = 0; // Reiniciar la reproducción si ya está sonando
        cosquillasAudio.play();

        // Llamar a la función para hacer cosquillas y gestionar la felicidad
        hacerCosquillas();
    });

    // Variables para los atributos de la mascota
    let felicidad = 50;
    let hambre = 50;
    let salud = 100;

    // Función para actualizar la visualización de los atributos en el DOM
    function actualizarAtributos() {
        document.getElementById('felicidad').textContent = `${felicidad}%`;
        document.getElementById('hambre').textContent = `${hambre}%`;
        document.getElementById('salud').textContent = `${salud}%`;
    }
    

    // Función para hacer cosquillas a la mascota y gestionar la felicidad
    function hacerCosquillas() {
        // Aumentar la felicidad en un 10%
        felicidad += 10;

        // Limitar la felicidad a un máximo del 100%
        if (felicidad > 100) {
            felicidad = 100;
        }

        // Actualizar la visualización de los atributos
        actualizarAtributos();
    }

    // Establecer un temporizador para reducir la felicidad cada 10 segundos
    setInterval(() => {
        felicidad -= 5;
        
        // Limitar la felicidad a un mínimo del 0%
        if (felicidad < 0) {
            felicidad = 0;
        }
        
        // Actualizar la visualización de los atributos
        actualizarAtributos();
    }, 5000); // 10 segundos (en milisegundos)

    // Temporizador para reducir el hambre en un 1% cada 10 segundos
    setInterval(() => {
        // Reducir el hambre en un 1%
        hambre -= 5;

        // Limitar el hambre a un mínimo del 0%
        if (hambre < 0) {
            hambre = 0;
        }

        // Actualizar la visualización de los atributos
        actualizarAtributos();
    }, 5000); // 10 segundos (en milisegundos)

    // Agregar un evento de clic a los botones "Dar" de la comida
    botonesDar.forEach((boton) => {
        boton.addEventListener('click', () => {
            // Obtener el elemento padre del botón, que es el <li> de la comida
            const comidaItem = boton.parentElement;

            // Obtener la cantidad disponible de comida
            const cantidadComidaElement = comidaItem.querySelector('.cantidad-comida');
            let cantidadDisponible = parseInt(cantidadComidaElement.textContent);

            // Verificar que haya comida disponible y que el nivel de hambre no esté al máximo (100%)
            if (cantidadDisponible > 0 && hambre < 100) {
                // Calcular cuánto hambre se va a satisfacer (por ejemplo, 10%)
                const hambreASatisfacer = 10;

                // Calcular cuánta comida se va a dar (por ejemplo, 1 unidad)
                const cantidadADar = 1;

                // Verificar si dar esta cantidad de comida superaría el 100% de hambre
                if (hambre + hambreASatisfacer > 100) {
                    // Calcular cuánto hambre se puede satisfacer sin superar el 100%
                    const hambreRestante = 100 - hambre;
                    const comidaADar = (hambreRestante / hambreASatisfacer) * cantidadADar;

                    // Actualizar el nivel de hambre y la cantidad de comida disponible
                    hambre = 100;
                    cantidadDisponible -= comidaADar;
                } else {
                    // Actualizar el nivel de hambre y la cantidad de comida disponible
                    hambre += hambreASatisfacer;
                    cantidadDisponible -= cantidadADar;
                }

                
                // Reproducir el audio de comida al dar comida
                audioComida.currentTime = 0; // Reiniciar la reproducción si ya está sonando
                audioComida.play();

                // Actualizar la cantidad disponible de comida en el elemento
                cantidadComidaElement.textContent = `${cantidadDisponible} disponibles`;

                // Actualizar la visualización de los atributos
                actualizarAtributos();
            }
        });
    });

    // Llama a la función para mostrar los valores iniciales
    actualizarAtributos();
});