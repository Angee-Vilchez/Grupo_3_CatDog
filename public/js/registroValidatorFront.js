function qs(element) {
    return document.querySelector(element)
}

window.addEventListener("load", () => {
    let $inputName = qs("#name")
    let $userName = qs("#userName")
    let $inputEmail = qs("#email")
    let $inputPasswd = qs("#password")
    let $inputPasswd2 = qs("#password2")
    let $inputFile = qs("#avatar")
    let $inputTerms = qs("#terms")

    let $errorBackName = qs("#errorBackName")
    let $userNameError = qs("#userNameError")
    let $errorBackEmail = qs("#errorBackEmail")
    let $errorBackPasswd = qs("#errorBackPassword")
    let $errorBackPasswd2 = qs("#errorBackPassword2")
    let $avatarError = qs('#avatarError')
    let $errorBackTerms = qs("#errorBackTerms")
    let $form = qs('#form')
    let regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/
    let regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    let regExPass = /^(?=.*\d).{8,100}$/;
    

    $inputName.addEventListener("blur", () => {
        switch (true) {
            case !$inputName.value.trim():
                $errorBackName.innerHTML = "Nombre requerido";
                $inputName.classList.add('error-message');
                break;
            case !regExAlpha.test($inputName.value):
                $errorBackName.innerHTML = "Nombre inválido";
                $inputName.classList.add('error-message');
                break;
            case $inputName.value.length<2:
                $errorBackName.innerHTML = "El nombre tiene que tener 2 caracteres o mas";
                $inputName.classList.add('error-message');
                break;
            default: 
                $inputName.classList.remove('error-message');
                $errorBackName.innerHTML = "";
                break;
        }
    })
    $userName.addEventListener('blur', () => {
        switch(true){
            case !$userName.value.trim():
                $userNameError.innerHTML = "Requerido";
                $userName.classList.add('error-message');
                break;
            case !regExAlpha.test($userName.value):
                $userNameError.innerHTML = "Apellido no válido";
                $userName.classList.add('error-message');
                break;
            default:
                $userName.classList.remove('error-message');
                $userNameError.innerHTML = "";
                break;
        }
    })
    $inputEmail.addEventListener('blur', () => {
        switch (true) {
            case !$inputEmail.value.trim():
                $errorBackEmail.innerHTML = "Email requerido";
                $inputEmail.classList.add('error-message');
                break;
            case !regExEmail.test($inputEmail.value):
                $errorBackEmail.innerHTML = "Email inválido";
                $inputEmail.classList.add('error-message');
                break;
            default: 
                $inputEmail.classList.remove('error-message');
                $errorBackEmail.innerHTML = "";
                break;
        }
    })
    $inputPasswd.addEventListener('blur', function(){
        switch (true) {
            case !$inputPasswd.value.trim():
                $errorBackPasswd.innerHTML = 'Ingrese una contraseña'
                $inputPasswd.classList.add('error-message')
                break;
            case !regExPass.test($inputPasswd.value):
                $errorBackPasswd.innerHTML = 'La contraseña debe tener un mínimo de 8 caracteres';
                $inputPasswd.classList.add('error-message')
                break;    
            default:
                $inputPasswd.classList.remove('error-message');
                $errorBackPasswd.innerHTML = ""
                break;
        }
    })
    $inputPasswd2.addEventListener('blur', function(){
        switch (true) {
            case !$inputPasswd2.value.trim():
                $errorBackPasswd2.innerHTML = 'Reingresa tu contraseña'
                $inputPasswd2.classList.add('error-message')
                break;
            case $inputPasswd2.value !== $inputPasswd.value:
                $errorBackPasswd2.innerHTML = 'Las contraseñas no coinciden';
                $inputPasswd2.classList.add('error-message')
                break;    
            default:
                $inputPasswd2.classList.remove('error-message');
                $errorBackPasswd2.innerHTML = ""
                break;
        }
    })
    $inputFile.addEventListener('change', 
    function fileValidation(){
        let filePath = $inputFile.value, 
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //exReg, valida extensiones permitidas
            let extension = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();
        if(!allowefExtensions.exec(filePath)){ 
            $avatarError.innerHTML = `Las extension válidas son '.jpg .jpeg .png .gif' El Archivo: ${extension} no es valido`;
            $inputFile.value = '';
            return false;
        }else{
            $inputFile.classList.remove('error-message')
            $avatarError.innerHTML = ""
        }
    })
    $inputTerms.addEventListener("click", function(){
        $inputTerms.value = "on"
        $inputTerms.classList.toggle('')
        $inputTerms.classList.remove('error-message')
        $errorBackTerms.innerHTML = ""
    })


    $form.addEventListener("submit", function(event) {
        event.preventDefault()  //para el comportamiento predeterminado del submit

        let elementsForm = this.elements; //para capturar todos los elementos que estan adentro del formulario
        let errores = false;

        console.log(elementsForm)

        for (let index = 0; index < elementsForm.length - 1; index++) { /* obviamos el boton */
            if(elementsForm[index].value == ""  
            && elementsForm[index].type !== "file"   //para que estos campos no sean requeridos
            || elementsForm[index].classList.contains('error-message')){
                elementsForm[index].classList.add('error-message');
                submitErrors.innerHTML = "Hay errores en el formulario"  //no esta capturado en una variable esto se puede hacer cuando es un id unico
                errores = true;
            }
        }

        if(!$inputTerms.checked){   //si el checked no esta ejecuta lo siguiente
            $inputTerms.classList.add('error-message');
            $errorBackTerms.innerHTML = "Debes aceptar los terminos";
        }

        if(!errores){  //si no hay errores ejecutame lo siguiente
            $form.submit()
        }

    })
})