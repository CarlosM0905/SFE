var contador = 1;
function refresh(cantidad) {
  const precio = document.getElementById('inputValor').value;
  document.getElementById('inputMonto').value = (cantidad * precio).toFixed(2);
}

function seleccion(precio) {
  // document.getElementById
  const cantidad = document.getElementById('inputCantidad').value;

  $('#inputValor').val(precio);
  $("#inputMonto").val(cantidad * precio);
};
//var temp = 1;

function openDate(){
  $('#datetimepickerFE').datetimepicker({
      locale: 'es',
      format: 'L'
  });
}
//Boleta and factura issues
function prueba() {
  console.log("primer "+contador);
  let cantidad = document.getElementById('inputCantidad').value;
  let unidad = document.getElementById('inputUnidad').value;
  let descripcion = document.getElementById('inputDescripcion').value;
  let valor = document.getElementById('inputValor').value;
  let monto = document.getElementById('inputMonto').value;

  let cell1 = document.createElement('td');
  cell1.setAttribute('id','')
  let input1 = document.createElement('input');
  //  let btn1 = document.createElement('button');
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


  let cell6 = document.createElement('td');
  let btn_edit = document.createElement('button');
  let i_edit = document.createElement('i');
  i_edit.className = "fa fa-edit";
  btn_edit.className = "btn btn-primary btn-sm mr-2";
  btn_edit.setAttribute('type', 'button');
  btn_edit.setAttribute('data-toggle', 'modal');
  btn_edit.setAttribute('data-target', '#addModal');
  
   btn_edit.appendChild(i_edit);
  cell6.appendChild(btn_edit);


  let cell7 = document.createElement('td');
  let btn_delete = document.createElement('button');
  let i_delete = document.createElement('i');
  i_delete.className = "fa fa-minus-circle";
  btn_delete.className = "btn btn-danger btn-sm";
  btn_delete.setAttribute('type', 'button');
  btn_delete.setAttribute('data-toggle', 'modal');
  btn_delete.setAttribute('data-target', '#deleteModal');
  btn_delete.setAttribute('onclick','borrar(this.parentNode.parentNode.parentNode, this.parentNode.parentNode)');
  btn_delete.appendChild(i_delete);
  cell7.appendChild(btn_delete);
  //<button type="button" class="btn btn-primary btn-sm mr-2" data-toggle="modal" data-target="#addModal"><i class="fa fa-edit"></i></button>
  //<button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteModal"><i class="fa fa-minus-circle"></i></button>
  cell1.innerHTML = cantidad;
  cell2.innerHTML = unidad;
  cell3.innerHTML = descripcion;
  cell4.innerHTML = valor;
  cell5.innerHTML = monto;
  let fila = document.createElement('tr');
  fila.setAttribute('id',contador);
  contador++;
  fila.append(cell1, input1, cell2, input2, cell3, input3, cell4, input4, cell5, input5, cell6, cell7);

  let tabla = document.getElementById('tabla');
  tabla.appendChild(fila);
  total();
  clean();
  
};

function clean() {

  document.getElementById('inputCantidad').value = "";
  document.getElementById('inputUnidad').value = "";
  document.getElementById('inputDescripcion').value = "";
  document.getElementById('inputValor').value = "";
  document.getElementById('inputMonto').value = "";
}

function total() {
  let montos = document.getElementsByClassName('monto_total');
  let total = 0;

  for (let index = 0; index < montos.length; index++) {
    total += parseFloat(montos[index].innerHTML);
  }

  document.getElementById('inputTotal').value = total.toFixed(2);
  //IGV
  var subtotal = (total / 1.18).toFixed(2);
  var igv = (total - subtotal).toFixed(2);

    document.getElementById('inputSubtotal').value = subtotal;
    document.getElementById('inputIGV').value = igv;
    document.getElementById('inputTotalLetras').value = numeroALetras(total);
}

var numeroALetras = (function() {
  function Unidades(num) {

    switch (num) {
      case 1:
        return 'UN';
      case 2:
        return 'DOS';
      case 3:
        return 'TRES';
      case 4:
        return 'CUATRO';
      case 5:
        return 'CINCO';
      case 6:
        return 'SEIS';
      case 7:
        return 'SIETE';
      case 8:
        return 'OCHO';
      case 9:
        return 'NUEVE';
    }

    return '';
  } //Unidades()

  function Decenas(num) {

    let decena = Math.floor(num / 10);
    let unidad = num - (decena * 10);

    switch (decena) {
      case 1:
        switch (unidad) {
          case 0:
            return 'DIEZ';
          case 1:
            return 'ONCE';
          case 2:
            return 'DOCE';
          case 3:
            return 'TRECE';
          case 4:
            return 'CATORCE';
          case 5:
            return 'QUINCE';
          default:
            return 'DIECI' + Unidades(unidad);
        }
      case 2:
        switch (unidad) {
          case 0:
            return 'VEINTE';
          default:
            return 'VEINTI' + Unidades(unidad);
        }
      case 3:
        return DecenasY('TREINTA', unidad);
      case 4:
        return DecenasY('CUARENTA', unidad);
      case 5:
        return DecenasY('CINCUENTA', unidad);
      case 6:
        return DecenasY('SESENTA', unidad);
      case 7:
        return DecenasY('SETENTA', unidad);
      case 8:
        return DecenasY('OCHENTA', unidad);
      case 9:
        return DecenasY('NOVENTA', unidad);
      case 0:
        return Unidades(unidad);
    }
  } //Unidades()

  function DecenasY(strSin, numUnidades) {
    if (numUnidades > 0)
      return strSin + ' Y ' + Unidades(numUnidades)

    return strSin;
  } //DecenasY()

  function Centenas(num) {
    let centenas = Math.floor(num / 100);
    let decenas = num - (centenas * 100);

    switch (centenas) {
      case 1:
        if (decenas > 0)
          return 'CIENTO ' + Decenas(decenas);
        return 'CIEN';
      case 2:
        return 'DOSCIENTOS ' + Decenas(decenas);
      case 3:
        return 'TRESCIENTOS ' + Decenas(decenas);
      case 4:
        return 'CUATROCIENTOS ' + Decenas(decenas);
      case 5:
        return 'QUINIENTOS ' + Decenas(decenas);
      case 6:
        return 'SEISCIENTOS ' + Decenas(decenas);
      case 7:
        return 'SETECIENTOS ' + Decenas(decenas);
      case 8:
        return 'OCHOCIENTOS ' + Decenas(decenas);
      case 9:
        return 'NOVECIENTOS ' + Decenas(decenas);
    }

    return Decenas(decenas);
  } //Centenas()

  function Seccion(num, divisor, strSingular, strPlural) {
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let letras = '';

    if (cientos > 0)
      if (cientos > 1)
        letras = Centenas(cientos) + ' ' + strPlural;
      else
        letras = strSingular;

    if (resto > 0)
      letras += '';

    return letras;
  } //Seccion()

  function Miles(num) {
    let divisor = 1000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMiles = Seccion(num, divisor, 'UN MIL', 'MIL');
    let strCentenas = Centenas(resto);

    if (strMiles == '')
      return strCentenas;

    return strMiles + ' ' + strCentenas;
  } //Miles()

  function Millones(num) {
    let divisor = 1000000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMillones = Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
    let strMiles = Miles(resto);

    if (strMillones == '')
      return strMiles;

    return strMillones + ' ' + strMiles;
  } //Millones()

  return function NumeroALetras(num, currency) {
    currency = currency || {};
    let data = {
      numero: num,
      enteros: Math.floor(num),
      centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
      letrasCentavos: '',
      letrasMonedaPlural: currency.plural || 'SOLES',
      letrasMonedaSingular: currency.singular || 'SOLES',
      letrasMonedaCentavoPlural: currency.centPlural || 'CÉNTIMOS',
      letrasMonedaCentavoSingular: currency.centSingular || 'CÉNTIMO'
    };

    if (data.centavos > 0) {
      data.letrasCentavos = 'CON ' + (function() {
        if (data.centavos == 1)
          return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
        else
          return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
      })();
    };

    if (data.enteros == 0)
      return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
    if (data.enteros == 1)
      return Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
    else
      return Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
  };
})();

