// Create a new room
createRoomBtn.addEventListener("click", async () => {
  username = usernameInput.value.trim();
  roomId = roomCodeInput.value.trim();
  if (!username) return showToast("You forgot your username.");

  if (!(await validateUsername(username))) return; // Validate username

  if (!roomId) {
    roomId = Math.random().toString(36).substring(2, 8); // Generate a random room code if not provided
  } else {
    // Check if the custom room code already exists
    const roomDoc = await getDoc(doc(db, "rooms", roomId));
    if (roomDoc.exists()) {
      return showToast("Room code already exists. Choose another one.");
    }
  }

  await setDoc(doc(db, "rooms", roomId), {});
  roomTitle.textContent = `${roomId}`;
  showChatSection();
  listenForMessages();
});