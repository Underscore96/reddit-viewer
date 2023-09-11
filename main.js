const subredditList = [
    'programming',
    'technology',
    'funny',
    'news',
    'gaming',
    'movies',
    'AskReddit',
    'worldnews',
    'aww',
    'pics'
];

const toolbar = document.getElementById('toolbar');
const postsContainer = document.getElementById('posts-container'); // Modifica l'id a "posts-container"


// Funzione per caricare i post da un subreddit
function loadPosts(subreddit) {
    fetch(`https://www.reddit.com/r/${subreddit}.json`)
        .then(response => response.json())
        .then(data => {
            postsContainer.innerHTML = ''; // Pulisci i post precedenti
            const posts = data.data.children;
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h2>${post.data.title}</h2>
                    <p>${post.data.selftext}</p>
                `;
                if (post.data.url && post.data.url.includes('.jpg')) {
                    const imgElement = document.createElement('img');
                    imgElement.src = post.data.url;
                    postElement.appendChild(imgElement);
                }

                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Errore nella richiesta API:', error);
        });
}

// Aggiungi pulsanti dei subreddit alla toolbar
subredditList.forEach(subreddit => {
    const button = document.createElement('button');
    button.textContent = subreddit;
    button.addEventListener('click', () => {
        loadPosts(subreddit);
    });
    toolbar.appendChild(button);
});

// Carica il primo subreddit all'avvio
if (subredditList.length > 0) {
    loadPosts(subredditList[0]);
}
