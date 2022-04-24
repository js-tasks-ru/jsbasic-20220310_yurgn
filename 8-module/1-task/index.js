import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
        
    if (document.body.offsetWidth > 767) {
      if(document.documentElement.scrollTop > 50){
        this.elem.style.position = 'fixed';
        this.elem.style.top = '50px';
        this.elem.style.zIndex = '1000';

        let cartPaddRight = document.documentElement.clientWidth - this.elem.getBoundingClientRect().right;
        if (cartPaddRight < 10){
          this.elem.style.left = Math.round(document.documentElement.clientWidth - this.elem.offsetWidth - 10) +'px';
        } else {
          let containerRight= Math.round( document.querySelector('.container').getBoundingClientRect().right);
          this.elem.style.left = containerRight + 20 + "px";
        }

      } else if (document.documentElement.scrollTop < 50){
          this.elem.style.position = '';
          this.elem.style.top = '';
          this.elem.style.zIndex = '';
          this.elem.style.left = '';
      }
    }
  }
}