let inputIdBox = document.getElementById('inputId');
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

// todo : 비밀번호 정규표현식 매칭

const registerEvent = () => {
  checkIdAjax();
}

registerEvent();