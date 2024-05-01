// Initialize productController (item controller) as a new product list
const productController = new ProductController()
window.name = "productController"

document.addEventListener('DOMContentLoaded', function () {
    const url = document.location.search;
    let urlParams = new URLSearchParams(url);
    let id = urlParams.get("id");
    const apiContainer = document.getElementById("apiError");
    if (id) {
        fetch(`/api/products/${id}`)
            .then(response => {
                if (!response.ok) {
                    apiContainer.classList.add("alert", "alert-danger", "w-50", "translate-middle-x", "start-50", "mt-3");
                    apiContainer.setAttribute("role", "alert");
                    apiContainer.innerText = "Product id does not exist.";
                    document.title="Coz WeBrew - Product not found";
                    throw new Error("Fetching of data failed.");
                }
                return response.json();
            })
            .then(data => {
                // To start tabulating the product details into the page if the fetch api is successfully responded
                document.title="Coz WeBrew - "+data.name;
                const prodContainer = document.getElementById('prodContainer');
                prodContainer.classList.add("container");
                const prodButtonsContainer = document.createElement('div');
                prodButtonsContainer.classList.add("row");
                const userSelection = document.createElement('div');
                userSelection.classList.add("user_selection");
                const updateBtn = document.createElement('button');
                const deleteBtn = document.createElement('button');
                updateBtn.innerText = "Update product";
                updateBtn.classList.add("user_selection_button");
                updateBtn.setAttribute("id", "btn_update");
                // This button direct the user to product details page whereby he/she can update or delete the product
                updateBtn.addEventListener('click', () => {
                    window.location.href = "update-product.html?id=" + id
                })
                deleteBtn.classList.add("user_selection_button");
                deleteBtn.innerText = "Delete product";
                deleteBtn.setAttribute("id", "btn_delete");
                // This button allows user to delete the product
                deleteBtn.addEventListener('click', () => {
                    productController.deleteProduct(id)

                    // Run toast if new product is deleted successfully
                    productController.showToast("products.html", "productController",'#delete')
                });
                //These 2 buttons are for mobile view only
                const updateBtnMobile = document.createElement('button');
                const deleteBtnMobile = document.createElement('button');
                updateBtnMobile.innerText = "Update";
                updateBtnMobile.classList.add("user_selection_button");
                updateBtnMobile.setAttribute("id", "btn_update_mobile");
                updateBtnMobile.addEventListener('click', () => {
                    window.location.href = "update-product.html?id=" + id
                })
                deleteBtnMobile.classList.add("user_selection_button");
                deleteBtnMobile.setAttribute("id", "btn_delete_mobile");
                deleteBtnMobile.innerText = "Delete";
                deleteBtnMobile.addEventListener('click', () => {
                    productController.deleteProduct(id);
                    // Run toast if new product is deleted successfully
                    productController.showToast("products.html", "productController","#delete");
                });
                userSelection.appendChild(updateBtn);
                userSelection.appendChild(deleteBtn);
                userSelection.appendChild(updateBtnMobile);
                userSelection.appendChild(deleteBtnMobile);
               prodButtonsContainer.appendChild(userSelection);
               prodContainer.appendChild(prodButtonsContainer);

                const productBody = document.createElement("div");
                productBody.classList.add("product_details","row");
                const imgBody = document.createElement('div');
                imgBody.classList.add("col-md-4", "col-sm-12");
                const imgPath = escapeHTML(data.imagePath);
                const smallImgPath = escapeHTML(data.smallImagePath);
                const productName = escapeHTML(data.name);
                const pictureBody = document.createElement('picture');
                const sourceTag = document.createElement('source')
                sourceTag.setAttribute("media","(max-width: 768px)");
                sourceTag.srcset=smallImgPath;
                const imgElement = document.createElement('img');
                imgElement.classList.add("img-fluid", "prodImg");
                imgElement.src = imgPath;
                imgElement.alt = productName;
                pictureBody.appendChild(sourceTag);
                pictureBody.appendChild(imgElement);
                imgBody.appendChild(pictureBody);
                productBody.appendChild(imgBody);
                const prodDetails = document.createElement('div');
                prodDetails.classList.add("col-md-8", "col-sm-12");
                const prodDescription = escapeHTML(data.description);
                const prodDetailsContent = [
                    { htmlContent: [`<h3 class="prodName" id="prodName">${productName}</h3>`] },
                    { htmlContent: [`<p class="prodPrice" id="prodPrice">$${Number(data.price).toFixed(2)}</p>`] },
                    { htmlContent: [`<div class="prodDescription" id="prodDescription">${prodDescription}</div>`] },
                    { htmlContent: [`<button type="button" class="user_selection_button" onclick="addToEnquiry()">Add to enquiry</button>`] }
                ];

                // Loop through prodDetailsContent and create elements
                for (const content of prodDetailsContent) {
                    const contentElement = document.createElement('div');
                    // Append HTML content elements
                    for (const line of content.htmlContent) {
                        const fragment = document.createRange().createContextualFragment(line);
                        contentElement.appendChild(fragment);
                    }
                    prodDetails.appendChild(contentElement);
                }
                productBody.appendChild(prodDetails);
               prodContainer.appendChild(productBody);
                const usernameSpanBig = document.getElementById("logoutBig");
                const usernameSpanSmall = document.getElementById("logoutSmall");

                if (!usernameSpanBig || !usernameSpanSmall) {
                    userSelection.style.display = "none"
                } else {
                    userSelection.style.display = "flex"
                }
            })
    }
    else {
        apiContainer.classList.add("alert", "alert-danger", "w-50", "translate-middle-x", "start-50", "mt-3");
        apiContainer.setAttribute("role", "alert");
        apiContainer.innerText = "No ID indicated in the URL.";
        document.title="Coz WeBrew - No ID";
    }
});

// Function to check if an ID is present in the array
function isIdPresent(arr, targetId) {
    return arr.some(product => product.id === targetId);
}

//function to add the product into local storage to be rendered in the enquiry form later
function addToEnquiry() {
    const url = document.location.search;
    let urlParams = new URLSearchParams(url);
    let id = urlParams.get("id");

    if (!localStorage.getItem('enquiryList')) {
        const dummyArray = []
        localStorage.setItem('enquiryList', JSON.stringify(dummyArray))
    }

    const enquiryList = JSON.parse(localStorage.getItem('enquiryList')) || [];
    const idInt = parseInt(id)

    if (isIdPresent(enquiryList, idInt)) {
        // If the product exists in local storage, the toast is run to inform the the customer
        productController.showToast("enquiry-form.html", "productController","#addToEnquiry","Product already added.");
        productController.scrollToTop();

    } else {
        // If the product does not exist in local storage, product is fetched from database to the local storage
        fetch(`/api/products/${id}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                productController.storeDataToLocalStorage(data)
            })

        // Run toast if new product is added to enquiry form successfully
        productController.showToast("enquiry-form.html", "productController","#addToEnquiry", "Product added to enquiry.")
        productController.scrollToTop();
    }
}
