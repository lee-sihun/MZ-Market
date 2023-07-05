const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const passwordCheckInput = document.querySelector('#password-check');
const nameEditButton = document.querySelector('.name-edit');
const emailEditButton = document.querySelector('.email-edit');
const passwordEditButton = document.querySelector('.password-edit');
const deleteAccountButton = document.querySelector('.delete-account');

nameEditButton.addEventListener('click', editName);
emailEditButton.addEventListener('click', editEmail);
passwordEditButton.addEventListener('click', editPassword);
deleteAccountButton.addEventListener('click', deleteAccount);

async function editName() {
  const newName = nameInput.value;
  try {
    const response = await fetch('/edit-name', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, //header에 jwt토큰 추가
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newName })
    });
    if (response.ok) {
      alert('이름을 변경하였습니다.');
    } else {
      alert('이름 변경에 실패했습니다.');
    }
  } catch (error) {
    alert('이름 변경에 실패했습니다.:', error);
  }
}

async function editEmail() {
  const newEmail = emailInput.value;
  try {
    const response = await fetch('/edit-email', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,//header에 jwt토큰 추가
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: newEmail })
    });
    if (response.ok) {
      alert('이메일이 변경되었습니다.');
    } else {
      alert('이메일변경에 실패하였습니다.');
    }
  } catch (error) {
    alert('이메일변경에 실패했습니다:', error);
  }
}

async function editPassword() {
  const newPassword = passwordInput.value;
  const newPasswordCheck = passwordCheckInput.value;

  if (newPassword !== newPasswordCheck) {
    alert('비밀번호가 일치하지 않습니다!');
    return;
  }

  try {
    const response = await fetch('/edit-password', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, //header에 jwt토큰 추가
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: newPassword })
    });
    if (response.ok) {
      alert('비밀번호를 변경하였습니다.');
    } else {
      alert('비밀번호 변경에 실패하였습니다!');
    }
  } catch (error) {
    alert('비밀번호 변경에 실패하였습니다:', error);
  }
}

async function deleteAccount() {
  try {
    const response = await fetch('/delete-account', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, //header에 jwt토큰 추가
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      alert('회원탈퇴 되었습니다.');
    } else {
      alert('회원탈퇴에 실패하였습니다!');
    }
  } catch (error) {
    alert('회원탈퇴에 실패하였습니다:', error);
  }
}
