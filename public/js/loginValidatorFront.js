const QS = (element)=>document.querySelector(element)

window.addEventListener("load", ()=>{
    let $formulario = QS("#form")
    let $inputEmail = QS("#email")
    let $inputPasswd = QS("#password")

    let $errorBackEmail = QS("#errorBackEmail")
    let $errorBackPasswd = QS("#errorBackPassword")


    /* Expresiones */
    const validation = {
        valiPasswd:/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
        //^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[$@$!%?&#.$($)$-$_])[A-Za-z\d$@$!%?&#.$($)$-$_]{8,16}$/
        /* /^(?=(?:.\d))(?=(?:.[A-Z]))(?=(?:.*[a-z]))\S{8,}$/ */,
        valiEmail:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    }
    /* errors */
    let $errorEmail = QS("#emailErrors")
    let $errorPasswd = QS("#passwordErrors")
    let $errorSubmit=QS("#errorSubmit") 

    let errors = {
        email:true,
        password: true,
    }


    $inputEmail.addEventListener("blur", e => {
        switch(true){
            case !$inputEmail.value.trim():
                $emailErrors.innerHTML = "Debe ingresar un email"
                if ($errorBackEmail) {
                    $errorBackEmail.innerHTML = ""
                }
                errors.email = true
                break;
            case !validation.valiEmail.test($inputEmail.value):
                $emailErrors.innerHTML = "Ingrese un email válido"   
                if ($errorBackEmail) {
                    $errorBackEmail.innerHTML = ""
                }
                errors.email = true
                break;
            default:
                $emailErrors.innerHTML = ""
                errors.email = false
        }
    })

    $inputPassword.addEventListener("blur", e => {
        switch(true){
            case !$inputPassword.value.trim():
                $passwordErrors.innerHTML = "Ingrese una contraseña"
                if ($errorBackPassword) {
                    $errorBackPassword.innerHTML = ""
                }
                errors.password = true
                break;
            case $inputPassword.value.length < 8/*!validation.valiPasswd.test($inputPasswd.value)*/:
                //$errorPasswd.innerHTML = "La contraseña debe tener:<br> Entre 8 a 16 digitos <br>Una mayuscula<br>Una minuscula<br>Un numero<br>"   
                $passwordErrors.innerHTML = "La contraseña debe tener<br> por lo menos 8 caracteres"
                if ($errorBackPassword) {
                    $errorBackPassword.innerHTML = ""
                }
                errors.password = true
                break;
            default:
                $passwordErrors.innerHTML = ""
                errors.password = false
        }

    })

    $formulario.addEventListener("submit", function(event){
        event.preventDefault()

        if(errors.email == true || errors.password == true){
            $errorSubmit.innerHTML = "Complete el formulario correctamente"
            
        } 

        if(errors.email == false && errors.password == false){

            $errorSubmit.innerHTML = ""
            $formulario.submit()
            
        }

        
    })


})