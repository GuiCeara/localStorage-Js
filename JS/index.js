let button = document.getElementById('submit')
let buttonCad = document.querySelector('.text-cad')
let confirmPasswordInput = document.querySelector('#confirmPassword')
let inputs_text = document.querySelector('.inputs-text')
let text = document.querySelector('.text')
let text_cad = document.querySelector('.text-cad')
let submit = document.querySelector('#submitCad')

button.addEventListener('click', function menu() {
    
    let userName = document.getElementById('user').value
    let userPassWord = document.getElementById('password').value
    let usersList = JSON.parse(localStorage.getItem('users'))

    if (userName == '' || userPassWord == '') {
        alerts(text = 'Preencha os campos!', color = 'rgba(215,44,44,0.593)')
    }else{
        if (buscar(userName, userPassWord, usersList, verify = 1) == true){
            alerts(text = 'Usuário Logado!', color = 'rgba(58, 215, 44, 0.593)')
            // logar no site
        }
    }
    
})

buttonCad.addEventListener('click', () => {
    submit.addEventListener('click', () => {
        // terminar
    })
    submit.style.display = 'block'
    button.style.display = 'none'
    text.innerHTML = 'Cadastrar'
    text_cad.innerHTML = 'Logar-se'
    confirmPasswordInput.style.display = 'inline'
    inputs_text.style.marginTop = '100px'
    
})

function verify(userName, userPassWord, usersList) {
    if (!localStorage.getItem('users')){
        cadastrar(userName, userPassWord)
    }else{
        if (buscar(userName, userPassWord, usersList, verify = 0) == false){
            if(cadastrar(userName, userPassWord, usersList) == true){
                // logar no site
            }
        }
        else{
            const user = document.getElementById('user')
            const pass = document.getElementById('password')
            alerts(text = 'Usuário já existente', color = "rgba(215,44,44,0.593)")
            user.value = ''
            pass.value = ''
        }
    }
}

function cadastrar(userName, userPassWord, usersList = []) {

    const users = {
        user: userName,
        password: userPassWord
    }
    usersList.push(users)
    usersJson = JSON.stringify(usersList)
    localStorage.setItem("users", usersJson)
    return true
}

function buscar(userName, userPassWord, usersList, verify) {
    
    let user = usersList.find(i => i.user === userName)
    let userPass = usersList.find(i => i.password === userPassWord)
    if (verify == 0){
        if (user) {
            return true
        }
        return false

    }else if (verify == 1) {
        if (user && userPass){
            return true
        }
        return false
    }
}

function alerts(text, color) {

    let alert_div = document.querySelector('.alerts-span')
    let alert_span = document.querySelector('#span')
    alert_div.style.backgroundColor = color
    alert_div.style.display = 'block'
    setInterval(() => {
        alert_div.style.display = 'none'
    }, 2000)
    alert_span.innerHTML = text
}
