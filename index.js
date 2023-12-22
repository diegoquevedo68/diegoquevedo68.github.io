//Funcion para vaciar campos de Creacion de oradores ↓↓
function borrar(){
    document.getElementById('nombre').value="";
    document.getElementById('apellido').value = "";
    document.getElementById('correo').value= "";
    document.getElementById('exampleFormControlTextarea1').value = "";
}
//Funcion para vaciar campos de Creacion de oradores ↑↑




//---- CREACION DE ORADOR ↓↓

function crearOrador(){
    const orador = {
         nombre:  document.getElementById("nombre").value,
         apellido: document.getElementById("apellido").value,
         email: document.getElementById("correo").value,
         tema: document.getElementById("exampleFormControlTextarea1").value
    };

    //debo enviar estos datos al sevidor: https://www.freecodecamp.org/espanol/news/tutorial-de-fetch-api-en-javascript-con-ejemplos-de-js-fetch-post-y-header/
    fetch(`http://localhost:8080/web-app-23544/api/orador`, {
        method: "POST",
        body: JSON.stringify(orador),
    })
    .then(response => response.json()) 
    .then(json => {
        alert(`Alta de Orador ID:${json.id} OK`);
        borrar();
    })
    //.catch(err => console.log(err));
    .catch(err => alert("Ocurrió un error al crear Orador"));
}
//---- CREACION DE ORADOR ↑↑




//----MUESTRA DE ORADORES ↓↓

function listarOradores() {/*f2*/
            //1 preparar
            const respuesta = fetch(`http://localhost:8080/web-app-23544/api/orador`);

            //2 invocar
            respuesta
                .then(response => response.json())
                .then(data => procesarListado(data))//fulfilled
                .catch(error => dibujarError(error))//rejected
}
  
function procesarListado(data){
    //guardo en localStorage
    //saveOradoresInFromLocal('oradores', data);
    //localStorage.setItem('oradores', data);
    localStorage.setItem('oradores', JSON.stringify(data))

    const listarOradores = data;
    let rows = '';
  
    for(let orador of listarOradores) {
        //console.log(orador);
        rows += `
        <tr>
            <th scope="row">${orador.id}</th>
            <td>${orador.nombre}</td>
            <td>${orador.apellido}</td>
            <td>${orador.mail}</td>
            <td>${orador.tema}</td>
            <td>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editar(${orador.id})">
                    Editar
                </button>
                <button onclick="eliminarOrador(${orador.id})" type="button" class="btn btn-danger">
                    Eliminar
                </button>
            </td>
        </tr>
        `
        
    }   
    document.getElementById('usersRows').innerHTML = rows;
}

function dibujarError(error) {
    console.log(error);
    const alerta = `<div class="alert alert-danger" role="alert">
        ${error.toString()}
    </div>`;
    document.getElementById('msj').innerHTML = alerta;
}

document.getElementById('botonListar').addEventListener('click',listarOradores);

//----MUESTRA DE ORADORES ↑↑




//----ELIMINACION DE DE ORADORES ↓↓
function eliminarOrador(id) {
    if(!confirm('SEGURO?')) {
        return;
    }

    fetch(`http://localhost:8080/web-app-23544/api/orador?id=${id}`, {
        method: "DELETE",
    })
    .then(response => response) 
    .then(json => {
        alert(`se ha eliminado el orador id: ${id}`);
        listarOradores();
    })
    .catch(err => console.log(err));
}
//----ELIMINACION DE DE ORADORES ↑↑




//----EDICION DE DE ORADORES ↓↓
function getOradoresFromLocal() {
    const oradores = localStorage.getItem('oradores')
    if(oradores) {
        return JSON.parse(oradores);
    }
    return [];
}
function getOradorSeleccionado() {
    const obj = localStorage.getItem('oradorBuscado')
    if(obj) {
        return JSON.parse(obj);
        //return JSON.stringify(obj);
    }
    return null;
}
function removeOradorSeleccionado() {
    localStorage.removeItem('oradorBuscado');
}

function saveOradoresInFromLocal(key, data) {
    localStorage.setItem(key, JSON.stringify(data));//como texto
}

function editar(id)  {
    const oradores = getOradoresFromLocal();//[]
        
    //const oradores = localStorage.getItem('oradores');
    //console.log(oradores);
    const oradorBuscado = oradores.find(o => o.id === id);
    
    //si quiero actualizar algo en un html (.innerHTML o .value)
    document.getElementById('nombreActualizar').value = oradorBuscado.nombre;
    document.getElementById('apellidoActualizar').value = oradorBuscado.apellido;
    document.getElementById('mailActualizar').value = oradorBuscado.mail;
    document.getElementById('temaActualizar').value = oradorBuscado.tema;

    //guardo el id/orador del orador que se quiere actualizar
    //localStorage.setItem('oradorBuscado', oradorBuscado);
    localStorage.setItem('oradorBuscado', JSON.stringify(oradorBuscado));
    
}

function actualizarOrador(){
    const oradorSeleccionado = getOradorSeleccionado();
    //const oradorSeleccionado = localStorage.getItem('oradorBuscado');
    console.log(oradorSeleccionado);
    if(!oradorSeleccionado) {
        return
    }

    //obtengo los datos del formulario que esta en el modal
    const nombre = document.getElementById('nombreActualizar').value;
    const apellido = document.getElementById('apellidoActualizar').value;
    const email = document.getElementById('mailActualizar').value;
    const tema = document.getElementById('temaActualizar').value;

    const orador = {
         nombre,
         apellido,
         email,
         tema,
    };

    //ahora puedo enviar al backend para actualizar
    //debo enviar estos datos al sevidor: https://www.freecodecamp.org/espanol/news/tutorial-de-fetch-api-en-javascript-con-ejemplos-de-js-fetch-post-y-header/
    fetch(`http://localhost:8080/web-app-23544/api/orador?id=${oradorSeleccionado.id}`, {
        method: "PUT",
        body: JSON.stringify(orador),
    })
    .then(response => response) //status code 200
    .then(json => {
        alert(`Se ha modificado el orador id:${oradorSeleccionado.id}`);
        //cargar la lista 
        listarOradores();
        removeOradorSeleccionado();
        cerrarModal();
    })
    .catch(err => console.log(err));
}
function cerrarModal() {
    document.getElementById('btnCerrarModal').click();
}