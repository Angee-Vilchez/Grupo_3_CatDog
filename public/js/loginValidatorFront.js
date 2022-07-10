const QS = (element)=>document.querySelector(element)
window.addEventListener("load",() => {

    let $formulario = QS("#form")
    let $inputEmail = QS("#email")
    let $inputPassword = QS("#password")
    

    const validation = {
        valiPassword:/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
        valiEmail:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    }

    let $errorEmail = QS("#errorEmail")
    let $errorPassword = QS("#errorPassword")
    let $errorComparacion = QS("#errorComparacion")
    let $errorSubmit=QS("#errorSubmit")

    let $errorBackEmail = QS("#errorBackEmail")
    let $errorBackPassword = QS("#errorBackPassword")

    let errors = {
        email:true,
        password: true,
    }

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
                case $inputPassword.value.length != 0:
                    $errorPassword.innerHTML = ""
                    if ($errorBackPassword) {
                        $errorBackPassword.innerHTML = ""
                    }
                    errors.passwd = false
                break
                /*case $inputPasswd.value.length < 8/*!validation.valiPasswd.test($inputPasswd.value):
                $errorPasswd.innerHTML = "La contraseña debe tener:<br> Entre 8 a 16 digitos <br>Una mayuscula<br>Una minuscula<br>Un numero<br>"   
                $errorPasswd.innerHTML = "La contraseña debe tener<br> por lo menos 8 caracteres"
                if ($errorBackPasswd) {
                    $errorBackPasswd.innerHTML = ""
                }
                errors.passwd = true
                break;*/
            default:
                $errorPassword.innerHTML = ""
                errors.password = false
        }

    })

    $formulario.addEventListener("submit", function(event){
        event.preventDefault()


        if(errors.password == true || errors.email == true ){
            $errorSubmit.innerHTML = "Complete el formulario correctamente"
            if($errorComparacion){
                $errorComparacion.innerHTML = ""
            }
        } 

        if(errors.password == false && errors.email == false ){

            $errorSubmit.innerHTML = ""
            $formulario.submit()
            
        }

        
    })


    
})