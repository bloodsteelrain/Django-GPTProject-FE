// chatGPT API에게 질문에 대한 답 요청
function chatGptAPI(requestData, callback) {
  if (!accessToken) {
    alert("먼저 로그인을 해주세요");
    return;
  }

  fetch("http://127.0.0.1:8000/chatbot/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestData),
    redirect: "follow",
  })
    .then((response) => {
      if (response.status === 429) {
        // Too Many Requests error
        alert("오늘의 질문횟수를 전부 사용하셨습니다. 내일 다시 시도해주세요.");
        return;
      }
      return response.json();
    })
    .then((data) => {
      const answer = data.response;

      closeLoading();
      // 모달 텍스트 설정
      $modalText.style.display = "block";
      $modalText.textContent = answer;
      $modalButtons.style.display = "flex";
      callback(answer);
    })
    .catch((error) => {
      console.error("Fetch 에러:", error);
      closeLoading();
      alert("데이터를 불러오는 데 실패했습니다");
    });
}
