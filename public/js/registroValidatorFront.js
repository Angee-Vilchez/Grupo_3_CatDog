const QS = (element)=>document.querySelector(element)

window.addEventListener("load", ()=>{
    let $formulario = QS("#form")
    let $inputName = QS("#name")
    let $inputEmail = QS("#email")
    let $inputPasswd = QS("#password")
    let $inputPasswd2 = QS("#password2")
    let $inputFile = QS("#avatar")
    let $inputTerms = QS("#terms")

    let $errorBackName = QS("#errorBackName")
    let $errorBackEmail = QS("#errorBackEmail")
    let $errorBackPasswd = QS("#errorBackPassword")
    let $errorBackPasswd2 = QS("#errorBackPassword2")
    let $errorBackTerms = QS("#errorBackTerms")

    

    /* Expresiones */
    const validation = {
        valiName :/^[a-zA-ZÀ-ÿ\s]{2,40}$/,
        valiPasswd:/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
        

        //^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[$@$!%?&#.$($)$-$_])[A-Za-z\d$@$!%?&#.$($)$-$_]{8,16}$/
        /* /^(?=(?:.\d))(?=(?:.[A-Z]))(?=(?:.*[a-z]))\S{8,}$/ */,
        valiEmail:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        valiTelefono:/^\d{7,14}$/
    }
    /* errors */
    let $errorName = QS("#errorName")
    let $errorEmail = QS("#errorEmail")
    let $errorPasswd = QS("#errorPassword")
    let $errorFile = QS("#errorFile")
    let $errorPassswd2 = QS("#errorPassword2")
    let $errorCaptcha = QS("#errorCaptcha")
    let $errorTerms = QS("#errorTerms")
    let $errorSubmit=QS("#errorSubmit") 

    let errors = {
        name:true,
        email:true,
        password: true,
        password2: true,
        file: true,
        terms: true,
    }

    $inputName.addEventListener("blur", e => {
        switch(true){
            case !$inputName.value.trim():
                $errorName.innerHTML = "Debe ingresar un nombre"
                if ($errorBackName) {
                    $errorBackName.innerHTML = ""
                }
                errors.name = true
                break;
            case (!validation.valiName.test($inputName.value) || $inputName.value.length < 3):
                $errorName.innerHTML = "Ingrese un nombre válido"  
                if ($errorBackName) {
                    $errorBackName.innerHTML = ""
                }
                errors.name = true
                break;
            default:
                $errorName.innerHTML = ""
                errors.name = false
        }
    })

    $inputEmail.addEventListener("blur", e => {
        switch(true){
            case !$inputEmail.value.trim():
                $errorEmail.innerHTML = "Debe ingresar un email"
                if ($errorBackEmail) {
                    $errorBackEmail.innerHTML = ""
                }
                errors.email = true
                break;
            case !validation.valiEmail.test($inputEmail.value):
                $errorEmail.innerHTML = "Ingrese un email válido"   
                if ($errorBackEmail) {
                    $errorBackEmail.innerHTML = ""
                }
                errors.email = true
                break;
            default:
                $errorEmail.innerHTML = ""
                errors.email = false
        }
    })

    $inputPassword.addEventListener("blur", e => {
        switch(true){
            case !$inputPassword.value.trim():
                $errorPassword.innerHTML = "Ingrese una contraseña"
                if ($errorBackPassword) {
                    $errorBackPassword.innerHTML = ""
                }
                errors.password = true
                break;
            case $inputPassword.value.length < 8/*!validation.valiPasswd.test($inputPasswd.value)*/:
                //$errorPasswd.innerHTML = "La contraseña debe tener:<br> Entre 8 a 16 digitos <br>Una mayuscula<br>Una minuscula<br>Un numero<br>"   
                $errorPassword.innerHTML = "La contraseña debe tener<br> por lo menos 8 caracteres"
                if ($errorBackPassword) {
                    $errorBackPassword.innerHTML = ""
                }
                errors.password = true
                break;
            default:
                $errorPassword.innerHTML = ""
                errors.password = false
        }

    })

    $inputPassword2.addEventListener('blur', function () {
        switch (true) {
            case !$inputPassword2.value.trim():
                $errorPasssword2.innerHTML = 'Reingrese su contraseña'
                if ($errorBackPassword2) {
                    $errorBackPassword2.innerHTML = ""
                }
                errors.password2 = true
                break;
            case $inputPassword2.value !== $inputPassword.value:
                $errorPasssword2.innerHTML = 'Las contraseñas no coinciden';
                if ($errorBackPassword2) {
                    $errorBackPassword2.innerHTML = ""
                }
                errors.password2 = true
                break;
            default:
                $errorPasssword2.innerHTML = ""
                errors.password2 = false
                break;
        }
    })

    $inputTerms.addEventListener("click", function(){
        $inputTerms.value = "on"
        $inputTerms.innerHTML = ""
        errors.terms = false
    })

    $inputFile.addEventListener("change", function fileValidation(){
        let fileCapturado = $inputFile.value, extensionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i
        if(!extensionesPermitidas.exec(fileCapturado)){
            $errorFile.innerHTML = "Carga un archivo valido con extension<br>.jpg | .jpeg | .png | .gif"
            $inputFile.value = ""
            //$viewFile.innerHTML = ""
            errors.file = true
            return false
        } else {
            errors.file = false
        }
    })

    $formulario.addEventListener("submit", function(event){
        event.preventDefault()

        if (!$inputTerms.checked) {
            $errorTerms.innerHTML = "Debes aceptar los términos y condiciones";
            //$errorBackTerms.innerHTML = "";
        } else {
            $errorTerms.innerHTML = "";
            //$errorBackTerms.innerHTML = "";
        }

        if(errors.name == true || errors.email == true || errors.password == true || errors.password2 == true || errors.file == true || errors.terms == true){
            $errorSubmit.innerHTML = "Complete el formulario correctamente"
            
        } 

        if(errors.name == false && errors.email == false && errors.password == false && errors.password2 == false && errors.file == false && errors.terms == false){

            $errorSubmit.innerHTML = ""
            $formulario.submit()
            
        }

        
    })


})