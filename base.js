let userId;

$(document).ready(function () {

setHeader();

var basket = JSON.parse(localStorage.getItem("productList"))??[];
let totalItemCount = 0
if (basket.length>0) {
  basket.map((item)=> totalItemCount += item.quantity)
}

document.querySelector("#basketCount").innerHTML = totalItemCount

    
});
function setHeader(){
    userId=sessionStorage.getItem("userId")
    const profileBtn=document.getElementById("profileBtn")
    const loginBtn=document.getElementById("loginBtn")
    const registerBtn=document.getElementById("registerBtn")
    const logoutBtn=document.getElementById("logoutBtn")
    const dropDownBtn=document.getElementById("dropDown")
    let html=``
    if(!userId){
       /* profileBtn.remove();
        logoutBtn.remove();
        dropDownBtn.remove();
        loginBtn.style.display="";
        registerBtn.style.display="";*/
        html+=`<li><a  href="/sepet.html"><img src="icons/shopping-cart.svg" /> Sepet</a></li>
        <li id="loginBtn"><a  href="login.html"><img src="icons/enter(1).svg"/> Giriş Yap</a></li>
        <li id="registerBtn"><a href="register.html"><img src="/icons/stamped.svg" />Kayıt Ol</a></li>`
    }
    else{
       /* loginBtn.remove();
        registerBtn.remove();
        profileBtn.style.display="";
        dropDownBtn.style.display="";
        logoutBtn.style.display="";*/
        html+=`<li><a  href="/sepet.html"><img src="icons/shopping-cart.svg" /> Sepet   <span id="basketCount">0</span></a></li>
        <li id="profileBtn" class="dropdown"><a class="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="/icons/user.svg" />
        Profile
      </a>
      <ul id="dropDown" class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        
        <li><a class="dropdown-item" href="/bilgiler.html">Bilgiler</a></li>
        <li><a class="dropdown-item" href="/siparisler.html">Siparişlerim</a></li>
      </ul>
    </li>
    <li id="logoutBtn"><a href="#"  onclick="logOut()"><img src="icons/logout.svg"/> Çıkış Yap</a></li>`
    }
    document.getElementById("navRight").innerHTML=html;
}