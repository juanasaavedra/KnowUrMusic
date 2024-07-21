document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('songs-container');

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const song = JSON.parse(localStorage.getItem(key));

        const songCard = document.createElement('div');
        songCard.className = 'song-card';
        songCard.innerHTML = ` 
        <div class="new-song">
        <img src="${song.albumPic}" alt="Album Picture">
        <h2>${song.name}</h2>
        <p>${song.author}</p>
        <a href="${song.link}" target="_blank" class="listen-button">Listen</a> 
        </div>
            
        `;

        container.appendChild(songCard);
    }
});

document.getElementById('showFormBtn').addEventListener('click', function() {
    document.getElementById('overlay').classList.add('show');
    document.getElementById('page1').classList.add('active');
});
document.getElementById('closeFormBtn').addEventListener('click', function() {
    document.getElementById('overlay').classList.remove('show');
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
});

document.querySelectorAll('.nextBtn').forEach(button => {
    button.addEventListener('click', function() {
        const currentPage = this.parentElement;
        const nextPageId = this.getAttribute('data-next');
        const nextPage = document.getElementById(nextPageId);

        currentPage.classList.remove('active');
        nextPage.classList.add('active');
    });
});

document.querySelectorAll('.prevBtn').forEach(button => {
    button.addEventListener('click', function() {
        const currentPage = this.parentElement;
        const prevPageId = this.getAttribute('data-prev');
        const prevPage = document.getElementById(prevPageId);

        currentPage.classList.remove('active');
        prevPage.classList.add('active');
    });
});
