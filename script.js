document.getElementById("datePicker").addEventListener("change", function () {
  const selectedDateStr = this.value; // format: YYYY-MM-DD
  const selectedDate = new Date(selectedDateStr);
  const videoPath = `videos/${selectedDateStr}.mp4`;
  const videoSource = document.getElementById("videoSource");
  const videoPlayer = document.getElementById("videoPlayer");

  // Video loading
  fetch(videoPath, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        videoSource.src = videoPath;
        videoPlayer.load();
        videoPlayer.play();
      } else {
        alert("No video available for this date.");
      }
    })
    .catch(() => alert("Error fetching video for selected date."));

  // Countdown logic
  const countdownEl = document.getElementById("countdown");
  const startDate = new Date("2024-12-08");
  const endDate = new Date("2025-12-06");

  if (selectedDate < startDate || selectedDate > endDate) {
    countdownEl.textContent = "Countdown only runs from Crate Day 2024 to Crate Day 2025";
    return;
  }

  const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
  const daysSinceStart = Math.floor((selectedDate - startDate) / (1000 * 60 * 60 * 24));
  const countdownValue = totalDays - daysSinceStart;

  countdownEl.textContent = `Countdown: ${countdownValue} day${countdownValue !== 1 ? 's' : ''} remaining until Crate Day`;
});
