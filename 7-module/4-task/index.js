import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    let startProgress = value * (100 / (steps - 1));

    this.elem = createElement(`
    <div class="slider">
      <div class="slider__thumb" style="left: ${startProgress}%;">
        <span class="slider__value">${this.value}</span>
      </div>
    <div class="slider__progress" style="width: ${startProgress}%;"></div>
    <div class="slider__steps"></div>
    </div>
    `);

    this.thumb = this.elem.querySelector('.slider__thumb');
    this.sliderValue = this.elem.querySelector('.slider__value');
    this.progress = this.elem.querySelector('.slider__progress');
    this.sliderSteps = this.elem.querySelector('.slider__steps');
    this.lastStep;

    this.createSliderSteps ();
    this.addDnD ();
    this.clickSlide();
  }

  createSliderSteps (){
    for (let i = 0; i < this.steps; i++){
      if (i == this.value){
        this.sliderSteps.insertAdjacentHTML('beforeend','<span></span>')
        this.lastStep = this.sliderSteps.lastElementChild;
        this.lastStep.classList.add('slider__step-active');
      }
      else {
      this.sliderSteps.insertAdjacentHTML('beforeend','<span></span>')
      }
    }
  }
    clickSlide (){
      this.elem.addEventListener('click',(event) => {
        let leftClick = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = leftClick / this.elem.offsetWidth;
        let segments = this.steps - 1;
        let value = Math.round(leftRelative * segments);
        let valuePercents = value / segments * 100;
        
        for (let i = 0; i < this.steps; i++){
          if (i == value) {
            this.thumb.style.left = valuePercents + '%';
            this.progress.style.width = valuePercents + '%';
            this.sliderValue.textContent = value;
            this.lastStep.classList.remove('slider__step-active');
            this.lastStep = this.elem.querySelector('.slider__steps').children[value];
            this.lastStep.classList.add('slider__step-active');
          }
        }
        const sliderChange = new CustomEvent('slider-change', { 
          detail: value, 
          bubbles: true 
        })
        this.elem.dispatchEvent(sliderChange);
      });
  }
    addDnD(){
    this.thumb.ondragstart = () => false;

    this.thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.thumb.closest('.slider').classList.add('slider_dragging');
      
      document.addEventListener('pointermove',this.thumbMove);
      document.addEventListener('pointerup',(event) => {
        event.preventDefault();
        let value = +this.sliderValue.textContent;
        let valuePercents = value / (this.steps - 1) * 100;

        this.thumb.style.left = valuePercents + '%';
        this.progress.style.width = valuePercents + '%';
        this.thumb.closest('.slider').classList.remove('slider_dragging');
        document.removeEventListener('pointermove',this.thumbMove);

        const sliderChange = new CustomEvent('slider-change', { 
          detail: value, 
          bubbles: true 
        })
        this.elem.dispatchEvent(sliderChange);
      })
      });
    }

    thumbMove = (event) => {
      let segments = this.steps - 1;
      let leftClick = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = leftClick / this.elem.offsetWidth;
      let percent = leftRelative * 100;
      let value = Math.round(leftRelative * segments);
            
      if (percent >= 0 && percent <= 100){
      this.thumb.style.left = percent + '%';
      this.progress.style.width = percent + '%';

      this.sliderValue.textContent = value;
      this.lastStep.classList.remove('slider__step-active');
      this.lastStep = this.elem.querySelector('.slider__steps').children[value];
      this.lastStep.classList.add('slider__step-active');
      }
    }
}
