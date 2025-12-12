import { Post } from '../types/post';

const postsContainer = document.getElementById('postsContainer') as HTMLElement | null;

export async function loadPosts(): Promise<void> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data: Post[] = await response.json();
    if (postsContainer) {
      // Display first three posts
      const posts = data.slice(0, 3);
      postsContainer.innerHTML = '';
      posts.forEach((post) => {
        const card = document.createElement('div');
        card.className = 'w3-third w3-margin-bottom';
        card.innerHTML = `
          <div class="w3-card w3-white">
            <div class="w3-container">
              <h3>${post.title}</h3>
              <p>${post.body}</p>
            </div>
          </div>
        `;
        postsContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error('Error loading posts', error);
  }
}
