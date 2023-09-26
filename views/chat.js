const message = document.getElementById('message');

const btn = document.getElementById('btn'); 

btn.addEventListener('click', sendMessage);

const token = localStorage.getItem('token')

window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get("http://localhost:3000/getallmessagaes", {
        headers: {
          "Authorization": token
        }
      });
      response.data.allMessages.forEach((ele) => {
        showMessages(ele)
      });
    } catch (err) {
      console.log(err);
    }
  });

async function sendMessage() {
    try {
        let messageobj = {
            message : message.value
        }
        const response = await axios.post("http://localhost:3000/message", messageobj,{headers : {"Authorization":token}});
        var container = document.getElementById('container');
        showMessages(messageobj)
    } catch (err) {
        console.log(err)
    }
}

async function showMessages(message){
    try {
        const sentMsg = document.createElement('div');
        sentMsg.id= 'sent';
        sentMsg.className='message sent';
        const newMsg = document.createElement('p');
        newMsg.className='message-text';
        newMsg.id='send';
        newMsg.innerHTML=`<strong>You: </strong>${message.message}`
        sentMsg.appendChild(newMsg);
        container.appendChild(sentMsg);
    } catch (err) {
        console.log(err);
    }
}