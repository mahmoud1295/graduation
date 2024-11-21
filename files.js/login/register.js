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

function addData(){
    set(ref(db, 'user/' + fullName.value), {
        fullName: fullName.value,
        password: password.value,
        email: email.value,
        name: Name.value,
        orderFood: {}
    }).then(()=>{
        alert('The Email Created Sucessfull !');
    }).catch(()=>{
        alert('Login failed');
    })
}
function add(username, password, email, name){
    set(ref(db, 'CurrentUser/'), {
        fullName: username,
        password: password,
        name: Name.value,
        email: email.value,
    }).then(()=>{
        // alert('the current user is added');
        // open('../../files.html/index/index.html','_self');
    }).catch(()=>{
        // alert('Login failed');
    })
}




// !-------------------------------------------------------------------------
var fullName = document.getElementById('fullName');
var Name = document.getElementById('name');
var email = document.getElementById('email');
var password = document.getElementById('pass');
var nameTest = document.getElementsByClassName('check-name')[0];
var emailTest = document.getElementsByClassName('check-email')[0];
var passTest = document.getElementsByClassName('check-pass')[0];
var nameT = document.getElementById('nameT');
var emailT = document.getElementById('emailT');
var RegName = /\w{3,20}/ig;
var nameR = /^\w{3,10}( \w{3,10})+$/ig;
var Regemail = /((^\w{4,20}@(gmail.com)$)|(^(011|012|015|010)[0-9]{8}$))/;
var Regpass = /^[0-9]{4,8}$/;
var btn = document.getElementById('btn');

let arrEmails = [];
if (window.localStorage.getItem('acounts')) {
    arrEmails = JSON.parse(window.localStorage.getItem('acounts'));
}


let arr = []
fetch('https://login1form-3fad9-default-rtdb.firebaseio.com/user.json').then((res)=>{
    let myData = res.json();
    return myData;
}).then((res)=>{
    for (const ele in res) {
        arr[arr.length] = res[ele];
    }
    btn.addEventListener('click', ()=>{
        nameTest.innerHTML = "";
        // emailTest.innerHTML = "";
        passTest.innerHTML = "";
    
        let flage1 = true;
        let flage3 = true;
        let flage = false;
        let namef = false;
        let emailf = false;
        if (!nameR.test(Name.value)) {
            nameT.innerHTML = 'Please Enter Your Full Name Valid';
            namef = false;
        }else{
            namef = true;
            nameT.innerHTML = '';
        }
        if (!Regemail.test(email.value)) {
            if (parseInt(email.value)) {
                emailT.innerHTML = 'Please enter your phone number valid';
            }else{
                emailT.innerHTML = 'Please enter your email valid';
            }
            emailf = false;
        }else{
            emailf = true;
            emailT.innerHTML = '';
        }
    
        if (!RegName.test(fullName.value)) {
            nameTest.innerHTML = 'Username must be unique.';
            flage1 = false;
        }else {
            flage1 = true;
            
            for (let index = 0; index < arr.length; index++) {
                if (arr[index].fullName == fullName.value) {
                    flage = true;
                    break;
                }
            }
            if (flage == true) {
                alert('the email is already exists');
                nameTest.innerHTML = 'the email is already exists';
                return 0;
            }else{
                nameTest.innerHTML = '';
            }
        }
    
        if(!Regpass.test(password.value)){
            passTest.innerHTML = 'The Password must be numbers only between (4:8)';
            flage3 = false;
        }else{
            flage3 = true;
        }
    
        if (flage3 == true && flage == false && flage1 == true && namef == true && emailf == true) {
            addData();
            add(fullName.value, password.value, email, Name);
            open('../../files.html/index/index.html')
        }else{
            console.log('hello');
        }
    });
}).catch((rej)=>{
    console.log(Error("the resposive is invalid"))
});

function addOrderToArr() {
    const emails = {
        FullName: fullName.value,
        emailOrPhone: email.value,
        password: password.value,
    }
    let bool = false;
    arrEmails.forEach(element => {
        if(emails.emailOrPhone == element.emailOrPhone) {
            bool =  true;
            emailTest.innerHTML = 'the email is already there';
        }
    });
    if(bool == false) {
        arrEmails.push(emails);
    }
    // deleteOrder(ele.quantity);
    addOrderToLocalStorage(arrEmails);
}

function addOrderToLocalStorage(emails) {
    window.localStorage.setItem('acounts', JSON.stringify(emails))
}

// !---------------------------------


