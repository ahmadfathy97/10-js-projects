const slctelem = (s)=> document.querySelector(s);
let roomForm = slctelem("#room-form");
let roomName = slctelem("#room-name");
let username = slctelem("#username");
username.value = window.localStorage.getItem('chat-username') || '';
roomForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  window.localStorage.setItem('chat-username', username.value);
  setTimeout(()=>{
    window.location.href = `/rooms/?room=${roomName.value}`
  }, 1500)
})
