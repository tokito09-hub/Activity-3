
    // Add another product input
    function addProduct() {

        const products = document.getElementById("products");

        const product = document.createElement("div");

        product.classList.add("product");

        product.innerHTML = `
            <input type="text" class="productName" placeholder="Product Name">
            <input type="number" class="productPrice" placeholder="Price" min="0">
            <input type="number" class="productQuantity" placeholder="Quantity" min="1">
        `;

        products.appendChild(product);
    }


    // Calculate the order
    function calculateOrder() {

        const names = document.querySelectorAll(".productName");
        const prices = document.querySelectorAll(".productPrice");
        const quantities = document.querySelectorAll(".productQuantity");

        let subtotal = 0;

        let orderHTML = `
            <table>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
        `;

        for (let i = 0; i < names.length; i++) {

            const name = names[i].value;
            const price = parseFloat(prices[i].value);
            const quantity = parseInt(quantities[i].value);

            if (name === "" || isNaN(price) || isNaN(quantity)) {
                alert("Please complete all product information.");
                return;
            }

            const productTotal = price * quantity;

            subtotal += productTotal;

            orderHTML += `
                <tr>
                    <td>${name}</td>
                    <td>₱${price.toFixed(2)}</td>
                    <td>${quantity}</td>
                    <td>₱${productTotal.toFixed(2)}</td>
                </tr>
            `;
        }

        orderHTML += `</table>`;


        // Discount calculation
        let discountRate = 0;

        if (subtotal >= 5000) {
            discountRate = 0.15;
        } 
        else if (subtotal >= 3000) {
            discountRate = 0.10;
        } 
        else if (subtotal >= 1000) {
            discountRate = 0.05;
        }

        const discount = subtotal * discountRate;


        // Delivery fee
        let deliveryFee;

        if (subtotal >= 3000) {
            deliveryFee = 0;
        } 
        else {
            deliveryFee = 100;
        }


        // Final total
        const total = subtotal - discount + deliveryFee;


        // Display results
        document.getElementById("productList").innerHTML = orderHTML;

        document.getElementById("subtotal").textContent =
            subtotal.toFixed(2);

        document.getElementById("discount").textContent =
            discount.toFixed(2);

        document.getElementById("delivery").textContent =
            deliveryFee.toFixed(2);

        document.getElementById("total").textContent =
            total.toFixed(2);

        document.getElementById("summary").style.display = "block";
    }
