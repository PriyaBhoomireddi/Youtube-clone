const API_KEY = 'AIzaSyCQi-xJhS0WwGGNXpyE9vfiUfPippWOsUY';
const videoContainer = document.getElementById('videoContainer');

async function fetchVideos(searchQuery = '') {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchQuery}&key=${API_KEY}`);
    const data = await response.json();
    renderVideos(data.items);
}

function renderVideos(videos) {
    videoContainer.innerHTML = ''; // Clear the container
    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.className = 'video-item';
        videoElement.innerHTML = `
            <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
            <h3>${video.snippet.title}</h3>
        `;
        videoElement.onclick = () => {
            localStorage.setItem('videoId', video.id.videoId);
            window.location.href = 'videoDetails.html';
        };
        videoContainer.appendChild(videoElement);
    });
}

document.getElementById('searchButton').addEventListener('click', () => {
    const searchQuery = document.getElementById('searchInput').value;
    fetchVideos(searchQuery);
});

window.onload = () => {
    fetchVideos(); 
};
