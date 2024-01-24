// Initialize productController (item controller) as a new product list
const productController = new ProductController()

const storageProduct = localStorage.getItem('enquiryList')
const products = JSON.parse(storageProduct)
const contentHolder = document.getElementById("content_holder")
const apiContainer = document.getElementById("apiError");
apiContainer.classList.add("alert", "alert-danger", "w-50", "translate-middle-x", "start-50", "mt-3");
apiContainer.setAttribute("role", "alert");
apiContainer.style.display = "none";
apiContainer.innerText = "Enquiry form is empty."
const enquiryButton = document.getElementById('btn_enquiry')
const backToProductsButton = document.getElementById('backToProducts')

//To show the products added to enquiry form
if (!products || products.length === 0) {
    apiContainer.style.display = "block";
}
else {
    const headerHolder = document.createElement("div")
    headerHolder.classList.add("d-flex", "justify-content-between", "align-item-center", "mb-4")
    const title = document.createElement("h3")
    title.classList.add("fw-normal", "mb-0", "text-black")
    title.innerText = "Enquiry"
    const introText = document.createElement("p")
    introText.classList.add("mt-3", "ms-1", "fw-bold")
    const enquiryCountHolder = document.createElement("div")
    enquiryCountHolder.classList.add("mt-auto")
    const enquiryCount = document.createElement("span")
    enquiryCount.setAttribute("id", "enquiry_count")
    enquiryCountHolder.appendChild(enquiryCount)
    headerHolder.appendChild(title)
    headerHolder.appendChild(enquiryCountHolder)
    contentHolder.appendChild(headerHolder)
    enquiryCount.innerText = `${products.length} items`;
    introText.innerText = "You are interested in:";
    contentHolder.appendChild(introText)
    for (let i = 0; i < products.length; i++) {
        const outerCard = document.createElement("div")
        outerCard.classList.add("card", "rounded-3", "mb-4")
        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body", "w-100", "p-3");
        const cardRow = document.createElement("div")
        cardRow.classList.add("row", "d-flex", "justify-content-between", "align-items-center");
        cardBody.appendChild(cardRow)
        outerCard.appendChild(cardBody)
        contentHolder.appendChild(outerCard)
        //
        //        const cardImageHolder = document.createElement("div")
        //        cardImageHolder.classList.add("col-md-2", "col-lg-2", "col-xl-2")
        //        const cardImage = document.createElement("img")
        //        cardImage.classList.add("img-fluid", "rounded-3")
        //        cardImage.src = products[i].imagePath
        //        cardImage.alt = products[i].name
        //        cardImageHolder.appendChild(cardImage)

        const cardDetailsHolder = document.createElement("div")
        cardDetailsHolder.classList.add("col-10", "col-sm-10", "col-md-5", "col-lg-5", "col-xl-6", "d-flex", "enquiry_details")
        const cardName = document.createElement("p")
        cardName.classList.add("fw-medium", "mb-2")
        cardName.innerText = products[i].name
        const cardId = document.createElement("span")
        cardId.classList.add("enquiry_id")
        cardId.style.display = "none"
        cardId.innerText = `${products[i].id}`
        cardDetailsHolder.appendChild(cardName)
        cardDetailsHolder.appendChild(cardId)

        const priceHolder = document.createElement("div")
        priceHolder.classList.add("col-4", "col-sm-3", "col-md-2", "col-lg-2", "col-xl-2", "order-sm-4", "off-set-sm-1", "order-4")
        const priceContent = document.createElement("p")
        priceContent.classList.add("text-end", "text-md-center");
        priceContent.classList.add("mb-0", "fw-medium")
        priceHolder.appendChild(priceContent)

        const deleteButtonHolder = document.createElement("div")
        deleteButtonHolder.classList.add("col-2", "col-sm-2", "col-md-1", "col-lg-1", "col-xl-1", "text-end", "order-sm-2", "order-md-4", "order-2", "deleteIcon")
        const deleteButton = document.createElement("a")
        deleteButton.classList.add("text-danger")
        const deleteButtonIcon = document.createElement("i")
        deleteButtonIcon.classList.add("fas", "fa-trash", "fa-lg")
        deleteButton.appendChild(deleteButtonIcon)
        deleteButtonHolder.appendChild(deleteButton)

        const quantityHolder = document.createElement("div")
        quantityHolder.classList.add("col-5", "col-sm-4", "col-md-3", "col-lg-2", "col-xl-2", "d-flex", "order-sm-3", "order-md-2", "order-3")
        const minusButtonHolder = document.createElement("button")
        minusButtonHolder.classList.add("btn", "btn-link", "px-2")
        const minusButton = document.createElement("i")
        minusButton.classList.add("fas", "fa-minus")
        minusButtonHolder.appendChild(minusButton)
        const quantityInput = document.createElement("input")
        quantityInput.classList.add("form-control", "quantity_input")
        quantityInput.setAttribute("name", "productQuantity")
        quantityInput.setAttribute("type", "number");
        quantityInput.setAttribute("value", "1");
        quantityInput.setAttribute("min", "1");
        quantityInput.setAttribute("max", "10");
        quantityInput.addEventListener("change", function () {
            priceContent.innerText = `$${(products[i].price * quantityInput.value).toFixed(2)}`
        })
        const plusButtonHolder = document.createElement("button")
        plusButtonHolder.classList.add("btn", "btn-link", "px-2")
        const plusButton = document.createElement("i")
        plusButton.classList.add("fas", "fa-plus")
        plusButtonHolder.appendChild(plusButton)
        quantityHolder.appendChild(minusButtonHolder)
        quantityHolder.appendChild(quantityInput)
        quantityHolder.appendChild(plusButtonHolder)
        priceContent.innerText = `$${(products[i].price * quantityInput.value).toFixed(2)}`

        // cardRow.appendChild(cardImageHolder)
        cardRow.appendChild(cardDetailsHolder)
        cardRow.appendChild(quantityHolder)
        cardRow.appendChild(priceHolder)
        cardRow.appendChild(deleteButtonHolder)

        minusButtonHolder.addEventListener("click", function () {
            var inputElement = this.parentNode.querySelector('input[type=number]');
            inputElement.stepDown();
            priceContent.innerText = `$${(products[i].price * quantityInput.value).toFixed(2)}`
        });
        plusButtonHolder.addEventListener("click", function () {
            var inputElement = this.parentNode.querySelector('input[type=number]');
            inputElement.stepUp();
            priceContent.innerText = `$${(products[i].price * quantityInput.value).toFixed(2)}`
        });
        enquiryButton.style.display = "block";
        backToProductsButton.style.display = "block";
    }
}

// Event listener for the delete icon to update the count value of the enquiry form items
document.querySelectorAll(".fa-trash").forEach(function (button) {
    button.addEventListener("click", function () {
        const productContainer = button.parentElement.parentElement.parentElement.parentElement.parentElement
        const idParentHolder = button.parentElement.parentElement.parentElement
        const idHolder = idParentHolder.querySelector('.enquiry_details')
        const productId = idHolder.querySelector('.enquiry_id').innerText;
        const updatedEnquiryList = products.filter(product => product.id != productId)
        if (updatedEnquiryList.length > 0) {
            localStorage.setItem('enquiryList', JSON.stringify(updatedEnquiryList))
        } else {
            apiContainer.style.display = "block";
            localStorage.removeItem('enquiryList')
        }
        productContainer.remove('')
        window.open("enquiry-form.html", "productController")
    })
})

// Function to generate enquiry email
async function enquiryConfirm() {
    const userEmailInput = document.getElementById('userEmail')
    const enquiryProducts = JSON.parse(storageProduct)
    const enquiryProductsTextArray = [];
    const quantityInput = document.getElementsByClassName("quantity_input")

    // Consolidate the product details to generate the email content
    for (let i = 0; i < enquiryProducts.length; i++) {
        const product = enquiryProducts[i];
        const productText = `Product ID: ${product.id}\nProduct Name: ${product.name}\nQuantity: ${quantityInput[i].value}\n\n`;
        enquiryProductsTextArray.push(productText);
    }

    const enquiryProductsText = enquiryProductsTextArray.join('');

    const emailContent = {
        msgBody: userEmailInput.value + " has an enquiry for the products below: \n\n" + enquiryProductsText,
        subject: "New Enquiry!"
    }
    try {
        const response = await fetch("/sendMail", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(emailContent),
        });

        localStorage.removeItem('enquiryList')

        // Run toast if the enquiry mail is sent successfully
        var toastEl = document.querySelector('#enquiry');
        var toast = new bootstrap.Toast(toastEl);
        toast.show();
        scrollToTop();

        var enquiryDoneToast = document.querySelector('#enquiry');
        enquiryDoneToast.addEventListener('hidden.bs.toast', function () {
            window.open("index.html", "productController");
        });
    } catch (error) {
        console.error("Error:", error);
    }
}