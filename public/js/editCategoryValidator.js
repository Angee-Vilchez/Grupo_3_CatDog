function qs (element){
    return document.querySelector(element)
}

window.addEventListener('load', function(){
    let $categoryName = qs('#category'),
    $error = qs ('#categoryEditError'),
    $form = qs ('#formCategoryEdit'),
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/;

    $categoryName.addEventListener('blur', () =>{
        switch(true){
            case !$categoryName.value.trim():
                $error.innerHTML = "Ingrese nombre de la Categoria";
                $categoryName.classList.add('error-msg');
                break;
            case !regExAlpha.test($categoryName.value): /* test devuelve bool */
                $error.innerHTML = "El nombre no es válido";
                $categoryName.classList.add('error-msg');
                break;
            default:
                $categoryName.classList.remove('error-msg');
                $error.innerHTML = "";
                break;
        }
      })

      $form.addEventListener('submit', function(e){
        e.preventDefault()
    
        let elementosFormulario = this.elements;
        let errores = false;
        console.log(elementosFormulario);
    
        for(let index = 0; index < elementosFormulario.length -1; index++){
            if(elementosFormulario[index].value  == ""
            || elementosFormulario[index].classList.contains('error-msg')){
                submitCategoryeditError.innerHTML = "Hay errores en el formulario"
                    errores= true;
            }
        }
        if(!errores){
            $form.submit()
        }
      })

})