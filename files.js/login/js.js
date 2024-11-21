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









let usernName = document.getElementById('email');
let password = document.getElementById('pass');
let nameTest = document.getElementsByClassName('check-name')[0];
let emailTest = document.getElementsByClassName('check-email')[0];
let passTest = document.getElementsByClassName('check-pass')[0];
let fullName;
let Email;
let Password;


let arrEmails = [];
if (window.localStorage.getItem('acounts')) {
    arrEmails = JSON.parse(window.localStorage.getItem('acounts'));
}


// !------------------------------------------------------------------
let arr = [];
let btn = document.getElementById('btn');
console.log(btn)
fetch('https://login1form-3fad9-default-rtdb.firebaseio.com/user.json').then((res)=>{
    let myData = res.json();
    return myData;
}).then((res)=>{
    for (const ele in res) {
        arr[arr.length] = res[ele];
    }
    // document.forms[0]
    btn.addEventListener('click', (e) => {
        emailTest.innerHTML = "";
        passTest.innerHTML = "";
        let flage1 = false;
        let flage2 = false;
        // addData(arr[i]);
        for (let i = 0; i < arr.length; i++) {
            // addData(arr[i]);
            // updateData(ele);
            // console.log(arr[i].fullName)
            if (arr[i].fullName == usernName.value && arr[i].password == password.value) {
                flage1 = true;
                flage2 = true;
                fullName = arr[i].fullName;
                Email = arr[i].email;
                Password = arr[i].password;
                console.log(fullName)
                console.log(Email);
                console.log(Password);
                addData(arr[i]);
                break;
            }else if (arr[i].fullName == usernName.value && arr[i].password != password.value) {
                flage2 = false;
                flage1 = true;
                break;
            }else if (arr[i].fullName != usernName.value) {
                flage1 = false;
                flage2 = true;
            }
        }
        if (flage1 == false) {
            emailTest.innerHTML = 'the acount is not found';
            e.preventDefault();
        }else {
            emailTest.innerHTML = '';
        }
        if (flage2 == false) {
            passTest.innerHTML = 'please enter your password valid';
            e.preventDefault();
        }else {
            passTest.innerHTML = '';
        }
        // e.preventDefault();
    });
    return arr;
}).then((arr)=>{
    console.log(arr);
}).catch((rej)=>{
    console.log(rej)
});

function addData(ele){
    set(ref(db, 'CurrentUser/'), {
        fullName: ele.fullName,
        password: ele.password,
        email: ele.email,
        name: ele.name,
    }).then(()=>{
        // alert('the current user is added');
        open('../../files.html/index/index.html','_self');
    }).catch(()=>{
        // alert('Login failed');
    })
}

