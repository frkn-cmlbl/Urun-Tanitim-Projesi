$(document).ready(function () {
    const url="https://www.jsonbulut.com/json/companyCategory.php?ref=d855bcdbe683b4f1537ab4336451812e";

    $.ajax({
        type: "get",
        url: url,
        
        dataType: "json",
        success: function (res) {
           dataResult(res); 
            
        },
        error:function(err){ console.error(err); }
    });
    
    function dataResult(res){
       // console.log(res)
       let html=`<div class="leftMenu">
       <ul>`
       for (let i = 0; i < res.Kategoriler[0].Categories.length; i++) {
            const item = res.Kategoriler[0].Categories[i];
            console.log(item)
            if(item.TopCatogryId == 0) {
                html+=`
            <li data-categoryId="${item.CatogryId}"><a href="">`+item.CatogryName+`</a><ul></ul></li>` 
            }
        }
        html += `</ul> 
        </div>`;
      document.getElementById("leftMenu").innerHTML=html;

      let dropdownMenu;
      for (let i = 0; i < res.Kategoriler[0].Categories.length; i++) {
        dropdownMenu ="";
           const item = res.Kategoriler[0].Categories[i];
           console.log(item)
           if(item.TopCatogryId != 0) {
               dropdownMenu+=`
           <li><a href="./product.html?category=`+item.CatogryId+`">`+item.CatogryName+`</a></li>` 

           document.querySelector(`[data-categoryId="${item.TopCatogryId}"] ul`).innerHTML += dropdownMenu

           }
       }


    }
});