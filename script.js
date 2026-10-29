const fieldIds = ["tnumber", "dishname", "category", "quantity", "unitprice", "order-date"];

let orders = JSON.parse(localStorage.getItem("orders")) || [];

const tbody = document.getElementById("orderstablebody");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("category");
const form = document.getElementById("form");
const emptyState = document.getElementById("emptyState");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const values = [];

        for (let i = 0; i < fieldIds.length; i++) {
            const input = document.getElementById(fieldIds[i]);
            values.push(input.value);
        }

        const order = {
            tableNumber: values[0],
            dishName: values[1],
            category: values[2],
            quantity: Number(values[3]),
            unitPrice: Number(values[4]),
            orderDate: values[5]
        };

        const total = order.quantity * order.unitPrice;

        order.total = total;

        orders.push(order);

        localStorage.setItem("orders", JSON.stringify(orders));

        form.reset();
    });
}

function displayOrders() {
    if (!tbody) return;

    tbody.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredOrders = orders.filter(function(order) {
        const matchesSearch =
            order.dishName.toLowerCase().includes(searchText) ||
            order.tableNumber.toString().includes(searchText);

        const matchesCategory =
            selectedCategory === "" || order.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    filteredOrders.forEach(function(order) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${order.orderDate}</td>
            <td>${order.tableNumber}</td>
            <td>${order.dishName}</td>
            <td>${order.category}</td>
            <td>${order.quantity}</td>
            <td>${order.unitPrice}</td>
            <td>${order.total}</td>
            <td>
                <button onclick="deleteOrder(${orders.indexOf(order)})">Delete</button>
            </td>
        `;

        tbody.appendChild(row);
    });

    if (emptyState) {
        if (filteredOrders.length === 0) {
            emptyState.textContent = "No orders found.";
        } else {
            emptyState.textContent = "";
        }
    }
}

if (tbody) {
    displayOrders();
}

function deleteOrder(index) {
    orders.splice(index, 1);

    localStorage.setItem("orders", JSON.stringify(orders));

    displayOrders();
}

if (searchInput) {
    searchInput.addEventListener("input", displayOrders);
}

if (categoryFilter && tbody) {
    categoryFilter.addEventListener("change", displayOrders);
}