const container = document.querySelector('.container');
const themeBtn = document.querySelector('.theme');

themeBtn.addEventListener('click', (e)=>{
    if(e.target.tagName === 'BUTTON'){
        const target = e.target;
        const shadowStyle = target.getAttribute('data-box-shadow')
        container.style.boxShadow = shadowStyle;
    }
})