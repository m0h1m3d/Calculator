const container = document.querySelector('.container');
const themeBtn = document.querySelector('.theme');
const tBtns = document.querySelectorAll('.tBtn');

themeBtn.addEventListener('click', (e)=>{
    if(e.target.tagName === 'BUTTON'){
        const target = e.target;
        const shadowStyle = target.getAttribute('data-box-shadow')
        container.style.boxShadow = shadowStyle;
    }
})

tBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
      button.classList.add('clicked');
      setTimeout(function(){
        button.classList.remove('clicked');
      }, 200)
    })
})