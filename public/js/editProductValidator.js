function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load', function(){
    let $name = qs('#name'),
    $error = qs('#nameError'),
    $brands = qs('#brands'),
    $brandsError = qs('#marcaError'),
    $price = qs('#price'),
    $priceError = qs('#priceError'),
    $discount = qs('#discount'),
    $discountError = qs('#discountError'),
    $category = qs('#categoryId'),
    $categoryError = qs('#categoryNameError'),
    $image = qs('#image'),
    $imageError = qs('#imageError'),
    $stock = qs('#stock'),
    $stockErrors = qs('#stockErrors'),
    $description = qs('#description'),
    $descriptionError = qs('#descriptionError'),
    $form = qs('#formProduct'),
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/;

    $name.addEventListener('blur', () => {
        switch(true){
            case !$name.value.trim():
                $error.innerHTML = "Nombre del producto requerido";
                $name.classList.add('error-msg');
                break;
            case !regExAlpha.test($name.value): /* test devuelve bool */
                $error.innerHTML = "El nombre no es válido";
                $name.classList.add('error-msg');
                break;
            case $name.value.length<5:
                $error.innerHTML = "El nombre tiene que tener 5 caracteres o mas";
                break;
            default:
                $name.classList.remove('error-msg');
                $error.innerHTML = "";
                break;
        }
    })
    $brands.addEventListener('blur', () => {
        switch(true){
            case !$brands.value.trim():
                $brandsError.innerHTML = "Marca del producto requerida";
                $brands.classList.add('error-msg');
                break;
            default:
                $brands.classList.remove('error-msg');
                $brandsError.innerHTML = "";
                break;
        }
    })
    $price.addEventListener('blur', () => {
        switch(true){
            case !$price.value.trim():
                $priceError.innerHTML = "Ingresa precio del producto";
                $price.classList.add('error-msg');
                break;
                case $price.value <= -1:
                $priceError.innerHTML = "Ingresa números válidos";
                $price.classList.add('error-msg');
                break;
            default:
                $price.classList.remove('error-msg');
                $priceError.innerHTML = ""
        }
    })
    $discount.addEventListener('blur', () => {
        switch(true){
            case $discount.value <= -1:
                $discountError.innerHTML = "Ingresa números válidos";
                $discount.classList.add('error-msg');
                break;
            default:
                $discount.classList.remove('error-msg');
                $discountError.innerHTML = "";
                break;
        }
    })
    $category.addEventListener('blur', () => {
        if(!$category.value.trim()){
            $categoryError.innerHTML = "Elija una categoría";
            $category.classList.add('error-msg');
        } else{
            $category.classList.remove('error-msg');
            $categoryError.innerHTML = "";
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
            $image.classList.remove('error-msg')
            $imageError.innerHTML = ""
        }
    })
    $stock.addEventListener('click', function (){
        $stock.value = "on"
        $stock.classList.toggle('')
        $stock.classList.remove('error-msg')
        $stockErrors.innerHTML = ""
    })
    $description.addEventListener('blur', () => {
        switch(true){
            case !$description.value.trim():
                $descriptionError.innerHTML = "Descripcion del producto requerido";
                $description.classList.add('error-msg');
                break;
                case $description.value.length<20:
                    $descriptionError.innerHTML = "La descripcion tiene que tener 20 caracteres o mas";
                    $description.classList.add('error-msg');
                break;
            default:
                $description.classList.remove('error-msg');
                $descriptionError.innerHTML = "";
                break;
        }
    })


    $form.addEventListener("submit", function(event) {
        event.preventDefault()  //para el comportamiento predeterminado del submit

        let elementsForm = this.elements; //para capturar todos los elementos que estan adentro del formulario
        let errores = false;

        console.log(elementsForm)

        for (let index = 0; index < elementsForm.length - 1; index++) { /* obviamos el boton */
            if(elementsForm[index].value == ""
            && elementsForm[index].name !== "discount"  //para que estos campos no sean requeridos
            || elementsForm[index].classList.contains('error-msg')){
                elementsForm[index].classList.add('error-msg');
                submitErrors.innerHTML = "Hay errores en el formulario"  //no esta capturado en una variable esto se puede hacer cuando es un id unico
                errores = true;
            }
        }

        if(!$stock.checked){   //si el checked no esta ejecuta lo siguiente
            $stock.classList.add('error-msg');
            $stockErrors.innerHTML = "Debes aceptar el stock";
        }

        if(!errores){  //si no hay errores ejecutame lo siguiente
            $form.submit()
        }

    })
    
})