function borrar(nodoPadre,nodoBorrar) {
    console.log(nodoBorrar);
    
    nodoPadre.removeChild(nodoBorrar);
    total();
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