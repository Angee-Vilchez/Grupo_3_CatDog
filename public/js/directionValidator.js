function qs(element) {
    return document.querySelector(element)
}


window.addEventListener('load', function(){
    let $street = qs('#street'),
    $streetError = qs('#streetError'),
    $number = qs('#number'),
    $numberError = qs('#numberError'),
    /* $province = qs('#province'),
    $provinceError = qs('#provinceError'),
    $city = qs('#city'),
    $cityError = qs('#cityError'), */
    $formDirection = qs('#formDirection')


    $street.addEventListener('blur', () => {
        switch(true){
            case !$street.value.trim():
                $streetError.innerHTML = "Ingresa la calle";
                $street.classList.add('error-message');
                break;
            default:
                $street.classList.remove('error-message');
                 $streetError.innerHTML = ""; 
                break;
        }
    })
    $number.addEventListener('blur', () => {
        switch(true){
            case !$number.value.trim():
                $numberError.innerHTML = "Ingresa la altura";
                $number.classList.add('error-message');
                break;
            default:
                $number.classList.remove('error-message');
                $numberError.innerHTML = "";
                break;
        }
    })
    /* $province.addEventListener('blur', () => {
        if(!$province.value.trim()){
            $provinceError.innerHTML = "Ingresa provincia";
            $province.classList.add('error-message');
        } else {
            $province.classList.remove('error-message');
            $provinceError.innerHTML = "";
        }
    })
    $city.addEventListener('blur', () => {
        if(!$city.value.trim()){
            $cityError.innerHTML = "Ingresa provincia";
            $city.classList.add('error-message');
        } else {
            $city.classList.remove('error-message');
            $cityError.innerHTML = "";
        }
    }) */


    $formDirection.addEventListener('submit', function(e){
        e.preventDefault()

       let elementForm = this.elements;
       let error = false;
       console.log(elementForm)

       for (let index = 0; index < elementForm.length -1; index++) { /* obviamos el boton */
           if(/* elementForm[index].value == ""
           && elementosFormulario[index].type !== "file"
           || */ elementForm[index].classList.contains('error-message')){
               elementForm[index].classList.add('error-message');
               formDirectionError.innerHTML = "Hay errores en el formulario"
               error = true;
           }
       }
       
           if(!error){
           $formDirection.submit()
           }
   })

})