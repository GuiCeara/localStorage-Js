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
let search_box = document.getElementById("search-box")
let img_input = document.getElementById("img-profile")
let drop_down = document.getElementById("drop-down")
let exit_input = document.getElementById("exit-input")
let i = 1

function dropDown(drop_down, ) {
    
    drop_down.style.display = 'block'
    if (i == 2) {
        drop_down.style.display = "none"
        return i--
    }
    return i++
}

function searchUsers(usersList,search) {

    

   let filteredUsers = usersList.filter(user => user.user.includes(search))

    if (search != 0) {

        search_box.style.display = "block"
        result = ''

        if (search == "@@all") {

            usersList.forEach(user => {
            
                if(!user.user == "" && !user.password == ""){
                    image = buscarData(user.user, dataList)
                    result += `
                        <div class="search-result">
                            <div class="img-result" style="background-image: url(${image});"></div>
                            <label class="name-result">${user.user}</label>
                        </div>
                    `
                }
            })

        }

        filteredUsers.forEach(user => {
            
            if(!user.user == "" && !user.password == ""){
                image = buscarData(user.user, dataList)
                result += `
                    <div class="search-result">
                        <div class="img-result" style="background-image: url(${image});"></div>
                        <label class="name-result">${user.user}</label>
                    </div>
                `
            }
        })
        
        if(result != ""){
            search_box.innerHTML = result
        }else{
            search_box.style.display = 'none' 
        }
        
    
    }else{
        search_box.innerHTML = ""
        search_box.style.display = 'none'
    }

}

token = userToken[0]
userName = userToken[1]
if (!userToken[0]) {
    window.location.href = '../index.html'
    tool('Usuário não logado.', 'rgba(215,44,44,0.593)')
}
let image = buscarData(userName, dataList)
img.style.backgroundImage = `url('${image}')`

search.addEventListener("keyup", () => {
    searchUsers(usersList,search.value)
})

img_input.addEventListener("click", () => {
    dropDown(drop_down) 
    exit_input.onclick = () => {
        tool('Usuário deslogado.', 'rgba(58, 215, 44, 0.593)')
        localStorage.removeItem("token")
        window.location.href = '../index.html'
    }

})

document.addEventListener("click", (e) => {
    if (!drop_down.contains(e.target) && !drop_down.previousElementSibling.contains(e.target)) {
        drop_down.style.display = "none"
        return i--
    }

})





