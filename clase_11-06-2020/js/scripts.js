const words = ["CAMISA", "CARA", "AMOR", "JAVASCRIPT", "PROGRAMACION", "TEST"];
let selectedWord = null;
let selectedWordSplit = [];
let unknownWord = [];
let remainingAttempts = 6;
let endGame = false;

$(document).ready(() => {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  selectedWordSplit = selectedWord.split("");
  selectedWordSplit.forEach((e) => {
    unknownWord.push("_");
  });
  printWord();
});

const sendLetter = () => {
  let letter = prompt("Ingresa una letra", "");
  if ((letter.length === 0) | (letter.length > 1)) {
    alert("Ingrese solo un caracter");
  } else if (!isLetter(letter)) {
    alert("Ingrese una letra");
  } else {
    searchInWord(letter.toUpperCase());
  }
};

const searchInWord = (letter) => {
  if (!selectedWordSplit.includes(letter)) {
    remainingAttempts = remainingAttempts - 1;
    $("#ir").text(remainingAttempts);
    $("#image").attr("src", `./img/Sayori_hanged_${remainingAttempts}.png`);
    if (remainingAttempts === 0) {
      $("#sl").prop("disabled", true);
      var x = document.getElementById("myAudio");
      x.play();
      $("#cw").text("La palabra era: " + selectedWord);
      setTimeout(() => {
        $("#image").remove();
        $("#main").removeClass("bg-1");
        $("#main").addClass("bg-2");
      }, 3000);
    }
  } else {
    if (!unknownWord.includes(letter)) {
      let indices = [];
      selectedWordSplit.forEach((e, i) => {
        if (e === letter) {
          indices.push(i);
        }
      });
      indices.forEach((e) => {
        unknownWord[e] = letter;
      });
      if (!unknownWord.includes("_")) {
        $("#sl").prop("disabled", true);

        alert("Fin del juego");
      }
      printWord();
    } else {
      alert("Esta letra ya fue ingresada");
    }
  }
};

const isLetter = (letter) => {
  let ascii = letter.toUpperCase().charCodeAt(0);
  return ascii > 64 && ascii < 91;
};

const printWord = () => {
  let string = "";
  unknownWord.forEach((e) => {
    string += e + " ";
  });
  $("#word").text(string);
};
