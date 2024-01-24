// Initialize productController (item controller) as a new product list
const productController = new ProductController()

// Select the form
const newProdForm = document.querySelector("#productForm")

// Add an 'onsubmit' event listener to the form
newProdForm.addEventListener('submit', (event) => {
    // Prevent form submission from reloading the page
    event.preventDefault();
    if (productController.getDOMElements()) {
        const result = productController.getDOMElements();
        const name = result.name;
        const type = result.type;
        const format = result.format;
        const price = result.price;
        const country = result.country;
        const description = result.description;
        const imgURL = result.imgURL;
        // POST to api
        productController.sendJSON(name, type, format, price, country, description, imgURL, "POST")

        // Run toast if new product is created successfully
        productController.showToast("products.html", "productController");
        productController.scrollToTop();

        // Reset the user inputs
        newProdForm.reset();
        document.getElementById('imagePreview').style.display = "none";
    }
}
)   