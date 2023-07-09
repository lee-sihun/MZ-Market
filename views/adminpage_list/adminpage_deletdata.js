const deleteData = async (productId) => {
  const url = `http://localhost:3000/api/product/${productId}`;
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        authorization:token
      }
    });
    
    if (response.success) {
      console.log(response.message);
    } 
  } catch (error) {
    console.error(error);
  }
};

export default deleteData;


