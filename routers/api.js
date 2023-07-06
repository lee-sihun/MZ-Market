const express = require("express");
const upload = require("../middlewares/multerconfig");
const router = express.Router();
const {
  register,
  login,
  updateUser,
  getUser,
  deleteUser,
} = require("../controller/user");
const {
  registerProduct,
  uploadImg,
  getAllProduct,
  getProductByName,
  updateProduct,
  deleteProduct
} = require("../controller/product");

router.post("/register", register); //회원 가입
router.post("/login", login); //로그인
router.post("/update_user", updateUser); //유저정보 수정
router.post("/get_user", getUser); //유저정보 조회
router.post("/delete_user", deleteUser); //회원 탈퇴
router.post("/registerProduct", registerProduct); //상품등록
// router.post("/uploadImg", uploadImg); //이미지 업로드
router.get("/getAllProduct", getAllProduct); //모든 상품 목록 가져오기
router.get("/getProductByName", getProductByName); //특정 상품의 상세 정보 가져오기
router.put("/updateProduct", updateProduct); //상품 업데이트
router.delete("/deleteProduct", deleteProduct); //상품 삭제

module.exports = router;