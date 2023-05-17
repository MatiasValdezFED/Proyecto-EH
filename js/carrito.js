//Articulos en carrito

const carritoVacio = document.querySelector(".carrito__vacio");
const articulosCarrito = document.querySelector(".articulos__carrito");
const carritoAcciones = document.querySelector(".carrito__acciones");
//const articulosCarrito = document.querySelector(".articulos__carrito")
const botonEliminar = document.querySelectorAll(".articulo__carrito__borrar");
const botonVaciar = document.querySelector(".carrito__acciones__vaciar");
const total = document.querySelector("#total");
const botonFinalizar = document.querySelector(".carrito__acciones__comprar");

let carritoArticulo = localStorage.getItem("articulos-en-carrito");
carritoArticulo = JSON.parse(carritoArticulo);

function cargarArticulosCarrito() {
  if (carritoArticulo && carritoArticulo.length > 0) {
    carritoVacio.classList.add("disabled");
    articulosCarrito.classList.remove("disabled");
    carritoAcciones.classList.remove("disabled");

    articulosCarrito.innerHTML = "";

    carritoArticulo.forEach((articulo) => {
      const div = document.createElement("div");
      div.classList.add("articulo__carrito");
      div.innerHTML = `<img class="articulo__carrito__imagen" src="${
        articulo.imagen
      }" alt="${articulo.nombreProducto}">
    <div class="articulo__carrito__titulo">
     <h3>${articulo.nombreProducto}</h3>
    </div>
    <div class="articulo__carrito__cantidad">
     <h3>${articulo.cantidad}</h3>
    </div>
    <div class="articulo__carrito__precioUnitario">
     <small>Precio Unitario</small>
     <h3>${articulo.precio}</h3>
    </div>
    <div class="articulo__carrito__Subtotal">
     <small>Subtotal</small>
     <h3>${articulo.precio * articulo.cantidad}</h3>
    </div>
    <button class="articulo__carrito__borrar" id="${articulo.id}">
     <i class="fa-solid fa-trash" "></i>
    </button>`;

      articulosCarrito.append(div);
    });
  } else {
    carritoVacio.classList.remove("disabled");
    articulosCarrito.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
  }

  eliminarArticulos();
  actualizarTotal();
}

cargarArticulosCarrito();

function eliminarArticulos() {
  const botonEliminar = document.querySelectorAll(".articulo__carrito__borrar");

  botonEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  let botonId = parseInt(e.currentTarget.id);
  const index = carritoArticulo.findIndex(
    (articulo) => articulo.id === botonId
  );
  carritoArticulo.splice(index, 1);

  cargarArticulosCarrito();

  localStorage.setItem("articulos-en-carrito", JSON.stringify(carritoArticulo));
}

// botonVaciar.addEventListener("click", vaciarCarrito());

// function vaciarCarrito() {
//   carritoArticulo.length = 0;
//   localStorage.setItem("articulos-en-carrito", JSON.stringify(carritoArticulo));
//   cargarArticulosCarrito();
// }

function actualizarTotal() {
  totalCalculado = carritoArticulo.reduce(
    (acc, articulo) => acc + articulo.precio * articulo.cantidad,
    0
  );
  total.innerText = `${totalCalculado}`;
}

botonFinalizar.addEventListener("click", vaciarCarrito());

function finalizarCarrito() {
  carritoArticulo.length = 0;
  localStorage.setItem("articulos-en-carrito", JSON.stringify(carritoArticulo));
}