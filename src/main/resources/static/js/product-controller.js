// This is the controller class (with methods) to control/manage the products

// Create a class product controller
class ProductController {

    constructor(data = []) {
        this.products = data;
    }
    // Fetch array of objects and display in HTML
    displayList(data) {
        const unorderedList = document.getElementById("showList");
        // If no product
        if (!data.length) {
            let listProduct = document.createElement("div")
            listProduct.innerHTML = `<span>There are no products at the moment.</span>`
            listProduct.style.alignItems = "center"
            listProduct.style.fontSize = "x-large"
            listProduct.style.fontStyle = "italic"
            listProduct.style.listStyle = "none"
            unorderedList.appendChild(listProduct)
            return
        }

        // Populate product cards
        const selections = getAllSelections();
        // Clear previously appended child
        unorderedList.textContent = '';
        let dataSet, sorted, currentType, displayStyle, contentType;
        let filteredProducts = [];
        // If no filter applied
        if (selections.length === 0) {
            dataSet = data;
            sorted = false;
        }
        else {
            // Get all the unique product types. Can also type out all but this way doesn't further amendment even when the types grow
            const productTypes = Array.from(new Set(data.map(product => product.type)));
            // Get all the unique product forms. Same as above.
            const productFormats = Array.from(new Set(data.map(product => product.format)));
            // booleans
            const checkIfSelectionIncludesType = selections.some(type => productTypes.includes(type));
            const checkIfSelectionIncludesFormat = selections.some(format => productFormats.includes(format));
            // const checkIfSelectionContainsTea = selections.includes("Tea");
            if (checkIfSelectionIncludesType && checkIfSelectionIncludesFormat) {
                filteredProducts = data.filter((product) => {
                    return (product.type === "Tea" && selections.includes(product.format)) || (selections.includes(product.type) && (product.type != "Tea"));
                });
                // Sort by type, format, then id
                filteredProducts.sort((a, b) => (a.type > b.type ? 1 : a.type < b.type ? -1
                    : a.format > b.format ? 1 : a.format < b.format ? -1
                        : a.id - b.id));
            }
            else {
                filteredProducts = data.filter((product) => {
                    return selections.includes(product.type) || selections.includes(product.format);
                });
                if (checkIfSelectionIncludesType) {
                    // Sort by type then id
                    filteredProducts.sort((a, b) => (a.type > b.type ? 1 : a.type < b.type ? -1 : a.id - b.id));
                }
            }
            dataSet = filteredProducts;
            sorted = true;
        }
        const usernameSpanBig = document.getElementById("logoutBig");
        const usernameSpanSmall = document.getElementById("logoutSmall");

        if (!usernameSpanBig || !usernameSpanSmall) {
            displayStyle = "none";
            contentType = "a";
        }
        else {
            displayStyle = "block";
            contentType = "div";
        }

        for (let i = 0; i < dataSet.length; i++) {
            // So for first instance of each type, the condition is always true. 2nd instance will be false so won't print the header.
            if (sorted) {
                if (dataSet[i].type.toUpperCase() != currentType) {
                    // Append div to create some space before the next header. Not applicable to the first header
                    if (currentType != "") {
                        let spaceBeforeNextHeader = document.createElement("div")
                        spaceBeforeNextHeader.className = "typeHeader";
                        unorderedList.appendChild(spaceBeforeNextHeader);
                    }
                    currentType = dataSet[i].type.toUpperCase();
                    let productHeader = document.createElement("h4");
                    productHeader.style.color = "#e65722";
                    productHeader.innerText = currentType;
                    productHeader.classList = "mb-1";
                    unorderedList.appendChild(productHeader);
                }
            }
            const formattedPrice = parseFloat(dataSet[i].price).toFixed(2);
            let listProduct = document.createElement(contentType)
            listProduct.className = "card"
            listProduct.classList.add("card_listing")
            listProduct.setAttribute("data-product-id", i)
            if (!usernameSpanBig || !usernameSpanSmall) {
                listProduct.href = "product-details.html?id=" + dataSet[i].id
            }
            //                <img class="img-fluid" srcset="${dataSet[i].imagePath}"/>
            listProduct.innerHTML = `
            <picture>
              <source media="(max-width: 992px)" srcset="${dataSet[i].smallImagePath}" />
              <img src="${dataSet[i].imagePath}" alt="${dataSet[i].name}" class="img-fluid"/>
            </picture>
                <div class="card-body">
                    <h5 class="card-title">${dataSet[i].name}</h5>
                    <div class="card-text proReview" id="product${dataSet[i].id}">
                    </div>
                    <p class="card-text proPrice">$${formattedPrice}</p>
                    <div class="d-none d-md-block">
                    <p class="card-text proDescription">${dataSet[i].description}</p>
                    </div>
                </div>
                <div style="display:${displayStyle}">
                <div class="card-overlay d-none d-sm-flex flex-column justify-content-center align-items-center">
                    <button class="card-overlay-btn btn_details">See product</button>
                    <button class="card-overlay-btn btn_update">Update product</button>
                    <button class="card-overlay-btn btn_delete">Delete product</button>
                </div>
                <div class="d-sm-flex flex-column justify-content-center align-items-center">
                    <button class="user_selection_button btn_modify_mobile">Modify product</button>
                </div>
                </div>
            `
            unorderedList.appendChild(listProduct);
            // This button direct the user to product details page whereby he/she can update or delete the product
            const buttonModifyMobile = document.getElementsByClassName('btn_modify_mobile')
            buttonModifyMobile[i].addEventListener('click', () => {
                window.location.href = "product-details.html?id=" + dataSet[i].id
            })

            // This button direct the user to product details page whereby he/she can see the details of the product before modifying it
            const buttonDetails = document.getElementsByClassName('btn_details')
            buttonDetails[i].addEventListener('click', () => {
                window.location.href = "product-details.html?id=" + dataSet[i].id
            })

            // This button direct the user to update product page whereby he/she can fill in the details to be updated
            const updateBtn = document.getElementsByClassName('btn_update');
            updateBtn[i].addEventListener('click', () => {
                window.location.href = "update-product.html?id=" + dataSet[i].id
            })

            // This button allows user to delete the product
            const deleteBtn = document.getElementsByClassName('btn_delete');
            deleteBtn[i].setAttribute("data-bs-toggle", "modal")
            deleteBtn[i].setAttribute("data-bs-target", "#exampleModal")
            deleteBtn[i].addEventListener('click', () => {
                localStorage.setItem("product_id_to_delete", dataSet[i].id)
                document.querySelector("#modal_delete_text").innerText = `Are you sure you want to delete ${dataSet[i].name}?`
                this.scrollToTop();
            });
        }

        productsCount.classList.add("fw-semibold");
        productsCount.innerText=`${dataSet.length} items`;
    }

    // Method to select the inputs and check if they are empty. Used in create / update product pages
    getDOMElements() {
        // Select inputs
        const newProdForm = document.querySelector("#productForm");
        const newProdName = document.querySelector('#input_bar_name');
        const newProdType = document.querySelector('input[name="prod_type"]:checked');
        const newProdPrice = document.querySelector('#input_bar_price');
        const newProdCountry = document.querySelector('#input_bar_country');
        const newProdDescription = document.querySelector('#input_bar_description');
        const newProdImage = document.querySelector('#input_image');
        const newProdFormat = document.querySelector('input[name="tea_format"]:checked');
        let format;
        if (newProdType.value === "Tea") {
            format = escapeHTML(newProdFormat.value);
        }
        else {
            format = null;
        }
        // Get values of inputs
        let name = escapeHTML(newProdName.value);
        let type = escapeHTML(newProdType.value);
        let price = escapeHTML(newProdPrice.value);
        let country = escapeHTML(newProdCountry.value);
        let description = escapeHTML(newProdDescription.value);
        let imgURL = "";

        // Validation - Fields cannot be empty
        // Creation of empty array to store those empty fields
        var formFields = [];
        for (let i = 0; i < newProdForm.length; i++) {
            var field = newProdForm.elements[i];
            if (field.type === "text" || field.id === "input_bar_description") {
                if (field.value.trim() === '') {
                    let tempName = '';
                    switch (field.id) {
                        case "input_bar_name":
                            tempName = "- Product name";
                            break;
                        case "input_bar_price":
                            tempName = "- Price";
                            break;
                        case "input_bar_country":
                            tempName = "- Country";
                            break;
                        case "input_bar_description":
                            tempName = "- Product description";
                            break;
                    }
                    formFields.push(tempName);
                }
            }
        }
        // If there is any data in formFields, alert the value(s).
        if (formFields.length > 0) {
            alert("You need to complete:\n" + formFields.join("\n"));
            return false;
        }
        else {
            let inputImage;

            if (document.getElementById("currentImage")) {
                inputImage = document.getElementById("currentImage");
                if (newProdImage.files.length === 0) {
                    imgURL = "/img/teas/" + (inputImage.src).split('/').slice(-1)[0];
                }
                else {
                    imgURL = "/img/teas/" + (newProdImage.value).replace("C:\\fakepath\\", "");
                }
            }
            // If no image uploaded - replace with default image
            else if (newProdImage.files.length === 0) {
                imgURL = "/img/teas/default-prod-img.png";
            }
            else if (newProdImage.files.length > 0) {
                imgURL = "/img/teas/" + (newProdImage.value).replace("C:\\fakepath\\", "");
            }
            return { name, type, price, country, description, format, imgURL };
        }
    }

    // Method to show toast
    showToast(page, listing, toastID = ".toast", message = null) {
        var toastEl;
        if (toastID === null) {
            toastEl = document.querySelector('.toast');
        }
        else {
            toastEl = document.querySelector(toastID);
        }
        var toast = new bootstrap.Toast(toastEl);
        if (message != undefined) {
            const toastText = document.querySelector("#toast_text")
            toastText.innerText = message;
        }
        toast.show();
        toastEl.addEventListener('hidden.bs.toast', function () {
            window.open(page, listing);
        });
    }

    // To store product data in the local storage to be rendered in the enquiry form
    storeDataToLocalStorage(data) {
        const enquiryList = JSON.parse(localStorage.getItem('enquiryList')) || [];
        enquiryList.push(data)
        localStorage.setItem('enquiryList', JSON.stringify(enquiryList))
    }

    // Method to post, put or delete product
    async sendJSON(name, type, format, price, country, description, image, method, id = null) {

        const product = {
            name: name,
            type: type,
            format: format,
            price: price,
            country: country,
            description: description,
            imagePath: image
        }
        let apiEndPoint = "";
        method = method.toUpperCase();
        if (method === "POST") {
            apiEndPoint = "/api/products";
        }
        else {
            apiEndPoint = "/api/products/" + id;
        }
        try {
            const response = await fetch(apiEndPoint, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
            const result = await response.json();
            console.log("Result:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    // API Fetch to delete product
    async deleteProduct(id) {
        try {
            const response = await fetch("/api/products/" + id, {
                method: 'DELETE',
            });
            console.log("Product deleted.")
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Method to auto scroll the window to the top to display toast and/or modal
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    deleteProduct() {
        const idToDelete = localStorage.getItem('product_id_to_delete')
        this.deleteProduct(idToDelete).then(() => {
            localStorage.removeItem('product_id_to_delete')
            window.open("products.html", "productController")
        })
    }
}
