$(document).ready(function () {
    const infos=JSON.parse(sessionStorage.getItem("arrx"))
    console.log(`arrx`,infos.userName)
     //inputlara veri atma
     $("#name").val(infos.userName)
     $("#surname").val(infos.userSurname)
     $("#phone").val(infos.userPhone)
     $("#email").val(infos.userEmail)
   //  $("#name").val()=sessionStorage.getItem("userName")
    $('#infoUpdate').submit(function (e) { 
        e.preventDefault();
       


        // inputlardan veri çekme
        const id=JSON.parse(sessionStorage.getItem("userId"))
        const name = $("#name").val()
        const surname = $("#surname").val()
        const phone = $("#phone").val()
        const email = $("#email").val()
        const password = $("#password").val()



        const url = "https://www.jsonbulut.com/json/userSettings.php"

        const pushObj = {
            ref: "d855bcdbe683b4f1537ab4336451812e",
            userName: name,
            userSurname: surname,
            userPhone: phone,
            userMail: email,
            userId:id,
            userPass: password
        }
      

        

        $.ajax({
            type: "get",
            url: url,
            data: pushObj,
            dataType: "json",
            success: function (res) {
                const status = res.user[0].durum
                const message = res.user[0].mesaj
                if ( status == true ) {
                    // redirect
                    alert(message)
                    sessionStorage.delete("arrx")
                    sessionStorage.setItem("arrx",pushObj)
                    window.location.href = "bilgiler.html";
                }else {
                    alert(message)
                }
            }
        });


    });
    
});