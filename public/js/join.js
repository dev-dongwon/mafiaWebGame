const checkReg = {
  // 대문자 또는 소문자로 시작하고 5자에서 15자 이하
  id: /^[A-za-z]{5,15}/g,
}

let inputIdBox = document.getElementById('inputId');

inputIdBox.addEventListener('keyup', async () => {
  const url = `http://localhost:3000/register/id?value=${inputIdBox.value}`;
  
  try {
    const response = await fetch(url);
    const result = await response.text();
    document.getElementById('ajax-checkId').innerHTML = result;

  } catch (error) {
    console.error(error.message);    
  }
  
})