function startChat() {
    hideElement('myForm')
    showElement('chat')
    

}

function showElement(form_type) {
    console.log(form_type)
    document.getElementById(form_type).style.display = "block";

}

function hideElement(form_type) {
    document.getElementById(form_type).style.display = "none";
}

document.getElementById('sendBtn').disabled = true

function controlBtn() {

    const inputvalue = document.getElementById('chatInput').value

    if (!inputvalue) {
        document.getElementById('sendBtn').disabled = true
    } else {
        document.getElementById('sendBtn').disabled = false
    }

}

function sendMessage() {

    const inputvalue = document.getElementById('chatInput').value

    document.getElementById("messages").appendChild(getMsgElement('user', inputvalue));

    document.getElementById('chatInput').value = ''
    document.getElementById('sendBtn').disabled = true

    scrollToBottom()

    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {

            console.log(data.slip.advice)

            document.getElementById("messages").appendChild(getMsgElement('client', data.slip.advice));
            scrollToBottom()
        });


    function getMsgElement(type, value) {

        const msgStyles = {
            textAlign: type === 'user' ? 'end' : 'left',
            classList: type === 'user' ? 'myMsg' : 'compMsg'
        }

        let msgContainer = document.createElement("div");

        msgContainer.style.textAlign = msgStyles.textAlign

        msgContainer.style.paddingTop = '10px'

        let msg = document.createElement("div")

        msg.classList.add('msg')

        msg.classList.add(msgStyles.classList)

        let textnode = document.createTextNode(value);

        msg.appendChild(textnode);

        msgContainer.appendChild(msg)

        return msgContainer

    }
    function scrollToBottom() {
     document.getElementById('messages').scrollTo(0,document.getElementById('messages').scrollHeight)
    }
}
function closeChat() {
    hideElement('myForm')
    hideElement('chat')
    showElement('chatTriggerBtn')
    hideElement('closeBtn')

}
function triggerChat() {
    showElement('myForm')
    hideElement('chatTriggerBtn')
    showElement('closeBtn')

}

