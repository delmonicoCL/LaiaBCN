
// CARGA LISTA DE IMAGENES A LAS VARIABLES ///

          // Galería de imágenes para la página "eolica.html"
              var imagenesEo = [
                { id: "drag1", src: "assets/images/eolica/imagen-0.jpg", area: "div1" },
                { id: "drag2", src: "assets/images/eolica/imagen-1.jpg", area: "div2" },
                { id: "drag3", src: "assets/images/eolica/imagen-2.jpg", area: "div3" },
                { id: "drag4", src: "assets/images/eolica/imagen-3.jpg", area: "div4" },
                { id: "drag5", src: "assets/images/eolica/imagen-4.jpg", area: "div5" },
                { id: "drag6", src: "assets/images/eolica/imagen-5.jpg", area: "div6" },
                { id: "drag7", src: "assets/images/eolica/imagen-6.jpg", area: "div7" },
                { id: "drag8", src: "assets/images/eolica/imagen-7.jpg", area: "div8" },
                { id: "drag9", src: "assets/images/eolica/imagen-8.jpg", area: "div9" }
              ];
              
              // Galería de imágenes para la página "solar.html"
              var imagenesSol = [
                { id: "drag1", src: "assets/images/solar/imagen-0.jpg", area: "div1" },
                { id: "drag2", src: "assets/images/solar/imagen-1.jpg", area: "div2" },
                { id: "drag3", src: "assets/images/solar/imagen-2.jpg", area: "div3" },
                { id: "drag4", src: "assets/images/solar/imagen-3.jpg", area: "div4" },
                { id: "drag5", src: "assets/images/solar/imagen-4.jpg", area: "div5" },
                { id: "drag6", src: "assets/images/solar/imagen-5.jpg", area: "div6" },
                { id: "drag7", src: "assets/images/solar/imagen-6.jpg", area: "div7" },
                { id: "drag8", src: "assets/images/solar/imagen-7.jpg", area: "div8" },
                { id: "drag9", src: "assets/images/solar/imagen-8.jpg", area: "div9" }
              ];

              // Galería de imágenes para la página "solar.html"
              var imagenesBat = [
                { id: "drag1", src: "assets/images/bateria/imagen-0.jpg", area: "div1" },
                { id: "drag2", src: "assets/images/bateria/imagen-1.jpg", area: "div2" },
                { id: "drag3", src: "assets/images/bateria/imagen-2.jpg", area: "div3" },
                { id: "drag4", src: "assets/images/bateria/imagen-3.jpg", area: "div4" },
                { id: "drag5", src: "assets/images/bateria/imagen-4.jpg", area: "div5" },
                { id: "drag6", src: "assets/images/bateria/imagen-5.jpg", area: "div6" },
                { id: "drag7", src: "assets/images/bateria/imagen-6.jpg", area: "div7" },
                { id: "drag8", src: "assets/images/bateria/imagen-7.jpg", area: "div8" },
                { id: "drag9", src: "assets/images/bateria/imagen-8.jpg", area: "div9" }
              ];
      
    // Función para cargar las imágenes en un orden aleatorio
    function cargarImagenesAleatorias(galeria) {
      // Mezcla aleatoriamente el orden de las imágenes en el array
      galeria.sort(function() {
        return 0.5 - Math.random();
      });

      // Obtén el elemento contenedor donde se cargarán las imágenes
      var grilla = document.getElementById("grilla");

      // Crea y asigna las imágenes en el orden aleatorio a los elementos img
      for (var i = 0; i < galeria.length; i++) {
        let j = i + 1;
        const nuevaImg = document.createElement('img');
        nuevaImg.id = galeria[i].id;
        nuevaImg.className = 'DragContainer';
        nuevaImg.src= galeria[i].src;
        nuevaImg.setAttribute('draggable','true');
        nuevaImg.setAttribute('ondragstart','drag(event)');
        nuevaImg.setAttribute('areaDondeSoltar',galeria[i].area);
     
        grilla.appendChild(nuevaImg);
      }
    }

    // Funcion para generar divs contenedores de las imagenes
    function generarContenedorPuzzle() {
    const contenedor = document.getElementById('contenedor-puzzle');

        for (let i = 1; i <= 9; i++) {
          const nuevoDiv = document.createElement('div');
          nuevoDiv.id = `div${i}`;
          nuevoDiv.className = 'ImagContainer';
          nuevoDiv.setAttribute('ondrop', `drop(event, 'div${i}')`);
          nuevoDiv.setAttribute('ondragover', 'allowDrop(event)');

          contenedor.appendChild(nuevoDiv);
        }
  }

  // Llama a la función para generar el contenedor de puzzle después de que el DOM se haya cargado completamente
  document.addEventListener("DOMContentLoaded", function () {
    generarContenedorPuzzle();
  });
      
    // Llama a la función para cargar las imágenes en un orden aleatorio después de que el DOM se haya cargado completamente
    document.addEventListener("DOMContentLoaded", function() {
      var currentPage = window.location.pathname; // Obtiene la ruta de la página actual

            if (currentPage.includes("eolica.html")) {
              cargarImagenesAleatorias(imagenesEo);
            } else if (currentPage.includes("solar.html")) {
              cargarImagenesAleatorias(imagenesSol);
            } else if (currentPage.includes("bateria.html")) {
              cargarImagenesAleatorias(imagenesBat);
            }

    });
// CARGA LISTA DE IMAGENES A LAS VARIABLES ///

// DRAG AND DROP ///


  // Función que se activa cuando un elemento arrastrado se encuentra sobre un área que puede recibirlo.
  function allowDrop(ev) {
      ev.preventDefault();
  }

  // Función que se activa cuando comienza a arrastrar un elemento.
  function drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
  }

  const piezaCorrectaSound = new Audio('assets/media/piezacorrecta.mp3');

  // Función que se activa cuando se suelta un elemento.
  function drop(ev, areaId) {
      ev.preventDefault();
      var idElementQueSeArrastra = ev.dataTransfer.getData("text");
      var imagenQueSeArrastra = document.getElementById(idElementQueSeArrastra);
      var zonaCorrectaParaSoltarImagen = document.getElementById(areaId);
      var piezasCorrectas = 0;
      
      if (imagenQueSeArrastra.getAttribute('areaDondeSoltar') === zonaCorrectaParaSoltarImagen.id) {
          zonaCorrectaParaSoltarImagen.appendChild(imagenQueSeArrastra);
          piezaCorrectaSound.play();
      }
  }

// Función para verificar si el rompecabezas está completo
function verificarRompecabezasCompleto() {
      var piezasCorrectas = 0;

    // Verifica que cada área tenga una imagen con el atributo areaDondeSoltar correspondiente
      for (var i = 1; i <= 9; i++) {
          var area = document.getElementById("div" + i);
          var pieza = area.querySelector(".DragContainer");

          if (pieza && pieza.getAttribute("areaDondeSoltar") === "div" + i) {
              piezasCorrectas++;
          }
      }

  var puntajeSOL= 0;
  var puntajeEO = 0;
  var puntajeBAT = 0;
  var puntajeFINAL = 0;
  

// Si las X piezas son correctas ///  
      if (piezasCorrectas === 9) {
          timeSound.pause();
          detenerTemporizador();

          let tiempoPorcentaje = ((timeLeft*100)/TIME_LIMIT);
                                
                let puntaje = (tiempoPorcentaje + 50);
                
                // Redondear a la cifra entera más cercana
                let puntajeRedondeado = Math.round(puntaje);
                
                // Convertir a un entero
                let puntajeEntero = parseInt(puntajeRedondeado);
        
                // puntaje de la jugada
                //  alert("Obtuviste " + puntajeEntero + ' PUNTOS en esta prueba ' + "");

                        var puntajeSOL= 0;
                        var puntajeEO = 0;
                        var puntajeBAT = 0;
        

                                              
                        var currentPage = window.location.pathname; // Obtiene la ruta de la página actual
                    
                      if (currentPage.includes("eolica.html")) {
                        puntajeEO += puntajeEntero;
                            window.location.href = "logradoEO.html"; 
                          } else if (currentPage.includes("solar.html")) {
                          puntajeSOL += puntajeEntero;
                            window.location.href = "logradoSOL.html"; 
                          } else if (currentPage.includes("bateria.html")) {
                        puntajeBAT += puntajeEntero;
                        window.location.href = "logradoBAT.html"; 
                      }
                          
            }
  
}

//

// function calcularPuntajeFinal() {
//     var puntajeEO = parseInt(document.getElementById("puntajeEO").value);
//     var puntajeSOL = parseInt(document.getElementById("puntajeSOL").value);
//     var puntajeBAT = parseInt(document.getElementById("puntajeBAT").value);

//     var puntajeFINAL = puntajeEO + puntajeSOL + puntajeBAT;


//     document.getElementById("miDiv").innerHTML = "Puntaje final: " + puntajeFINAL;
// }

// Llama a la función de verificación después de cada movimiento (en el evento "dragend")
document.addEventListener("drop", verificarRompecabezasCompleto);


// DRAG AND DROP ///


// TEMPORIZADOR DE TIEMPO //

        const TIME_LIMIT = 
        60;
        let timePassed = 0;
        let timeLeft = TIME_LIMIT;
        let gameInterval;

        // Llamamos a la función cuentaAtras inmediatamente al cargar la página
        iniciarTemporizador();

        const timeSound = new Audio('assets/media/time.mp3');
        const gameOverSound = new Audio('assets/media/gameover.mp3');

        function iniciarTemporizador() {
          gameInterval = setTimeout(cuentaAtras, 1000);
        }

        function detenerTemporizador() {
          clearTimeout(gameInterval);
        }
        

        function cuentaAtras() {
          const gameOverSound = new Audio('assets/media/gameover.mp3');
          timePassed++;
          timeLeft = TIME_LIMIT - timePassed;

          let timerElement = document.getElementById('timer');
          timerElement.textContent = 'Te quedan ' + timeLeft + ' Segundos ';

          if (timeLeft < 16){
            timeSound.play();
          }

          if (timeLeft <= 0) {
            detenerTemporizador(); // Detener el temporizador

            timeSound.pause();
            timeSound.currentTime = 0;
            gameOverSound.play();

            Swal.fire({
              
              
              imageUrl: "https://raw.githubusercontent.com/delmonicoCL/LaiaBCN/main/assets/images/tiempo3.png",
              imageWidth: 400,
              imageHeight: 480,
              color: "#716add",
              background: "#fff url(/assets/images/tiempo.png",
  
              showCancelButton: true,
              confirmButtonColor: '#fc8d72',
              cancelButtonColor: '#517290',
              confirmButtonText: 'SI',
              cancelButtonText: 'NO', 
              showClass: {
                popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `},
              hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
              },
                
                
            }).then((result) => {
              if (result.isConfirmed) {
                
                var currentPage = window.location.pathname; // Obtiene la ruta de la página actual

                if (currentPage.includes("solar.html")) {
                  window.location.href = "solar.html"; 
                } else if (currentPage.includes("eolica.html")) {
                  window.location.href = "eolica.html"; 
                } else if (currentPage.includes("bateria.html")) {
                  window.location.href = "bateria.html"; 
                }

              }  else {
                // Reanudar el tiempo si el usuario decide no salir
                // Swal.fire({
                //   title: '¡NOS VEMOS PRONTO!',
                //   icon:  'success',
                //   showConfirmButton: false,
                //   timer:1500,
                // })
                setTimeout(() => {
                  window.location.href = 'adios.html';
                }, 1500);
                
              }
          
            });          
            
          } else {
            iniciarTemporizador(); // Iniciar el temporizador para el siguiente segundo
          }
        }

// TEMPORIZADOR DE TIEMPO //




// BOTON SALIR ///
  const salirSound = new Audio('assets/media/salir-sound.mp3');
  function confirmarSalida() {
        salirSound.play();
        detenerTemporizador(); 
        Swal.fire({
              
              
              imageUrl: "https://raw.githubusercontent.com/delmonicoCL/LaiaBCN/main/assets/images/tiempo3.png",
              imageWidth: 400,
              imageHeight: 480,
              color: "#716add",
              background: "#fff url(/assets/images/salir.png",
  
              showCancelButton: true,
              confirmButtonColor: '#517290',
              cancelButtonColor: '#fc8d72',
              confirmButtonText: 'SI',
              cancelButtonText: 'NO', 
              showClass: {
                popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `},
              hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
              },
                
                
            }).then((result) => {
        if (result.isConfirmed) {
          // Swal.fire({
          //   title: '¡Hasta luego!',
          //   icon:  'success',
          //   showConfirmButton: false,
          //   timer:1500,
          // })
          setTimeout(() => {
            window.location.href = 'adios.html';
          }, 1500);
        }  else {
          // Reanudar el tiempo si el usuario decide no salir
          iniciarTemporizador();
        }

  });
  }

// BOTON SALIR ///

// FUNCION SONIDO DE FONDO //

window.onload = function sonido() {
var audio = document.getElementById("miAudio");
audio.volume = 0.2; // Establecer volumen al 20%
audio.play(); // Reproducir automáticamente el archivo de audio

audio.addEventListener("ended", function() {
    audio.currentTime = 0; // Reiniciar el tiempo de reproducción al inicio
    audio.play(); // Reproducir nuevamente el archivo de audio
});
};

// FUNCION ESCONDER BARRAINFORMACION 1 //

function mostrarBarraInformacion() {
  // Ocultar la barra inicialmente
  var barra = document.getElementById('BarraInformacion1');
  barra.style.display = 'none';

  // Después de 20 segundos, mostrar la barra
  setTimeout(function () {
    barra.style.display = 'block';
  }, 20000);
}

// Llama a la función cuando se carga el DOM
document.addEventListener("DOMContentLoaded", mostrarBarraInformacion);