let productDetail;

$(document).ready(function () {
    console.log(`detay`,document.getElementById("detail"))
    const url="https://www.jsonbulut.com/json/product.php?ref=d855bcdbe683b4f1537ab4336451812e&start=0";
    $.ajax({
        type: "get",
        url: url,
        
        dataType: "json",
        success: function (res) {
            detailResult(res)
            console.log(`url`,url)
        },
        error:function(err){ console.error(err); }
    });
    /* sipariş ver*/
   


    /*detayları göster*/
    function detailResult(res){
        var url_string = window.location.href; //window.location.href
        var url = new URL(url_string);
        var c = url.searchParams.get("product");
        console.log(c)
        let html=``
        for (let i = 0; i < res.Products[0].bilgiler.length; i++) {
            const item = res.Products[0].bilgiler[i];
            
            if(c==item.productId){
                productDetail=item;
                console.log(`if içi`,productDetail)
                console.log(item.productName,item.brief,item.description)
                html+=`<div class="col-sm-5">
                <img src="`+item.images[0].normal+`" />
            </div>
            <div class="vr col-sm-1"></div>
            <div class="col-sm-6">
              <ul>
                  <li><h1>`+item.price+` TL</h1></li>
                  <li><h2>`+item.productName+`</h2></li>
                  <li><h3>`+item.brief+`</h3></li>
                  <li><p>`+item.description+`</p></li>
                  <li><button onclick="addBasket()" class="btn btn-success">Sepete Ekle</button></li>    
              </ul>
            </div>`
            }
        }document.getElementById("detail").innerHTML=html;
    }
 


});

function addBasket(){
    let userId=sessionStorage.getItem("userId")
    
    if(!userId){
        window.sessionStorage.setItem("prodcutLink",window.location.href)
        window.location.href="/login.html"
    }else{
        
        var basket = JSON.parse(localStorage.getItem("productList"))??[];
        var checkExistProduct = basket.filter(f=>f.productId==productDetail.productId)[0];
        if(checkExistProduct){
            basket.filter(f=>f.productId==productDetail.productId)[0].quantity++;
        }else{
            productDetail.quantity=1;
            basket.push(productDetail)
        }
        localStorage.setItem('productList',JSON.stringify(basket));
        console.log(`basket`,basket)
        
        let totalItemCount = 0
        if (basket.length>0) {
          basket.map((item)=> totalItemCount += item.quantity)
        }
        
        document.querySelector("#basketCount").innerHTML = totalItemCount
        
       
        
    }
    
}


