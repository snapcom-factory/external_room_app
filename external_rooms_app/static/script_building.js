async function deleteBuilding(id) {
  await fetch(`/api/delete-building/${id}`)
    .catch(function (error) {
      console.log(error);
    }).then(function () {
      document.location.href = "/buildings";
    });
}