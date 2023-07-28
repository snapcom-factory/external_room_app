function logoutUser() {
    console.log("logout");
    fetch(`/logout`)
        .then(function () {
            document.location.href = "/";
        })
        .catch(function (error) {
            console.log(error);
        });
}


function setTheme(switching) {
    const app = document.querySelector("html")
    const icon = document.getElementById("themeSwitcher")
    let theme = window.localStorage.getItem("theme")
    console.log(theme)
    if (theme != "dark" && theme != "light") theme = "light"
    if (switching) {
        if (theme == "dark") {
            theme = "light";
            icon.classList.replace("bi-lightbulb-fill", "bi-lightbulb-off");
        } else if (theme == "light") {
            theme = "dark";
            icon.classList.replace("bi-lightbulb-off", "bi-lightbulb-fill");
        }
    }
    app.setAttribute("data-bs-theme", theme)
    window.localStorage.setItem("theme", theme)
}

window.onload = setTheme(false)

function goBack() {
    window.history.back()
}