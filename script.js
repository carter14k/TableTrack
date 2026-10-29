const fieldIds = ["tnumber","dishname","category","quantity","unitprice","order-date"];
let orders =JSON.parse(localStorage.getItem("orders"))|| [];
const form = document.getElementById("form")
form.addEventListener("submit", function(event){
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
    

console.log(order);
});

