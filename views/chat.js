const message = document.getElementById("message");

const btn = document.getElementById("btn");

btn.addEventListener("click", sendMessage);

const token = localStorage.getItem("token");

let usernames = new Map()

let loggedUser;

window.addEventListener("DOMContentLoaded",pageLoaded);

setInterval(pageLoaded, 1000);

async function pageLoaded ()  {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3000/getallmessages", {
        headers: {
          Authorization: token,
        },
      });
      const users = await axios.get("http://localhost:3000/getusers", {
        headers: {
          Authorization: token,
        },
      });
  
       users.data.allUsers.forEach((users) => {
        showUsers(users);
        
        usernames.set(users.id,users.name)
      });
      loggedUser = response.data.id;
      response.data.allMessages.forEach((ele) => {
        showMessages(ele);
      });
  
      
    } catch (err) {
      console.log(err);
    }
  }

async function sendMessage() {
  try {
    let messageobj = {
      message: message.value,
    };
    const response = await axios.post(
      "http://localhost:3000/message",
      messageobj,
      { headers: { Authorization: token } }
    );

    showMessages(messageobj);
    message.value=''
  } catch (err) {
    console.log(err);
  }
}

async function showMessages(message) {

  try {
    var container = document.getElementById("container");
    if (message.userId == loggedUser|| message.userId==undefined) {
      const sentMsg = document.createElement("div");
      sentMsg.id = "sent";
      sentMsg.className = "message sent";
      const newMsg = document.createElement("p");
      newMsg.className = "message-text";
      newMsg.id = "send";
      newMsg.innerHTML = `<strong>You: </strong>${message.message}`;
      sentMsg.appendChild(newMsg);
      container.appendChild(sentMsg);
    }
     else {
        const recievedMsg = document.createElement("div");
      recievedMsg.id = "recieved";
      recievedMsg.className = "message received";
      const recMsg = document.createElement("p");
      recMsg.className = "message-text";
      recMsg.id = "recieve";
      recMsg.innerHTML = `<strong>${usernames.get(message.userId)}: </strong>${message.message}`;
      recievedMsg.appendChild(recMsg);
      container.appendChild(recievedMsg);
    }
  } catch (err) {
    console.log(err);
  }
}

async function showUsers(user) {
  const users = document.getElementById("users");

  const userList = document.createElement("ul");
  const userName = document.createElement("li");
  userName.innerHTML = `${user.name}<hr>`;
  userList.appendChild(userName);
  users.appendChild(userList);
}
