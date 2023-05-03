function tool(str, color) {
    let userTool = [str, color]
    toolJson = JSON.stringify(userTool)
    localStorage.setItem("tools", toolJson)
}

function buscarData(userName, dataList) {
    let result = false;
    dataList.forEach(i => {
        if(i.user == userName){
            result = i.image;
        }
    })
    return result;    
}

let userToken = JSON.parse(localStorage.getItem('token')) || []
let dataList = JSON.parse(localStorage.getItem("data")) || []
let usersList = JSON.parse(localStorage.getItem("users")) || []
let img = document.getElementById('img-profile')
let search = document.getElementById("search") 

token = userToken[0]
userName = userToken[1]
if (!userToken[0]) {
    window.location.href = '../index.html'
    tool('Usuário não logado.', 'rgba(215,44,44,0.593)')
}
let image = buscarData(userName, dataList)
img.style.backgroundImage = `url('${image}')`

search.addEventListener("keyup", () => {
    let result = false;
    console.log(search.value)
    // usersList.forEach(i => {
    //     if(i.user == search.value){
    //         result = 
    //     }
    // })
    // return result;   

    // expressões regulares!
    
})

