// Fetch and populate slider data
fetch('https://raw.githubusercontent.com/tamildark-web/json/refs/heads/main/slider.json')
  .then(response => response.json())
  .then(data => {
    const slidesContainer = document.querySelector('.slides');
    data.forEach(movie => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <div class="slide-info">
          <h3>${movie.title}</h3>
          <p>Release Date: ${movie.releaseDate}</p>
          <p>Rating: <span class="stars">${'★'.repeat(movie.rating)}</span></p>
          <p>${movie.description}</p>
        </div>
      `;
      slidesContainer.appendChild(slide);
    });

    // Auto slide functionality
    let currentSlide = 0;
    setInterval(() => {
      currentSlide = (currentSlide + 1) % data.length;
      slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 5000);
  })
  .catch(error => console.error('Error fetching slider data:', error));

// Toggle menu for smaller screens
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Explore Movies Button Functionality
const exploreButton = document.getElementById('explore-button');
const loadingAnimation = document.getElementById('loading-animation');

exploreButton.addEventListener('click', () => {
  // Show loading animation
  exploreButton.style.display = 'none';
  loadingAnimation.style.display = 'block';

  // Simulate a delay (e.g., 2 seconds) before redirecting
  setTimeout(() => {
    window.location.href = 'movies.html';
  }, 2000); // Adjust the delay as needed
});

