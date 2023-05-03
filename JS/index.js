const user = document.getElementById('user')
const pass = document.getElementById('password')
const confirmPasswordInput = document.getElementById('confirmPassword')
const inputPic = document.querySelector('.pic')
let usersList = JSON.parse(localStorage.getItem('users')) || []
let dataList = JSON.parse(localStorage.getItem('data')) || []

if (usersList.length < 1) {
    const userExists = usersList.some(user => user.user !== '' && user.password !== '')
    if (!userExists) {
        const users = {
            user: "",
            password: ""
        }
        usersList.push(users)
        usersJson = JSON.stringify(usersList)
        localStorage.setItem("users", usersJson)
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
    }, 5000)
    alert_span.innerHTML = text
}

function gToken(userName) {

    let token = Math.random().toString(16).substring(2)
    let userToken = [token, userName]
    tokenJson = JSON.stringify(userToken)
    localStorage.setItem("token", tokenJson)
}

let button = document.getElementById('submit')
let buttonCad = document.getElementById('text-cad')
let buttonLog = document.getElementById('text-log')
let inputs_text = document.querySelector('.inputs-text')
let text = document.querySelector('.text')
let submit = document.getElementById('submitCad')
let pic = document.querySelector(".pic")
const inputFile = document.getElementById('input-img')


function addImage(userName) {
    return new Promise((resolve, reject) => {
        user.style.display = 'none'
        pass.style.display = 'none'
        confirmPasswordInput.style.display = 'none'
        text.innerHTML = 'Foto de Perfil'
        buttonLog.style.display = 'none'
        inputPic.style.display = 'flex'
        
        inputFile.addEventListener('change', function() {
        const reader = new FileReader()
        reader.readAsDataURL(inputFile.files[0])
        reader.onload = function() {
            const data = {
                image: reader.result,
                user: userName
            }
            // adicionar imagem
            pic.style.backgroundImage = `url('${reader.result}')`
            pic.style.color = 'white'

            dataList.push(data)
            dataJson = JSON.stringify(dataList)
            resolve(dataJson)
        }
        reader.onerror = function() {
             reject(reader.error)
        }})
    })
}

window.onload = () => {
    let userTool = JSON.parse(localStorage.getItem('tools'))
    if (userTool) {
        alerts(userTool[0], userTool[1])
        localStorage.removeItem('tools')
    }
}

button.addEventListener('click', () => {

    let userName = document.getElementById('user').value
    let userPassWord = document.getElementById('password').value

    if (userName == '' || userPassWord == '') {
        alerts('Preencha os campos!', 'rgba(215,44,44,0.593)')
    }else{
        if (buscar(userName, userPassWord, usersList, verifyN = 1) == true){
            alerts('Usuário Logado!', 'rgba(58, 215, 44, 0.593)')
            gToken(userName)
            window.location.href = './pages/homepage.html'
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
    confirmPasswordInput.value = ''
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
            if (buscar(userName, userPassWord, usersList, verifyN = 0) == false){
                
                addImage(userName).then(dataJson => {
                    let submitCad = document.getElementById('submitCad2')
                    submitCad.style.display = "block"
                    submit.style.display = "none"
                    submitCad.onclick = () => {
                    if(cadastrar(userName, userPassWord, usersList) == true){
                        localStorage.setItem("data", dataJson)
                        alerts('Usuário Cadastrado!', 'rgba(58, 215, 44, 0.593)')
                        gToken(userName)
                        window.location.href = './pages/homepage.html'
                    }
                    else{
                        window.location.href = '../index.html'
                    }}
                    
                }).catch(error => {
                    window.location.href = '../index.html'
                })
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




