
const showSpinner = () => {
    const body = document.querySelector("body");

    const spinnerContainer = document.createElement("div")
    spinnerContainer.id = "spinner-container"
    const spinner = document.createElement("div")
    spinner.id = "spinner"

    spinnerContainer.appendChild(spinner)
    body.appendChild(spinnerContainer)
}

const hideSpinner = () => {
    const spinnerContainer = document.getElementById("spinner-container");
    spinnerContainer.remove();
}