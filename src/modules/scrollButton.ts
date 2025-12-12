const scrollBtn = document.getElementById('scrollBtn') as HTMLElement | null;

export function initScrollButton(): void {
  window.addEventListener('scroll', () => {
    if (scrollBtn) {
      if (window.scrollY > 200) {
        scrollBtn.style.display = 'block';
      } else {
        scrollBtn.style.display = 'none';
      }
    }
  });

  scrollBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
