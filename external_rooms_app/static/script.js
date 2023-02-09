const deleteDataButton = document.getElementById("delete-data");
const initButton = document.getElementById("init-button");

deleteDataButton.addEventListener("click", deleteData);
initButton.addEventListener("click", initDevices);

function deleteData() {
  if (confirm("Do you really want to delete the database ?")) {
    fetch(`/api/reset-bdd`)
      .catch(function (error) {
        console.log(error);
      }).then( function() {
        location.reload();
    });
  }
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