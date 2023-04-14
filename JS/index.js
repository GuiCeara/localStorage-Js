let button = document.getElementById('submit')

button.addEventListener('click', () => {

    let userName = document.getElementById('user').value
    let userPassWord = document.getElementById('password').value
    
    if (!localStorage.getItem('users')){
        cadastrar(userName, userPassWord)
    }else{
        let usersList = JSON.parse(localStorage.getItem('users'))
        console.log(usersList)
        cadastrar(userName, userPassWord, usersList)
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

}