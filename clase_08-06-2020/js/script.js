const begin = () => {
  const numb1 = document.getElementById("numb1").value;
  const numb2 = document.getElementById("numb2").value;
  var mayor = 0;
  var menor = 0;
  var digitsN1 = numb1.split("");
  var digitsN2 = numb2.split("");
  var sumDigitsN1 = 0;
  var sumDigitsN2 = 0;
  digitsN1.forEach((element) => {
    sumDigitsN1 += parseInt(element);
  });
  digitsN2.forEach((element) => {
    sumDigitsN2 += parseInt(element);
  });
  $("#sdn1").text(sumDigitsN1);
  $("#sdn2").text(sumDigitsN2);
  if (parseInt(numb1) > parseInt(numb2)) {
    mayor = parseInt(numb1);
    menor = parseInt(numb2);
  } else {
    mayor = parseInt(numb2);
    menor = parseInt(numb1);
  }
  $("#fn1").text(mayor);
  $("#fn2").text(fibonacci_series(mayor)[menor]);
  console.log(fibonacci_series(mayor));

  let perfect_numbers = [];
  for (let i = menor; i < mayor; i++) {
    if (is_perfect(i)) {
      perfect_numbers.push(i);
    }
  }
  if (perfect_numbers.length > 0) {
    $("#pn").text(perfect_numbers);
  } else {
    $("#pn").text("No hay numeros perfectos en este rango");
  }
};

const fibonacci_series = (n) => {
  if (n === 1) {
    return [0, 1];
  } else {
    let s = fibonacci_series(n - 1);
    s.push(s[s.length - 1] + s[s.length - 2]);
    return s;
  }
};

const is_perfect = (number) => {
  let temp = 0;
  for (let i = 1; i <= number / 2; i++) {
    if (number % i === 0) {
      temp += i;
    }
  }

  if (temp === number && temp !== 0) {
    return true;
  } else {
    return false;
  }
};
