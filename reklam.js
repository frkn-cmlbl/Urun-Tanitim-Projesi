$(document).ready(function () {
    const url="https://www.jsonbulut.com/json/advertisement.php?ref=d855bcdbe683b4f1537ab4336451812e&advertisementId=45";

    $.ajax({
        type: "get",
        url: url,
        
        dataType: "json",
        success: function (res) {
            console.log(res)
             rekResult(res)
        },
        error:function(err){ console.error(err); }
    });

    function rekResult(res){
        let html=`<div class="card">
        <div class="card-body">`
       // console.log(`obje`,res.reklam)
       /* for (const item in res) {
            console.log(`reklam`,item.reklam.adi)
        }*/
        res.reklam.map((item) => html+=`<a href="`+item.reklam.href+`" target="-blank"><img src="`+item.reklam.dosya+`" /></a>`)
        html+=`</div>
        </div>`
        document.getElementById("rek").innerHTML=html;
    }
});