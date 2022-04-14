import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    let startProgress = value * (100 / (steps - 1));
    this.elem = createElement(`
    <div class="slider">

    <!--Ползунок слайдера с активным значением-->
    <div class="slider__thumb" style="left: ${startProgress}%;">
      <span class="slider__value">${this.value}</span>
    </div>

    <!--Заполненная часть слайдера-->
    <div class="slider__progress" style="width: ${startProgress}%;"></div>

    <!--Шаги слайдера-->
    <div class="slider__steps">
    </div>
  </div>
    `);
    let sliderSteps = this.elem.querySelector('.slider__steps');
    let lastStep;
    for (let i = 0; i < this.steps; i++){
      if (i == this.value){
        sliderSteps.insertAdjacentHTML('beforeend','<span></span>')
        lastStep = sliderSteps.lastElementChild;
        lastStep.classList.add('slider__step-active');
      }
      else {
      sliderSteps.insertAdjacentHTML('beforeend','<span></span>')
      }
    }
    this.elem.addEventListener('click',(event) => {
      let leftClick = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = leftClick / this.elem.offsetWidth;
      let segments = steps - 1;
      let value = Math.round(leftRelative * segments);
      let valuePercents = value / segments * 100;
      
      for (let i = 0; i < this.steps; i++){
        if (i == value) {
          this.elem.querySelector('.slider__thumb').style.left = valuePercents + '%';
          this.elem.querySelector('.slider__progress').style.width = valuePercents + '%';
          this.elem.querySelector('.slider__value').textContent = value;
          lastStep.classList.remove('slider__step-active');
          lastStep = this.elem.querySelector('.slider__steps').children[value];
          lastStep.classList.add('slider__step-active');
        }
      }
      const sliderChange = new CustomEvent('slider-change', { 
        detail: value, 
        bubbles: true 
      })
      this.elem.dispatchEvent(sliderChange);
    });
    this.elem.addEventListener('slider-change',(event) => {
      return event.detail;
    });
  }
}
