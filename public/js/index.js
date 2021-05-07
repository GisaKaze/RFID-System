let socket = io();  
socket.on('connect',()=>{
  console.log("Connected to the server")
})
socket.on('getAllTransaction',(data)=>{
  document.getElementById("transactionData").innerHTML="";

  let items = data.data;
      for(let item of items) {
        console.log(item)
          create_tr(item);
      }
});


function create_tr(data) {
const table = document.getElementById("transactionData");
const tr_tds =document.createElement('tr')
tr_tds.setAttribute("scope","row")
tr_tds.innerHTML=`
  <td>${data.transactionId}</td>
  <td>${data.cardUUID}</td>
  <td>${data.initialBalance}</td>
  <td>${data.transportFare}</td>
  <td>${data.newBalance}</td>
  <td>${data.transactionDate}</td>
`
table.appendChild(tr_tds)
}