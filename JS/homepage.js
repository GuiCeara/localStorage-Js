function tool(str, color) {
    let userTool = [str, color]
    toolJson = JSON.stringify(userTool)
    localStorage.setItem("tools", toolJson)
}

window.onload = () => {
    let userToken = JSON.parse(localStorage.getItem('token')) 
    let token = userToken[0]
    let userName = userToken[1]
    console.log(token, userName)
    if (!userToken) {
        window.location.href = '../index.html'
        tool('Token inexistente.', 'rgba(215,44,44,0.593)')
    }
}