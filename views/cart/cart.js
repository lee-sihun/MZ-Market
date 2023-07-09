// 로컬 스토리지에서 장바구니 데이터 불러오기
let cartData = localStorage.getItem("cart");
let cartItems = [];

console.log(cartData);
const noList = document.querySelector(".empty_cart_message");
console.log(noList);
cartItems = JSON.parse(cartData);

// 장바구니 데이터가 있는 경우 목록 생성
if (cartData) {
  noList.style.display = "none";
  console.log("cartItems", cartItems);

  cartItems.forEach((item) => {
    // 상품 목록 생성
    const listItem = document.createElement("li");
    listItem.classList.add("order_product_list");
    listItem.innerHTML = `
      <div class="order_product_img"></div>
      <div class="order_info_box">
        <div class="order_product_info">
          <div class="order_product_top">
            <p class="product_name">${item.name}</p>
            <p class="product_size">Size: ${item.size}</p>
            <p class="product_price">${item.price}</p>
          </div>
          <div class="order_product_edit_count">
              <span class="material-symbols-outlined product_remove"> remove </span>
            <p class="product_num">${item.quantity}</p>
              <span class="material-symbols-outlined product_add"> add </span>
          </div>
        </div>
        <div class="order_info_bottom">
          <button class="order_remove_button">삭제하기</button>
        </div>
      </div>
    `;
    const orderInfo = document.getElementById("orderInfo");
    orderInfo.appendChild(listItem);

    // 수량 수정 기능
    const productNumElement = listItem.querySelector(".product_num");
    let quantity = parseInt(productNumElement.textContent);

    listItem.addEventListener("click", function (event) {
      // 수량 감소
      if (event.target.classList.contains("product_remove")) {
        console.log("TEST");
        quantity--;
        if (quantity < 1) {
          quantity = 1;
        }
        // 변경된 수량 업데이트
        productNumElement.textContent = quantity.toString();

        // 장바구니 데이터 업데이트
        cartItems.forEach((cartItem) => {
          if (cartItem.name === item.name && cartItem.size === item.size) {
            cartItem.quantity = quantity;
          }
        });

        // 업데이트된 장바구니 데이터를 로컬 스토리지에 저장
        localStorage.setItem("cart", JSON.stringify(cartItems));

        console.log("11111" + cartData);
        updateTotalQuantityAndPrice();
        // 수량 증가
      } else if (event.target.classList.contains("product_add")) {
        quantity++;
        // 변경된 수량 업데이트
        productNumElement.textContent = quantity.toString();

        // 장바구니 데이터 업데이트
        cartItems.forEach((cartItem) => {
          if (cartItem.name === item.name && cartItem.size === item.size) {
            cartItem.quantity = quantity;
          }
        });

        // 업데이트된 장바구니 데이터를 로컬 스토리지에 저장
        localStorage.setItem("cart", JSON.stringify(cartItems));
        updateTotalQuantityAndPrice();
        console.log("22222" + cartData);
      }
    });
  });
}

// 상품 삭제
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("order_remove_button")) {
    const listItem = event.target.closest(".order_product_list");
    listItem.remove();

    console.log("삭제 리스트 아이템", listItem);

    // 장바구니 데이터 업데이트
    const productName = listItem.querySelector(".product_name").textContent;
    console.log("삭제하는 상품 이름", productName);
    const productSize = listItem.querySelector(".product_size").textContent;
    console.log("삭제하는 상품 사이즈", productSize);

    cartItems = cartItems.filter(
      (item) => !(item.name === productName && item.size === productSize)
    );

    const deleteItems = cartItems.filter(
      (item) => item.name === productName && item.size === productSize
    );
    // cartItems ==> 삭제하고 남은 전체 데이터
    // 로컬스토리지에서 바로 삭제하는 기능 **************************************************

    const keys = Object.keys(localStorage);

    console.log("키값입니다" + keys);

    // 특정 아이디 값
    const targetName = "상품7";
    const targetSize = "L";
    const targetId = 4;

    // 로컬 스토리지의 각 키에 대해 조건을 검사하여 해당 객체를 제거
    keys.forEach((key) => {
      const value = localStorage.getItem(key);
      // cart 전체가 들어오지 않을까..?
      console.log("*********************************** VALUE" + value);

      if (value) {
        const parsedValue = JSON.parse(value);
        if (
          parsedValue.name === targetName &&
          parsedValue.size === targetSize
        ) {
          localStorage.removeItem(key);
        }
      }
    });

    // 업데이트된 장바구니 데이터를 로컬 스토리지에 저장
    localStorage.setItem("cart", JSON.stringify(cartItems));

    console.log("상품 삭제하고 나서 카트 아이템 목록", cartItems);
  }
});

// 장바구니 전체 삭제 기능 추가
const removeAllButton = document.querySelector(".remove_all_button");
removeAllButton.addEventListener("click", function () {
  const orderInfo = document.getElementById("orderInfo");
  orderInfo.innerHTML = "";

  // 장바구니 데이터 초기화
  cartItems = [];
  localStorage.removeItem("cart");
});

// 총 상품 수량 계산
function calculateTotalQuantity() {
  const productNumElements = document.querySelectorAll(".product_num");
  let totalQuantity = 0;

  productNumElements.forEach((element) => {
    const quantity = parseInt(element.textContent);
    totalQuantity += quantity;
  });

  return totalQuantity;
}

// 총 상품 합계 계산
function calculateTotalPrice() {
  const productPriceElements = document.querySelectorAll(".product_price");
  const productNumElements = document.querySelectorAll(".product_num");
  let totalPrice = 0;

  productPriceElements.forEach((element, index) => {
    const priceText = element.textContent;
    const price = parseInt(priceText);
    const quantity = parseInt(productNumElements[index].textContent);
    const itemTotalPrice = price * quantity;
    totalPrice += itemTotalPrice;
  });

  console.log("총 가격: " + totalPrice);

  return totalPrice;
}

// 총 상품 수량 및 합계 업데이트
function updateTotalQuantityAndPrice() {
  const countElement = document.querySelector(".count");
  const priceElement = document.querySelector(".price");
  const deliverElement = document.querySelector(".deliver");
  const totalPriceElement = document.querySelector(".nav_total_price");

  const totalQuantity = calculateTotalQuantity();
  const totalPrice = calculateTotalPrice();
  const deliveryFee = 3000; // 배송비 설정

  const finalPrice = totalPrice + deliveryFee;

  countElement.textContent = totalQuantity.toString();
  priceElement.textContent = totalPrice.toString();
  deliverElement.textContent = deliveryFee.toString();
  totalPriceElement.textContent = finalPrice.toString();
}

// 수량 수정 시 총 상품 수량 및 합계 업데이트
// document.addEventListener("click", function (event) {
//   if (
//     event.target.classList.contains("product_remove") ||
//     event.target.classList.contains("product_add") ||
//     event.target.classList.contains("order_remove_button")
//   ) {
//     updateTotalQuantityAndPrice(); // 총 상품 수량 및 금액 업데이트
//   }
// });

function init() {
  updateTotalQuantityAndPrice();
}

init();
