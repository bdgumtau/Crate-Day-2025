// scripts.js
const countdownElement = document.getElementById('countdown-days');
const videoElement = document.getElementById('video');
const calendarContainer = document.querySelector('.calendar');

// Get the start date and end date
const startDate = new Date('2024-12-08');
const endDate = new Date('2025-12-08');

// Function to update the countdown timer
function updateCountdown() {
  const currentDate = new Date();
  const timeDifference = endDate - currentDate;
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  countdownElement.textContent = daysRemaining;
}

// Function to generate the calendar days
function generateCalendar() {
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const currentMonth = startDate.getMonth();
  const currentYear = startDate.getFullYear();

  const totalDays = daysInMonth(currentYear, currentMonth);
  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dateButton = document.createElement('div');
    dateButton.textContent = day;

    // When a day is clicked, display a video
    dateButton.onclick = function () {
      const videoDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      playVideoForDate(videoDate);
    };
    calendarContainer.appendChild(dateButton);
  }
}

// Function to display the video for the selected date
function playVideoForDate(date) {
  const videoUrl = `videos/${date}.mp4`; // Assuming video file names are based on date (e.g., 2024-12-08.mp4)
  
  if (videoElement) {
    videoElement.src = videoUrl;
    videoElement.style.display = 'block';
    videoElement.play();
  }
}

// Initialize the page
function initPage() {
  updateCountdown();
  generateCalendar();
  setInterval(updateCountdown, 1000 * 60 * 60); // Update countdown every hour
}

initPage();
