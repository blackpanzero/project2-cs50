# Project 2

Web Programming with Python and JavaScript

My project is a messaging service using Flask,javacript and socketio.
Users can log in to the site using a unique display name
Users can join available rooms or make new room
After joining a room users can receive and send messages to each other in realtime(without the need to reload) 

There are a number of files contained in my project:

signin.html-This is where a user enters their unique displayname.If the username entered is already in use,an error page pops up to inform them to enter a different name.The name is then saved in a list in the application.py file.

index.html-The user is taken to a page where he is required to either join an existing room or create a new one.If the name of the room exists,they are prompted to enter a different name.If a user chooses to create a new room,the room name is saved in a list in the application.py page and the user is taken to the created page.If the user wants to join an existing room,they click on the displayed list of available rooms and are taken to a new page where they can communicate inside the room.

channel.html-This is where the users are able to communicate with each other in realtime.Using socketio and javascript,a socket is opened that allows bidirectional between the users.The available rooms are also displayed and can be clicked to join the rooms.Users can also create new rooms in this template.Additionally,a list on active users is displayed so as to inform the user the members that are online at the time.The message field cannot be blank.Users can also leave a room by clicking 'leave room' and they will be redirected to the index.html page.users can also logout from the site.
When you close the browser and open a new one, the browser remembers the page that you were in and redirects you accordingly. 

application.py-contains the server-side code for template rendering and communication with the client through socketio.The flask server stores a list of users and channels(rooms) and a dictionary of the messeges.The lists are appended to when there is a new user,new message or new room.Socketio allows messeges to be sent and received in realtime through specifying the events.

channel.js-Contains the client-side code and has a number of eventlisteners that communicate emit data to the server for realtime feedback.



                                        PERSONAL TOUCH


Online users
Users are able to view other users that are currently logged into the site.I used the list stored in the server to display the list to the channel.html page using jinger.The setback is that it requirs reload to update the number of online users.In futer I will use the same concept of sending messeges using socketio for realtime user-list updates.Also the list shows all the users logged in and not those in the various rooms.

Automatic Scroll Down
When a new messege pops up in the user's window,it automatically scrolls down.I created a javascript function that users the concepts of scrollheight and scrolltop to make this possible.

Deleting of messeges
A user can delete ones' own messeges or that of others.I used an onclick function that removes the parent element when the delete icon is clicked.The drowback of this is that the messege is only deleted on the client side and not the server side hence on refresh,the deleted messege is still available.



