import { putApi, deleteApi, getApi } from "http://localhost:3000/api.js";

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const passwordCheckInput = document.querySelector("#password-check");
const nameEditButton = document.querySelector(".name-edit");
const emailEditButton = document.querySelector(".email-edit");
const passwordEditButton = document.querySelector(".password-edit");
const deleteAccountButton = document.querySelector(".delete-account");
const order_history = document.querySelector(".order-history");

nameEditButton.addEventListener("click", editName);
emailEditButton.addEventListener("click", editEmail);
passwordEditButton.addEventListener("click", editPassword);
deleteAccountButton.addEventListener("click", deleteAccount);

// const getData = async () => {
//   const data = await getApi("http://localhost:3000/api/user");
//   console.log(data.user.email);
//   emailInput.placeholder = data.user.email;
// };

const data = await getApi("http://localhost:3000/api/user");
console.log(data.user.email);
emailInput.value = data.user.email;

async function editName() {
  const newName = nameInput.value;
  try {
    const response = await putApi("/edit-name", { name: newName });
    if (response) {
      alert("이름을 변경하였습니다.");
    } else {
      alert("이름 변경에 실패했습니다.");
    }
  } catch (error) {
    alert("이름 변경에 실패했습니다.:", error);
  }
}

async function editEmail() {
  const newEmail = emailInput.value;
  try {
    const response = await putApi("/edit-email", { email: newEmail });
    if (response) {
      alert("이메일이 변경되었습니다.");
    } else {
      alert("이메일변경에 실패하였습니다.");
    }
  } catch (error) {
    alert("이메일변경에 실패했습니다:", error);
  }
}

async function editPassword() {
  const newPassword = passwordInput.value;
  const newPasswordCheck = passwordCheckInput.value;

  if (newPassword !== newPasswordCheck) {
    alert("비밀번호가 일치하지 않습니다!");
    return;
  }

  try {
    const response = await putApi("/edit-password", { password: newPassword });
    if (response) {
      alert("비밀번호를 변경하였습니다.");
    } else {
      alert("비밀번호 변경에 실패하였습니다!");
    }
  } catch (error) {
    alert("비밀번호 변경에 실패하였습니다:", error);
  }
}

async function deleteAccount() {
  try {
    const response = await deleteApi("/delete-account");
    if (response) {
      alert("회원탈퇴 되었습니다.");
    } else {
      alert("회원탈퇴에 실패하였습니다!");
    }
  } catch (error) {
    alert("회원탈퇴에 실패하였습니다:", error);
  }
}

order_history.addEventListener("click", () => {
  getData();
});