// 직전 질문과 답변 제거
function clearAnswers() {
  if (!accessToken) {
    alert("먼저 로그인을 해주세요");
    return;
  }

  fetch("http://127.0.0.1:8000/chatbot/clearchat/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(data.message);
    });

  $modalText.innerHTML = "";
  $modalButtons.style.display = "none";
}
