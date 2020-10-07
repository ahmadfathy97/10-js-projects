const video = document.getElementById('video');
let marksBtn = document.getElementById('marks-btn');
let marks = true;
let msg = document.getElementById('msg');
let vidCntnr = document.querySelector('.vid-container');

marksBtn.addEventListener('change', (e)=>{
  console.log(555);
  if(e.target.checked){
    marks = true;
  } else{
    marks = false;
  }
})

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('../models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('../models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('../models'),
  faceapi.nets.faceExpressionNet.loadFromUri('../models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}
let smileMsgs = ['yeah, keep this smile ☺', 'Great smile', 'you have a very nice smile', 'I love your smile', 'don\'t let anyone remove this smile ♥'];
video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  vidCntnr.append(canvas)
  const displaySize = { width: vidCntnr.offsetWidth, height: video.offsetHeight }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    if(detections[0] && detections[0].expressions){
      if(detections[0].expressions.happy > .7){
        let ranMsg = smileMsgs[Math.floor(Math.random() * smileMsgs.length)]
        msg.textContent = ranMsg;
      } else if(detections[0].expressions.sad > .5){
        msg.textContent = 'don\'t be sad because that makes me sad too :(';
      }
    }
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    if(marks){
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }
  }, 800)
})
