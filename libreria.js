// ReCircular 

const libros = "libros.json";
const contenedorLibros =document.getElementById ("contenedorLibros");


// FETCH DESDE LIBROS.JSON //

fetch (libros)
.then (response=> response.json())
.then (data => {
    data.forEach (libro =>{
        const divLibro = document.createElement ("div");
        divLibro.classList.add ("card", "col-xl-4", "col-md-6", "col-sm-12" );
        divLibro.innerHTML=`
                            <div>
                                <img src="img/${libro.id}.png" class="card-img-top img-fluid">
                                <div class="card-body py-3">
                                <h3 class="card-title"> Titulo: </h3> <p> ${libro.titulo} </p>
                                <h3 class="card-title"> Autor: </h3> <p> ${libro.autor} </p>
                                <p class="card-text"> Precio: $ ${libro.precio}</p>
                                <button id="boton${libro.id}" class="btn btn-info"> Agregar al Carrito </button>
                                </div>
                            </div>
        `;
    contenedorLibros.appendChild (divLibro);
    const boton = document.getElementById (`boton${libro.id}`);
    boton.addEventListener ("click", () => {
        Toastify({
            text: "Libro agregado al carrito",
            duration: 2000,
        }).showToast();

        agregarAlCarrito (libro.id);
        
    })
    })

// Creo el carrito de compras y una funcion que busque por ID y lo agrege al carrito

const carrito = [];

function agregarAlCarrito(id) {
    const libro = data.find(libro => libro.id === id);
    const libroEnCarrito = carrito.find(libro => libro.id === id);
    libroEnCarrito ? libroEnCarrito.cantidad++ : carrito.push(libro);
    actualizarCarrito();
    localStorage.setItem("libros", JSON.stringify(carrito));
};

const contenedorCarrito= document.getElementById ("contenedorCarrito");
const verCarrito= document.getElementById ("verCarrito");

verCarrito.addEventListener ("click", actualizarCarrito);


// BOTON FINALIZAR COMPRA //
 const finalizarCarrito = document.getElementById ("finalizarCarrito");
 finalizarCarrito.addEventListener ("click", () => {
   Swal.fire ( {
     title: "Muchas Gracias por su compra!",
     icon: "info",
     });
            carrito.splice (0, carrito.length);

            actualizarCarrito();
 });









//Boton Vaciar del Carrito

const vaciarCarrito = document.getElementById ("vaciarCarrito");
vaciarCarrito.addEventListener ("click", () => {

    Swal.fire ( {
        title: "Carrito Vacio",
        icon: "info",
    })
            carrito.splice (0, carrito.length);

            actualizarCarrito();
        }

);



const totalCompra = document.getElementById ("totalCompra");

const calcularTotalCompra = ()=>{
    let total=0;
    carrito.forEach (libro => {
        total += libro.precio * libro.cantidad;    
});

totalCompra.innerHTML = total;
};


// Tarjeta Individual Libros dentro del OffCanva
function actualizarCarrito (){
    let aux ="";
    carrito.forEach (libro => {
        aux += `
                            <div class= "card">
                            <img src="img/${libro.id}.png" class="card-img-top img-fluid py-3">
                            <div class="card-body">
                            <h3 class="card-title"> Titulo: ${libro.titulo} </h3>
                            <h3 class="card-title"> Autor: ${libro.autor} </h3>
                            <p class="card-text"> Precio: $ ${libro.precio}</p>
                            <p class="card-text"> Cantidad: ${libro.cantidad}</p>
                            </div>
                        </div>
                ` 

                
    })

    

    contenedorCarrito.innerHTML=aux;
    calcularTotalCompra ();

}



});



