const deleteRoomButton = document.getElementById("delete-room");
const initRoomButton = document.getElementById("init-room");

deleteRoomButton.addEventListener("click", deleteRoom);
initRoomButton.addEventListener("click", initRoom);


function deleteRoom() {
  let room_id = deleteRoomButton.value;
  fetch(`/api/delete-room/${room_id}`)
    .catch(function (error) {
      console.log(error);
    }).then( function() {
      document.location.href="/";
  });
}

function initRoom() {
  let room_id = initRoomButton.value;
  fetch(`/api/init?id=${room_id}`)
    .catch(function (error) {
      console.log(error);
    }).then( function() {
      document.location.href="/";
  });
}