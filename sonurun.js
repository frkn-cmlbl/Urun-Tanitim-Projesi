$(document).ready(function () {
    const url="https://www.jsonbulut.com/json/product.php?ref=d855bcdbe683b4f1537ab4336451812e&start=0";

    $.ajax({
        type: "get",
        url: url,
        
        dataType: "json",
        success: function (res) {
            sonResult(res)
        },
        error:function(err){ console.error(err); }
    });

    function sonResult(res){
        console.log(`son 6`,res)
        let html=``;
       for (let i = res.Products[0].bilgiler.length-1; i > (res.Products[0].bilgiler.length)-7; i--) {
           const item = res.Products[0].bilgiler[i];
          console.log(`ürünler`,item.productName) 
          html+=`<a href="/detay.html?product=`+item.productId+`" class="col-sm-4 cardc">

          <div id="cardx" class="card">
            <img src="`+item.images[0].normal+`" alt="Avatar" style="width:100%">
            <div class="container">
              <h4><b>`+item.productName+`</b></h4> 
              <p>`+item.brief+`</p>
              <p><b style="color:green">`+item.price+` TL</b></p> 
            </div>
          </div>

        </a>`
       }
       document.getElementById("lastProduct").innerHTML=html;
       
    }
});