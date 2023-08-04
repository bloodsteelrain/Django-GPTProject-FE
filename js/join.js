const $signupForm = document.querySelector(".join");
const $joinEmailInput = document.querySelector("#join-email");
const $joinPwInput = document.querySelector("#join-pw");

// 회원가입 버튼 클릭 이벤트
$signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // 입력한 이메일, 비밀번호, 이름 지정
  const email = $joinEmailInput.value;
  const password = $joinPwInput.value;

  // 회원가입 함수 호출
  signup(email, password);
});

function signup(email, password) {
  fetch("http://127.0.0.1:8000/user/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.status !== 201) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      alert("회원가입 되셨습니다. 이제 로그인이 가능합니다");
      // 회원가입 성공시 로그인 페이지로 이동
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Signup Error:", error);
      alert("회원가입에 실패였습니다. 양식에 맞게 입력해주세요.");
    });
}
