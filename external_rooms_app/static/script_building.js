const deleteBuildingButton = document.getElementById("delete-building");

deleteBuildingButton.addEventListener("click", deleteBuilding);

function deleteBuilding() {
  let building_id = deleteBuildingButton.value;
  fetch(`/api/delete-building/${building_id}`)
    .catch(function (error) {
      console.log(error);
    }).then( function() {
      document.location.href="/";
  });
}