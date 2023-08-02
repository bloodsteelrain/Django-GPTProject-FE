document.addEventListener("DOMContentLoaded", function () {
  fetchProfileDataAndPopulateFields();

  const profileEditForm = document.getElementById("profile-edit-form");
  profileEditForm.addEventListener("submit", function (e) {
    e.preventDefault();
    saveProfile();
  });
});

function fetchProfileDataAndPopulateFields() {
  fetch("http://127.0.0.1:8000/user/profile/", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Populate the input fields with the profile data
      document.querySelector("#nickname").value = data.nickname;
      document.querySelector("#introduce").value = data.introduce;
      // Add more fields as needed
    })
    .catch((error) => {
      console.error("Error fetching profile data:", error);
      // Handle error, e.g., show an alert or log the error
    });
}

function saveProfile() {
  const profileEditForm = document.getElementById("profile-edit-form");
  const formData = new FormData(profileEditForm);

  fetch("http://127.0.0.1:8000/user/profile/edit/", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response if needed
      console.log("Profile updated successfully:", data);
      window.location.href = "profile.html";
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
