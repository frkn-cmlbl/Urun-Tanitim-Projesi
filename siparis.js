
let siparis;
let custemerId=sessionStorage.getItem("userId")
$(document).ready(function () {
    const url=`https://www.jsonbulut.com/json/orderList.php?ref=d855bcdbe683b4f1537ab4336451812e&musterilerID=`+custemerId
    $.ajax({
        
        type: "get",
        url: url,
        cache: false,
        dataType: "json",
        success: function (res) {
            getSiparis(res);
        }, 
        error:function(err){ console.error(`error`,err); }
    });
   
   
   
   
    
    
   
});

function getSiparis(res){
   // siparis = JSON.parse(localStorage.getItem("sepetList"))??[];
    console.log(`siparis`,res)
    let htmlx=``
    for (let i = 0; i < res.orderList[0].length; i++) {
        const item = res.orderList[0][i];
        htmlx+=`<tr>
        <td scope="row"><img src="`+item.normal+`"/></td>
        <td>`+item.urun_adi+`</td>
        
         <td><b>`+item.fiyat+`</b></td>
      </tr>`
    }
    document.getElementById("siparisler").innerHTML=htmlx;  
    
}

