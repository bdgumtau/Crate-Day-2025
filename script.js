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

// Get the days in a month for a given year and month
function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Function to generate the full calendar
function generateCalendar() {
  let currentYear = startDate.getFullYear();
  let currentMonth = startDate.getMonth();
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let monthIndex = 0;
  let currentDate = new Date(currentYear, currentMonth, 8); // Start from 8th December 2024

  while (currentDate <= endDate) {
    const monthContainer = document.createElement('div');
    monthContainer.classList.add('calendar-month');

    const monthName = document.createElement('div');
    monthName.classList.add('month-name');
    monthName.textContent = `${months[monthIndex]} ${currentYear}`;
    monthContainer.appendChild(monthName);

    const daysInThisMonth = daysInMonth(currentYear, currentMonth);
    const monthDaysContainer = document.createElement('div');
    monthDaysContainer.classList.add('month-days');

    for (let day = 1; day <= daysInThisMonth; day++) {
      const dayButton = document.createElement('div');
      dayButton.textContent = day;

      // When a day is clicked, display the video
      dayButton.onclick = function () {
        const videoDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        playVideoForDate(videoDate);
      };

      monthDaysContainer.appendChild(dayButton);
    }

    monthContainer.appendChild(monthDaysContainer);
    calendarContainer.appendChild(monthContainer);

    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }

    currentDate.setMonth(currentMonth);
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
