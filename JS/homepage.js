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

function searchUsers(usersList,search) {

    let filteredUsers = usersList.filter(user => user.user.includes(search))
    let cont = 0
    search_box.style.display = "block"
    filteredUsers.forEach(user => {

        if(!user.user == "" && !user.password == ""){
            image = buscarData(user.user, dataList)
            search_box.innerHTML = `'
                <div class="search-result">
                    <div class="img-result" style="background-image: url(${image});"></div>
                    <label class="name-result">${user.user}</label>
                </div>
            '`
            


            // console.log(`\nResultado: ${cont+=1}\nUsuário: ${user.user}\nSenha: ${user.password}\n`)
        }
    });
  
    // let table = document.getElementById("user-table");
    // table.innerHTML = "";
  
    // filteredUsers.forEach(user => {
    //   let row = table.insertRow();
    //   let nameCell = row.insertCell(0);
    //   let emailCell = row.insertCell(1);
  
    //   nameCell.innerText = user.name;
    //   emailCell.innerText = user.email;
    // });
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



    // let result = false;
    // console.log(search.value)
    // // usersList.forEach(i => {
    // //     if(i.user == search.value){
    // //         result = 
    // //     }
    // // })
    // // return result;   

    // // expressões regulares!
    
})

