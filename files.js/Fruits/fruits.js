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
// ?===========================================================================================


let read = document.querySelectorAll('.content .read-more');
// let exContent = document.querySelectorAll('.ex-content')[0];
read.forEach(ele => {
    ele.addEventListener('click',()=>{
        ele.classList.toggle('read-less');
        if (ele.classList.contains('read-less')) {
            ele.previousElementSibling.innerHTML = 'welcome to you';
            ele.innerHTML = 'Read Less'
        }else{
            ele.previousElementSibling.innerHTML = '';
            ele.innerHTML = 'Read More'
        }
    })
});

// !--------------------------------

// !-----------------------------
let btnToggle = document.getElementById('toggler');
let cancel = document.getElementById('cancel');
let aside = document.getElementById('menu-nav');

btnToggle.addEventListener('click', () => {
    aside.style.cssText = `left: 0px;`;
})
cancel.addEventListener('click', () => {
    aside.style.cssText = `left: -300px;`;
})

// ! ----------------------------------

let top1 = document.getElementById('top');
window.onscroll = function() {
    if (scrollY > 300) {
        top1.style.cssText = `opacity: 1; bottom: 30px;`;
    }else{
        top1.style.cssText = `opacity: 0; bottom: 0px;`;
    }
}



// !------------------- start Logic cart  ---------------------------------------------

let Name = document.getElementById('name');
let type = document.getElementById('type');
let pathImg = document.getElementById('img');
let disPrice = document.getElementById('dis-price');
let price = document.getElementById('cur-price');
let longDis = document.getElementById('longDis');

let discount1 = document.getElementById('discount1');
let disPrice1 = document.getElementById('dis-price1');
let price1 = document.getElementById('cur-price1');
let submit = document.getElementById('submit');
let submit1 = document.getElementById('submit1');
let add = document.getElementById('add');
let updatePro = document.getElementById('update');
//!---------------------------------------
let Name1 = document.getElementById('name2');
let type1 = document.getElementById('type2');
let pathImg2 = document.getElementById('img2');
let disPrice2 = document.getElementById('dis-price2');
let price2 = document.getElementById('cur-price2');
let disPrice3 = document.getElementById('dis-price3');
let price3 = document.getElementById('cur-price3');
let longDis1 = document.getElementById('longDis1')

let submit2 = document.getElementById('submit2');
let submit3 = document.getElementById('submit3');
let add1 = document.getElementById('add1');
let updatePro1 = document.getElementById('update1');
var username;
let password;
let arrOfOrders = [];
let arrProducts = [];
let arrProducts1 = [];


function views(view){
    view.forEach(ele => {
        ele.addEventListener('click', ()=>{
            const obj = {
                name: ele.parentElement.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.innerHTML,
                img: ele.parentElement.nextElementSibling.src,
                longDis: ele.parentElement.parentElement.lastElementChild.innerHTML,
                curPrice: ele.parentElement.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.innerHTML,
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
function views1(view1){
    view1.forEach(ele => {
        ele.addEventListener('click', ()=>{
            const obj = {
                name: ele.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.innerHTML,
                img: ele.parentElement.nextElementSibling.src,
                longDis: ele.parentElement.parentElement.parentElement.parentElement.lastElementChild.innerHTML,
                curPrice: ele.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.innerHTML,
                id: ele.parentElement.parentElement.parentElement.parentElement.parentElement.id,
                idCart: ele.parentElement.parentElement.parentElement.parentElement.id,
            }
            addSingleProduct1(obj);
            console.log(obj);
            // location.assign('../../files.html/Cakes/singleProduct.html');
        });
        // console.log(ele);
    });
}
function addSingleProduct(product){
    set(ref(db, `singleProductfruit/`), {
        name: product.name,
        img: product.img,
        longDis: product.longDis,
        curPrice: product.curPrice,
        id: product.id,
        idCart: product.idCart, 
    }).then(()=>{
        location.assign('../../files.html/Fruits/single.html')
    }).catch(()=>{
        alert('Login failed');
    });
}
function addSingleProduct1(product){
    set(ref(db, `singleProductfruit/`), {
        name: product.name,
        img: product.img,
        longDis: product.longDis,
        curPrice: product.curPrice,
        id: product.id,
        idCart: product.idCart, 
    }).then(()=>{
        location.assign('../../files.html/Fruits/single.html')
    }).catch(()=>{
        alert('Login failed');
    });
}
function ret(ele){
    name1.value = ele.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.innerHTML;
    img1.value = ele.parentElement.nextElementSibling.nextElementSibling.src;

    longDis1.value = ele.parentElement.parentElement.lastElementChild.innerHTML;
    curPrice1.value = ele.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.firstElementChild.innerHTML;
}
function addProductsToPage1(){
    let row = document.getElementById('row');
    let div = document.createElement('div');
    div.setAttribute('class', 'col-lg-3 col-sm-6 col-12 mb-4 fruits pro');
    // div.setAttribute('id', ele.id);
    div.innerHTML = 
    `
        <div class="card px-3 pt-3 pb-4">
                <div class="layer mt-4">
                    <button type="button" class="view" title="Quik Shop" >
                        <div><i class="fa-solid fa-eye"></i></div>
                    </button>
                    <button type="button" class="love" title="Add To Wishlist" >
                        <div><i class="fa-solid fa-heart"></i></div>
                    </button>
                </div>
                <img src=${pathImg.value} alt="">
                <div class="text-center">
                    <div class="stars mt-4 mb-2">
                        <span><i class="fa-solid fa-star active"></i></span>
                        <span><i class="fa-solid fa-star active"></i></span>
                        <span><i class="fa-solid fa-star active"></i></span>
                        <span><i class="fa-solid fa-star active"></i></span>
                        <span><i class="fa-solid fa-star active"></i></span>
                    </div>
                    <h4>${Name.value}</h4>
                    <p class="text-center"><del>${disPrice.value}$</del> <span>${price.value}</span>$</p>
                    <button class="add-cart">Add to cart</button>
                    <button class="delete btn-secondary d-block" id="delete">delete</button>
                    <button class="update btn-secondary d-block" id="update">Update</button>
                </div>
            </div>
    `;
    row.appendChild(div);
}
function addProductsToPage(ele){
    let row = document.getElementById('row');
    let div = document.createElement('div');
    div.setAttribute('class', `col-lg-3 col-sm-6 col-12 mb-4 ${ele.type} pro`);
    div.setAttribute('id', ele.id);
    div.innerHTML = 
    `
        <div class="card px-3 pt-3 pb-4">
            <div class="layer mt-4">
                <button type="button" class="view" title="Quik Shop" >
                    <div><i class="fa-solid fa-eye"></i></div>
                </button>
                <button type="button" class="love" title="Add To Wishlist" >
                    <div><i class="fa-solid fa-heart"></i></div>
                </button>
            </div>
            <img src=${ele.img} alt="">
            <div class="text-center">
                <div class="stars mt-4 mb-2">
                    <span><i class="fa-solid fa-star active"></i></span>
                    <span><i class="fa-solid fa-star active"></i></span>
                    <span><i class="fa-solid fa-star active"></i></span>
                    <span><i class="fa-solid fa-star active"></i></span>
                    <span><i class="fa-solid fa-star active"></i></span>
                </div>
                <h4>${ele.name}</h4>
                <p class="text-center"><del>${ele.disPrice}$</del> <span>${ele.price}</span>$</p>
                <button class="add-cart">Add to cart</button>
                <button class="delete btn-secondary" id="delete">delete</button>
                <button class="update btn-secondary" id="update">Update</button>
            </div>
            <p class="d-none">${ele.longDis}</p>
        </div>
    `;
    row.appendChild(div);
}
function addTrendyProductsToPage(ele){
    let row1 = document.getElementById('row1');
    let div = document.createElement('div');
    div.setAttribute('class', 'col-lg-4 col-md-6 mb-4');
    div.setAttribute('id', ele.id);
    div.innerHTML = 
    `
        <div class="card py-4 px-3">
            <div class="row align-items-center">
                <div class="img col-md-5 col-7">
                    <div class="layer">
                        <button type="button" class="view1" title="Quik Shop" >
                            <div><i class="fa-solid fa-eye"></i></div>
                        </button>
                        <button type="button" class="trendy-love" title="Add To Wishlist" >
                            <div><i class="fa-solid fa-heart"></i></div>
                        </button>
                    </div>
                    <img src= ${ele.img} alt="" width="100%" class="img-fluid">
                </div>
                <div class="text-center col-md-7 col-5">
                    <div class="parent text-start">
                        <div class="stars text-start">
                            <span><i class="fa-solid fa-star active"></i></span>
                            <span><i class="fa-solid fa-star active"></i></span>
                            <span><i class="fa-solid fa-star active"></i></span>
                            <span><i class="fa-solid fa-star active"></i></span>
                            <span><i class="fa-solid fa-star active"></i></span>
                        </div>
                        <h4 class="text-start">${ele.name}</h4>
                        <p class="text-start"><del>${ele.disPrice}$</del> <span>${ele.price}</span>$</p>
                        <button class="btn-secondary addToCart trendy-add">Add to cart</button>
                        <div class="buts">
                            <button class="delete1 btn-secondary" id="delete">delete</button>
                            <button class="update1 btn-secondary" id="update">Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <p class="d-none">${ele.longDis1}</p>
        </div>
    `;
    row1.appendChild(div);
}
function addTrendyProductsToPage1(){
    let row1 = document.getElementById('row1');
    let div = document.createElement('div');
    div.setAttribute('class', 'col-lg-4 col-md-6 mb-4');
    // div.setAttribute('id', ele.id);
    div.innerHTML = 
    `
        <div class="card py-4 px-3">
            <div class="row align-items-center">
                <div class="img col-md-5 col-7">
                    <div class="layer">
                        <button type="button" class="view1" title="Quik Shop" >
                            <div><i class="fa-solid fa-eye"></i></div>
                        </button>
                        <button type="button" class="trendy-love" title="Add To Wishlist" >
                            <div><i class="fa-solid fa-heart"></i></div>
                        </button>
                    </div>
                    <img src= ${pathImg2.value} alt="" class="img-fluid">
                </div>
                <div class="text-center col-md-7 col-5">
                    <div class="parent text-start">
                        <div class="stars text-start">
                            <span><i class="fa-solid fa-star active"></i></span>
                            <span><i class="fa-solid fa-star active"></i></span>
                            <span><i class="fa-solid fa-star active"></i></span>
                            <span><i class="fa-solid fa-star active"></i></span>
                            <span><i class="fa-solid fa-star active"></i></span>
                        </div>
                        <h4 class="text-start">${Name1.value}</h4>
                        <p class="text-start"><del>${disPrice2.value}$</del> <span>${price2.value}</span>$</p>
                        <button class="btn-secondary addToCart trendy-add">Add to cart</button>
                        <div>
                            <button class="delete1 btn-secondary d-block" id="delete">delete</button>
                            <button class="update1 btn-secondary d-block" id="update">Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <p class="d-none">${longDis1.value}</p>
        </div>
    `;
    row1.appendChild(div);
}
function addProductToArr(ele) {
    // ids++;
    const product = {
        name: Name.value,
        img: pathImg.value,
        type: type.value,
        longDis: longDis.value,
        disPrice: disPrice.value,
        price: price.value,
        id: Date.now(),
    }
    arrProducts.push(product);
    addProduct(product)
    // deleteOrder(ele.quantity);
    // addProductToLocalStorage(arrProducts);
}

function addProduct(product){
    set(ref(db, `fruitProducts/products/${product.id}`), {
        name: product.name,
        id: product.id,
        img: product.img,
        type: product.type,
        longDis: product.longDis,
        disPrice: product.disPrice,
        price: product.price,
    }).catch(()=>{
        alert('Login failed');
    });
}
function updateProduct (ele) {
    update(ref(db, `fruitProducts/products/${ele.parentElement.parentElement.parentElement.getAttribute('id')}`), {
        // name:ele.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML,
        // id: ele.parentElement.parentElement.getAttribute('id'),
        // img: ele.nextElementSibling.nextElementSibling.src,
        // type: ele.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.innerHTML,
        disPrice: disPrice1.value,
        price: price1.value,
        // quantity: quantity,
    }).catch(()=>{
        alert('Login failed');
    })
}
function deleteProduct (ele){
    remove(ref(db, `fruitProducts/products/${ele.parentElement.parentElement.parentElement.getAttribute('id')}`)).catch(()=>{
        console.log(Error);
    })
    ele.parentElement.parentElement.parentElement.remove()
}
function addProductToArr1(ele) {
    // ids++;
    const product = {
        name: Name1.value,
        img: pathImg2.value,
        type: type1.value,
        longDis1: longDis1.value,
        disPric: disPrice2.value,
        price: price2.value,
        id: Date.now(),
    }
    arrProducts1.push(product);
    // addProduct(product)
    addTrendyProduct(product);
    // deleteOrder(ele.quantity);
    // addProductToLocalStorage(arrProducts);
}
function addTrendyProduct(product){
    set(ref(db, `fruitProducts/trendyProduct/${product.id}`), {
        name: product.name,
        id: product.id,
        img: product.img,
        type: product.type,
        longDis1: product.longDis1,
        disPrice: product.disPric,
        price: product.price,
    }).catch(()=>{
        alert('Login failed');
    });
}
function updateTrendyProduct (ele) {
    update(ref(db, `fruitProducts/trendyProduct/${ele.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id}`), {
        // name:ele.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML,
        // id: ele.parentElement.parentElement.getAttribute('id'),
        // img: ele.nextElementSibling.nextElementSibling.src,
        // type: ele.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.innerHTML,
        disPrice: disPrice3.value,
        price: price3.value,
        // quantity: quantity,
    }).catch(()=>{
        alert('Login failed');
    })
}
function deleteTrendyProduct (ele){
    remove(ref(db, `fruitProducts/trendyProduct/${ele.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id}`)).catch(()=>{
        console.log(Error);
    })
    ele.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
}


fetch('https://login1form-3fad9-default-rtdb.firebaseio.com/CurrentUser.json').then((res)=>{
    let data = res.json();
    return data;
}).then((res)=>{
    username = res.fullName;
    password = res.password;
    fetch(`https://login1form-3fad9-default-rtdb.firebaseio.com/fruitProducts/products.json`).then((res)=>{
        let myData = res.json();
        return myData;
    }).then((res)=>{
        for (const ele in res) {
            if(res[ele] !== null) {
                arrProducts[arrProducts.length] = res[ele];
            }
        }
        arrProducts.forEach(ele => {
            addProductsToPage(ele);
        });
        let addProduct1 = document.getElementById('add-product');
        let deleted = document.querySelectorAll('.delete');
        let updated = document.querySelectorAll('.update');

        if (username == 'Admin123' && password == '912385') {
            addProduct1.style.cssText = `display: block;`;
    
            deleted.forEach(ele => {
                ele.style.cssText = `display: block;`;
                ele.addEventListener('click', ()=>{
                    // console.log(ele);
                    // console.log(ele.parentElement.id);
                    // console.log(ele.parentElement.parentElement.parentElement.id);
                    deleteProduct(ele);

                })
            }); 
            updated.forEach(ele => {
                ele.style.cssText = `display: block;`;
                ele.addEventListener('click', ()=>{
                    // console.log(ele);
                    updatePro.style.cssText = `display: block;`
                    submit1.addEventListener('click', ()=>{
                        // addProductToArr();
                        updatePro.style.cssText = `display: none;`;
                        // addProductToPage()
                        updateProduct(ele);
                        // console.log(ele.parentElement.parentElement.parentElement.id);
                    });
                })
            });
            addProduct1.addEventListener('click', ()=>{
                Name.value = '';
                type.value = '';
                pathImg.value = '';
                // discount.value = '';
                disPrice.value = '';
                price.value = '';
                add.style.cssText = `display: flex;`;
            });
            submit.addEventListener('click', ()=>{
        
                addProductToArr();
                add.style.cssText = `display: none;`;
                addProductsToPage1();
            });
            // console.log(arrProducts);
            
        }
        
        
        
    }).then(()=>{
        // let addCart = document.querySelectorAll('.add-cart');
        // console.log(addCart)
        fetch(`https://login1form-3fad9-default-rtdb.firebaseio.com/user/${username}/fruitProducts.json`).then((res)=>{
            let data = res.json();
            return data;
        }).then((res)=>{
            for (const ele in res) {
                if (res[ele] !== null) {
                    arrOfOrders[arrOfOrders.length] = res[ele];
                }
            }
            console.log(arrOfOrders)
            let addCart = document.querySelectorAll('.add-cart');
            let ids = 0;
            addCart.forEach(ele => {
                ids++;
                ele.parentElement.parentElement.setAttribute('id',`${ids}`);
            });
            let basket = document.getElementById('basket');
            basket.style.cssText = `display: flex;`;
            basket.innerHTML = arrOfOrders.length;
            addCart.forEach(ele => {
                ele.addEventListener('click', () => {
                    addOrderToArr(ele);
                    basket.style.cssText = `display: flex;`;
                    basket.innerHTML = arrOfOrders.length;
                    // if (arrOfOrders.length) {
                    // }else{
                    //     basket.style.cssText = `display: none;`;
                    // }
                })
            });
            
            // ?------------------------------------------------------------------
            let trendyAdd = document.querySelectorAll('.trendy-add');
            let id = 2000;
            
            trendyAdd.forEach(ele => {
                id++;
                ele.parentElement.parentElement.parentElement.parentElement.setAttribute('id',`${id}`);
                // console.log(ele)
            });

            trendyAdd.forEach(ele => {
                ele.addEventListener('click', () => {
                    addOrderToArr1(ele);
                    if (arrOfOrders.length) {
                        basket.style.cssText = `display: flex;`;
                        basket.innerHTML = arrOfOrders.length;
                    }else{
                        basket.style.cssText = `display: none;`;
                    }
                })
            });
            function addOrderToArr1(ele) {
                const order = {
                    name: ele.previousElementSibling.previousElementSibling.innerHTML,
                    id: ele.parentElement.parentElement.parentElement.parentElement.getAttribute('id'),
                    img: ele.parentElement.parentElement.previousElementSibling.lastElementChild.src,
                    price: ele.previousElementSibling.lastElementChild.innerHTML,
                    quantity: 1,
                }
                let bool = false;
                arrOfOrders.forEach(element => {
                    if(order.id == element.id) {
                        bool =  true;
                        element.quantity++;
                        updateData1(element.quantity, ele);
                    }
                });
                if(bool == false) {
                    arrOfOrders.push(order);
                    addData1(ele)
                }
                // deleteOrder(ele.quantity);
                // addOrderToLocalStorage(arrOfOrders);
            }
            function addOrderToArr(ele) {
                const order = {
                    name: ele.previousElementSibling.previousElementSibling.innerHTML,
                    id: ele.parentElement.parentElement.getAttribute('id'),
                    img: ele.parentElement.previousElementSibling.src,
                    price: ele.previousElementSibling.lastElementChild.innerHTML,
                    quantity: 1,
                }
                let bool = false;
                arrOfOrders.forEach(element => {
                    if(order.id == element.id) {
                        bool =  true;
                        element.quantity++;
                        updateData(element.quantity, ele);
                    }
                });
                if(bool == false) {
                    arrOfOrders.push(order);
                    addData(ele);
                }
                // deleteOrder(ele.quantity);
                // addOrderToLocalStorage(arrOfOrders);
            }
            
            // function addOrderToLocalStorage(order) {
            //     window.localStorage.setItem('order-fruits', JSON.stringify(order))
            // }
            function deleteOrder(quantity){
                arrOfOrders = arrOfOrders.filter(function(order){
                    return order.quantity >= 1;
                });
                addOrderToLocalStorage(arrOfOrders);
            }
        }).then((lov)=>{
            let heart = document.getElementById('heart');
            let love = document.querySelectorAll('.love');

            // let countLove = 0;
            // window.localStorage.clear()

            let i = 1000;
            love.forEach(ele => {
                i++;
                ele.setAttribute('id', `${i}`);
            });


            let arrOfLoves = [];
            if(window.localStorage.getItem("Loves-fruits")){
                arrOfLoves = JSON.parse(window.localStorage.getItem("Loves-fruits"));
            }
            if (arrOfLoves.length) {
                heart.innerHTML = arrOfLoves.length;
            }else{
                heart.style.cssText = `display: none;`;
            }
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
                    nameProduct: ele.parentElement.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.innerHTML,
                    price: ele.parentElement.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.innerHTML,
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
                elementLove(arrOfLoves)

                // add to localstorage
                addToLocalStorage(arrOfLoves);
            }


            function addToLocalStorage(arrOfLoves){
                window.localStorage.setItem('Loves-fruits', JSON.stringify(arrOfLoves));
            }
            function deleteLove(id){
                arrOfLoves = arrOfLoves.filter(function(love){
                    return love.id != id;
                });
                addToLocalStorage(arrOfLoves);
            }
            love.forEach(ele => {
                ele.addEventListener('click', function(){

                    heart.style.cssText = `display: flex`;
                    ele.classList.toggle("loved");
                    addLoveToArr(ele);
                    elementLove(arrOfLoves);
                    if (arrOfLoves.length) {
                        heart.innerHTML = arrOfLoves.length;
                    }else{
                        heart.style.cssText = `display: none;`;
                    }   
                    getData();
                    if(!ele.classList.contains("loved")){
                        ele.style.cssText = 'color: white';
                    }
                });
            });

            // ?--------------------------------------------------------------
            let trendyLove = document.querySelectorAll('.trendy-love');
            // console.log(trendyLove)
            let idd = 3000;

            trendyLove.forEach(ele => {
                idd++;
                ele.setAttribute('id',idd);
            });

            function getData1() {
                trendyLove.forEach(ele => {
                    for (let i = 0; i < arrOfLoves.length; i++) {
                        if(ele.id === arrOfLoves[i].id){
                            ele.classList.add(arrOfLoves[i].className);
                            ele.style.color = arrOfLoves[i].color;
                        }
                    }
                });
            }
            getData1();


            function addLoveToArr1(ele) {
                const love = {
                    id: ele.getAttribute('id'),
                    color: "red",
                    className: "loved",
                    img: ele.parentElement.nextElementSibling.src,
                    nameProduct: ele.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.innerHTML,
                    price: ele.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.innerHTML,
                };
                var bool = false;
                arrOfLoves.forEach(ele => {
                    if(love.id == ele.id){
                        deleteLove(love.id);
                        bool = true;
                    }
                });
                // console.log(arrOfLoves)
                if(bool === false) { 
                    arrOfLoves.push(love);
                }
                elementLove(arrOfLoves);

                // add to localstorage
                addToLocalStorage(arrOfLoves);
            }
            trendyLove.forEach(ele => {
                ele.addEventListener('click', function(){

                    heart.style.cssText = `display: flex`;
                    ele.classList.toggle("loved");
                    addLoveToArr1(ele);
                    elementLove(arrOfLoves);
                    if (arrOfLoves.length) {
                        heart.innerHTML = arrOfLoves.length;
                    }else{
                        heart.style.cssText = `display: none;`;
                    }   
                    getData1();
                    if(!ele.classList.contains("loved")){
                        ele.style.cssText = 'color: white';
                    }
                });
            });


            // ! ----------------------- end logic love -----------------------------------
            let aside2 = document.getElementById('aside')
            let chlidAside = document.getElementById('parent');
            let cancelAside = document.getElementById('cancel-aside');
            let aside1 = document.getElementById('aside1');

            aside1.addEventListener('click', ()=>{
                aside2.style.cssText = `right: 0;`;
            });

            cancelAside.addEventListener('click', ()=>{
                aside2.style.cssText = `left: -350px;`;
                
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
                        trendyLove.forEach(element => {
                            if(element.id == ele.id) {
                                element.style.cssText = `color: white `;
                            }
                        });
                    })
                    // trendyLove.forEach(element => {
                    //     if(element.classList.contains('loved')){
                    //         parent.remove();
                    //         element.classList.remove('loved');
                    //     }
                    // });
                    
                });
                
            }
        }).then((res)=>{
            let view = document.querySelectorAll('.view');
            views(view);
            let view1 = document.querySelectorAll('.view1');
            views1(view1);
        }).then((res)=>{
            let buttons = document.querySelectorAll('label button');
            let divs = document.querySelectorAll('.products .row .pro');

            buttons.forEach(ele => {
                ele.addEventListener('click' , () => {
                    buttons.forEach(element => {
                        element.classList.remove('active');
                    });
                    ele.classList.add('active');
                    if (ele.classList.contains('fruits')) {
                        divs.forEach(element => {
                            if (element.classList.contains('fruits')) {
                                element.classList.remove('display')
                            }else{
                                element.classList.add('display')
                            }
                        });
                    }
                    if (ele.classList.contains('vegetables')) {
                        divs.forEach(element => {
                            if (element.classList.contains('vegetables')) {
                                element.classList.remove('display')
                            }else{
                                element.classList.add('display')
                            }
                        });
                    }
                    if (ele.classList.contains('all')) {
                        divs.forEach(element => {
                            element.classList.remove('display');
                        });
                    }
                })
            });
        })
    });
    fetch(`https://login1form-3fad9-default-rtdb.firebaseio.com/fruitProducts/trendyProduct.json`).then((res)=>{
        let myData = res.json();
        return myData;
    }).then((res)=>{
        for (const ele in res) {
            if(res[ele] !== null) {
                arrProducts1[arrProducts1.length] = res[ele];
            }
        }
        arrProducts1.forEach(ele => {
            addTrendyProductsToPage(ele);
        });
        // console.log(arrProducts1)
        let addProduct1 = document.getElementById('add-product1');
        let deleted = document.querySelectorAll('.delete1');
        let updated = document.querySelectorAll('.update1');

        if (username == 'Admin123' && password == '912385') {
            addProduct1.style.cssText = `display: block;`;
    
            deleted.forEach(ele => {
                ele.style.cssText = `display: block;`;
                ele.addEventListener('click', ()=>{
                    deleteTrendyProduct(ele);
                })
            }); 
            updated.forEach(ele => {
                ele.style.cssText = `display: block;`;
                ele.addEventListener('click', ()=>{
                    updatePro1.style.cssText = `display: block;`
                    submit3.addEventListener('click', ()=>{
                        updatePro1.style.cssText = `display: none;`;
                        updateTrendyProduct(ele);
                    });
                })
            });
            addProduct1.addEventListener('click', ()=>{
                Name1.value = '';
                type1.value = '';
                pathImg2.value = '';
                disPrice2.value = '';
                price2.value = '';
                add1.style.cssText = `display: flex;`;
            });
            submit2.addEventListener('click', ()=>{
                add1.style.cssText = `display: none;`;
                addProductToArr1();
                addTrendyProductsToPage1();
            });
            
        }
        
    })

    // }, 2000);
}).then((res)=>{

    
    
    
}).catch((rej)=>{
    console.log(Error);
})



function addData(ele){
    set(ref(db, `user/${username}/fruitProducts/` + ele.parentElement.parentElement.getAttribute('id')), {
        name: ele.previousElementSibling.previousElementSibling.innerHTML,
        id: ele.parentElement.parentElement.getAttribute('id'),
        img: ele.parentElement.previousElementSibling.src,
        price: ele.previousElementSibling.lastElementChild.innerHTML,
        quantity: 1,
    }).catch(()=>{
        alert('Login failed');
    });
}
function updateData (quantity, ele){
    update(ref(db, `user/${username}/fruitProducts/` + ele.parentElement.parentElement.getAttribute('id')), {
        name: ele.previousElementSibling.previousElementSibling.innerHTML,
        id: ele.parentElement.parentElement.getAttribute('id'),
        img: ele.parentElement.previousElementSibling.src,
        price: ele.previousElementSibling.lastElementChild.innerHTML,
        quantity: quantity,
    }).catch(()=>{
        alert('Login failed');
    })
}
function addData1(ele){
    set(ref(db, `user/${username}/fruitProducts/` + ele.parentElement.parentElement.parentElement.parentElement.getAttribute('id')), {
        name: ele.previousElementSibling.previousElementSibling.innerHTML,
        id: ele.parentElement.parentElement.parentElement.parentElement.getAttribute('id'),
        img: ele.parentElement.parentElement.previousElementSibling.lastElementChild.src,
        price: ele.previousElementSibling.lastElementChild.innerHTML,
        quantity: 1,
    }).catch(()=>{
        alert('Login failed');
    });
}
function updateData1 (quantity, ele){
    update(ref(db, `user/${username}/fruitProducts/` + ele.parentElement.parentElement.parentElement.parentElement.getAttribute('id')), {
        name: ele.previousElementSibling.previousElementSibling.innerHTML,
        id: ele.parentElement.parentElement.parentElement.parentElement.getAttribute('id'),
        img: ele.parentElement.parentElement.previousElementSibling.lastElementChild.src,
        price: ele.previousElementSibling.lastElementChild.innerHTML,
        quantity: quantity,
    }).catch(()=>{
        alert('Login failed');
    })
}



























function deleteData (ele){
    remove(ref(db, 'products/' + ele.parentElement.getAttribute('id'))).catch(()=>{
        console.log(Error);
    })
}

// ! ---------------------- end logic cart -----------------------------

// ! ----------------------- start logic love -----------------------------------
