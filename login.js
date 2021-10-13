$(document).ready(function () {
    $("#logined").submit(function (e) {
      e.preventDefault();
  
      const email = $("#email").val();
      const password = $("#password").val();
  
      const pushObj = {
        ref: "d855bcdbe683b4f1537ab4336451812e",
        userEmail: email,
        userPass: password,
        face: "no",
      };
      const url = "https://www.jsonbulut.com/json/userLogin.php";
  
      $.ajax({
        type: "get",
        url: url,
        data: pushObj,
        dataType: "json",
        success: function (response) {
          const status = response.user[0].durum;
          const msg = response.user[0].mesaj;
          if (status) {
              const item = response.user[0];
              const arrx=[]
              const info=item.bilgiler
              const userId = item.bilgiler.userId
              // session create
              sessionStorage.setItem("arrx",JSON.stringify(info))
              sessionStorage.setItem("userId", userId)
              // redirect
              // var url_string = window.location.href; //window.location.href
              // var urlx = new URL(url_string);
              // var c = urlx.searchParams.get("127.0.0.1:5500");
              // console.log(c)

              let url = window.sessionStorage.getItem("prodcutLink")
                window.sessionStorage.removeItem("prodcutLink")
              if(url){
                window.location.href= url
                
              }
              else{
                
                window.location.href="/index.html"
              }
              
              
              
            } else {
              alert(msg);
            }
        },
      });

    });
  });

  function logOut(){
    sessionStorage.removeItem("userId")
    setHeader();
    window.location.href="/index.html"
  }
