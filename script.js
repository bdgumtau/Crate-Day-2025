const calendar = document.getElementById('calendar');
const videoSource = document.getElementById('videoSource');
const videoPlayer = document.getElementById('videoPlayer');
const selectedDate = document.getElementById('selected-date');
const errorMessage = document.getElementById('error-message');
const currentMonthText = document.getElementById('current-month');

let currentMonth = 11; // December 2024 = 11

const monthNames = [
  "December 2024", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

function loadCalendar(month) {
  calendar.innerHTML = "";
  currentMonthText.textContent = `${monthNames[month]} 2025`;

  const year = month === 0 ? 2025 : 2024;  // Start from December 2024
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Padding empty days
  for (let i = 0; i < firstDay.getDay(); i++) {
    const empty = document.createElement('div');
    calendar.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const div = document.createElement('div');
    div.className = 'date';
    div.textContent = day;
    div.dataset.date = dateStr;
    div.onclick = () => loadVideo(dateStr);
    calendar.appendChild(div);
  }
}

function loadVideo(date) {
  const path = `videos/${date}.mp4`;

  selectedDate.textContent = `Loading video for ${date}...`;
  errorMessage.textContent = "";
  videoPlayer.style.display = "none";

  fetch(path, { method: 'HEAD' })
    .then(res => {
      if (res.ok) {
        videoSource.src = path;
        videoPlayer.load();
        selectedDate.textContent = `Playing video for: ${date}`;
        videoPlayer.style.display = "block";
      } else {
        throw new Error("Video not found");
      }
    })
    .catch(() => {
      selectedDate.textContent = `No video available for: ${date}`;
      errorMessage.textContent = "This video is not available.";
      videoSource.src = "";
      videoPlayer.style.display = "none";
    });
}

function prevMonth() {
  if (currentMonth > 0) {
    currentMonth--;
    loadCalendar(currentMonth);
  }
}

function nextMonth() {
  if (currentMonth < 12) {
    currentMonth++;
    loadCalendar(currentMonth);
  }
}

// Initialize
loadCalendar(currentMonth);
