import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

const firebaseConfig = {
apiKey: "AIzaSyAERgGLZDW57JcM7QWbBAWYK_t03a0cCkU",
authDomain: "login1form-3fad9.firebaseapp.com",
projectId: "login1form-3fad9",
storageBucket: "login1form-3fad9.appspot.com",
messagingSenderId: "80559376546",
appId: "1:80559376546:web:0e7356e3b792c65ebd6ffb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//get ref to databse services
const db = getDatabase(app);

// !----------------------------------------------------------------


let table1 = document.getElementById('table1');
// console.log(table1)
let table = document.getElementsByTagName('tbody')[0];
let tfoot = document.getElementsByTagName('tfoot')[0];
let head = document.getElementById('head');
let h1 = document.getElementById('h1');
h1.style.cssText = `display: none;`;
let main_pay = document.getElementById('main-pay');
let main_btn = document.getElementById('main-btn');
let fals = document.getElementById('false');
let btnfals = document.getElementById('btn-false');
let btnDone = document.getElementById('btn-done');
let totalPri = document.getElementById('totalPrice');
let ordered = document.getElementById('ordered');
let table2 = document.getElementById('table');

let arrOrder = [];
// if (window.localStorage.getItem('order')) {
//     arrOrder = JSON.parse(window.localStorage.getItem('order'));
// }
let btnhandle;
let btnplus;
let btnminus;
var priceTotalProduct = 0;
let total_Price = document.getElementById('price');
let priceSub = document.createElement('div');
priceSub.innerHTML = '0$';
priceSub.style.cssText = `font-size: 18px; font-weight: 600;`;
let payment = document.getElementById('payment');

var btn = document.createElement('button');
let ships = document.createElement('div');
ships.style.cssText = `font-weight: 600;`
ships.innerHTML = '0.00$';

let totalPric = document.createElement('div');
totalPric.style.cssText = `font-weight: 600;`
totalPric.innerHTML = (parseFloat(ships.innerHTML) + parseFloat(priceSub.innerHTML)).toFixed(2) + "$";

// window.localStorage.clear();
addOrderToLocalStorage(arrOrder);
arrOrder = arrOrder.filter(function(ele){
    return ele.quantity != 0;
    addOrderToLocalStorage(arrOrder);
})
var total = 0;
let username;

fetch('https://login1form-3fad9-default-rtdb.firebaseio.com/CurrentUser.json').then((res)=>{
    let data = res.json();
    return data;
}).then((res)=>{
    
    username = res.fullName;
    let userName = document.getElementById('userName');
    userName.innerHTML = res.name;
    console.log(username);
    fetch(`https://login1form-3fad9-default-rtdb.firebaseio.com/user/${username}/cakeProducts.json`).then((res)=>{
        // console.log(arrOrder)
        let data = res.json();
        return data;
    }).then((res)=>{
        // console.log(res)
        for (const ele in res) {
            console.log(res[ele])
            arrOrder[arrOrder.length] = res[ele];
        }
        console.log(arrOrder);
        if (arrOrder.length) {
            head.style.cssText = `opacity: 1;`;
            total_Price.style.cssText = `display: flex;`;
            payment.style.cssText = `display: block;`;
        }else{
            h1.style.cssText = `display: flex; justify-content: center; align-items: center;`
        }

        arrOrder.forEach(ele => {
            
            let tr = document.createElement('tr');
            tr.setAttribute('id',`${ele.id}`);
            table.appendChild(tr);
            // the product
            let td1 = document.createElement('td');
            tr.appendChild(td1);
            let img = document.createElement('img');
            img.setAttribute('src',`${ele.img}`);
            td1.appendChild(img);
            let source = document.createAttribute('src');
            // the name
            let td2 = document.createElement('td');
            tr.appendChild(td2)
            let tagname = document.createElement('h5');
            tagname.appendChild(document.createTextNode(`${ele.name}`));
            td2.appendChild(tagname);
            // price
            let td3 = document.createElement('td');
            tr.appendChild(td3);
            let price = document.createElement('h5');
            price.appendChild(document.createTextNode(`${ele.price}$`));
            td3.appendChild(price);
            // quantity
            let td4 = document.createElement('td');
            tr.appendChild(td4);
            let div = document.createElement('div');
            let btnminus = document.createElement('button');
            let minusImg = document.createElement('img')
            minusImg.setAttribute('src','../../imgs/Cakes/photo_2024-09-07_19-21-09.jpg');
            minusImg.style.cssText = `width: 30px; border-radius: 50%;`
            btnminus.appendChild(minusImg)
            btnminus.style.cssText = `border-radius: 50%; margin-right: 15px;`;
            div.appendChild(btnminus);
            // tr.appendChild(td4)
            // // ---
            let quantity = document.createElement('h5');
            quantity.innerHTML = ele.quantity;
            div.appendChild(quantity);
            // // ----
            let btnplus = document.createElement('button');
            let plusImg = document.createElement('img')
            plusImg.setAttribute('src','../../imgs/Cakes/11738469.png');
            plusImg.style.cssText = `width: 30px; border-radius: 50%;`
            btnplus.appendChild(plusImg);
            btnplus.style.cssText = `border-radius: 50%; overflow: hidden; margin-left: 15px;`;
            div.appendChild(btnplus);
            div.style.cssText = `display: flex; justify-content: center;`
            td4.appendChild(div)
            // ---
            
            // total price
            let td5 = document.createElement('td');
            tr.appendChild(td5);
            let total = document.createElement('h5');
            let totalPrice = (+ele.price)*(+ele.quantity);
            total.innerHTML = totalPrice.toFixed(2)+"$";
            td5.appendChild(total);
            //event listener
            
            // handle
            let td6 = document.createElement('td');
            tr.appendChild(td6);
            btnhandle = document.createElement('button');
            btnhandle.setAttribute('id',`${ele.id}`);
            let btnimg = document.createElement('img');
            btnimg.setAttribute('src','../../imgs/Cakes/wrong.jpg')
            btnhandle.appendChild(btnimg);
            btnhandle.style.cssText = `width: 30px; height: 30px; border-radius:50%; overflow: hidden;`
            td6.appendChild(btnhandle);
            btnhandle.addEventListener('click', function(e){
                // if(e.id)
                arrOrder = arrOrder.filter(function(order){
                    return order.id != ele.id;
                })
                tr.remove();
                divContent.remove();
                deleteData(ele);
                addOrderToLocalStorage(arrOrder);
                // tdf2.innerHTML = ((parseFloat(tdf2.innerHTML) - (+ele.price * +ele.quantity)).toFixed(2))+"$";
                priceSub.innerHTML = ((parseFloat(priceSub.innerHTML) - (+ele.price * +ele.quantity)).toFixed(2))+"$";
                totalPric.innerHTML = (parseFloat(priceSub.innerHTML) + parseFloat(ships.innerHTML)).toFixed(2) + "$";
                if (!arrOrder.length) {
                    total_Price.style.cssText = `display: none;`;
                    payment.style.cssText = `display: none;`;
                    head.style.cssText = `display: none;`;
                    h1.style.cssText = `display: block;`;
                }else{
                    h1.style.cssText = `display: none;`;
                }
            });
            
            // ?-----------------------------------------------------------------------
            let btnhandle1;
            let btnplus1;
            let btnminus1;
            let div1 = document.createElement('div');
            let quantity1 = document.createElement('h5');
        
            let divContent = document.createElement('div');
            
            // //!-----------------------------------------------------------
            // //handle
            btnhandle1 = document.createElement('button');
            btnhandle1.setAttribute('id',`${ele.id}`);
            let btnimg1 = document.createElement('img');
            btnimg1.setAttribute('src','../../imgs/Cakes/wrong.jpg');
            btnimg1.style.cssText = `width: 30px; position: absolute; top: -1px; left: -2px;`;
            btnhandle1.appendChild(btnimg1);
            btnhandle1.style.cssText = `width: 30px; height: 30px; border-radius:50%;z-index: 1; overflow: hidden; position: relative;`
            // // end handle
        
            // // quantity
            
            btnminus1 = document.createElement('button');
            minusImg = document.createElement('img')
            minusImg.setAttribute('src','../../imgs/Cakes/photo_2024-09-07_19-21-09.jpg');
            minusImg.style.cssText = `width: 30px; border-radius: 50%; position: absolute; top: -1px; left: -1px;`;
            btnminus1.appendChild(minusImg)
            btnminus1.style.cssText = `width: 32px; height:z-index: 1; 32px; border-radius:50%; overflow: hidden; position: relative; margin-right: 15px;`;
            div1.appendChild(btnminus1);
            // // ---
            // // td4.appendChild(div)
            quantity1.innerHTML = ele.quantity;
            quantity.innerHTML = ele.quantity;
            div1.appendChild(quantity1);
            //  // ----
            btnplus1 = document.createElement('button');
            plusImg = document.createElement('img')
            plusImg.setAttribute('src','../../imgs/Cakes/11738469.png');
            plusImg.style.cssText = `width: 30px; border-radius: 50%; position: absolute; top: -1px; left: -1px;`
            btnplus1.appendChild(plusImg);
            btnplus1.style.cssText = `width: 32px; height: 32px;z-index: 1; border-radius:50%; overflow: hidden; position: relative; margin-left: 15px;`;
            div1.appendChild(btnplus1);
            div1.style.cssText = `display: flex; justify-content: center;`
            // //end quantity
            divContent.style.cssText = `
            display: flex; 
            justify-content: center; 
            align-items: center; 
            gap: 10px;
            padding: 10px 0; 
            border-bottom: 1px solid rgb(227, 178, 87) ;
            `
            let divImg = document.createElement('div');
            divImg.style.cssText = `
            width: 30%; 
            position: relative;
            display: flex; 
            justify-content: start; 
            align-items: center;
            padding-left: 5px;
            `;
            let img1 = document.createElement('img');
            img1.style.cssText = `width: 90%;`;
            img1.setAttribute('src',`${ele.img}`);
            divImg.appendChild(img1);
            let divData = document.createElement('div');
            divData.style.cssText = `
            text-align: center; 
            width: 40%; 
            position: relative; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            flex-direction: column;
            color: white;
            `;
            let divName = document.createElement('div');
            let divPrice = document.createElement('div');
            let divQuantity = document.createElement('div');
            divName.appendChild(document.createTextNode(ele.name));
            divName.style.cssText = `font-size: 16px; font-weight: 700;`;
            divPrice.appendChild(document.createTextNode(`${ele.price}$`));
            divPrice.style.cssText = `font-weight: 600;`;
            divQuantity.appendChild(div1);
            divData.appendChild(divName);
            divData.appendChild(divPrice);
            divData.appendChild(divQuantity);
            let divHandle = document.createElement('div');
            divHandle.style.cssText = `
            width: 20%; 
            display: flex; 
            justify-content: end; 
            align-items: center;
            padding-right: 5px;
            `;
            divHandle.appendChild(btnhandle1);
            divContent.appendChild(divImg);
            divContent.appendChild(divData);
            divContent.appendChild(divHandle);
            table2.appendChild(divContent); 
            // btn handle event
            //!--------------------------------------------------
            btnhandle1.addEventListener('click', function(e){
                arrOrder = arrOrder.filter(function(order){
                    return order.id != ele.id;
                });
                divContent.remove();
                tr.remove();
                deleteData(ele);
                addOrderToLocalStorage(arrOrder);
                // console.log(arrOrder);
                priceSub.innerHTML = ((parseFloat(priceSub.innerHTML) - (+ele.price * +ele.quantity)).toFixed(2))+"$";
                totalPric.innerHTML = (parseFloat(priceSub.innerHTML) + parseFloat(ships.innerHTML)).toFixed(2) + "$";
                if (!arrOrder.length) {
                    total_Price.style.cssText = `display: none;`;
                    payment.style.cssText = `display: none;`;
                    head.style.cssText = `display: none;`;
                    h1.style.cssText = `display: block;`;
                }else{
                    h1.style.cssText = `display: none;`;
                }
            });
            //!-------------------------------------------
            btnplus1.addEventListener('click', function(){
                let val = ++ele.quantity;
                addOrderToLocalStorage(arrOrder);
                updateData(ele.quantity, ele);
                // console.log(val);
                quantity1.innerHTML = ele.quantity;
                quantity.innerHTML = ele.quantity;
                total.innerHTML = (ele.quantity * ele.price).toFixed(2)+"$";
                priceSub.innerHTML = ((parseFloat(priceSub.innerHTML) + +ele.price).toFixed(2))+"$";
                totalPric.innerHTML = (parseFloat(priceSub.innerHTML) + parseFloat(ships.innerHTML)).toFixed(2) + "$";
            })
        
            btnminus1.addEventListener('click', function(){
                let val = --ele.quantity;
                addOrderToLocalStorage(arrOrder);
                // console.log(val);
                if (ele.quantity == 0) {
                    deleteData(ele);
                }else{
                    updateData(ele.quantity, ele);
                }
                quantity1.innerHTML = ele.quantity;
                quantity.innerHTML = ele.quantity;
                totalPrice = (+ele.price)*(+val);
                total.innerHTML = (ele.quantity * ele.price).toFixed(2)+'$';
                priceSub.innerHTML = ((parseFloat(priceSub.innerHTML) -  ele.price).toFixed(2))+"$";
                totalPric.innerHTML = (parseFloat(priceSub.innerHTML) + parseFloat(ships.innerHTML)).toFixed(2) + "$";
                if(!ele.quantity){
                    tr.remove();
                    divContent.remove();
                    delet(ele.quantity);
                }
                if (!arrOrder.length) {
                    total_Price.style.cssText = `display: none;`
                    payment.style.cssText = `display: none;`;
                    head.style.cssText = `display: none;`;
                    h1.style.cssText = `display: block;`;
                }else{
                    h1.style.cssText = `display: none;`;
                }
            });
            // ?-----------------------------------------------------------------------
        
        
            btnplus.addEventListener('click', function(){
                let val = ++ele.quantity;
                addOrderToLocalStorage(arrOrder);
                updateData(ele.quantity, ele);
                // console.log(val);
                quantity.innerHTML = ele.quantity;
                quantity1.innerHTML = ele.quantity;
                total.innerHTML = (ele.quantity * ele.price).toFixed(2)+"$";
                // tdf2.innerHTML = ((parseFloat(tdf2.innerHTML) + +ele.price).toFixed(2))+"$";
                priceSub.innerHTML = ((parseFloat(priceSub.innerHTML) + +ele.price).toFixed(2))+"$";
                totalPric.innerHTML = (parseFloat(priceSub.innerHTML) + parseFloat(ships.innerHTML)).toFixed(2) + "$";
                // priceTotalProduct = (parseFloat(priceTotalProduct) + +ele.price)+"$";
            })
            btnminus.addEventListener('click', function(){
                let val = --ele.quantity;
                addOrderToLocalStorage(arrOrder);
                if (ele.quantity == 0) {
                    deleteData(ele);
                }else{
                    updateData(ele.quantity, ele);
                }
                // console.log(val);
                quantity.innerHTML = ele.quantity;
                quantity1.innerHTML = ele.quantity;
                totalPrice = (+ele.price)*(+val);
                total.innerHTML = (ele.quantity * ele.price).toFixed(2)+'$';
                // tdf2.innerHTML = ((parseFloat(tdf2.innerHTML) -  ele.price).toFixed(2))+"$";
                priceSub.innerHTML = ((parseFloat(priceSub.innerHTML) -  ele.price).toFixed(2))+"$";
                totalPric.innerHTML = (parseFloat(priceSub.innerHTML) + parseFloat(ships.innerHTML)).toFixed(2) + "$";
                // priceTotalProduct = (parseFloat(priceTotalProduct) - ele.price)+"$";
                if(!ele.quantity){
                    tr.remove();
                    divContent.remove();
                    delet(ele.quantity);
                }
                if (!arrOrder.length) {
                    total_Price.style.cssText = `display: none;`
                    payment.style.cssText = `display: none;`;
                    head.style.cssText = `display: none;`;
                    h1.style.cssText = `display: block;`;
                }else{
                    h1.style.cssText = `display: none;`;
                }
            });
            
            priceSub.innerHTML = ((parseFloat(priceSub.innerHTML) +(ele.quantity * ele.price)).toFixed(2))+"$";
            totalPric.innerHTML = (parseFloat(priceSub.innerHTML) + parseFloat(ships.innerHTML)).toFixed(2) + "$";
            
            addPriceToLocalStorage(priceTotalProduct);
        });
        
        if (arrOrder.length) {
            let h3 = document.createElement('h3');
            h3.appendChild(document.createTextNode('Cart '));
            h3.style.cssText = `font-size: 40px; font-weight: bold;`
            let h3span = document.createElement('span');
            h3span.appendChild(document.createTextNode('total'));
            h3span.style.cssText = `font-weight: 600;`
            h3.appendChild(h3span);
            total_Price.appendChild(h3);
            let subtotal = document.createElement('div');
            let sub = document.createElement('div');
            sub.appendChild(document.createTextNode('Subtotal : '));
            sub.style.cssText = `font-size: 20px; font-weight: 700;`;
            subtotal.appendChild(sub);
            subtotal.appendChild(priceSub);
            subtotal.style.cssText = `display: flex; justify-content: space-between; align-items: center; margin-top: 20px;`;
            total_Price.appendChild(subtotal);
        
            let shipping = document.createElement('div');
            shipping.style.cssText = `display: flex; justify-content: space-between; align-items: center; padding: 20px 0; font-size: 20px; border-bottom: 1px #945a20 solid;`
            let ship = document.createElement('div');
            ship.style.cssText = `font-weight: 700;`
            ship.appendChild(document.createTextNode('Shipping :'));
        
            shipping.appendChild(ship);
            shipping.appendChild(ships);
            total_Price.appendChild(shipping);
            let total = document.createElement('div');
            total.style.cssText = `display: flex; justify-content: space-between; font-size: 20px; padding: 20px 0; border-bottom: 1px #945a20 solid; margin-bottom: 20px;`
            let totalText = document.createElement('div');
            totalText.style.cssText = `font-weight: 700;`;
            totalText.appendChild(document.createTextNode('Total :'));
            
            total.appendChild(totalText);
            total.appendChild(totalPric);
            total_Price.appendChild(total);
        
            
            btn.style.cssText = `
            width: fitcontent; 
            margin: auto; 
            padding: 10px 40px; 
            border: 1px solid #945a20; 
            border-radius: 25px; 
            font-size: 20px; 
            font-weight: 600; 
            background: rgb(186, 144, 67);`;
            btn.setAttribute('class', 'btn1');
            btn.appendChild(document.createTextNode('Buy now'));
            total_Price.appendChild(btn);
        
        
            var label1 = document.getElementsByTagName('label')[0];
            var label2 = document.getElementsByTagName('label')[1];
            var pay = document.querySelectorAll('.wrapper label');
            var bool = false;
            pay.forEach(element => {
                element.addEventListener('click' ,()=>{
                    if (element.classList.contains('receipt')) {
                        ships.innerHTML = '3.00$';
                        totalPric.innerHTML = (parseFloat(priceSub.innerHTML) + parseFloat(ships.innerHTML)).toFixed(2) + "$";
                        element.classList.add('added');
                    }else{
                        ships.innerHTML = '0.00$';
                        // if (label1.classList.contains('added')) {
                        //     totalPric.innerHTML = (parseFloat(totalPric.innerHTML) - parseFloat("3.00$")).toFixed(2) + "$";
                        // }else{
                        // }
                        totalPric.innerHTML = priceSub.innerHTML;
                    }
                    pay.forEach(ele => {
                        ele.classList.remove('checked');
                    });
                    element.classList.add('checked');
                    bool = true;
                });
            });
        
        
            
            let main = document.getElementsByTagName('main')[0];
            let credit = document.getElementById('credit');
            let Regcredit = /\d{14}/;
            let buy = document.getElementById('buy');
            let cancel = document.getElementById('cancel');
        
            btn.addEventListener('click', () => {
                if (!bool) {
                    fals.style.cssText = `display: flex`;
                }else if (label1.classList.contains('receipt') && label1.classList.contains('checked')) {
                    main_pay.style.cssText = `display: flex;`;
                    arrOrder = [];
                    addOrderToLocalStorage(arrOrder);
                }else if (label2.classList.contains('credit') && label2.classList.contains('checked')){
                    main.style.cssText = `display: flex;`;
                }
            });
        
            btnfals.addEventListener('click', ()=>{
                fals.style.cssText = `display: none;`;
            })
        
            cancel.addEventListener('click', () => {
                main.style.cssText = `display: none;`;
            });
            buy.addEventListener('click', () => {
                if (Regcredit.test(credit.value)) {
                    main.style.cssText = `display: none;`;
                    // alert( `${totalPric.innerHTML} has been debited from your card and Your order is on its way to you`);
                    totalPri.innerHTML = totalPric.innerHTML;
                    ordered.style.cssText = `display: flex;`;
                }else{
                    alert('please enter your number credit card valid');
                }
            })
        
            btnDone.addEventListener('click', ()=>{
                arrOrder = [];
                addOrderToLocalStorage(arrOrder);
                deleteAll();
                // deleteAll();
                table1.remove();
                table.remove();
                table2.remove();
                payment.style.cssText = `display: none;`;
                total_Price.style.cssText = `display: none`;
                h1.style.cssText = `display: flex; justify-content: center; align-items: center;`;

                ordered.style.cssText = `display: none;`;
            });
        
            main_btn.addEventListener('click', () => {
                main_pay.style.cssText = `display: none;`;
                deleteAll();
                table1.remove();
                table.remove();
                table2.remove();
                payment.style.cssText = `display: none;`;
                total_Price.style.cssText = `display: none`;
                h1.style.cssText = `display: flex; justify-content: center; align-items: center;`;
            })
        
            payment.style.cssText = `display: block;`;
        }else{
            payment.style.cssText = `display: none;`;
            total_Price.style.cssText = `display: none;`;
            head.style.cssText = `display: none;`;
            h1.style.cssText = `display: flex; justify-content: center; align-items: center;`;
        }
    })
})




function addOrderToLocalStorage(order) {
    window.localStorage.setItem('order', JSON.stringify(order))
}

function delet(ele){
    arrOrder = arrOrder.filter(function(order){
        return order.quantity >= 1;
    })
    addOrderToLocalStorage(arrOrder);
}
function del(id) {
    arrOrder= arrOrder.filter(function(order){
        return order.id != id;
    })
    addOrderToLocalStorage(arrOrder)
}

function addPriceToLocalStorage(price){
    window.localStorage.setItem('priceTotalProduct', price);
}


function updateData (quantity, ele){
    update(ref(db, `user/${username}/cakeProducts/` + ele.id), {
        name: ele.name,
        id: ele.id,
        img: ele.img,
        price: ele.price,
        quantity: quantity,
    }).catch(()=>{
        alert('Login failed');
    })
}
function deleteData (ele){
    remove(ref(db, `user/${username}/cakeProducts/` + ele.id)).catch(()=>{
        console.log(Error);
    });
}
function deleteAll (){
    remove(ref(db, `user/${username}/cakeProducts/`)).catch(()=>{
        console.log(Error);
    });
}

