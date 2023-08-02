const accessToken = localStorage.getItem("accessToken");
const accessTokenExp = localStorage.getItem("accessTokenExp");

// 로그인 상태인지 확인하고 내비게이션 바 조정
function updateNavigationLinks() {
  const $loginLink = document.querySelector('a[href="./login.html"]');
  const $joinLink = document.querySelector('a[href="./join.html"]');
  const $logoutButton = document.querySelector(".logoutButton");
  const $profileButton = document.querySelector(".profileButton");

  console.log(accessToken);

  if (accessToken && accessTokenExp && new Date() < new Date(accessTokenExp)) {
    // 로그인한 상태면, 로그아웃, 프로필 버튼 표시
    $profileButton.style.display = "inline";
    $logoutButton.style.display = "inline";
    $logoutButton.addEventListener("click", function (e) {
      e.preventDefault();
      // 로컬스토리지에서 access token 제거 및 메인 페이지로 이동
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accessTokenExp");
      window.location.href = "./index.html";
    });

    // 로그인, 회원가입 버튼 숨기기
    $loginLink.style.display = "none";
    $joinLink.style.display = "none";
  } else {
    // 로그인하지 않은 상태면, 로그아웃 버튼과 로그인된 이메일 숨기기
    $profileButton.style.display = "none";
    $logoutButton.style.display = "none";

    // 로그인, 회원가입 버튼 표시
    $loginLink.style.display = "inline";
    $joinLink.style.display = "inline";

    //로컬스토리지에서 access token 제거
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExp");
  }
}

// 페이지 로딩시 함수 실행
updateNavigationLinks();
