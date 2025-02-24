// Toggle menu for smaller screens
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Fetch and populate movie data
fetch('https://raw.githubusercontent.com/tamildark-web/json/refs/heads/main/movie.json')
  .then(response => response.json())
  .then(data => {
    const moviesGrid = document.querySelector('.movies-grid');
    const searchBox = document.getElementById('search-box');

    const renderMovies = (movies) => {
      moviesGrid.innerHTML = ''; // Clear existing movies
      movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.tabIndex = 0; // Make the card focusable for keyboard navigation
        movieCard.innerHTML = `
          <img src="${movie.poster}" alt="${movie.title}">
          <div class="movie-details">
            <h3>${movie.title}</h3>
            <p>${movie.year} • ${movie.duration}</p>
            <p>Rating: <span class="stars">${'★'.repeat(movie.rating)}</span></p>
            <div class="buttons">
              <a href="${movie.watchLink}" target="_blank">Watch</a>
              <a href="${movie.downloadLink}" target="_blank">Download</a>
            </div>
          </div>
        `;
        moviesGrid.appendChild(movieCard);

        // Show details on click for touch devices
        movieCard.addEventListener('click', () => {
          movieCard.classList.toggle('show-details');
        });
      });
    };

    // Initial render
    renderMovies(data);

    // Search functionality
    searchBox.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredMovies = data.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm)
      );
      renderMovies(filteredMovies);
    });
  })
  .catch(error => console.error('Error fetching movie data:', error));