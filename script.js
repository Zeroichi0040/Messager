const usernames = ["Eagle", "Tiger", "Phoenix", "Wolf", "Lion", "Panther", "Falcon", "Bear"];
const chatContainer = document.getElementById("chat-container");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");
const usernameDisplay = document.getElementById("username-display");
const changeUsernameButton = document.getElementById("change-username");
const optionsButton = document.getElementById("options-button");
const optionsDropdown = document.getElementById("options-dropdown");
const devtoolsButton = document.getElementById("devtools-button");
const darkmodeButton = document.getElementById("darkmode-button");

let username = usernames[Math.floor(Math.random() * usernames.length)];
usernameDisplay.textContent = `Username: ${username}`;

const chatHistory = [];
let isDeveloper = false;

function addEditDeleteButtons(chatMessage, message) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    chatMessage.remove();
  });

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
    const newText = prompt("Edit message:", message);
    if (newText) {
      chatMessage.querySelector(".message").textContent = newText;
    }
  });

  chatMessage.appendChild(deleteButton);
  chatMessage.appendChild(editButton);
}

function addChatMessage(user, message) {
  const chatMessage = document.createElement("div");
  chatMessage.className = "chat-message";
  chatMessage.innerHTML = `<span class="username">${user}:</span> <span class="message">${message}</span>`;

  if (isDeveloper) {
    addEditDeleteButtons(chatMessage, message);
  }

  chatContainer.appendChild(chatMessage);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  chatHistory.push({ user, message });
}

function enableDeveloperTools() {
  document.querySelectorAll(".chat-message").forEach((chatMessage) => {
    const message = chatMessage.querySelector(".message").textContent;
    addEditDeleteButtons(chatMessage, message);
  });
}

function sendMessage() {
  const message = chatInput.value.trim();
  if (message) {
    addChatMessage(username, message);
    chatInput.value = "";
  }
}

sendButton.addEventListener("click", sendMessage);

chatInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

changeUsernameButton.addEventListener("click", () => {
  const newUsername = prompt("Enter your new username:", username);
  if (newUsername) {
    username = newUsername;
    usernameDisplay.textContent = `Username: ${username}`;
  }
});

optionsButton.addEventListener("click", () => {
  if (optionsDropdown.classList.contains("hidden")) {
    optionsDropdown.style.display = "flex";
    optionsDropdown.classList.remove("hidden");
  } else {
    optionsDropdown.style.display = "none";
    optionsDropdown.classList.add("hidden");
  }
});

darkmodeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

devtoolsButton.addEventListener("click", () => {
  const password = prompt("Enter password for developer access:");
  if (password === "gaynigga") {
    isDeveloper = true;
    enableDeveloperTools();
    alert("Developer access granted.");
  } else {
    alert("Incorrect password.");
  }
});
