// ==========================================
// MINI STORE CHECKOUT SYSTEM
// LABORATORY ACTIVITY #3
// ==========================================


// ==========================================
// CALCULATE ITEM AMOUNT
// ==========================================

function calculateItemAmount(price, quantity) {

    return price * quantity;

}


// ==========================================
// CALCULATE DISCOUNT
// ==========================================

function calculateDiscount(subtotal) {

    let discountRate = 0;

    if (subtotal >= 5000) {

        discountRate = 0.10;

    } else if (subtotal >= 3000) {

        discountRate = 0.07;

    } else if (subtotal >= 1000) {

        discountRate = 0.05;

    } else {

        discountRate = 0;

    }

    return subtotal * discountRate;
}


// ==========================================
// GET DELIVERY FEE
// ==========================================

function getDeliveryFee(option) {

    let fee;

    switch (Number(option)) {

        case 1:
            fee = 0;
            break;

        case 2:
            fee = 80;
            break;

        case 3:
            fee = 150;
            break;

        default:
            fee = 0;
    }

    return fee;
}


// ==========================================
// GET DISCOUNT RATE
// ==========================================

function getDiscountRate(subtotal) {

    if (subtotal >= 5000) {

        return 0.10;

    } else if (subtotal >= 3000) {

        return 0.07;

    } else if (subtotal >= 1000) {

        return 0.05;

    } else {

        return 0;
    }
}


// ==========================================
// VALIDATION MESSAGE
// ==========================================

function showValidation(message) {

    document.getElementById("validationMessage").textContent = message;

}


// ==========================================
// GENERATE PRODUCT INPUT FIELDS
// ==========================================

function generateProductFields() {

    const productCount =
        Number(document.getElementById("productCount").value);

    const container =
        document.getElementById("productsContainer");

    container.innerHTML = "";


    // Validate product count

    if (!Number.isInteger(productCount) || productCount <= 0) {

        showValidation(
            "Please enter a valid positive whole number for Number of Products."
        );

        return;
    }


    showValidation("");


    // REQUIRED FOR LOOP

    for (let i = 0; i < productCount; i++) {

        const product = document.createElement("div");

        product.className = "product";


        product.innerHTML = `

            <h3>Product ${i + 1}</h3>

            <div class="field">

                <label for="productName-${i}">
                    Product Name
                </label>

                <input
                    type="text"
                    id="productName-${i}"
                    placeholder="Enter product name"
                >

            </div>


            <div class="field">

                <label for="productPrice-${i}">
                    Price
                </label>

                <input
                    type="number"
                    id="productPrice-${i}"
                    min="0.01"
                    step="0.01"
                    placeholder="Enter price"
                >

            </div>


            <div class="field">

                <label for="productQuantity-${i}">
                    Quantity
                </label>

                <input
                    type="number"
                    id="productQuantity-${i}"
                    min="1"
                    step="1"
                    placeholder="Enter quantity"
                >

            </div>

        `;


        container.appendChild(product);
    }
}


// ==========================================
// CALCULATE ORDER
// ==========================================

function calculateOrder() {

    const customerName =
        document.getElementById("customerName").value.trim();

    const productCount =
        Number(document.getElementById("productCount").value);

    const validationMessage =
        document.getElementById("validationMessage");

    const orderSummary =
        document.getElementById("orderSummary");


    // Clear previous messages

    validationMessage.textContent = "";

    orderSummary.style.display = "none";


    // ==========================================
    // VALIDATE CUSTOMER NAME
    // ==========================================

    if (customerName === "") {

        showValidation(
            "Customer Name is required."
        );

        return;
    }


    // ==========================================
    // VALIDATE PRODUCT COUNT
    // ==========================================

    if (!Number.isInteger(productCount) || productCount <= 0) {

        showValidation(
            "Number of Products must be a positive whole number."
        );

        return;
    }


    // ==========================================
    // SUBTOTAL ACCUMULATOR
    // ==========================================

    let subtotal = 0;

    let productDetails = "";


    // ==========================================
    // PROCESS PRODUCTS USING FOR LOOP
    // ==========================================

    for (let i = 0; i < productCount; i++) {

        const name =
            document
                .getElementById(`productName-${i}`)
                .value
                .trim();


        const price =
            Number(
                document.getElementById(`productPrice-${i}`).value
            );


        const quantity =
            Number(
                document.getElementById(`productQuantity-${i}`).value
            );


        // ==========================================
        // VALIDATE PRODUCT NAME
        // ==========================================

        if (name === "") {

            showValidation(
                `Please enter a Product Name for Product ${i + 1}.`
            );

            return;
        }


        // ==========================================
        // VALIDATE PRICE
        // ==========================================

        if (!Number.isFinite(price) || price <= 0) {

            showValidation(
                `Price for Product ${i + 1} must be a positive number.`
            );

            return;
        }


        // ==========================================
        // VALIDATE QUANTITY
        // ==========================================

        if (!Number.isInteger(quantity) || quantity <= 0) {

            showValidation(
                `Quantity for Product ${i + 1} must be a positive whole number.`
            );

            return;
        }


        // ==========================================
        // CALCULATE ITEM AMOUNT
        // ==========================================

        const amount =
            calculateItemAmount(price, quantity);


        // Add amount to subtotal

        subtotal += amount;


        // ==========================================
        // BUILD PRODUCT SUMMARY
        // ==========================================

        productDetails += `

            <div class="summary-item">

                <strong>
                    ${i + 1}. ${name}
                </strong>

                <br>

                Price:
                ₱${price.toFixed(2)}

                <br>

                Quantity:
                ${quantity}

                <br>

                Amount:
                ₱${amount.toFixed(2)}

            </div>

        `;
    }


    // ==========================================
    // CALCULATE DISCOUNT
    // ==========================================

    const discount =
        calculateDiscount(subtotal);


    const discountRate =
        getDiscountRate(subtotal);


    // ==========================================
    // DELIVERY
    // ==========================================

    const deliveryOption =
        document.getElementById("deliveryOption");


    const deliveryFee =
        getDeliveryFee(deliveryOption.value);


    const deliveryType =
        deliveryOption
            .options[deliveryOption.selectedIndex]
            .text;


    // ==========================================
    // FINAL AMOUNT
    // ==========================================

    const finalAmount =
        subtotal - discount + deliveryFee;


    // ==========================================
    // DISPLAY ORDER SUMMARY
    // ==========================================

    orderSummary.innerHTML = `

        <h2>ORDER SUMMARY</h2>


        <p>
            <strong>Customer:</strong>
            ${customerName}
        </p>


        ${productDetails}


        <hr>


        <p>
            <strong>Subtotal:</strong>
            ₱${subtotal.toFixed(2)}
        </p>


        <p>
            <strong>Discount Rate:</strong>
            ${(discountRate * 100).toFixed(0)}%
        </p>


        <p>
            <strong>Discount Amount:</strong>
            ₱${discount.toFixed(2)}
        </p>


        <p>
            <strong>Delivery Type:</strong>
            ${deliveryType}
        </p>


        <p>
            <strong>Delivery Fee:</strong>
            ₱${deliveryFee.toFixed(2)}
        </p>


        <p class="total">

            <strong>
                Final Amount:
            </strong>

            ₱${finalAmount.toFixed(2)}

        </p>

    `;


    orderSummary.style.display = "block";
}


// ==========================================
// BUTTON EVENTS
// ==========================================

document
    .getElementById("generateBtn")
    .addEventListener(
        "click",
        generateProductFields
    );


document
    .getElementById("calculateBtn")
    .addEventListener(
        "click",
        calculateOrder
    );