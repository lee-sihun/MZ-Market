const listpageBtn = document.querySelector("#listpageBtn");
const addpageBtn = document.querySelector("#addpageBtn");
const categoryBtn = document.querySelector("#categoryBtn");
const management = document.querySelector("#management");

//관리자 상품 목록 페이지 이동
listpageBtn.addEventListener("click", function () {
  window.location.href =
    "http://kdt-sw-5-team11.elicecoding.com/admin/products/list/";
});
//관리자 상품 추가 페이지 이동
addpageBtn.addEventListener("click", function () {
  window.location.href =
    "http://kdt-sw-5-team11.elicecoding.com/admin/products/add/";
});
//관리자 카테고리 페이지 이동
categoryBtn.addEventListener("click", function () {
  window.location.href =
    "http://kdt-sw-5-team11.elicecoding.com/admin/category/add";
});
//관리자 주문관리 페이지 이동
management.addEventListener("click", function () {
  window.location.href =
    "http://kdt-sw-5-team11.elicecoding.com/admin/order_history";
});
