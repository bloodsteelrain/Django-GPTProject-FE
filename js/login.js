const $loginForm = document.querySelector(".login");
const $userEmailInput = document.querySelector("#user-email");
const $userPwInput = document.querySelector("#user-pw");

// 로그인 버튼 클릭 이벤트
$loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // 입력한 이메일, 비밀번호 지정
  const email = $userEmailInput.value;
  const password = $userPwInput.value;

  // 로그인 함수 호출
  login(email, password);
});

let accessToken = null;

function login(email, password) {
  fetch("http://127.0.0.1:8000/user/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      console.log(response);
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // 로그인 응답에서 access token 추출
      accessToken = data.access;
      console.log("Login successful. Access token:", accessToken);
      // 로컬스토리지에 access token과 만료시간 저장
      const expirationDate = new Date(new Date().getTime() + 30 * 60 * 1000); // 지금으로부터 30분
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("accessTokenExp", expirationDate);
      // 메인 페이지로 이동
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Login Error:", error);
      alert("Login failed.");
    });
}
