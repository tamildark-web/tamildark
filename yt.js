const teaserContainer = document.querySelector('.teaser-container');

function loadTeasers() {
  fetch('data/yt.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(teaser => {
        const iframe = document.createElement('iframe');
        iframe.src = teaser.link;
        teaserContainer.appendChild(iframe);
      });
    });
}

loadTeasers();
