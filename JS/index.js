let button = document.getElementById('submit')
let userName = document.getElementById('user').value
let userPassWord = document.getElementById('password').value

button.addEventListener('click', () => {
    
    let userName = document.getElementById('user').value
    let userPassWord = document.getElementById('password').value
    
    if (!localStorage.getItem('users')){
        cadastrar(userName, userPassWord)
    }else{
        let usersList = JSON.parse(localStorage.getItem('users'))
        if (buscar(userName, userPassWord, usersList, verify = 0) == false){
            if(cadastrar(userName, userPassWord, usersList) == true){
                // logar no site
            }
        }
        else{
            alert('Nome já existente.')
        }
    }
})

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
            return true;
        }
        return false;

    }else if (verify == 1) {
        if (user && userPass){
            return true
        }
        return false
    }



}      
