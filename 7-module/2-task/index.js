import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    </div>
    `);
    
    this.modal.querySelector('.modal__close').addEventListener('click', this.close);
  }

  pressEscape = (event) => {
    if(event.code === 'Escape'){
      this.close();
    }
  }

  open(){
    document.body.append(this.modal);
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown',this.pressEscape);
  }
  setTitle(modalTitle){
    this.modal.querySelector('.modal__title').textContent = modalTitle;
  }
  setBody(modalBody){
    let mBody = this.modal.querySelector('.modal__body');
    mBody.innerHTML = '';
    mBody.append(modalBody);
  }
  close = () => {
    this.modal.remove();
    
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.pressEscape);
  }
}