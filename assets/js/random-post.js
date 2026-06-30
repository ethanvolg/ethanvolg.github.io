/**
 * Random Post Navigation
 */

(function() {
    'use strict';

    async function fetchPosts() {
        try {
            const response = await fetch('/index.json');
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
    }

    function getRandomPost(posts) {
        if (posts.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * posts.length);
        return posts[randomIndex];
    }

    function initRandomPost() {
        const randomBtn = document.getElementById('random-post-btn');

        if (!randomBtn) {
            return;
        }

        randomBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            randomBtn.classList.add('loading');
            const textEl = randomBtn.querySelector('.random-text');
            const originalText = textEl.textContent;
            textEl.textContent = 'Loading...';
            randomBtn.disabled = true;

            try {
                const posts = await fetchPosts();

                if (posts.length === 0) {
                    textEl.textContent = 'No posts';
                    setTimeout(() => {
                        textEl.textContent = originalText;
                        randomBtn.classList.remove('loading');
                        randomBtn.disabled = false;
                    }, 2000);
                    return;
                }

                const randomPost = getRandomPost(posts);

                if (randomPost && randomPost.permalink) {
                    window.location.href = randomPost.permalink;
                } else {
                    textEl.textContent = 'Error';
                    setTimeout(() => {
                        textEl.textContent = originalText;
                        randomBtn.classList.remove('loading');
                        randomBtn.disabled = false;
                    }, 2000);
                }
            } catch (error) {
                console.error('Error getting random post:', error);
                textEl.textContent = 'Error';
                randomBtn.classList.remove('loading');
                randomBtn.disabled = false;
                setTimeout(() => {
                    textEl.textContent = originalText;
                }, 2000);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRandomPost);
    } else {
        initRandomPost();
    }
})();
