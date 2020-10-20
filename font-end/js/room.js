const socket = io('http://127.0.0.1:3000/');
const slctelem = (s)=> document.querySelector(s);
let chatName = slctelem("#chat-name");
let onlines = slctelem("#onlines");
let msgs = slctelem("#msgs");
let msgBody = slctelem("#msg-body");
let sendBtn = slctelem("#send-btn");



let room = new URLSearchParams(document.location.search.substring(1)).get("room");
let username = window.localStorage.getItem('chat-username') || 'anonymous'
console.log(room);
chatName.textContent = room
socket.emit('join-room', {username, room});

socket.on('online', (users)=>{
  onlines.textContent =  users;
})

sendBtn.addEventListener('click', sendNewMsg)
msgBody.addEventListener('keyup', (e)=>{
  if(e.keyCode === 13){
    sendNewMsg();
  }
})

socket.on('new-msg', (msg)=>{
  appendMsg(msg);
})
socket.on('new-user', (msg)=>{
  appendMsg(msg)
})

function sendNewMsg() {
  if(msgBody.value.trim().length > 0){
    socket.emit('message', {username, body: `${msgBody.value}`});
    msgBody.value = ''
    msgBody.focus();
  }
}

function appendMsg(msg) {
  msgs.innerHTML += `
    <li><b>${msg.username}: </b>${msg.body}</li>
  `
  msgs.scrollTop = msgs.scrollHeight;
}
