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






// ! Start arrow
let arrow = document.getElementById("arrow");
window.onscroll = function(){
    if(window.scrollY > 600){
        arrow.style.cssText = `bottom: 20px; opacity: 1`;
    }else{
        arrow.style.cssText = `bottom: -50px; opacity: 0`;
    }
}
// ! End arrow

// ! Start heart icons

// ! End heart icons

// ----------------------------------------------------------------------------------

// ! Start basket
let arrProducts = [];
let btnaddProduct = document.getElementById('add-product');
let add = document.getElementById('add');
let name = document.getElementById('name');
let img = document.getElementById('img');
let shorDis = document.getElementById('shor-dis');
let curPrice = document.getElementById('cur-price');
let submit = document.getElementById('submit');
let longDis = document.getElementById('longDis');

let updat = document.getElementById('update');
let name1 = document.getElementById('name1');
let img1 = document.getElementById('img1');
let shorDis1 = document.getElementById('shor-dis1');
let curPrice1 = document.getElementById('cur-price1');
let submit1 = document.getElementById('submit1');
let longDis1 = document.getElementById('longDis1');
// console.log(addProduct)
btnaddProduct.addEventListener('click', ()=>{
    add.style.cssText = `display: flex;`;
});
submit.addEventListener('click', ()=>{
    addProductToArr();
    console.log(longDis.value)
    add.style.cssText = `display: none;`
})

function addProduct(product){
    set(ref(db, `cakeProducts/` + product.id), {
        name: product.name,
        img: product.img,
        shorDis: product.shorDis,
        longDis: product.longDis,
        curPrice: product.curPrice,
        id: product.id, 
    }).catch(()=>{
        alert('Login failed');
    });
}
function addSingleProduct(product){
    set(ref(db, `singleProduct/`), {
        name: product.name,
        img: product.img,
        shorDis: product.shorDis,
        longDis: product.longDis,
        curPrice: product.curPrice,
        id: product.id,
        idCart: product.idCart, 
    }).then(()=>{
        location.assign('../../files.html/Cakes/singleProduct.html')
    }).catch(()=>{
        alert('Login failed');
    });
}
function addProductToArr() {
    // ids++;
    const product = {
        name: name.value,
        img: img.value,
        shorDis: shorDis.value,
        longDis: longDis.value,
        curPrice: curPrice.value,
        id: Date.now(), 
    }
    arrProducts.push(product);
    addProduct(product);
    addProductToPage();
}
// function addSingleProduct(){
//     product
// }
function views(view){
    view.forEach(ele => {
        ele.addEventListener('click', ()=>{
            const obj = {
                name: ele.parentElement.nextElementSibling.nextElementSibling.firstElementChild.innerHTML,
                img: ele.parentElement.nextElementSibling.src,
                shorDis: ele.parentElement.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.innerHTML,
                longDis: ele.parentElement.parentElement.lastElementChild.innerHTML,
                curPrice: ele.parentElement.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.innerHTML,
                id: ele.parentElement.parentElement.parentElement.id,
                idCart: ele.parentElement.parentElement.id,
            }
            addSingleProduct(obj);
            console.log(obj);
            // location.assign('../../files.html/Cakes/singleProduct.html');
        });
        // console.log(ele);
    });
}
function addProductToPage(){
    let arr = [];
    let username;
    let password;
    fetch('https://login1form-3fad9-default-rtdb.firebaseio.com/CurrentUser.json').then((res)=>{
        let user = res.json();
        return user;
    }).then((res)=>{
        username = res.fullName;
        password = res.password;
    });
    fetch(`https://login1form-3fad9-default-rtdb.firebaseio.com/cakeProducts.json`).then((res)=>{
        let data = res.json();
        return data;
    }).then((res)=>{
        for (const ele in res) {
            arr[arr.length] = res[ele];
        }
        let row = document.getElementById('row');
        row.innerHTML = "";
        arr.forEach(ele => {
            let div = document.createElement('div');
            div.setAttribute('class', 'col-lg-3 col-md-6 py-3');
            div.setAttribute('id', ele.id);
            div.setAttribute('data-aos', 'fade-up');
            div.setAttribute('data-aos-duration', '1000');
            div.innerHTML = 
            `
                <div class="card">
                    <div class="buttons">
                        <button class="delete" id="delete">delete</button>
                        <button class="update" id="update">Update</button>
                    </div>
                    <div class="overlay">
                        <button type="button" class="btn btn-secondary view" title="Quik Shop" >
                            <div><i class="fa-solid fa-eye"></i></div>
                        </button>
                        <button type="button" class="btn btn-secondary love" title="Add To Wishlist" >
                            <div><i class="fa-solid fa-heart"></i></div>
                        </button>
                        <button type="button" class="btn btn-secondary" title="Add To Card" >
                            <div><i class="fa-solid fa-basket-shopping"></i></div>
                        </button>
                    </div>
                    <img src= ${ele.img} alt="">
                    <div class="card-body">
                        <h3>${ele.name}</h3>
                        <div class="star">
                            <i class="fa-solid fa-star checked me-1"></i>
                            <i class="fa-solid fa-star checked me-1"></i>
                            <i class="fa-solid fa-star checked me-1"></i>
                            <i class="fa-solid fa-star me-1"></i>
                            <i class="fa-solid fa-star me-1"></i>
                        </div>
                        <p>${ele.shorDis}.</p>
                        <h6>
                            $<span>${ele.curPrice}</span> 
                            <span><button class="add-card">Add Card</button></span>
                        </h6>
                    </div>
                    <p class="d-none">
                        ${ele.longDis}
                    </p>
                </div>
            `
            row.appendChild(div);
        });
    }).then((res)=>{
        let heart = document.getElementById('heart');
        let love = document.querySelectorAll('.love');
        let countLove = 0;


        let i = 0;
        love.forEach(ele => {
            i++;
            ele.setAttribute('id', `${i}`);
        });
        // window.localStorage.clear()
        let arrOfLoves = [];
        if(window.localStorage.getItem("Loves")){
            arrOfLoves = JSON.parse(window.localStorage.getItem("Loves"));
        }
        heart.innerHTML += arrOfLoves.length;
        function getData() {
            love.forEach(ele => {
                for (let i = 0; i < arrOfLoves.length; i++) {
                    if(ele.id === arrOfLoves[i].id){
                        ele.classList.add(arrOfLoves[i].className);
                        ele.style.color = arrOfLoves[i].color;
                    }
                }
            });
        }
        getData();
        function addLoveToArr(ele) {
            const love = {
                id: ele.getAttribute('id'),
                color: "red",
                className: "loved",
                img: ele.parentElement.nextElementSibling.src,
                nameProduct: ele.parentElement.nextElementSibling.nextElementSibling.firstElementChild.innerHTML,
                price: ele.parentElement.nextElementSibling.nextElementSibling.lastElementChild.firstElementChild.innerHTML,
            };
            var bool = false;
            arrOfLoves.forEach(ele => {
                if(love.id == ele.id){
                    deleteLove(love.id);
                    bool = true;
                }
            });
            if(bool === false) { 
                arrOfLoves.push(love);
            }

            // add to localstorage
            elementLove(arrOfLoves);
            addToLocalStorage(arrOfLoves);
        }

        // window.localStorage.clear()
        function addToLocalStorage(arrOfLoves){
            window.localStorage.setItem('Loves', JSON.stringify(arrOfLoves));
        }
        function deleteLove(id){
            arrOfLoves = arrOfLoves.filter(function(love){
                return love.id != id;
            });
            addToLocalStorage(arrOfLoves);
        }
        function loved(love){
            love.forEach(ele => {
                ele.addEventListener('click', function(){
            
                    heart.style.cssText = `display: flex`;
                    ele.classList.toggle("loved");
                    addLoveToArr(ele);
                    elementLove(arrOfLoves);
                    heart.innerHTML = arrOfLoves.length;
                    getData();
                    if(!ele.classList.contains("loved")){
                        ele.style.cssText = 'color: white'
                    }
                });
            });
        }
        loved(love);

        let aside = document.getElementById('aside')
        let chlidAside = document.getElementById('parent');
        let cancelAside = document.getElementById('cancel-aside');
        let aside1 = document.getElementById('aside1');

        aside1.addEventListener('click', ()=>{
            aside.style.cssText = `left: 0;`;
        });

        cancelAside.addEventListener('click', ()=>{
            aside.style.cssText = `left: -350px;`;
        });

        // window.localStorage.clear();
        elementLove(arrOfLoves)
        function elementLove(arr){
            chlidAside.innerHTML = '';
            arr.forEach(ele => {
                // parent div
                let parent = document.createElement('div');
                parent.style.cssText = `
                padding: 20px 0; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                margin-bottom: 10px;
                position: relative;
                border-bottom: 1px solid #573818;
                `;

                // img
                let divImg = document.createElement('div');
                divImg.style.cssText = `
                width: calc(30%); 
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: white;
                margin-right: 20px;
                `;
                let img = document.createElement('img');
                img.setAttribute('src', ele.img);
                img.style.cssText = `width: 100%; height: 100%; `;
                divImg.appendChild(img);
                parent.appendChild(divImg);

                // div parent for name and price
                let parent1 = document.createElement('div');
                parent1.style.cssText = `
                width: calc(40%); 
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                `;

                let divName = document.createElement('div');
                divName.style.cssText = `
                font-size: 18px;
                font-weight: 600;
                color: white;
                text-align: center
                `;
                divName.innerHTML = ele.nameProduct;
                let divPrice = document.createElement('div');
                divPrice.style.cssText = `
                font-weight: 500;
                font-size: 18px;
                color: white;
                `;
                divPrice.innerHTML = `${ele.price}$`;
                parent1.appendChild(divName);
                parent1.appendChild(divPrice);
                parent.appendChild(parent1);


                // button
                let divbtn = document.createElement('div');
                divbtn.style.cssText = `
                width: calc(30%); 
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                `;
                let btn = document.createElement('button');
                btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                btn.style.cssText 
                = `
                    width: 30px; 
                    height: 30px;
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    font-size:25px;
                    border: none;
                    background-color: transparent;
                    color: white;
                `;
                divbtn.appendChild(btn)
                parent.appendChild(divbtn);

                chlidAside.appendChild(parent);
                btn.addEventListener('click', ()=>{
                    deleteLove(ele.id);
                    parent.remove();
                    heart.innerHTML = arrOfLoves.length;
                    love.forEach(element => {
                        if(element.id == ele.id) {
                            element.style.cssText = `color: white `;
                        }
                        // console.log(element.id);
                    });
                })
            });
            
        }

        if (username == 'Admin123' && password == '912385') {
            let update = document.querySelectorAll('.update');
            update.forEach(ele => {
                ele.style.cssText = `display: block;`;
                ele.addEventListener('click', ()=>{
                    ret(ele);
                    updat.style.cssText = `display: block;`;
                    submit1.addEventListener('click', ()=>{
                        updateProduct(ele);
                        updat.style.cssText = `display: none;`;
                    });
                });
            });
            let del = document.querySelectorAll('.delete');
            del.forEach(ele => {
                ele.style.cssText = `display: block;`;
                ele.addEventListener('click', ()=>{
                    deleteProduct(ele);
                });
            });
            btnaddProduct.style.cssText = `display: block;`;
        }
        // console.log('hello')
    }).then((res)=>{
        let view = document.querySelectorAll('.view');
        views(view);
    })
}
addProductToPage();
function ret(ele){
    name1.value = ele.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.innerHTML;
    img1.value = ele.parentElement.nextElementSibling.nextElementSibling.src;
    shorDis1.value = ele.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.previousElementSibling.innerHTML;
    longDis1.value = ele.parentElement.parentElement.lastElementChild.innerHTML;
    curPrice1.value = ele.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.firstElementChild.innerHTML;
}
function updateProduct (ele) {
    update(ref(db, `cakeProducts/` + ele.parentElement.parentElement.parentElement.getAttribute('id')), {
        name: name1.value,
        img: img1.value,
        shorDis: shorDis1.value,
        longDis: longDis1.value,
        curPrice: curPrice1.value,
        id: ele.parentElement.parentElement.parentElement.getAttribute('id'), 
    }).catch(()=>{
        alert('Login failed');
    })
}
function deleteProduct (ele){
    remove(ref(db, 'cakeProducts/' + ele.parentElement.parentElement.parentElement.getAttribute('id'))).catch(()=>{
        console.log(Error);
    })
    ele.parentElement.parentElement.parentElement.remove()
}
// ! End basket

fetch('https://login1form-3fad9-default-rtdb.firebaseio.com/CurrentUser.json').then((res)=>{
    let data = res.json();
    return data;
}).then((res)=>{
    var username = res.fullName;
    // console.log(username)
    setInterval(() => {
        fetch(`https://login1form-3fad9-default-rtdb.firebaseio.com/user/${username}/cakeProducts.json`).then((res)=>{
            let data = res.json();
            return data;
        }).then((res)=>{
            let arrOfOrders = [];
            // window.localStorage.clear()
            for (const ele in res) {
                // console.log(res[ele]);
                arrOfOrders[arrOfOrders.length] = res[ele];
            }
            // console.log(arrOfOrders)
            let basket = document.getElementById('basket');
            let addCard = document.querySelectorAll('.add-card');
            let addCard1 = document.getElementById('addCard1');
            let countCake = 0;
            let id = 12;
            addCard.forEach(function(ele) {
                id++;
                ele.parentElement.parentElement.parentElement.parentElement.setAttribute('id', `${id}`);
            });
            // if(window.localStorage.getItem('order')){
            //     arrOfOrders = JSON.parse(window.localStorage.getItem('order'));
            // }
            basket.innerHTML = arrOfOrders.length;
            addCard.forEach(ele => {
                ele.addEventListener('click', function(){
                    addOrderToArr(ele);
                    basket.innerHTML = arrOfOrders.length;
                });
            });
    
            function addOrderToArr(ele) {
                const order = {
                    name: ele.parentElement.parentElement.parentElement.firstElementChild.innerHTML,
                    id: ele.parentElement.parentElement.parentElement.parentElement.getAttribute('id'),
                    img: ele.parentElement.parentElement.parentElement.previousElementSibling.src,
                    price: ele.parentElement.previousElementSibling.innerHTML,
                    quantity: 1,
                }
                let bool = false;
                arrOfOrders.forEach(element => {
                    if(order.id == element.id) {
                        bool =  true;
                        element.quantity++;
                        updateData(element.quantity, order);
                    }
                });
                if(bool == false) {
                    addData(order);
                    arrOfOrders.push(order);
                }
                // deleteOrder(ele.quantity);
                addOrderToLocalStorage(arrOfOrders);
            }
            function addOrderToLocalStorage(order) {
                window.localStorage.setItem('order', JSON.stringify(order))
            }
            function deleteOrder(quantity){
                arrOfOrders = arrOfOrders.filter(function(order){
                    return order.quantity >= 1;
                });
                addOrderToLocalStorage(arrOfOrders);
            }
            // !-------------------------------------------------------
            function addData(order){
                // console.log(ele.parentElement.parentElement.parentElement.parentElement.id)
                set(ref(db, `user/${username}/cakeProducts/` + order.id), {
                    name: order.name,
                    id: order.id,
                    img: order.img,
                    price: order.price,
                    quantity: 1,
                }).catch(()=>{
                    alert('Login failed');
                });
            }
            function updateData (quantity, order){
                update(ref(db, `user/${username}/cakeProducts/` + order.id), {
                    name: order.name,
                    id: order.id,
                    img: order.img,
                    price: order.price,
                    quantity: quantity,
                }).catch(()=>{
                    alert('Login failed');
                })
            }
            function deleteData (){
                remove(ref(db, `user/${username}/cakeProducts/`)).catch(()=>{
                    console.log(Error);
                })
            }
        });
    }, 1000);

})




// ?-----------------------------------------------------------------------------------


// !---------------------- start aside -----------------------------



// !---------------------- end aside -------------------------------
