const message = document.getElementById('message');

const btn = document.getElementById('btn'); 

btn.addEventListener('click', sendMessage);

const token = localStorage.getItem('token')

async function sendMessage() {
    try {
        let messageobj = {
            message : message.value
        }
        const response = await axios.post("http://localhost:3000/message", messageobj,{headers : {"Authorization":token}});
        var container = document.getElementById('container');

        const sentMsg = document.createElement('div');
        sentMsg.id= 'sent';
        sentMsg.className='message sent';
        const newMsg = document.createElement('p');
        newMsg.className='message-text';
        newMsg.id='send';
        newMsg.innerHTML=`<strong>You:</strong>${message.value}`
        sentMsg.appendChild(newMsg);
        container.appendChild(sentMsg);
        
    } catch (err) {
        console.log(err)
    }
}