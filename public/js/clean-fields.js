var name_product = document.getElementById('name_product');
var brand_product = document.getElementById('brand_product');
var year_product = document.getElementById('year_product');
var description_product = document.getElementById('description_product');
var quantity_product = document.getElementById('quantity_product');

var btn_clean_fields = document.getElementById('btn_clean_fields');

//LIMPIADOR DE CAMPOS CUANDO SE HACE CLIC
btn_clean_fields.addEventListener('click', () => {
    name_product.value = '';
    brand_product.value = '';
    year_product.value = '';
    description_product.value = '';
    quantity_product.value = '';
});