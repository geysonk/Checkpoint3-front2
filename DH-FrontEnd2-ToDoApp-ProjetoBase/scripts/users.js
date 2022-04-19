const userName = document.querySelector(".user-info p")
const logoutButton = document.getElementById("closeApp")

const getUserInfo = () => {
    fetch("https://ctd-todo-api.herokuapp.com/v1/users/getMe", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('jwt')
        }
    })
    .then( response => {
        return response.json()
    })
    .then( response => {
        console.log(response);
        userName.innerHTML = `${response.firstName} ${response.lastName}`
        return response
    })
    .catch( error => {
        console.log(error)
    })
}

onload = getUserInfo()

logoutButton.addEventListener("click", (event) => {
    event.preventDefault()
    localStorage.removeItem('jwt')
    window.location.href = "index.html"
})