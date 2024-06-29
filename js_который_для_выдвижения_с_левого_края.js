document.addEventListener('DOMContentLoaded', function() {
    const description = document.getElementById('description_create_notes');
    const videoCard = document.getElementById('video_create');
    const triggerPoint = 900; // Порог для срабатывания анимации
  
    function checkScroll() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const descriptionOffset = description.offsetTop + triggerPoint;
      const videoCardOffset = videoCard.offsetTop + triggerPoint;
  
      if (scrollPosition >= descriptionOffset) {
        description.classList.add('slide-in-right');
        description.style.opacity = '1';
        description.style.transition = 'opacity 0.5s, transform 0.5s';
        videoCard.classList.add('slide-in-left');
        
      } else {
        description.classList.remove('slide-in-right');
        description.style.opacity = '0';
        description.style.transition = 'opacity 0.5s, transform 0.5s';
        videoCard.classList.remove('slide-in-left');
      }

    }
  
    window.addEventListener('scroll', checkScroll);
  });
  
