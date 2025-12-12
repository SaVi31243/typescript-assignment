import { initModal } from './modules/modal';
import { initScrollButton } from './modules/scrollButton';
import { loadPosts } from './modules/posts';

// Initialize all modules after the DOM has loaded
export function initApp(): void {
  initModal();
  initScrollButton();
  loadPosts();
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
