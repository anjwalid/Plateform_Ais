'get element by id' // Path: js/script.js 
var icon  = document.getElementById('bx bxs-show')
var field = document.getElementById('inputF') 
icon.addEventListener('click', function() {
    if(field.type === 'password') {
        field.type = 'text'
        icon.className = 'bx bxs-hide'
    } else {
        field.type = 'password'
        icon.className = 'bx bxs-show'
    }
} )
