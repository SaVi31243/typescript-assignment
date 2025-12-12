const openModalBtn = document.getElementById('openModalBtn') as HTMLElement | null;
const customModal = document.getElementById('customModal') as HTMLElement | null;
const closeModalBtn = document.getElementById('closeModal') as HTMLElement | null;

export function initModal(): void {
  openModalBtn?.addEventListener('click', () => {
    if (customModal) {
      customModal.style.display = 'block';
    }
  });

  closeModalBtn?.addEventListener('click', () => {
    if (customModal) {
      customModal.style.display = 'none';
    }
  });

  window.addEventListener('click', (event: MouseEvent) => {
    if (event.target === customModal) {
      if (customModal) {
        customModal.style.display = 'none';
      }
    }
  });
}
