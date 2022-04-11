import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = createElement(`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left ">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
       <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `);
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    ribbonInner.innerHTML = this.categories.map(item => { return `
     <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a> 
    `}).join('');

    let lastActivity = ribbonInner.querySelector('.ribbon__item');
    lastActivity.classList.add('ribbon__item_active');

    const buttonRight = this.elem.querySelector('.ribbon__arrow_right');
    const buttonLeft = this.elem.querySelector('.ribbon__arrow_left');

    function scrollRight(){
      ribbonInner.scrollBy(350, 0);
    }
    
    function scrollLeft(){
      ribbonInner.scrollBy(-350, 0);
    }
    function scrollCheck(){
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft == 0) {
        buttonLeft.classList.remove('ribbon__arrow_visible');
      } else {buttonLeft.classList.add('ribbon__arrow_visible')}

      if (scrollRight < 1) {
        buttonRight.classList.remove('ribbon__arrow_visible');
      } else {buttonRight.classList.add('ribbon__arrow_visible')}
    }
    buttonRight.addEventListener('click',scrollRight);
    buttonLeft.addEventListener('click',scrollLeft);

    ribbonInner.addEventListener('scroll',scrollCheck);

    

    this.elem.addEventListener('click',(event) => {
      event.preventDefault();
      
      if (event.target.tagName == 'A') {
        lastActivity.classList.remove('ribbon__item_active');
        event.target.classList.add('ribbon__item_active');
        lastActivity = event.target;
        
          const ribbonSelect = new CustomEvent('ribbon-select', { 
          detail: lastActivity.dataset.id, 
          bubbles: true 
        })
     
      this.elem.dispatchEvent(ribbonSelect);
      }
    });
    this.elem.addEventListener('ribbon-select',(event) => {
      return event.detail;
    });
  }
}
