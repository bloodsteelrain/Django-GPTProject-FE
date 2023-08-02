// 변수 정의
const $topicInput = document.querySelector(".topicInput");
const $genreInput = document.querySelector(".genreInput");
const $inputText = document.querySelector(".inputText");
const $plotButton = document.querySelector(".plotButton");
const $characterButton = document.querySelector(".characterButton");
const $happeningButton = document.querySelector(".happeningButton");
const $plotContainer = document.querySelector(".plotContainer");
const $characterContainer1 = document.querySelector(".characterContainer1");
const $characterContainer2 = document.querySelector(".characterContainer2");
const $happeningContainer = document.querySelector(".happeningContainer");
const $modalContent = document.querySelector(".modalContent");
const $modalText = document.querySelector(".modalText");
const $modalButtons = document.querySelector(".modalButtons");
const $restartButton = document.querySelector(".restartButton");
const $continueButton = document.querySelector(".continueButton");
const $topButton = document.querySelector(".topButton");

// 입력 버튼 클릭 이벤트
$plotButton.addEventListener("click", (e) => {
  e.preventDefault();
  userInputTopic = $topicInput.value;
  $topicInput.value = "";
  userInputGenre = $genreInput.value;
  $genreInput.value = "";

  // 화면에 입력한 소재와 장르 표시
  const topicList = document.createElement("li");
  topicList.innerText = `소재: ${userInputTopic}`;
  const genreList = document.createElement("li");
  genreList.innerText = `장르: ${userInputGenre}`;
  $inputText.append(topicList, genreList);

  // API 질문 형식 준비
  const requestData = {
    prompt: `소재: ${userInputTopic}, 장르: ${userInputGenre}의 소설 플롯 300자 내외로 작성해줘. 다음과 같은 형식으로 답변을 줘. 형식: '제목 : 작성한 제목\n설정 : 100자 이내의 작성한 내용의 배경 설정\n플롯 : 작성한 플롯 내용' `,
  };

  // modal을 띄우고 답변 표시
  openModal();
  loading($modalContent);

  chatGptAPI(requestData, (answer) => {
    $characterButton.removeAttribute("disabled");
    // 화면에 답변 표시
    while ($plotContainer.firstChild) {
      $plotContainer.removeChild($plotContainer.firstChild);
    }
    const plotAnswer = document.createElement("li");
    plotAnswer.innerText = answer;
    $plotContainer.appendChild(plotAnswer);
  });
});

// 등장인물 버튼 클릭 이벤트
$characterButton.addEventListener("click", (e) => {
  e.preventDefault();
  const requestData = {
    prompt: `이 소설의 등장인물을 2명까지 세세하게 입체적으로 묘사해줘. 형식은 '등장인물1\n이름: 등장인물 이름\n등장인물 설명\n\n등장인물2\n이름: 등장인물 이름\n등장인물 설명\n' 으로 해줘`,
  };

  $modalText.innerHTML = "";
  $modalButtons.style.display = "none";
  openModal();
  loading($modalContent);

  chatGptAPI(requestData, (answer) => {
    $happeningButton.removeAttribute("disabled");
    // 화면에 답변 표시
    while ($characterContainer1.firstChild) {
      $characterContainer1.removeChild($characterContainer1.firstChild);
    }
    const characterAnswer1 = document.createElement("li");
    characterAnswer1.innerText = answer.split("\n\n")[0];
    $characterContainer1.appendChild(characterAnswer1);

    while ($characterContainer2.firstChild) {
      $characterContainer2.removeChild($characterContainer2.firstChild);
    }
    const characterAnswer2 = document.createElement("li");
    characterAnswer2.innerText = answer.split("\n\n")[1];
    $characterContainer2.appendChild(characterAnswer2);
  });
});

// 에피소드 버튼 클릭 이벤트
$happeningButton.addEventListener("click", (e) => {
  e.preventDefault();
  const requestData = {
    prompt: `이 소설에서 벌어지는 주요한 에피소드 하나를 300자 이내로 작성해줘`,
  };

  $modalText.innerHTML = "";
  $modalButtons.style.display = "none";
  openModal();
  loading($modalContent);

  chatGptAPI(requestData, (answer) => {
    // 화면에 답변 표시
    while ($happeningContainer.firstChild) {
      $happeningContainer.removeChild($happeningContainer.firstChild);
    }
    const happeningAnswer = document.createElement("li");
    happeningAnswer.innerText = answer;
    $happeningContainer.appendChild(happeningAnswer);
  });
});

// 이어가기 버튼 클릭 이벤트
$continueButton.addEventListener("click", function () {
  closeModal();
  document
    .querySelector(".characterArea")
    .scrollIntoView({ behavior: "smooth" });
});

// 다시하기 버튼 클릭 이벤트
$restartButton.addEventListener("click", function () {
  clearAnswers();
  closeModal();
  $inputText.innerText = "";
});
