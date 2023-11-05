
const precio = 200;

var seleccion = document.getElementById('categoria1');
seleccion.addEventListener("change", calcular());


function borrar(){
    document.getElementById('nombre').value="";
    document.getElementById('apellido').value = "";
    document.getElementById('correo').value="";
    document.getElementById('cantidad').value = "";
    document.getElementById('total').innerHTML = "Total a Pagar: $"
}


function calcular(){
    let cantidad = document.getElementById('cantidad').value;
    if (cantidad>0){
        switch (seleccion.value){
            case 'Estudiante':
                //console.log('80% descuento');
                document.getElementById('total').innerHTML = "Total a Pagar: $ " + parseInt(Number(cantidad)*0.2*precio);
                break;
            case 'Trainee':
                //console.log('50% descuento');
                document.getElementById('total').innerHTML = "Total a Pagar: $ " + parseInt(Number(cantidad)*0.5*precio);
                break;
            case 'Junior':
                //console.log('20% descuento');
                document.getElementById('total').innerHTML = "Total a Pagar: $ " + parseInt(Number(cantidad)*0.8*precio);
                break;
            default:
                //
        }
    } else {
        document.getElementById('total').innerHTML = "Total a Pagar: $"
    }
}
