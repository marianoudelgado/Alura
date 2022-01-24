var botonAgregar = document.querySelector("#adicionar-paciente");

botonAgregar.addEventListener("click", function (event){
    
    event.preventDefault();

    var form = document.querySelector("#form-adicionar");
    var paciente = capturarDatosPaciente(form);
    var pacienteTr = construirTr(paciente);

    var errores = validarPaciente(paciente);
    

    if(errores.length > 0){
        exhibirMensajesErrores(errores);
        return;
    }

    var tabla = document.querySelector("#tabla-pacientes");
    tabla.appendChild(pacienteTr);
    form.reset();
    
    var mensajesErrores = document.querySelector("#mensajes-errores");
    mensajesErrores.innerHTML = "";


});

function capturarDatosPaciente(form){
    var paciente = {
         //captura los datos ingresados en el form
        nombre : form.nombre.value,
        peso : form.peso.value,
        altura : form.altura.value,
        gordura : form.gordura.value,
        imc : calcularIMC(form.peso.value,form.altura.value)

    }
    return paciente;
}

function construirTr(paciente){
        
        var pacienteTr = document.createElement("tr");
        pacienteTr.classList.add("paciente");

        pacienteTr.appendChild(construirTd(paciente.nombre,"info-nombre"));
        pacienteTr.appendChild(construirTd(paciente.peso, "info-peso"));
        pacienteTr.appendChild(construirTd(paciente.altura, "infor-altura"));
        pacienteTr.appendChild(construirTd(paciente.gordura, "info-gordura"));
        pacienteTr.appendChild(construirTd(paciente.imc,"info-imc"));

        return pacienteTr;
}

function construirTd(dato,clase){

    var td = document.createElement("td");
    td.classList.add(clase);
    td.textContent = dato;

    return td;
}

function validarPaciente(paciente){
    var errores = [];

    if(paciente.nombre.length == 0){
        errores.push( "El nombre no puede estar vacio");
    }
    if(paciente.peso.length == 0){
        errores.push( "El peso no puede estar vacio");
    }
    if(paciente.altura.length == 0){
        errores.push( "La altura no puede estar vacia");
    }
    if(paciente.gordura.length == 0){
        errores.push( "El % de gordura no puede estar vacio");
    }
    if(!validarPeso(paciente.peso)){
        errores.push( "El peso es incorrecto");
    }
    if(!validarAltura(paciente.altura)){
        errores.push( "La altura es incorrecto");
    }
    
    return errores;
}

function exhibirMensajesErrores(errores){

    var ul = document.querySelector("#mensajes-errores");

    ul.innerHTML = "";

    errores.forEach(function(error){
        var li = document.createElement("li");
        li.textContent = error;
        ul.appendChild(li);
    });

}