const { order } = require("../services/order");
const { product } = require("../services/product");
const jwt = require("jsonwebtoken");

// 주문 등록

const registerOrder = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      address,
      address2,
      comments,
      price,
      quantity,
      productId,
      productCount,
      productSize,
      // productColor,
    } = req.body;
    const decoded = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET
    );

    let productInfo = [];
    for (const [index, prId] of productId.entries()) {
      const getproduct = await product.getProductById(prId);
      const productChild = {
        productId: prId,
        productName: getproduct.name,
        productCount: productCount[index],
        productSize: productSize[index],
        // productColor: productColor[index],
        productPrice: getproduct.price,
        productImage: getproduct.images,
        index: index, // 인덱스 값을 변수에 추가
      };
      productInfo.push(productChild);
    }

    // console.log(productInfo);
    const orderId = await order.register({
      name,
      phoneNumber,
      address,
      address2,
      comments,
      status: "ready",
      price,
      quantity,
      email: decoded.email,
      productInfo,
    });
    res.json({
      success: true,
      message: "주문 등록에 성공했습니다.",
      orderId: orderId,
    });
    console.log(register);
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
    console.log(error);
  }
};

// 주문 정보 수정
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updatedInfo = req.body.productCount;
    const productId = req.body.productId;
    await order.update(orderId, updatedInfo, productId);

    res.json({
      success: true,
      message: "주문정보 업데이트에 성공했습니다.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

// 주문 정보 조회
const getAllOrders = async (req, res) => {
  try {
    const allOrders = await order.getAll();
    res.json({
      success: true,
      message: "주문정보를 조회했습니다.",
      orders: allOrders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
      orders: undefined,
    });
  }
};

// 이메일검색 주문 정보 조회
const getOrderByEmail = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    const orders = await order.getOrderByEmail(email, phoneNumber);

    res.json({
      success: true,
      message: "주문정보를 조회했습니다.",
      orders: orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
      orders: undefined,
    });
  }
};

// 이메일검색 주문 정보 조회
const getOrderUser = async (req, res) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET
    );
    // console.log(decoded);
    const orders = await order.getOrderUser(decoded.email);
    // console.log(orders);
    res.json({
      success: true,
      message: "주문정보를 조회했습니다.",
      orders: orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
      orders: undefined,
    });
  }
};

// 주문 삭제
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    await order.deleteOrder(orderId);

    res.json({
      success: true,
      message: "주문 삭제에 성공했습니다.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

//배송 상태 수정
const updateStatus = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const status = req.body.status;
    await order.updateStatus(orderId, status);

    res.json({
      success: true,
      message: "배송 상태를 업데이트 했습니다.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

module.exports = {
  registerOrder,
  updateOrder,
  getAllOrders,
  getOrderByEmail,
  deleteOrder,
  updateStatus,
  getOrderUser,
};
