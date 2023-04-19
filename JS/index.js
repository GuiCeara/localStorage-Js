let usersList = JSON.parse(localStorage.getItem('users')) || []
const user = document.getElementById('user')
const pass = document.getElementById('password')
const confirmPasswordInput = document.getElementById('confirmPassword')

function verify(userName, userPassWord, usersList) {
    if (usersList.length === 0){
        cadastrar(userName, userPassWord, usersList)
    }else{
        if (buscar(userName, userPassWord, usersList, verifyN = 0) == false){
            if(cadastrar(userName, userPassWord, usersList) == true){
                return true
            }
            else{
                return false
            }
        }
        else{
            return false
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

function buscar(userName, userPassWord, usersList, verifyN) {
    
    let user = usersList.find(i => i.user === userName)
    let userPass = usersList.find(i => i.password === userPassWord)
    if (verifyN == 0){
        if (user) {
            return true
        }
        return false

    }else if (verifyN == 1) {
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
    }, 3000)
    alert_span.innerHTML = text
}

let button = document.getElementById('submit')
let buttonCad = document.getElementById('text-cad')
let buttonLog = document.getElementById('text-log')
let inputs_text = document.querySelector('.inputs-text')
let text = document.querySelector('.text')
let submit = document.getElementById('submitCad')

button.addEventListener('click', () => {

    let userName = document.getElementById('user').value
    let userPassWord = document.getElementById('password').value

    if (userName == '' || userPassWord == '') {
        alerts('Preencha os campos!', 'rgba(215,44,44,0.593)')
    }else{
        if (buscar(userName, userPassWord, usersList, verifyN = 1) == true){
            alerts('Usuário Logado!', 'rgba(58, 215, 44, 0.593)')
            // logar no site
        }else{
            alerts('Usuário ou senha incorretos...', 'rgba(215,44,44,0.593)')
        }
    }
    
})

buttonCad.addEventListener('click', () => {

    submit.style.display = 'block'
    button.style.display = 'none'
    buttonLog.style.display = 'block'
    buttonCad.style.display = 'none'
    text.innerHTML = 'Cadastrar'
    confirmPasswordInput.style.display = 'inline'
    inputs_text.style.marginTop = '100px'
    user.value = ''
    pass.value = ''

})

buttonLog.addEventListener('click', () => {

    submit.style.display = 'none'
    button.style.display = 'block'
    buttonLog.style.display = 'none'
    buttonCad.style.display = 'block'
    text.innerHTML = 'Login'
    confirmPasswordInput.style.display = 'none'
    user.value = ''
    pass.value = ''

})

submit.addEventListener('click', () => {

    let userName = document.getElementById('user').value
    let userPassWord = document.getElementById('password').value
    let confirmPassword = confirmPasswordInput.value

    if (userName == '' || userPassWord == '' || confirmPassword == '') {
        alerts('Preencha os campos!', 'rgba(215,44,44,0.593)')
    }
    else{
        if (pass.value !== confirmPasswordInput.value) {
            alerts('As senhas não correspondem.', 'rgba(215,44,44,0.593)')
        } 
        else {
            if (verify(userName, userPassWord, usersList) == true) {
                alerts('Usuário Cadastrado!', 'rgba(58, 215, 44, 0.593)')
            }
            else{
                alerts('Usuário já existente', 'rgba(215,44,44,0.593)')
                confirmPasswordInput.value = ''
                user.value = ''
                pass.value = ''
            }
        }
    }
})




