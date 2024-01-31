const container = document.querySelector('.container');
const opBtns = document.querySelectorAll('.op');
const themeBtn = document.querySelector('.theme');
const tBtns = document.querySelectorAll('.tBtn');

themeBtn.addEventListener('click', (e)=>{
    if(e.target.tagName === 'BUTTON'){
        const target = e.target;
        const shadowStyle = target.getAttribute('data-box-shadow');
        const bgColorStyle = target.getAttribute('data-bgcolor');
        
        container.style.boxShadow = shadowStyle;
        opBtns.forEach((op)=>{
          op.style.backgroundColor = bgColorStyle;
        })
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