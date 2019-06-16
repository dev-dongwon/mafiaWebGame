const inputIdBox = document.getElementById('inputId');

const checkIdAjax = () => inputIdBox.addEventListener('keyup', () => {
  const url = `http://localhost:3000/register/id?value=${inputIdBox.value}`;
  
  if (inputIdBox.value.length === 0) {
    document.getElementById('ajax-checkId').innerHTML = `<p>아이디를 입력해주세요</p>`;
    document.getElementById('ajax-checkId').style.color = 'red';
    return;
  }

  setTimeout(async () => {
    const response = await fetch(url);
    const ajaxTexst = await response.text();
    document.getElementById('ajax-checkId').innerHTML = ajaxTexst;
  }, 500);
})

// 비밀번호 정규표현식 매칭
const inputPassword = document.getElementById('inputPassword');
const checkPassword =  document.getElementById('checkPassword');

inputPassword.addEventListener('keyup', () => {
  const ajaxBox = document.getElementById('ajax-checkPassword');
  const isValid = isValidPassword();

  if (isValid) {
    ajaxBox.innerHTML = `<p>올바른 비밀번호입니다</p>`
  } else {
    ajaxBox.innerHTML = `<p>비밀번호는 4자리 이상입니다</p>`
  }
})

checkPassword.addEventListener('keyup', () => {
  const checkPasswordBox = document.getElementById('ajax-isValidPassword');
  const isValid = isSamePassword();

  if (isValid) {
    checkPasswordBox.innerHTML = `<p>비밀번호가 일치합니다</p>`
    checkPasswordBox.firstChild.style.color = 'cyan';
  } else {
    checkPasswordBox.innerHTML = `<p>비밀번호가 일치하지 않습니다</p>`
    checkPasswordBox.firstChild.style.color = 'red';
  }
})

const isSamePassword = () => {
  return inputPassword.value === checkPassword.value;
}

const isValidPassword = () => {
  const passwordReg = /(?=.{4,})/;
  return passwordReg.test(inputPassword.value);
}

const registerEvent = () => {
  checkIdAjax();
}

registerEvent();