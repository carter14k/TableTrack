const fieldIds = ["tnumber","dishname","category","quantity","unitprice","order-date"];
let orders =JSON.parse(localStorage.getItem("orders"))|| [];
const tbody = document.getElementById("orderstablebody");
const form = document.getElementById("form")
if(form){form.addEventListener("submit", function(event){
    event.preventDefault();
    const values = [];
    
        
    for(let i=0; i<fieldIds.length; i++){
        const input = document.getElementById(fieldIds[i]);
        values.push(input.value)
        
}
const order = {
    tableNumber: values[0],
    dishName: values[1],
    category: values[2],
    quantity: Number(values[3]),
    unitPrice: Number(values[4]),
    orderDate: values[5],     
    }
const total = order.quantity * order.unitPrice;

order.total = total;
orders.push(order);
localStorage.setItem("orders",JSON.stringify(orders));
displayOrders();
    
console.log(tbody)
console.log(order);
});
}
function displayOrders() {
    tbody.innerHTML = "";

    orders.forEach(function(order) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${order.orderDate}</td>
            <td>${order.tableNumber}</td>
            <td>${order.dishName}</td>
            <td>${order.category}</td>
            <td>${order.quantity}</td>
            <td>${order.unitPrice}</td>
            <td>${order.total}</td>
            <td>Delete</td>
        `;

        tbody.appendChild(row);
    });
}
if(tbody){
    displayOrders();
}