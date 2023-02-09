const switchModeButton = document.getElementsByClassName("switch-mode")[0];
const logoutButton = document.getElementsByClassName("logout-button")[0];

switchModeButton.addEventListener("click", switchMode);
logoutButton.addEventListener("click", logoutUser);

if (window.localStorage.getItem("mode") === null) {
    window.localStorage.setItem("mode", "pull");
    switchStyleTo("pull")
} else {
    let currentMode = window.localStorage.getItem('mode');
    switchStyleTo(currentMode);
}

function switchMode() {
    let newMode = (window.localStorage.getItem('mode') === "pull") ? "push" : "pull";
    fetch(`/api/switch-mode/${newMode}`) //, {method:'POST'})
    .then( (response) => {
        if (response.status === 200) {
            window.localStorage.setItem("mode", newMode);
            switchStyleTo(newMode);
        } else {
            console.log(response);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function switchStyleTo(mode) {
    switchModeButton.innerHTML = mode.toLocaleUpperCase();
    if (mode === "pull") {
        switchModeButton.style.backgroundColor = "black";
        switchModeButton.style.color = "white";
    } else {
        switchModeButton.style.backgroundColor = "white";
        switchModeButton.style.color = "black";
    }
}

function logoutUser() {
    console.log("logout");
    fetch(`/logout`)
    .then(function() {
        document.location.href="/";
    })
    .catch(function (error) {
        console.log(error);
    });
}