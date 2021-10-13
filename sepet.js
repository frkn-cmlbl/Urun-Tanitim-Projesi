var basket;
$(document).ready(function () {
  let userId=JSON.parse(sessionStorage.getItem("userId"))
  if(userId){
    getBaskets(); 
  }
  else{
    window.location.href="/login.html"
  }
  
});
function shopEnd() {
  const url = `https://www.jsonbulut.com/json/orderForm.php?`;
  const userId = sessionStorage.getItem("userId");
  console.log(`user`, userId);
  let myVar;
  // function myStopFunction() {
  //     localStorage.removeItem("productList");
  //     clearInterval(myVar);
  //     myVar=setInterval(function(){ localStorage.removeItem("productList"); }, 3000);
  //   }
  basket.forEach((element) => {
    const pushObje = {
      ref: "d855bcdbe683b4f1537ab4336451812e",
      customerId: userId,
      productId: element.productId,
      html: "12",
    };
    $.ajax({
      type: "get",
      url: url,
      data: pushObje,
      dataType: "json",
      success: function (res) {
        const status = res.order[0].durum;
        const message = res.order[0].mesaj;
        if (status == true) {
          // redirect
          alert(message);
          window.location.href = "/siparisler.html";
          for (var i = basket.length; i > 0; i--) {
            basket.pop();
          }
          let newBasket = basket;
          // let newBasket=basket.filter((i)=> i!=element);
          console.log(`newbasket`, newBasket);
          localStorage.setItem("productList", JSON.stringify(newBasket));
        } else {
          alert(message);
        }
      },
    });
  });
}
function removeBasket(id) {
  if (confirm("Ürününüz sepetten kaldırılacaktır")) {
    basket = basket.filter((f) => f.productId != id);
    updateBasket();
  }
}
function plusBasket(id) {
  var checkExistProduct = basket.filter((f) => f.productId == id)[0];

  if (checkExistProduct) {
    basket.filter((f) => f.productId == id)[0].quantity++;
    updateBasket();
  }
}
function minusQuantity(id) {
  console.log("id", id);
  var checkExistProduct = basket.filter((f) => f.productId == id)[0];
  console.log("checkExistProduct", checkExistProduct);
  if (checkExistProduct) {
    if (checkExistProduct.quantity == 1) {
      if (
        checkExistProduct.quantity == 1 &&
        confirm("Ürününüz sepetten kaldırılacaktır")
      ) {
        basket = basket.filter((f) => f.productId != id);
      }
    } else {
      basket.filter((f) => f.productId == id)[0].quantity--;
      console.log("basket", basket);
    }
    updateBasket();
  }
}
function getBaskets() {
  basket = JSON.parse(localStorage.getItem("productList")) ?? [];
  document.getElementById("baskets").innerHTML = "";

  let htmlx = ``;

  if (basket.length > 0) {
    document.querySelector("#buttonShopEnd").style.display = "flex";
    for (let i = 0; i < basket.length; i++) {
      const item = basket[i];
      let newPrice = item.price * item.quantity;
      console.log("item", item);
      htmlx +=
        `<tr>
            <td scope="row"><img src="` +
        item.images[0].normal +
        `" /></td>
            <td>` +
        item.productName +
        `</td>
            <td id="quantity"><img onclick="minusQuantity(${item.productId})" src="/icons/minus.svg" /><b>` +
        item.quantity +
        ` Adet</b><img onclick="plusBasket(${item.productId})" src="/icons/add.svg" /></td>
            <td><b>` +
        newPrice.toFixed(2) +
        ` TL</b></td>
            <td id="deleteicon"><img onclick="removeBasket(${item.productId})" src="/icons/delete.svg" /></td>
          </tr>`;
    }
  } else {
    document.querySelector("#buttonShopEnd").style.display = "none";
    htmlx = `<b style='color: green;'>Sepetinizde ürün bulunmamaktadır.</b>`;
  }

  document.getElementById("baskets").innerHTML = htmlx;
}

function updateBasket() {
  localStorage.setItem("productList", JSON.stringify(basket));
  let totalItemCount = 0;
  if (basket.length > 0) {
    basket.map((item) => (totalItemCount += item.quantity));
  }

  document.querySelector("#basketCount").innerHTML = totalItemCount;
  getBaskets();
}
