function showContent(contentId, clickedElement) {
      if (!clickedElement) return;

      // Reset all sections to default
      document.querySelectorAll('.live-sections div').forEach(section => {
        section.classList.remove('active');
        const centerContent = section.querySelector('.center-content');
        if (centerContent) {
          centerContent.classList.remove('active');
        }
      });

      // Set the clicked section and its inner content to active
      clickedElement.classList.add('active');
      const centerContent = clickedElement.querySelector('.center-content');
      if (centerContent) {
        centerContent.classList.add('active');
      }

      // Hide all content sections
      document.querySelectorAll('.content').forEach(content => {
        content.style.display = 'none';
      });

      // Show the selected content section
      const content = document.getElementById(contentId);
      if (content) {
        content.style.display = 'block';
      }
    }

    function updateMatchStatus() {
      const notices = document.querySelectorAll('.notice');
      notices.forEach(notice => {
        const startTime = new Date(notice.getAttribute('data-start'));
        const endTime = new Date(notice.getAttribute('data-end'));
        const now = new Date();
        const timerElem = notice.querySelector('.timer');
        
        if (timerElem) {
          if (now < startTime) {
            timerElem.innerText = formatNepaliTimeDifference(startTime - now);
            timerElem.classList.remove('blinking'); // Remove blinking effect
          } else if (now >= startTime && now <= endTime) {
            timerElem.innerText = 'Live Now';
            timerElem.classList.add('blinking'); // Add blinking effect
          } else {
            timerElem.innerText = 'Match Ended';
            timerElem.classList.remove('blinking'); // Remove blinking effect
          }
        }
      });

      // Update every second
      setTimeout(updateMatchStatus, 1000);
    }

    function formatNepaliTimeDifference(milliseconds) {
      const seconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      return `${days} days ${hours % 24} hours ${minutes % 60} minutes ${seconds % 60} seconds`;
    }

    document.addEventListener('DOMContentLoaded', () => {
      updateMatchStatus();
    });