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


/*
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

*/



let parent1 = document.getElementById('parent1');
let parent2 = document.getElementById('parent2');
// let quantity = document.getElementById('quantity');

function addProductToPage(res, quantity) {
parent1.innerHTML =
`
    <img src=${res.img} class="img-fluid" alt="">
`;
parent2.innerHTML = 
`
    <h2>${res.name}</h2>
    <h4>${res.curPrice}$</h4>
    <div class="star">
        <i class="fa-solid fa-star checked me-1"></i>
        <i class="fa-solid fa-star checked me-1"></i>
        <i class="fa-solid fa-star checked me-1"></i>
        <i class="fa-solid fa-star me-1"></i>
        <i class="fa-solid fa-star me-1"></i>
    </div>
    <p>${res.longDis}</p>
    <div class="quantity col-lg-8 col-md-10 col-12">
        <div class="minus col-3">
            <button id="minus" onclick="minus()">
                -
            </button>
        </div>
        <div class="amount col-6" id="amount">
            ${quantity}
        </div>
        <div class="plus col-3">
            <button id="plus" onclick="plus()" >
                +
            </button>
        </div>
    </div>
    <button class="col-lg-8 col-md-10 col-12" id="addCart">
        Add to cart
    </button>
`
}

let id;
let username;
let quantity;
let obj = {};
window.plus = plus;
function plus(){
    let amount = document.getElementById('amount');
    let btnPlus = document.getElementById('plus');
    quantity = quantity + 1;
    amount.innerHTML = quantity;
}
window.minus = minus;
function minus(){
    let amount = document.getElementById('amount');
    let btnMinus = document.getElementById('minus');
    if (quantity) {
        quantity = quantity - 1;
    }
    amount.innerHTML = quantity;
}
window.addData = addData;
function addData(obj, quantity){

    set(ref(db, `user/${username}/fruitProducts/` + obj.idCart), {
        name: obj.name,
        id: obj.idCart,
        img: obj.img,
        price: obj.curPrice,
        quantity: quantity,
    }).catch(()=>{
        console.log(Error);
    });
}

fetch('https://login1form-3fad9-default-rtdb.firebaseio.com/singleProductfruit.json').then((res)=>{
    let data = res.json();
    return data;
}).then((res)=>{
    obj = res;
    // console.log(obj);
    id = res.idCart;
    // 
}).then((res)=>{
    fetch('https://login1form-3fad9-default-rtdb.firebaseio.com/CurrentUser.json').then((user)=>{
        let user1 = user.json();
        return user1;
    }).then((user)=>{
        username = user.fullName;
        // console.log(obj)
        fetch(`https://login1form-3fad9-default-rtdb.firebaseio.com/user/${username}/fruitProducts/${obj.idCart}/quantity.json`).then((res)=>{
            let data = res.json();
            return data;
        }).then((res)=>{
            quantity = res;
            if (!res) {
                quantity = 0;
            }
            addProductToPage(obj, quantity);
            // plus();
            let addCart = document.getElementById('addCart')
            
            // console.log(obj)
            // console.log(quantity)
            addCart.addEventListener('click', ()=>{
                if (quantity) {
                    addData(obj,quantity);
                    alert('the product has been added to cart')
                }else{
                    deleteData(obj.idCart);
                    alert('the product has been deleted from cart');
                }
            })
        })
    })
})






//! --------------- Functions --------------------------
function updateData (quantity, ele, id){
    update(ref(db, `user/${username}/cakeProducts/` + id), {
        name: ele.name,
        id: id,
        img: ele.img,
        price: ele.price,
        quantity: quantity,
    }).catch(()=>{
        alert('Login failed');
    })
}
function deleteData (id){
    remove(ref(db, `user/${username}/fruitProducts/` + id)).catch(()=>{
        console.log(Error);
    });
}