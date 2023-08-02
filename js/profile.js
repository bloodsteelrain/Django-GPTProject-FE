document.addEventListener("DOMContentLoaded", function () {
  fetchProfile();
});

function fetchProfile() {
  fetch("http://127.0.0.1:8000/user/profile/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const profileImage = document.getElementById("profile-image");
      const nickname = document.getElementById("nickname");
      const introduce = document.getElementById("introduce");
      const createdAt = document.getElementById("created-at");
      const updatedAt = document.getElementById("updated-at");

      profileImage.src = data.image ? data.image : "/path/to/default/image";
      nickname.textContent = data.nickname;
      introduce.textContent = data.introduce;
      createdAt.textContent = data.created_at;
      updatedAt.textContent = data.updated_at;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
