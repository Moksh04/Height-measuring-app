function main() {
  window.addEventListener('deviceorientation', onOrientationChange);

  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: 'environment' } }) // enables the back camera on mobile devices
    .then((stream) => {
      // stream is the video feed provided by the camera
      const video = document.getElementById('video');
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => {
      console.error(err);
    });
}

function onOrientationChange(e) {
  let angle = e.beta - 90; // rotation around x axis, -90 degrees so that we start at zero orientation when phone is at 90deg with horizon in portrait mode

  angle = angle < 0 ? 0 : angle; // filtering negative values

  const dist = document.getElementById('dist-slider').value;

  document.getElementById(
    'dist-label'
  ).innerHTML = `Distance to Object: ${dist} meters`;
  const height = Math.tan(angle * (Math.PI / 180)) * dist; // converting to radians

  document.getElementById('height-info').innerHTML =
    height.toFixed(1) + ` m (${angle.toFixed(1)}&deg;)`;
}
