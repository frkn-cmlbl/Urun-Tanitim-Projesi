$(document).ready(function () {
    const url="https://www.jsonbulut.com/json/product.php?ref=d855bcdbe683b4f1537ab4336451812e&start=0";
    $.ajax({
        type: "get",
        url: url,
        
        dataType: "json",
        success: function (res) {
            productResult(res)
            
        },
        error:function(err){ console.error(err); }
    });

    function productResult(res){
       // console.log(res)
        var url_string = window.location.href; //window.location.href
        var url = new URL(url_string);
        var c = url.searchParams.get("category");
        console.log(c);
        let html=``
        for (let i = 0; i < res.Products[0].bilgiler.length; i++) {
            const item = res.Products[0].bilgiler[i];
            console.log(item)
            if(c==item.categories[1].categoryId){
                console.log(`ürünler`,item.productName,item.categories[1].categoryId)
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
            
        }
        document.getElementById("product").innerHTML=html;
    }
});