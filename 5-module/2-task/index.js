function toggleText() {
  let button = document.querySelector(`.toggle-text-button`);
  button.onclick = function(){
    text.hidden === false ? text.hidden = true : text.hidden = false;}
  }
