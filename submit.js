document.querySelector('.propose-song').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const songName = document.getElementById('song-name').value;
    const songAuthor = document.getElementById('song-author').value;
    const songLink = document.getElementById('song-link').value;

    console.log('Song Name:', songName);
    console.log('Song Author:', songAuthor);
    console.log('Song Link:', songLink);
    
    if (!songName || !songAuthor || !songLink) {
        console.log('All fields are required.');
        return;
    }

    const albumPicUrl = await getAlbumPic(songLink);

    if (albumPicUrl) {
        const songData = {
            name: songName,
            author: songAuthor,
            link: songLink,
            albumPic: albumPicUrl
        };

        console.log('Song Data:', songData);

        localStorage.setItem(songName, JSON.stringify(songData));
        window.location.href = './goth.html';
    } else {
        console.log('Failed to fetch album picture.');
    }
});

async function getAlbumPic(songLink) {
    const token = 'BQC-qQdiUg2PVoI53PPG5YDHtWwfFCG-BQTY6SIIVDU7g-69ylzKuuYwGFxQLfxLzeuqPM-IqpAw32Irhjl7avU5gjvPyu_V8M-Z-p0cR6mq_gKZb8N9Gsg_I2YFcemj_JxSHwSam-cD3bFtMVJYZj4to-8v35B-_XCcblLOkYMwzzpQi7XAzGtyRB3bhJoOeZoDdDDX2sFMV0mBY8oK1A'; // Replace with your Spotify API token
    const trackId = songLink.split('/track/')[1];

    if (!trackId) {
        console.log('Invalid Spotify link.');
        return null;
    }
    
    try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.log('Spotify API response error:', response.status);
            return null;
        }

        const data = await response.json();
        return data.album.images[0].url;
    } catch (error) {
        console.error('Error fetching album picture:', error);
        return null;
    }
}
