document.addEventListener('DOMContentLoaded', () => {
    const username = document.querySelector('#get-username').innerHTML;

    // By default, submit button is disabled
    document.querySelector('#send_message').disabled = true;

    // Enable button only if there is text in the input field
    document.querySelector('#comment').onkeyup = () => {
        if (document.querySelector('#comment').value.length > 0)
            document.querySelector('#send_message').disabled = false;
        else
            document.querySelector('#send_message').disabled = true;
    };


    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure button
    socket.on('connect', () => {

        // Notify the server user has joined
        socket.emit('joined');
        

        // Forget user's last channel when clicked on '+ Channel'
        document.querySelector('#newChannel').addEventListener('click', () => {
            localStorage.removeItem('last_channel');
        });

        // When user leaves channel redirect to '/'
        document.querySelector('#leave').addEventListener('click', () => {

            // Notify the server user has left
            socket.emit('left');

            localStorage.removeItem('last_channel');
            window.location.replace('/');
        })

        // Forget user's last channel when logged out
        document.querySelector('#logout').addEventListener('click', () => {
            localStorage.removeItem('last_channel');
        });

        // 'Enter' key on textarea also sends a message
        // https://developer.mozilla.org/en-US/docs/Web/Events/keydown
        document.querySelector('#comment').addEventListener("keydown", event => {
            if (event.key == "Enter") {
                document.getElementById("send_message").click();
            }
        });
        
        // Send button emits a "message sent" event
        document.querySelector('#send_message').addEventListener("click", () => {
            

            // Save user input
            let msg = document.querySelector("#comment").value;

            socket.emit('send message', msg);
            
            // Clear input
            document.getElementById("comment").value = '';
            document.querySelector('#submit').disabled = true;

        });
    });
    
    // When user joins a channel, add a message and on users connected.
    socket.on('status', data => {

  
        // Broadcast message of joined user.
        let p = document.createElement('p');
        let br = document.createElement('br')
        p.setAttribute("class", "others-msg");
        p.innerHTML +=  data.msg + br.outerHTML 
  
        document.querySelector('#display-message-section').append(p) ;

        // Save user current channel on localStorage
        localStorage.setItem('last_channel', data.channel)

        

        scrollDownChatWindow(); 
    })

    // When a message is announced, add it to the textarea.
    socket.on('announce message', data => {
        const p = document.createElement('p');
        const span_username = document.createElement('span');
        const span_timestamp = document.createElement('span');
        const br = document.createElement('br')
        const i=document.createElement('i')
        if (data.user == username) {
            p.setAttribute("class", "my-msg");
            i.setAttribute("class","fa fa-archive hide")
            i.setAttribute("aria-hidden","true")

            // Username
            span_username.setAttribute("class", "my-username");
            span_username.innerText = data.user;

            // Timestamp
            span_timestamp.setAttribute("class", "timestamp");
            span_timestamp.innerText = data.timestamp;

            // HTML to append
            p.innerHTML += span_username.outerHTML + br.outerHTML + data.msg + br.outerHTML + span_timestamp.outerHTML+ br.outerHTML+i.outerHTML;

            //Append
            document.querySelector('#display-message-section').append(p);
    }
    // Display other users' messages
    else {

        p.setAttribute("class", "others-msg");
        i.setAttribute("class","fa fa-archive hide")
        i.setAttribute("aria-hidden","true")

        // Username
        span_username.setAttribute("class", "other-username");
        span_username.innerText = data.user;

        // Timestamp
        span_timestamp.setAttribute("class", "timestamp");
        span_timestamp.innerText = data.timestamp;

        // HTML to append
        p.innerHTML += span_username.outerHTML + br.outerHTML + data.msg + br.outerHTML + span_timestamp.outerHTML+ br.outerHTML+i.outerHTML;;

        //Append
        document.querySelector('#display-message-section').append(p);
    }

     // If hide button is clicked, delete the post.
     document.querySelector('.hide').onclick=(event)=>{
        const element = event.target;
      
        element.parentElement.remove();
      
        
     }
   


    scrollDownChatWindow(); 
    })
       // Scroll chat window down
       function scrollDownChatWindow() {
        const chatWindow = document.querySelector("#display-message-section");
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
    document.querySelector(".open-button").onclick=()=>{

        document.querySelector("#myForm").style.display = "block"
      }
      document.querySelector(".cancel").onclick=()=>{
        document.querySelector("#myForm").style.display = "none";
        }
    // Make sidebar collapse on click
    document.querySelector('#show-sidebar-button').onclick = () => {
        document.querySelector('#sidebar').classList.toggle('view-sidebar');
    };

  
  

    
});
