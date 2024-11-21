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


// window.localStorage.clear()



// function addProductsToPage(){
//     arrProducts.forEach(ele => {
//         let parent = document.createElement('div');
//         parent.setAttribute('class', `col-lg-4 col-md-6 mb-4 pro ${ele.type} text-start`);
    
//         let card = document.createElement('div');
//         card.setAttribute('class', 'card pt-5 pb-4 px-4');
//         parent.appendChild(card);
    
//         let btn1 = documenxt.createElement('button');
//         btn1.appendChild(document.createTextNode('delete'));
//         btn1.setAttribute('class', 'delete');
//         card.appendChild(btn1);
    
//         let btn2 = document.createElement('button');
//         btn2.appendChild(document.createTextNode('Update'));
//         btn2.setAttribute('class', 'update');
//         card.appendChild(btn2);
    
//         let btn3 = document.createElement('button');
//         btn3.appendChild(document.createTextNode('Order Now'));
//         btn3.setAttribute('class', 'add-card');
//         card.appendChild(btn3);
    
//         let discount = document.createElement('div');
//         discount.setAttribute('class', 'discount');
//         discount.appendChild(document.createTextNode(`${ele.discount}$`));
//         card.appendChild(discount);
    
//         let img = document.createElement('img');
//         img.setAttribute('src', `${ele.img}`);
//         card.appendChild(img);
    
//         let eval = document.createElement('div');
//         eval.setAttribute('class' , 'eval d-flex');
//         let span = document.createElement('span');
//         span.setAttribute('class', 'me-3');
//         span.appendChild(document.createTextNode(ele.type));
//         eval.appendChild(span);
//         let div = document.createElement('div');
//         div.innerHTML = 
//         `   <i class="fa-solid fa-star"></i>
//             <i class="fa-solid fa-star"></i>
//             <i class="fa-solid fa-star"></i>
//             <i class="fa-solid fa-star"></i>
//             <i class="fa-solid fa-star"></i>
//         `;
//         eval.appendChild(div);
//         card.appendChild(eval);
    
//         let h3 = document.createElement('h3');
//         h3.setAttribute('class', 'mt-3');
//         h3.appendChild(document.createTextNode(ele.name));
//         card.appendChild(h3);
    
//         let price = document.createElement('div');
//         price.setAttribute('class' , 'price d-flex mt-2');
//         price.innerHTML = `
//         <div class="me-3">price: </div>
//         $<span class="me-2">${ele.price}</span>
//         <del>$${ele.disPrice}</del>
//         `;
//         card.appendChild(price);
    
//         parent.appendChild(card);
    
//         parentElement.appendChild(parent);
    
//         btn1.addEventListener('click', (e)=>{
//             console.log(e.target.parentElement.getAttribute('id'));
//             parent.remove();
//             del(e.target.parentElement.getAttribute('id'));
//         })
//     });
// }

// !-------------------------------------------------------
function addData(ele){
    set(ref(db, `user/${username}/products/` + ele.parentElement.getAttribute('id')), {
        name: ele.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML,
        id: ele.parentElement.getAttribute('id'),
        img: ele.nextElementSibling.nextElementSibling.src,
        price: ele.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.previousElementSibling.innerHTML,
        quantity: 1,
    }).catch(()=>{
        alert('Login failed');
    });
}
function updateData (quantity, ele){
    update(ref(db, `user/${username}/products/` + ele.parentElement.getAttribute('id')), {
        name: ele.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML,
        id: ele.parentElement.getAttribute('id'),
        img: ele.nextElementSibling.nextElementSibling.src,
        price: ele.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.previousElementSibling.innerHTML,
        quantity: quantity,
    }).catch(()=>{
        alert('Login failed');
    })
}
// function deleteData (ele){
//     remove(ref(db, 'products/' + ele.parentElement.getAttribute('id'))).catch(()=>{
//         console.log(Error);
//     })
// }

var username;
var email;
var pass;
// !--------------------------------------------------------
let userName = window.localStorage.getItem('UserName');
let Email = window.localStorage.getItem('emailOrPhone');
let password = window.localStorage.getItem('password');

// console.log(parent);

let Name = document.getElementById('name');
let type = document.getElementById('type');
let pathImg = document.getElementById('img');
let discount = document.getElementById('discount');
let disPrice = document.getElementById('dis-price');
let price = document.getElementById('cur-price');
let discount1 = document.getElementById('discount1');
let disPrice1 = document.getElementById('dis-price1');
let price1 = document.getElementById('cur-price1');
let submit = document.getElementById('submit');
let submit1 = document.getElementById('submit1');
let add = document.getElementById('add');
let updatePro = document.getElementById('update');
// console.log(updatePro)
let longDis = document.getElementById('longDis');


let ids = 0;
let arrProducts = [];

function views(view){
    view.forEach(ele => {
        ele.addEventListener('click', ()=>{
            const obj = {
                name: ele.innerHTML,
                img: ele.previousElementSibling.previousElementSibling.src,
                longDis: ele.nextElementSibling.nextElementSibling.innerHTML,
                curPrice: ele.nextElementSibling.lastElementChild.previousElementSibling.innerHTML,
                id: ele.parentElement.parentElement.id,
                idCart: ele.parentElement.id,
            }
            addSingleProduct(obj);
            console.log(obj);
            // location.assign('../../files.html/Cakes/singleProduct.html');
        });
        // console.log(ele);
    });
}
function addSingleProduct(product){
    set(ref(db, `singleProductfood/`), {
        name: product.name,
        img: product.img,
        longDis: product.longDis,
        curPrice: product.curPrice,
        id: product.id,
        idCart: product.idCart, 
    }).then(()=>{
        location.assign('../../files.html/Foods/single.html');
    }).catch(()=>{
        alert('Login failed');
    });
}

function addProductToPage(){
    let parentElement = document.getElementById('row');
    
    let parent = document.createElement('div');
    parent.setAttribute('class', `col-lg-4 col-md-6 mb-4 pro ${arrProducts[arrProducts.length-1].type} text-start`);
    // parent.setAttribute('i`)
    let card = document.createElement('div');
    card.setAttribute('class', 'card pt-5 pb-4 px-4');
    parent.appendChild(card);

    let btn1 = document.createElement('button');
    btn1.appendChild(document.createTextNode('delete'));
    btn1.setAttribute('class', 'delete');
    btn1.style.cssText = `display: block;`;
    card.appendChild(btn1);

    let btn2 = document.createElement('button');
    btn2.appendChild(document.createTextNode('Update'));
    btn2.setAttribute('class', 'update');
    btn2.style.cssText = `display: block;`;
    card.appendChild(btn2);

    let btn3 = document.createElement('button');
    btn3.appendChild(document.createTextNode('Order Now'));
    btn3.setAttribute('class', 'add-card');

    card.appendChild(btn3);

    let discount = document.createElement('div');
    discount.setAttribute('class', 'discount');
    discount.appendChild(document.createTextNode(`${arrProducts[arrProducts.length-1].discount}$`));
    card.appendChild(discount);

    let img = document.createElement('img');
    img.setAttribute('src', `${arrProducts[arrProducts.length-1].img}`);
    card.appendChild(img);

    let eval1 = document.createElement('div');
    eval1.setAttribute('class' , 'eval d-flex');
    let span = document.createElement('span');
    span.setAttribute('class', 'me-3');
    span.appendChild(document.createTextNode(arrProducts[arrProducts.length-1].type));
    eval1.appendChild(span);
    let div = document.createElement('div');
    div.innerHTML = 
    `   <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
    `;
    eval1.appendChild(div);
    card.appendChild(eval1);

    let h3 = document.createElement('h3');
    h3.setAttribute('class', 'mt-3 view');
    h3.appendChild(document.createTextNode(arrProducts[arrProducts.length-1].name));
    card.appendChild(h3);

    let price = document.createElement('div');
    price.setAttribute('class' , 'price d-flex mt-2');
    price.innerHTML = `
    <div class="me-3">price: </div>
    $<span class="me-2">${arrProducts[arrProducts.length-1].price}</span>
    <del>$${arrProducts[arrProducts.length-1].disPrice}</del>
    `;
    card.appendChild(price);

    parent.appendChild(card);

    parentElement.appendChild(parent);

    btn1.addEventListener('click', (e)=>{
        console.log(e.target.parentElement.getAttribute('id'));
        parent.remove();
        del(e.target.parentElement.getAttribute('id'));
    })
}
function addProductToPage1(ele){
    let parentElement = document.getElementById('row');
    let parent = document.createElement('div');
    parent.setAttribute('class', `col-lg-4 col-md-6 mb-4 pro ${ele.type} text-start`);
    parent.setAttribute(`id`, ele.id);
    let card = document.createElement('div');
    card.setAttribute('class', 'card pt-5 pb-4 px-4');
    parent.appendChild(card);

    let btn1 = document.createElement('button');
    btn1.appendChild(document.createTextNode('delete'));
    btn1.setAttribute('class', 'delete');
    card.appendChild(btn1);

    let btn2 = document.createElement('button');
    btn2.appendChild(document.createTextNode('Update'));
    btn2.setAttribute('class', 'update');
    // btn2.setAttribute('id', )
    card.appendChild(btn2);

    let btn3 = document.createElement('button');
    btn3.appendChild(document.createTextNode('Order Now'));
    btn3.setAttribute('class', 'add-card');
    card.appendChild(btn3);

    let discount = document.createElement('div');
    discount.setAttribute('class', 'discount');
    discount.appendChild(document.createTextNode(`${ele.discount}$`));
    card.appendChild(discount);

    let img = document.createElement('img');
    img.setAttribute('src', `${ele.img}`);
    card.appendChild(img);

    let eval1 = document.createElement('div');
    eval1.setAttribute('class' , 'eval d-flex');
    let span = document.createElement('span');
    span.setAttribute('class', 'me-3');
    span.appendChild(document.createTextNode(ele.type));
    eval1.appendChild(span);
    let div = document.createElement('div');
    div.innerHTML = 
    `   <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
    `;
    eval1.appendChild(div);
    card.appendChild(eval1);

    let h3 = document.createElement('h3');
    h3.setAttribute('class', 'mt-3 view');
    h3.appendChild(document.createTextNode(ele.name));
    card.appendChild(h3);

    let price = document.createElement('div');
    price.setAttribute('class' , 'price d-flex mt-2');
    price.innerHTML = `
    <div class="me-3">price: </div>
    $<span class="me-2">${ele.price}</span>
    <del>$${ele.disPrice}</del>
    `;
    card.appendChild(price);

    let p = document.createElement('p');
    p.setAttribute('class', 'd-none');
    p.appendChild(document.createTextNode(ele.longDis));
    card.appendChild(p);

    parent.appendChild(card);

    parentElement.appendChild(parent);

    // arrOfOrders.forEach(ele => {
    //     console.log(ele);
    // });

}
function addProductToArr(ele) {
    // ids++;
    const product = {
        name: Name.value,
        img: pathImg.value,
        type: type.value,
        discount: discount.value,
        disPrice: disPrice.value,
        longDis: longDis.value,
        price: price.value,
        id: Date.now(), 
    }
    arrProducts.push(product);
    addProduct(product)
    // deleteOrder(ele.quantity);
    // addProductToLocalStorage(arrProducts);
}
function addProduct(product){
    set(ref(db, `products/` + product.id), {
        name: product.name,
        id: product.id,
        img: product.img,
        type: product.type,
        discount: product.discount,
        disPrice: product.disPrice,
        longDis: product.longDis,
        price: product.price,
    }).catch(()=>{
        alert('Login failed');
    });
}
function updateProduct (ele) {
    update(ref(db, `products/` + ele.parentElement.parentElement.getAttribute('id')), {
        // name:ele.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML,
        // id: ele.parentElement.parentElement.getAttribute('id'),
        // img: ele.nextElementSibling.nextElementSibling.src,
        // type: ele.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.innerHTML,
        discount: discount1.value,
        disPrice: disPrice1.value,
        price: price1.value,
        // quantity: quantity,
    }).catch(()=>{
        alert('Login failed');
    })
}
function deleteProduct (ele){
    remove(ref(db, 'products/' + ele.parentElement.parentElement.getAttribute('id'))).catch(()=>{
        console.log(Error);
    })
    ele.parentElement.parentElement.remove()
}
function del(id) {
    arrProducts = arrProducts.filter(function(product){
        return product.id != id;
    })
    // addProductToLocalStorage(arrProducts);
}
// function deleteData (ele){
//     remove(ref(db, `products/` + ele.parentElement.id)).catch(()=>{
//         console.log(Error);
//     });
//     ele.parentElement.remove();
//     ele.parentElement.style.cssText = `display: none;`
// }
// fetch('https://login1form-3fad9-default-rtdb.firebaseio.com/products.json').then((res)=>{
//     let data = res.json();
//     return data;
// }).then((res)=>{
//     // console.log(res)
//     let arr = [];
//     for (const ele in res) {
//         if (res[ele] !== null) {
//             arr[arr.length] = res[ele];
//         }
//     }
//     arr.forEach(ele => {
//         addProductToPage1(ele);
//     });
    
// })

var arrOfOrders = [];
fetch(`https://login1form-3fad9-default-rtdb.firebaseio.com/CurrentUser.json`).then((res)=>{
    let myData = res.json();
    return myData;
}).then((res)=>{
    console.log(res)
    let username = res.fullName;
    let password = res.password;

    fetch('https://login1form-3fad9-default-rtdb.firebaseio.com/products.json').then((res)=>{
        let data = res.json();
        return data;
    }).then((res)=>{
        // console.log(res)
        for (const ele in res) {
            if(res[ele] !== null) {
                arrProducts[arrProducts.length] = res[ele];
            }
        }
        arrProducts.forEach(ele => {
            addProductToPage1(ele);
        });
        
        let addProduct1 = document.getElementById('add-product');
        let deleted = document.querySelectorAll('.delete');
        let updated = document.querySelectorAll('.update');
        // console.log(arrProducts)
        // console.log(username)
        // console.log(pass)
        
        if (username == 'Admin123' && password == '912385') {
            addProduct1.style.cssText = `display: block;`;
    
            deleted.forEach(ele => {
                ele.style.cssText = `display: block;`;
                ele.addEventListener('click', ()=>{
                    // console.log(ele);
                    // console.log(ele.parentElement.id);
                    console.log(ele.parentElement.parentElement.id);
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
                    });
                })
            });
            addProduct1.addEventListener('click', ()=>{
                Name.value = '';
                type.value = '';
                pathImg.value = '';
                discount.value = '';
                disPrice.value = '';
                price.value = '';
                add.style.cssText = `display: flex;`;
            });
            submit.addEventListener('click', ()=>{
        
                addProductToArr();
                add.style.cssText = `display: none;`;
                addProductToPage()
            });
            // console.log(arrProducts);
            
        }
    }).then(()=>{
        let addCart = document.querySelectorAll('.add-card');
        
        let id = 0;
        addCart.forEach(function(ele) {
            id++;
            ele.parentElement.setAttribute('id', `${id}`);
            // console.log(ele)
        });
        // addCart.forEach(ele => {
        //     console.log(ele) 
        // });
        addCart.forEach(ele => {
            ele.addEventListener('click', function(){
                addOrderToArr(ele);
                
                basket1.innerHTML = arrOfOrders.length;
                basket2.innerHTML = arrOfOrders.length;
                basket3.innerHTML = arrOfOrders.length;
                basket4.innerHTML = arrOfOrders.length;
            });
        });

    }).then((res)=>{
        let view = document.querySelectorAll('.view');
        views(view)
    }).then(()=>{
        
let buttons = document.querySelectorAll('label button');
let divs = document.querySelectorAll('.products .row .pro');


buttons.forEach(ele => {
    ele.addEventListener('click' , () => {
        buttons.forEach(element => {
            element.classList.remove('active');
        });
        ele.classList.add('active');
        if (ele.classList.contains('pizza')) {
            divs.forEach(element => {
                if (element.classList.contains('pizza')) {
                    element.classList.remove('display')
                }else{
                    element.classList.add('display')
                }
            });
        }
        if (ele.classList.contains('burger')) {
            divs.forEach(element => {
                if (element.classList.contains('burger')) {
                    element.classList.remove('display');
                }else{
                    element.classList.add('display');
                }
            });
        }
        if (ele.classList.contains('drinks')) {
            divs.forEach(element => {
                if (element.classList.contains('drinks')) {
                    element.classList.remove('display');
                }else{
                    element.classList.add('display');
                }
            });
        }
        if (ele.classList.contains('sandwich')) {
            divs.forEach(element => {
                if (element.classList.contains('sandwich')) {
                    element.classList.remove('display');
                }else{
                    element.classList.add('display');
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
}).catch((rej)=>{
    console.log(Error);
})
function addOrderToArr(ele) {
    const order = {
        name: ele.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML,
        id: ele.parentElement.getAttribute('id'),
        img: ele.nextElementSibling.nextElementSibling.src,
        price: ele.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.previousElementSibling.innerHTML,
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
//     window.localStorage.setItem('fastfood', JSON.stringify(order))
// }


// function addProductToLocalStorage(product) {
//     window.localStorage.setItem('products', JSON.stringify(product));
// }




var arr = [];
fetch('https://login1form-3fad9-default-rtdb.firebaseio.com/CurrentUser.json').then((res)=>{
    let data = res.json();
    return data;
}).then((res)=>{
    // console.log(res);
    username = res.fullName;
    pass = res.password;
// ! -------------------------------- cart ---------------------------------

    let basket1 = document.getElementById('basket1');
    let basket2 = document.getElementById('basket2');
    let basket3 = document.getElementById('basket3');
    let basket4 = document.getElementById('basket4');
    fetch(`https://login1form-3fad9-default-rtdb.firebaseio.com/user/${username}/products.json`).then((res)=>{
        let data = res.json();
        return data;
    }).then((res)=>{
        for (const ele in res) {
            if (res[ele] !== null) {
                arrOfOrders[arrOfOrders.length] = res[ele];
            }
        }
        // console.log(arrOfOrders);
        basket1.innerHTML = arrOfOrders.length;
        basket2.innerHTML = arrOfOrders.length;
        basket4.innerHTML = arrOfOrders.length;
        basket3.innerHTML = arrOfOrders.length;
    });

}).catch((rej)=>{
    console.log(Error);
});




let navbar = document.getElementById('navbar');
let left =  -200;
let cycle = document.getElementById('cycle');
let scro = 0;
window.onscroll = function () {
    if (scrollY >= 100) {
        navbar.style.cssText = 
        `
            transition: 3s;
            -webkit-transition: 0.8s;
            -moz-transition: 0.8s;
            -ms-transition: 0.8s;
            -o-transition: 0.8s;
            top: 0;
            background-color: white;
            width: 100%;
        `;
    }
    else{
        navbar.style.cssText = `top: -500px;`;
    }
    if (scrollY >= 6050 && scrollY <= 6820) {
        let test = scrollY - scro;
        if (test >= 0) {
            left += 1;
            cycle.style.cssText = `left: ${left}px;`
        }else{
            left -= 1;
            cycle.style.cssText = `left: ${left}px;`
        }
    }
    scro = scrollY;
}   

let moves = document.getElementById('moves');
let pos = 0;
setInterval(() => {
    pos++;
    moves.style.cssText = `left: ${pos}px;`;
    if (pos >= 1280) {
        pos = -200;
    }
}, 10);

// !------------------------------------------------------------------------------


fetch('https://login1form-3fad9-default-rtdb.firebaseio.com/user.json').then((res)=>{
    let myData = res.json();
    return myData;
}).then((res)=>{
    for (const ele in res) {
        if(res[ele] != null){
            arr[arr.length] = res[ele];
        };
        // if (res[ele].fullName == username && res[ele].email == email && res[ele].password == pass) {
        //     console.log('the email is found');
        // }
    }
    // console.log(arr)
});



// the functions
