
let right = document.getElementById('food');
let lis = document.querySelectorAll(".bottom ul li");
let id = document.getElementById('href');

// window.localStorage.clear()
getItems();
lis.forEach(li => {
    li.addEventListener("click", function(e){
        lis.forEach(li => {
            li.classList.remove('active');
        });
        e.currentTarget.classList.add("active");
        // add element in localStorage
        window.localStorage.setItem('src',li.children[0].src);
        window.localStorage.setItem('data-link', li.children[0].getAttribute('data-link'))
        console.log(li.children[0].getAttribute('data-link'))
        getItems()
        console.log(id.href)
        right.src = li.children[0].src;
    });
});
// get items from localStorage
function getItems(){
    if(window.localStorage.getItem('src')) {
        right.src = window.localStorage.getItem('src');
        id.href = window.localStorage.getItem('data-link');
    }
    lis.forEach(li => {
        if(window.localStorage.getItem('src') == li.children[0].src){
            li.classList.add("active");
        }
    });
}


fetch('https://login1form-3fad9-default-rtdb.firebaseio.com/CurrentUser.json').then((res)=>{
    let data = res.json();
    return data;
}).then((res)=>{
    console.log(res)
    let userName = document.getElementById('userName');
    let val;
    val = `Welcome ${res.name}`;
    let i=0;
    setInterval(() => {
        userName.innerHTML = val.slice(0,i);
        i++;
    }, 100);
}).then((res)=>{

});
