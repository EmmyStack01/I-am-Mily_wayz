window.addEventListener('load', () => {
  const buttons = document.querySelectorAll('.link-card');
  
  buttons.forEach((btn, index) => {
    // Add a slight delay for each subsequent button (staggering)
    setTimeout(() => {
      btn.classList.add('active');
    }, index * 100); // 100ms gap between each button
  });
});