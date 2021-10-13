$(document).ready(function () {
    const url="https://www.jsonbulut.com/json/news.php?ref=d855bcdbe683b4f1537ab4336451812e&start=0&count=4";
    $.ajax({
        type: "get",
        url: url,
        
        dataType: "json",
        success: function (res) {
            newsResult(res)
        },
        error:function(err){ console.error(err); }
    });

    function newsResult(res){
        console.log(`haberler`,res)
        let html=``
        for (let i = 0; i < res.News[0].Haber_Bilgileri.length; i++) {
            const item = res.News[0].Haber_Bilgileri[i];
            console.log(`haber bilgiler`,item)
            if(item.s_description.length>20){
                item.s_description=item.s_description.substring(0,40)
                item.l_description=item.l_description.substring(0,250)
            }
            html+=`<tr>
            <td>`+item.title+`</td>
            <td><img src="`+item.picture+`" /></td>
            <td>`+item.s_description+`</td>
            <td>`+item.l_description+`</td>
            </tr>
            </hr>`
        }
        document.getElementById("news").innerHTML=html;
    }
});