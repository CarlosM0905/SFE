var cont = 1;

function refresh(cantidad) {
    const precio = document.getElementById('inputValor').value;
    document.getElementById('inputMonto').value = cantidad*precio;
}

function seleccion(precio) {
    // document.getElementById
    const cantidad = document.getElementById('inputCantidad').value;

    $('#inputValor').val(precio);
    $("#inputMonto").val(cantidad * precio);
};

function prueba() {

    let cantidad = document.getElementById('inputCantidad').value;
    let unidad = document.getElementById('inputUnidad').value;
    let descripcion = document.getElementById('inputDescripcion').value;
    let valor = document.getElementById('inputValor').value;
    let monto = document.getElementById('inputMonto').value;

    let cell1 = document.createElement('td');
    let input1 = document.createElement('input');
    input1.name = 'cantidad';
    input1.value = cantidad;
    input1.type = 'hidden';
    
    let cell2 = document.createElement('td');
    let input2 = document.createElement('input');
    input2.name = 'unidad';
    input2.value = unidad;
    input2.type = 'hidden';

    let cell3 = document.createElement('td');
    let input3 = document.createElement('input');
    input3.name = 'descripcion';
    input3.value = descripcion;
    input3.type = 'hidden';

    let cell4 = document.createElement('td');
    let input4 = document.createElement('input');
    input4.name = 'valor';
    input4.value = valor;
    input4.type = 'hidden';

    let cell5 = document.createElement('td');
    let input5 = document.createElement('input');
    input5.name = 'monto';
    input5.value = monto;
    input5.type = 'hidden';
    cell5.className = "monto_total";

    cell1.innerHTML = cantidad;
    cell2.innerHTML = unidad;
    cell3.innerHTML = descripcion;
    cell4.innerHTML = valor;
    cell5.innerHTML = monto;
    let fila = document.createElement('tr');
    fila.append(cell1, input1, cell2, input2, cell3, input3, cell4, input4, cell5, input5);

    let tabla = document.getElementById('tabla');
    tabla.appendChild(fila);
    total();
};

function total() {
    let montos = document.getElementsByClassName('monto_total');
    let total = 0;
    
    for (let index = 0; index < montos.length; index++) {
        total += parseInt(montos[index].innerHTML);
    }

    document.getElementById('inputTotal').value = total;
}