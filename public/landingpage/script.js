var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 500) || 500;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};
const carouselItems = document.querySelector('.carousel-items');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');
const itemWidth = carouselItems.querySelector('img').clientWidth;
const itemsPerPage = 3; // Change this value to adjust the number of items per page
let currentPage = 0;

carouselPrev.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    carouselItems.style.transform = `translateX(${-currentPage * itemWidth * itemsPerPage}px)`;
  } else {
    currentPage = Math.ceil(carouselItems.children.length / itemsPerPage) - 1;
    carouselItems.style.transform = `translateX(${-currentPage * itemWidth * itemsPerPage}px)`;
  }
});

carouselNext.addEventListener('click', () => {
  if (currentPage < Math.ceil(carouselItems.children.length / itemsPerPage) - 1) {
    currentPage++;
    carouselItems.style.transform = `translateX(${-currentPage * itemWidth * itemsPerPage}px)`;
  } else {
    currentPage = 0;
    carouselItems.style.transform = `translateX(0)`;
  }
});




