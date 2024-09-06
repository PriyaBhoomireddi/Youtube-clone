const API_KEY = 'AIzaSyCQi-xJhS0WwGGNXpyE9vfiUfPippWOsUY';
const videoId = localStorage.getItem('videoId');
const videoContainer = document.getElementById('videoContainer');
const commentsContainer = document.getElementById('commentsContainer');

async function fetchVideoDetails() {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`);
    const data = await response.json();
    renderVideoDetails(data.items[0]);
}

function renderVideoDetails(video) {
    videoContainer.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${video.id}" allowfullscreen></iframe>
        <h2>${video.snippet.title}</h2>
        <p>${video.snippet.description}</p>
        <div class="statistics">
            <p>Likes: ${video.statistics.likeCount}</p>
            <p>Views: ${video.statistics.viewCount}</p>
        </div>
    `;
}

async function fetchComments() {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`);
    const data = await response.json();
    renderComments(data.items);
}

function renderComments(comments) {
    commentsContainer.innerHTML = ''; // Clear the container
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <p>${comment.snippet.topLevelComment.snippet.textOriginal}</p>
            <button onclick="fetchReplies('${comment.id}')">Show Replies</button>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

async function fetchReplies(commentId) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/comments?part=snippet&parentId=${commentId}&key=${API_KEY}`);
    const data = await response.json();
    // Render replies
}

window.onload = () => {
    fetchVideoDetails();
    fetchComments();
};
