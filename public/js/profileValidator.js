function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load', function(){
    let $name = qs('#name'),
    $nameError = qs('#nameError'),
    $userName = qs('#userName'),
    $userError = qs('#userNameError'),
    $phone = qs('#phone'),
    $phoneError = qs('#phoneError'),
    $image = qs('#image'),
    $imageError = qs('#imageError'),
    $formProfile = qs('#formProfile'),
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
    regExPhone = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/

    $name.addEventListener('blur', () => {
        switch(true){
            case !$name.value.trim():
                $nameError.innerHTML = "Requerido";
                $name.classList.add('error-message');
                break;
            case !regExAlpha.test($name.value):
                $nameError.innerHTML = "Nombre no válido";
                $name.classList.add('error-message');
                break;
            case $name.value.length<2:
                $nameError.innerHTML = "El nombre tiene que tener 2 caracteres o mas";
                $name.classList.add('error-message');
                break;
            default:
                $name.classList.remove('error-message');
                $nameError.innerHTML = "";
                break;
        }
    })
    $userName.addEventListener('blur', () => {
        switch(true){
            case !$userName.value.trim():
                $userError.innerHTML = "Requerido";
                $userName.classList.add('error-message');
                break;
            case !regExAlpha.test($userName.value):
                $userError.innerHTML = "Apellido no válido";
                $userName.classList.add('error-message');
                break;
            default:
                $userName.classList.remove('error-message');
                $userError.innerHTML = "";
                break;
        }
    })
    $phone.addEventListener('blur', () => {
        switch(true){
            case !$phone.value.trim():
                $phoneError.innerHTML = "Ingresa teléfono";
                /* $phone.classList.add('error-message'); */
                break;
            case !regExPhone.test($phone.value):    
                $phoneError.innerHTML = "Teléfono inválido";
                $phone.classList.add('error-message');
                break;
            default:
                $phone.classList.remove('error-message');
                $phoneError.innerHTML = "";
                break;
        }
    })
    $image.addEventListener('change', 
    function fileValidation(){
        let filePath = $image.value, 
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //exReg, valida extensiones permitidas
            let extension = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();
        if(!allowefExtensions.exec(filePath)){ 
            $imageError.innerHTML = `Extension válida '.jpg .jpeg .png .gif' Archivo: ${extension} no es valido`;
            $image.value = '';
            return false;
        }else{
            $image.classList.remove('error-message')
            $imageError.innerHTML = ""
        }
    })

    $formProfile.addEventListener('submit', function(event){
        event.preventDefault()

       let elementosFormulario = this.elements;
       let errores = false;
       console.log(elementosFormulario)

       for (let index = 0; index < elementosFormulario.length -1; index++) { /* obviamos el boton */
           if(elementosFormulario[index].value == ""
           && elementosFormulario[index].type !== "file" && elementosFormulario[index] == !$phone

           || elementosFormulario[index].classList.contains('error-message')){

            elementosFormulario[index].classList.contains('error-message'); {
              elementosFormulario[index].classList.add('error-message');
               submitProfileError.innerHTML = "Hay errores en el formulario"
               errores = true;
           }
       }
       if(!errores){
           $formProfile.submit()
       }

   }

})

})
