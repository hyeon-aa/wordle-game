const answer = "APPLE";

let attempts = 0;
let index = 0;

function appStart() {
  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (key === "BACKSPACE") {
      handleBackSpace();
    }
    if (index === 5 && key === "ENTER") {
      handleEnterkey();
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    } else if (index === 5) {
      return;
    }
  };

  const handleclick = (e) => {
    keyData = e.target.innerText;
    keybCode = keyData.charCodeAt();
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (index === 5 && keyData === "ENTER") {
      handleEnterkey();
    } else if (keyData === "DEL") {
      handleBackSpace();
    } else if (index !== 5 && keyData === "ENTER") {
      return;
    } else if (65 <= keybCode && keybCode <= 90) {
      thisBlock.innerText = keyData;
      index += 1;
    }
  };

  const handleEnterkey = () => {
    let count = 0;

    for (let i = 0; i < 5; i++) {
      const Block = document.querySelector(
        `.board-block[data-index="${attempts}${i}"]`
      );
      const blockword = Block.innerText;
      const keyBlock = document.querySelector(
        `.keyboard-block[data-key=${blockword}]`
      );

      const keyBlockword = keyBlock.innerText;
      if (blockword === answer[i] || keyBlockword === answer[i]) {
        Block.style.backgroundColor = "green";
        keyBlock.style.backgroundColor = "green";
        count += 1;
      } else if (answer.includes(blockword) || answer.includes(keyBlockword)) {
        Block.style.backgroundColor = "yellow";
        keyBlock.style.backgroundColor = "yellow";
      } else {
        Block.style.backgroundColor = "gray";
      }
      Block.style.color = "black";

      if (count == 5) {
        gameOver();
      }
    }

    nextLine();
  };

  const handleBackSpace = () => {
    if (index > 0) {
      const prevBlock = document.querySelector(
        `.board-block[data-index="${attempts}${index - 1}"]`
      );
      prevBlock.innerText = "";
      if (index !== 0) {
        index -= 1;
      }
    }
  };

  const startTimer = () => {
    const starttime = new Date();

    function setTime() {
      const currentTime = new Date();
      const mytime = new Date(currentTime - starttime);
      const min = mytime.getMinutes().toString().padStart(2, "0");
      const year = currentTime.getFullYear();
      const month = currentTime.getMonth() + 1;
      const date = currentTime.getDate().toString().padStart(2, "0");
      const sec = mytime.getSeconds().toString().padStart(2, "0");
      const timediv = document.querySelector("#timer");
      timediv.innerHTML = `${year}-${month}-${date} ${min}:${sec}`;
    }

    timer = setInterval(setTime, 1000);
  };

  const gameOver = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameOver();
    attempts += 1;
    index = 0;
  };

  const displayGameover = () => {
    const gameoverPop = document.createElement("div");
    gameoverPop.innerText = "gameover";
    gameoverPop.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:38%; background-color:blue; width:200px; height:100px; ";
    document.body.appendChild(gameoverPop);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);

  // let clickBlock = document.getElementsByClassName("keyboard-block");
  // clickBlock.addEventListener("click", handleclick);

  window.addEventListener("click", handleclick);
}

appStart();
