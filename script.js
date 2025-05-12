document.getElementById("datePicker").addEventListener("change", function () {
  const selectedDate = this.value; // format: YYYY-MM-DD
  const videoPath = `videos/${selectedDate}.mp4`;
  const videoSource = document.getElementById("videoSource");
  const videoPlayer = document.getElementById("videoPlayer");

  fetch(videoPath, { method: 'HEAD' }) // Check if the video exists
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
});
