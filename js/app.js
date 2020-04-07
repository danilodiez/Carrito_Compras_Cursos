//variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');


cargarEventListeners();
//listeners
function cargarEventListeners(){
    //Dispara cuando se presiona agregar carrito
    cursos.addEventListener('click', comprarCurso);

    //cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //eliminar todos los cursos
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}




//funciones

function comprarCurso(e){
    e.preventDefault();
    //el agregar carrito nos devuelve la tarjeta del curso
    if (e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        
        //enviamos el curso para tomar los datos
        leerDatosCurso(curso);

    }

}


//lee los datos del curso
function leerDatosCurso(curso){
    const infoCurso ={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);
    
}



//muestra curso seleccionado en el carrito

function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${curso.imagen}" width=100>
    </td>
    <td>
    ${curso.titulo}
    </td>
    <td>
    ${curso.precio}
    </td>
    <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">
        X
        </a>
        
    </td>
    `;

    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

//elimina el curso del carrito en el DOM
function eliminarCurso(e){
    e.preventDefault();
    
    let curso,
    cursoId;
    if (e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }
    eliminarCursoLocalStorage(cursoId);


}

//Elimina todos los cursos del carrito en el DOM
function vaciarCarrito(){
    while(listaCursos.firstChild){

        listaCursos.removeChild(listaCursos.firstChild);
    }
    //vaciar Local Storage
    vaciarLocalStorage();
}

function guardarCursoLocalStorage(curso){
    let cursos;
    //traigo lo que haya en el local storage
    cursos = obtenerCursosLocalStorage();
    //el curso se agrega al arreglo de carritos
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos))
}

//obtengo los elementos del Local Storage
function obtenerCursosLocalStorage(){
    let cursosLS;

    if(localStorage.getItem('cursos')===null){
        cursosLS = [];
    }else{
        cursosLS = JSON.parse( localStorage.getItem('cursos'));
    }

    return cursosLS
    
}


//Imprime los cursos del local storage en el carrito

function leerLocalStorage(){
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach(function(curso){
        //construir el template

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>
        ${curso.titulo}
        </td>
        <td>
        ${curso.precio}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">
            X
            </a>
            
        </td>
        `;

        listaCursos.appendChild(row)

    })
}


// elimina curso por el ID en el local storage

function eliminarCursoLocalStorage(curso){

    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(cursoLS, index){
        if(cursoLS.id===curso){
            cursosLS.splice(index, 1)
        }

    })
    localStorage.setItem('cursos',JSON.stringify(cursosLS));

}

function vaciarLocalStorage(){
    localStorage.clear();
}