// Initialize productController (item controller) as a new product list
const productController = new ProductController()

const url = document.location.search;
let urlParams = new URLSearchParams(url);
let id = urlParams.get("id");

//import { escapeHTML } from './escape-html';
document.addEventListener('DOMContentLoaded', function () {
    //    const url = window.location.href;
    //    const queryString = url.split('?')[1];
    if (id) {
        fetch(`/api/products/${id}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const inputName = document.getElementById("input_bar_name")
                inputName.value = data.name
                const inputPrice = document.getElementById("input_bar_price")
                inputPrice.value = data.price
                // Check the corresponding product type radio button
                const inputType = document.querySelectorAll('input[name="prod_type"]');
                for (const button of inputType) {
                    if (button.value === data.type) {
                        button.checked = true;
                        break;
                    }
                }
                // Check the corresponding tea format radio button
                const inputFormat = document.querySelectorAll('input[name="tea_format"]');
                for (const button of inputFormat) {
                    if (button.value === data.format) {
                        button.checked = true;
                        break;
                    }
                    else {
                        button.disabled = true;
                        button.checked = false;
                    }
                }
                const inputCountry = document.getElementById("input_bar_country")
                inputCountry.value = data.country
                const inputDescription = document.getElementById("input_bar_description")
                inputDescription.value = data.description
                const inputImage = document.getElementById("currentImage")
                inputImage.src = data.imagePath
            })
    }
})

// Select the form
const newProdForm = document.querySelector("#productForm")

// Add an 'onsubmit' event listener to the form
newProdForm.addEventListener('submit', (event) => {
    // Prevent form submission from reloading the page
    event.preventDefault();

    // Select inputs
    if (productController.getDOMElements()) {
        const result = productController.getDOMElements();
        const name = result.name;
        const type = result.type;
        const format = result.format;
        const price = result.price;
        const country = result.country;
        const description = result.description;
        const imgURL = result.imgURL;
        // PUT to api
        productController.sendJSON(name, type, format, price, country, description, imgURL, "PUT", id)

        // Run toast if new product is updated successfully
        productController.showToast("products.html", "productController");
        productController.scrollToTop();

        // Reset the user inputs
        const formElement = document.querySelector('#productForm');
        formElement.reset();
        document.getElementById('imagePreview').style.display = "none";
    }
}
)
