$( document ).ready(function() {

    var socket = io()

    function init(){
        $.ajax({
            url: 'http://localhost:3000/api/users',
            type: 'GET',
            success: function(users) {
                users.map( (user) => {
                    status = user.status ? `<span style="color:green">Online</span> <button id="${user._id}" class="btn-user-location"> Ask location? </button>` : `<span style="color:red">Offline</span>`
                    $('.users').append(`<li id="user${user._id}">${user.name} (${user.role})  - ${status} </li>`)
                })
            },
            error: function(err){
                console.log(err)
            }
        });
    }



    $('.btn-login').click( () => {
        let user = {
            name: $('#login-name').val(),
        }

        $.ajax({
            type: "GET",
            url: `http://localhost:3000/api/users/login/${user.name}`,
            success: function(user){
                if(user.length >= 1){    
                    socket.emit('createRoom', user[0]);               
                    socket.emit('login', user[0])  
                    $(`.user-logueado`).html(`<span class="user-id">${user[0]._id}</span> - <span class="user-name">${user[0].name}</span> (<span class="user-role">${user[0].role}</span>)`).css("color","green")                                    
                    $('.login-form').hide()
                    $('.signup-form').hide()
                }else{
                    $('.login-error').text('Failed login!')
                }
                
            },
            error: function(err){
               console.log(err)
               $('.login-error').text('Failed login!')
            }
        });   
    })



    $('.btn-signup').click( (e) => {

        e.preventDefault()

        let user = {
            name: $('#name').val(),
            role: $('#role').val()
        }

        if(user.name != ""  && user.role != ""){
            $.ajax({
                type: "POST",
                url: 'http://localhost:3000/api/users/',
                data: user,
                success: function(user){
                    console.log(user)
                },
                error: function() {
                    $('.login-error').text('Failed sign up!')
                  }
            });   
        }else{
            $('.login-error').text('Failed sign up!')
        }
    })

    $('body').on('click', '.btn-user-location', function (event){
        let user ={
            id: $('.user-id').text(),
            name: $('.user-name').text(),
            role: $('.user-role').text(),
            room: event.target.id
        }
        if(user.id != ""){
            socket.emit('giveMeYourLocation', user)       
        }else{
            alert("you're not logueado! ")
        }

    });
 
    socket.on('newUser', (user) => {   
        status = '<span style="color:red">Offline</span>'
        $('.users').append(`<li id="user${user._id}" >${user.name} (${user.role}) - ${status} </li>`)
    });


    socket.on('newUserConnected', (user) => {
        $(`li#user${user._id}`).html(`${user.name} (${user.role})  - <span style="color:green">Online <button id="${user._id}" class="btn-user-location"> Ask location? </button></span>`)
    })

    socket.on('changeMyStatus', (user) => {
        $(`li#user${user._id}`).html(`${user.name} (${user.role})  - <span style="color:green">Online`)
    })    

    socket.on('userDisconnected', (user) => {
        $(`li#user${user._id}`).html(`${user.name} (${user.role})  - <span style="color:red">Offline</span>`)
    })

    socket.on('notifications', (notification) => {
        console.log(notification)
        $('.notifications').append(`<li>${notification}</li>`)
    })

    socket.on('test', (msg) => {
        console.log(msg)
        socket.emit('test', `${msg}`)
    })
    init();
});