"use strict";
const openModalBtn = document.getElementById('openModalBtn');
const customModal = document.getElementById('customModal');
const closeModalBtn = document.getElementById('closeModal');
const scrollBtn = document.getElementById('scrollBtn');
const postsContainer = document.getElementById('postsContainer');
// Open modal when button is clicked
openModalBtn === null || openModalBtn === void 0 ? void 0 : openModalBtn.addEventListener('click', () => {
    if (customModal) {
        customModal.style.display = 'block';
    }
});
// Close modal when X button is clicked
closeModalBtn === null || closeModalBtn === void 0 ? void 0 : closeModalBtn.addEventListener('click', () => {
    if (customModal) {
        customModal.style.display = 'none';
    }
});
// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === customModal) {
        if (customModal) {
            customModal.style.display = 'none';
        }
    }
});
// Show or hide scroll-to-top button based on scroll position
window.addEventListener('scroll', () => {
    if (scrollBtn) {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollBtn.style.display = 'block';
        }
        else {
            scrollBtn.style.display = 'none';
        }
    }
});
// Scroll smoothly to top when scroll button is clicked
scrollBtn === null || scrollBtn === void 0 ? void 0 : scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Fetch posts from JSONPlaceholder and render them into the posts container
function loadPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
        .then(response => response.json())
        .then((data) => {
        if (!postsContainer)
            return;
        postsContainer.innerHTML = '';
        data.forEach((post) => {
            const card = document.createElement('div');
            card.className = 'w3-third w3-margin-bottom';
            card.innerHTML = `
          <div class="w3-card-4">
            <div class="w3-container">
              <h3>${post.title}</h3>
              <p>${post.body}</p>
            </div>
          </div>
        `;
            postsContainer.appendChild(card);
        });
    })
        .catch((error) => {
        console.error('Error fetching posts:', error);
    });
}
// Load posts once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
});
