const socket = io();

const usernameInput = document.getElementById("username");
const roomCodeInput = document.getElementById("room-code");
const createRoomBtn = document.getElementById("create-room-btn");
const joinRoomBtn = document.getElementById("join-room-btn");
const chatSection = document.getElementById("chat-section");
const authSection = document.getElementById("auth-section");
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const leaveRoomBtn = document.getElementById("leave-room-btn");
const roomTitle = document.getElementById("room-id");

let roomId;
let username;

createRoomBtn.addEventListener("click", () => {
  username = usernameInput.value.trim();
  if (!username) return alert("Enter your username");

  roomId = Math.random().toString(36).substring(2, 8);
  socket.emit('joinRoom', { username, room: roomId });
  roomTitle.textContent = roomId;
  authSection.style.display = "none";
  chatSection.style.display = "block";
});

joinRoomBtn.addEventListener("click", () => {
  username = usernameInput.value.trim();
  roomId = roomCodeInput.value.trim();
  if (!username || !roomId) return alert("Enter username and room code");

  socket.emit('joinRoom', { username, room: roomId });
  roomTitle.textContent = roomId;
  authSection.style.display = "none";
  chatSection.style.display = "block";
});

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;
  socket.emit('chatMessage', { room: roomId, username, message });
  messageInput.value = "";
}

leaveRoomBtn.addEventListener("click", () => {
  location.reload();
});

socket.on('message', (message) => {
  const msgEl = document.createElement("p");
  msgEl.textContent = message;
  chatBox.appendChild(msgEl);
  chatBox.scrollTop = chatBox.scrollHeight;
});