function tool(str, color) {
    let userTool = [str, color]
    toolJson = JSON.stringify(userTool)
    localStorage.setItem("tools", toolJson)
}

function checkUser(user) {
    
}

function buscarData(userName, dataList) {
    let result = false;
    // console.log(userName)
    dataList.forEach(i => {
        if(i.user == userName){
            result = i.image;
        }
    })
    return result;    
}

let userToken = JSON.parse(localStorage.getItem('token')) || []
let dataList = JSON.parse(localStorage.getItem("data")) || []
let img = document.getElementById('img-profile')
let 
token = userToken[0]
userName = userToken[1]
// console.log(token, userName)
if (!userToken[0]) {
    window.location.href = '../index.html'
    tool('Usuário não logado.', 'rgba(215,44,44,0.593)')
}else{
    let image = buscarData(userName, dataList)
    img.style.backgroundImage = `url('${image}')`
}
