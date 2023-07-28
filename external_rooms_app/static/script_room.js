const initButton = document.getElementById("init-button");

initButton.addEventListener("click", initDevices);

async function deleteRoom(id) {
  await fetch(`/api/delete-room/${id}`)
    .catch(function (error) {
      console.log(error);
    }).then(function () {
      document.location.href = "/rooms";
    });
}

async function initRoom(id) {
  await fetch(`/api/init?id=${id}`)
    .catch(function (error) {
      console.log(error);
    }).then(res => console.log(res));
}

function initDevices() {
  if (confirm("Do you really want to initialize Cisco devices ?")) {
    fetch(`/api/init`)
      .then(function (response) {
        if (response.status === 200) {
          console.log("init devices button")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}