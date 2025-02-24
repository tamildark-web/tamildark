const sliderContainer = document.querySelector('.slider-container');
const slideInfo = document.querySelector('.slide-info');

let currentSlide = 0;

function loadSlides() {
  fetch('data/movies.json')
    .then(response => response.json())
    .then(data => {
      data.forEach((movie, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.innerHTML = `<img src="${movie.poster}" alt="${movie.title}">`;
        sliderContainer.appendChild(slide);

        if (index === 0) {
          updateSlideInfo(movie);
        }
      });

      startSlider();
    });
}

function updateSlideInfo(movie) {
  slideInfo.querySelector('.movie-title').textContent = movie.title;
  slideInfo.querySelector('.release-date').textContent = `Release Date: ${movie.releaseDate}`;
  slideInfo.querySelector('.rating').textContent = '★'.repeat(Math.round(movie.rating));
  slideInfo.querySelector('.description').textContent = movie.description;
}

function startSlider() {
  const slides = document.querySelectorAll('.slide img');
  setInterval(() => {
    slides[currentSlide].style.opacity = 0;
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.opacity = 1;
    updateSlideInfo(movies[currentSlide]);
  }, 5000);
}

loadSlides();
