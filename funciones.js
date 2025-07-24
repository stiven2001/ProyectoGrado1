
function mostrarSeccion(id) {
  // Oculta todas las secciones
  const secciones = document.querySelectorAll('.seccion');
  secciones.forEach(seccion => seccion.classList.remove('activa'));

  // Muestra solo la sección deseada
  const seccionMostrar = document.getElementById(id);
  if (seccionMostrar) {
    seccionMostrar.classList.add('activa');
  }
}


function filtrarCategoria(categoria) {
    const contenedor = document.getElementById('contenedorGaleria');
    contenedor.innerHTML = '';

    let imagenes = [];
    if (categoria === 'todas') {
      imagenes = [
        ...generarImagenesAleatorias('naturaleza', 3),
        ...generarImagenesAleatorias('ciudad', 3)
      ];
    } else {
      imagenes = generarImagenesAleatorias(categoria, 6);
    }

    imagenes.forEach(img => {
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-3';
      col.innerHTML = `
        <div class="imagen-galeria" data-categoria="${img.categoria}">
          <img src="${img.url}" class="img-fluid miniatura"
               alt="${img.alt}" onclick="mostrarDetalleModal('${img.url}', '${img.alt}', '${img.autor}')"/>
        </div>
      `;
      contenedor.appendChild(col);
    });
  }

  // Generar imágenes aleatorias
  function generarImagenesAleatorias(categoria, cantidad = 6) {
    const imagenes = [];
    for (let i = 0; i < cantidad; i++) {
      const idUnico = Math.floor(Math.random() * 1000); // Para variar la imagen
      imagenes.push({
        url: `https://picsum.photos/seed/${categoria + idUnico}/300/200`,
        alt: `Imagen de ${categoria}`,
        categoria: categoria,
        autor: `Autor ${String.fromCharCode(65 + i)}`
      });
      console.log("categoria",categoria)
    }
    return imagenes;
  }

function mostrarDetalleModal(src, descripcion, autor) {
  document.getElementById('modalImagenSrc').src = src;
  document.getElementById('modalDescripcion').textContent = descripcion;
  document.getElementById('modalAutor').textContent = 'Autor: ' + autor;
  $('#modalImagen').modal('show');
}

  // Al cargar la página mostrar todas
  document.addEventListener('DOMContentLoaded', () => {
    filtrarCategoria('todas');
  });

function validarFormulario() {
  const nombreInput = document.getElementById('nombre');
  const correoInput = document.getElementById('correo');
  const mensajeInput = document.getElementById('mensaje');

  const nombre = nombreInput.value.trim();
  const correo = correoInput.value.trim();
  const mensaje = mensajeInput.value.trim();

  let valido = true;

  // Resetear estilos
  [nombreInput, correoInput, mensajeInput].forEach(input => {
    input.classList.remove('is-invalid');
  });

  if (!nombre) {
    nombreInput.classList.add('is-invalid');
    valido = false;
  }

  if (!correo) {
    correoInput.classList.add('is-invalid');
    valido = false;
  }

  if (!mensaje) {
    mensajeInput.classList.add('is-invalid');
    valido = false;
  }

  if (!valido) {
    alert("Todos los campos son obligatorios.");
    return false;
  }

  alert("Formulario enviado correctamente.");
  return true;
}

