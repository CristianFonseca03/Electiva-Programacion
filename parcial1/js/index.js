const sendIP = () => {
  const IP = $("#ip").val();
  let tp = 0;
  if (validateIP(IP)) {
    $("#ip").removeClass("is-invalid");
    $("#ip").addClass("is-valid");
    clearAll();
    const mascaraRed = IP.split("/")[1];
    const octetos = IP.split("/")[0].split(".");
    if (octetos[0] >= 0 && octetos[0] <= 127) {
      $("#cr").text("Máscara de 8 bits");
      tp = 1;
    }
    if (octetos[0] >= 128 && octetos[0] <= 191) {
      $("#cr").text("Máscara de 16 bits");
      tp = 2;
    }
    if (octetos[0] >= 192 && octetos[0] <= 233) {
      $("#cr").text("Máscara de 24 bits");
      tp = 3;
    }
    if (octetos[0] >= 224 && octetos[0] <= 239) {
      $("#cr").text("Máscara de 32 bits");
      tp = 4;
    }
    if (octetos[0] >= 240 && octetos[0] <= 255) {
      $("#cr").text("N/A");
      tp = 5;
    }
    let mascaraRedDecimal = "";
    for (let i = 0; i < mascaraRed; i++) {
      mascaraRedDecimal += "1";
    }
    for (let i = 0; i < 32 - mascaraRed; i++) {
      mascaraRedDecimal += "0";
    }
    const mascaraRedIP =
      parseInt(mascaraRedDecimal.substr(0, 8), 2) +
      "." +
      parseInt(mascaraRedDecimal.substr(8, 8), 2) +
      "." +
      parseInt(mascaraRedDecimal.substr(16, 8), 2) +
      "." +
      parseInt(mascaraRedDecimal.substr(24, 8), 2);
    $("#mrfd").text(mascaraRedIP);
    let ipBinario = "";
    octetos.forEach((e) => {
      let binario = parseInt(e, 10).toString(2);
      if (binario.length < 8) {
        let diferencia = 8 - binario.length;
        let octetoBinario = "";
        for (let i = 0; i < diferencia; i++) {
          octetoBinario += "0";
        }
        octetoBinario += binario;
        ipBinario += octetoBinario + ".";
      } else {
        ipBinario += binario + ".";
      }
    });
    ipBinario = ipBinario.slice(0, ipBinario.length - 1);
    $("#dipfb").text(ipBinario);
    let direccionDeRed = "";
    for (let i = 0; i < mascaraRedDecimal.substr(0, 8).length; i++) {
      direccionDeRed +=
        mascaraRedDecimal.substr(0, 8)[i] && ipBinario.substr(0, 8)[i];
    }
    for (let i = 0; i < mascaraRedDecimal.substr(8, 8).length; i++) {
      direccionDeRed +=
        mascaraRedDecimal.substr(8, 8)[i] && ipBinario.substr(9, 8)[i];
    }
    for (let i = 0; i < mascaraRedDecimal.substr(16, 8).length; i++) {
      direccionDeRed +=
        mascaraRedDecimal.substr(16, 8)[i] && ipBinario.substr(18, 8)[i];
    }
    for (let i = 0; i < mascaraRedDecimal.substr(24, 8).length; i++) {
      direccionDeRed +=
        mascaraRedDecimal.substr(24, 8)[i] && ipBinario.substr(27, 8)[i];
    }
    let direccionDeRedDecimal =
      parseInt(direccionDeRed.substr(0, 8), 2) +
      "." +
      parseInt(direccionDeRed.substr(8, 8), 2) +
      "." +
      parseInt(direccionDeRed.substr(16, 8), 2) +
      "." +
      parseInt(direccionDeRed.substr(24, 8), 2);
    $("#ddr").text(direccionDeRedDecimal);
    let a = 32 - mascaraRed;
    let numeorHosts = 2 ** a - 2;
    $("#nh").text(numeorHosts);
    if (tp === 1) {
      if (mascaraRed > 8) {
        let diferencia = mascaraRed - 8;
        $("#nsr").text(diferencia);
      } else {
        $("#nsr").text("0");
      }
    }
    if (tp === 2) {
      if (mascaraRed > 16) {
        let diferencia = mascaraRed - 16;
        $("#nsr").text(diferencia);
      } else {
        $("#nsr").text("0");
      }
    }
    if (tp === 3) {
      if (mascaraRed > 24) {
        let diferencia = mascaraRed - 24;
        $("#nsr").text(diferencia);
      } else {
        $("#nsr").text("0");
      }
    }
    if (tp === 4) {
      if (mascaraRed > 32) {
        let diferencia = mascaraRed - 32;
        $("#nsr").text(diferencia);
      } else {
        $("#nsr").text("0");
      }
    }
    if (tp === 5) {
      $("#nsr").text("N/A");
    }
  } else {
    $("#ip").removeClass("is-valid");
    $("#ip").addClass("is-invalid");
    clearAll();
  }
};

const validateIP = (IP) => {
  const split1 = IP.split("/");
  if (split1[1] === undefined || split1[1] < 8 || split1[1] > 32) {
    return false;
  } else {
    const split2 = split1[0].split(".");
    if (split2.length !== 4) {
      return false;
    } else {
      let error = false;
      split2.forEach((e) => {
        if (e < 0 || e > 255) {
          error = true;
        }
      });
      if (error) {
        return false;
      } else {
        return true;
      }
    }
  }
};

function tieneNumeros(texto) {
  var numeros = "0123456789";
  for (i = 0; i < texto.length; i++) {
    if (numeros.indexOf(texto.charAt(i), 0) != -1) {
      return true;
    }
  }
  return false;
}
const clearAll = () => {
  $("#cr").text("");
  $("#mrfd").text("");
  $("#dipfb").text("");
  $("#ddr").text("");
  $("#nh").text("");
};
