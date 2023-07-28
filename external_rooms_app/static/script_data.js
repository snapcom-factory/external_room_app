function deleteData() {
  if (confirm("Do you really want to delete the database ?")) {
    fetch(`/api/reset-bdd`)
      .catch(function (error) {
        console.log(error);
      }).then(function () {
        location.reload();
      });
  }
}