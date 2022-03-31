function initCarousel() {
  const buttonRight = document.querySelector('.carousel__arrow_right');
  const buttonLeft = document.querySelector('.carousel__arrow_left');
  const carousel = document.querySelector('.carousel__inner');
  let transWidth = 0;
  let quantitySlides = document.querySelectorAll('.carousel__slide').length;
  buttonLeft.style.display = 'none';

  function scrollRight(){
    transWidth += carousel.offsetWidth; 
    carousel.style.transform = `translateX(-${transWidth}px)`;
    console.log(buttonLeft.style.display);

    if (transWidth == ((quantitySlides - 1) * carousel.offsetWidth)){
      buttonRight.style.display = 'none';
    }
    if (buttonLeft.style.display == 'none') {buttonLeft.style.display = '';}
  }
  function scrollLeft(){
    transWidth -= carousel.offsetWidth; 
    carousel.style.transform = `translateX(-${transWidth}px)`;
    

    if (transWidth == 0 ) {
      buttonLeft.style.display = 'none';
    }
    if (buttonRight.style.display == 'none') {buttonRight.style.display = '';}
  }
  buttonRight.addEventListener('click',scrollRight);
  buttonLeft.addEventListener('click',scrollLeft);
}
