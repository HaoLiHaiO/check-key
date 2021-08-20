var i = 0;
var key = [];
var fullKey;
// output variables
var ODMS = "Version: Olympus Dictation Management System ";
var R7 = 'Release 7 (ODMS R7) - Download <a href="">here</a> ';
var R6 = 'Release 6 (ODMS R6) - Download <a href="">here</a> ';
var DSS = "Version: DSS Player ";
var R4 = "Pro Release 4 ";
var R5 = "Pro Release 5 ";
var SR1 = 'Standard Release 1 - Download <a href="">here</a> ';
var SR2 = 'Standard Release 2 - Download <a href="">here</a> ';
var DSS6and7 = "version 6 & 7 ";
var DPFM = 'Version: DSS Player For Mac - Download <a href="">here</a> ';
var R6SCP =
  'ODMS R6 System Configuration Program (SCP) - Download <a href="">here</a> ';
var R6LM = 'ODMS R6 License Manager - Download <a href="">here</a> ';
var Express = ODMS + "Express";
var sonority = "Version: Sonority ";
var DSS2002 = "Version: DSS Player 2002";
var version = "";
var module = "";
var region = "";
var usernum = "";
var key2002 = false;
var supported;
yesSup =
  '<span style="color: green;">This product is currently supported</span>';
noSup = '<span style="color: red;">This product is no longer supported</span>';
var errorMSG =
  '<span style="color: red;">One or more characters are invalid, please check your key & try again.</span>';

// Cleave for normal keys
var cleave = new Cleave(".input-element", {
  delimiter: "-",
  blocks: [4, 4, 4, 4, 4],
  uppercase: true,
});
// Cleave for old keys
var cleaveOld = new Cleave(".input-elementOld", {
  delimiter: "-",
  blocks: [4, 3, 3, 4],
  uppercase: true,
});
// Clear all function for 'Clear' button
function clearFnc() {
  document.getElementById("inputStd").value = "";
  document.getElementById("inputOld").value = "";
  document.getElementById("outVersion").innerHTML = "";
  document.getElementById("outModule").innerHTML = "";
  document.getElementById("outRegion").innerHTML = "";
  document.getElementById("outVolume").innerHTML = "";
  document.getElementById("outSupport").innerHTML = "";
  region = "";
  usernum = "";
  key2002 = false;
  inputHandle();
}
// Error message for invalid inputs
function keyError() {
  version = errorMSG;
  module = "";
  region = "";
  usernum = "";
  supported = "";
}
// Main function
function update() {
  console.log("update");
  fullKey = document.getElementById("inputStd").value;
  key = document.getElementById("inputStd").value.split("-");
  switch (key[0].charAt(0)) {
    // First character is 'R'
    case "R":
      supported = "";
      version =
        '<span style="color: #ff9933">Please enter additional characters</span>';
      rKeyCheck();
      keyModule();
      R6serverComp();
      break;
    // First character is 'S'
    case "S":
      supported = "";
      version = DSS;
      keyModule();
      dssVersion();
      break;
    // First character is '8'
    case "8":
      switch (key[0].charAt(1)) {
        // DPFM
        case "2":
          supported = yesSup;
          version = DPFM;
          break;
        // DSS Player v6 / v7
        case "3":
          v6v7module();
          supported = noSup;
          version = DSS + DSS6and7;
          break;
        // Sonority
        case "5":
          supported = noSup;
          version = sonority;
          break;
        // Clear output if no value is entered
        case "":
          supported = "";
          version = "";
          break;
      }
      break;
    // Blank input removes output & resets
    case "":
      version = "";
      module = "";
      region = "";
      usernum = "";
      supported = "";
      key2002 = false;
      inputHandle();
      break;
    // If an unrecognised character is entered will error.
    default:
      keyError();
      break;
  }
  document.getElementById("outVersion").innerHTML = version;
  document.getElementById("outModule").innerHTML = module;
  document.getElementById("outRegion").innerHTML = region;
  document.getElementById("outVolume").innerHTML = usernum;
  document.getElementById("outSupport").innerHTML = supported;
}
// Function for 2002 keys
function alternate() {
  fullKey = document.getElementById("inputOld").value;
  key = document.getElementById("inputOld").value.split("-");
  console.log("alt");
  switch (key[0].charAt(0)) {
    // First character is 'R'
    case "R":
      version =
        '<span style="color: #ff9933">Please enter additional characters</span>';
      module = "";
      supported = "";
      switch (key[0].charAt(1)) {
        // Second character is 'D'
        case "D":
          module = "Module: Dictation Module";
          supported = "";
          switch (key[0].charAt(2)) {
            case "3":
              version = DSS2002;
              supported = noSup;
              break;
            default:
              key2002 = false;
              inputHandle();
              break;
          }
          break;
        // Second character is 'F'
        case "F":
          version = DSS2002;
          supported = "";
          switch (key[0].charAt(2)) {
            case "P":
              module = "Module: Transcription Module";
              supported = noSup;
              break;
            default:
              break;
          }
          break;
        default:
          key2002 = false;
          inputHandle();
          break;
      }
      break;
  }
  document.getElementById("outVersion").innerHTML = version;
  document.getElementById("outModule").innerHTML = module;
  document.getElementById("outSupport").innerHTML = supported;
}
// Check module of key (Standard keys)
function keyModule() {
  switch (key[0].charAt(1)) {
    // DM
    case "D":
      module = "Module: Dictation Module";
      detect2002();
      break;
    //TM
    case "T":
      module = "Module: Transcription Module";
      break;
    case "":
      module = "";
      supported = "";
      break;
    default:
      module = errorMSG;
      break;
  }
  switch (key[0].charAt(1)) {
    case "F":
      key2002 = true;
      version = DSS2002;
      inputHandle();
      break;
  }
}
// Check region of key
function keyRegion() {
  switch (key[0].charAt(3)) {
    case "4":
      // USA
      region = "Region: United States of America";
      break;
    case "6":
      // Europe
      region = "Region: Europe";
      break;
    case "8":
      // Oceania
      region = "Region: Oceania";
      break;
    case "":
      region = "";
      break;
    default:
      region = errorMSG;
      break;
  }
}
// Check version for DSS software
function dssVersion() {
  if (key[0].length >= 3) {
    switch (key[0].charAt(2)) {
      case "1":
        // SR1
        version = DSS + SR1;
        supported = noSup;
        break;
      case "2":
        // SR2
        version = DSS + SR2;
        keyRegion();
        keyVolume();
        supported = yesSup;
        break;
      case "":
        supported = "";
        version = "";
        break;
      default:
        version = errorMSG;
        break;
    }
  }
}
// Checks for keys beginning with 'R'
function rKeyCheck() {
  if (key[0].length >= 3) {
    switch (key[0].charAt(2)) {
      // ODMS R7
      case "7":
        version = ODMS + R7;
        keyRegion();
        keyVolume();
        supported = yesSup;
        break;
      // ODMS R6
      case "6":
        version = ODMS + R6;
        keyRegion();
        keyVolume();
        supported = noSup;
        break;
      // R5
      case "5":
        version = DSS + R5;
        keyVolume();
        supported = noSup;
        break;
      // R4
      case "M":
        version = DSS + R4;
        supported = noSup;
        break;
      default:
        keyError();
        break;
    }
  }
}
// R6 server components
function R6serverComp() {
  switch (key[0].charAt(1)) {
    case "S":
      // R6 SCP
      version = R6SCP;
      supported = noSup;
      break;
    case "L":
      // R6 License Manager
      version = R6LM;
      supported = noSup;
      break;
    case "R":
      // ODMS Express
      version = Express;
      keyVolume();
      supported = noSup;
      break;
  }
}
// Checks & outputs volume license amounts
function keyVolume() {
  try {
    switch (key[1]) {
      // Leaves blank until significant value is entered
      case null:
      case "":
      case "0":
      case "00":
      case "000":
      case "0000":
        usernum = "";
        break;
      // Single-user license key
      case "0001":
        usernum = "You have 1 concurrent key on your license!";
        break;
      // Calculates the Volume of the key
      default:
        hexnum = key[1].toString(16);
        keyAmount = parseInt(hexnum, 16);
        usernum = "Your key has " + keyAmount + " concurrent licenses!";
        break;
    }
    // Catch error - error resolves once key[1] has a valid input, hence the catch
  } catch (err) {
    console.log(err.message);
  }
}
// Check module of v6/v7 keys
function v6v7module() {
  if (key[1].length >= 4) {
    switch (key[1]) {
      case "0101":
        module = "Module: Dictation Module";
        break;
      case "0121":
        module = "Module: Transcription Module";
        break;
      default:
        module = errorMSG;
        break;
    }
  } else {
    module = "";
  }
  document.getElementById("outModule").innerHTML = module;
}
// 2002 key detection
function detect2002() {
  switch (key[0].charAt(2)) {
    case "3":
      key2002 = true;
      inputHandle();
      alternate();
      break;
    default:
      key2002 = false;
      break;
  }
}
// Handles input field change
function inputHandle() {
  switch (key2002) {
    // The key is for DSS Player 2002
    case true:
      document.getElementById("inputStd").classList.add("hidden");
      document.getElementById("inputOld").classList.remove("hidden");
      document.getElementById("inputOld").focus();
      document.getElementById("inputOld").value = document.getElementById(
        "inputStd"
      ).value;
      document.getElementById("inputStd").value = "";
      break;
    // The key is not for DSS Player 2002
    case false:
      document.getElementById("inputStd").classList.remove("hidden");
      document.getElementById("inputOld").classList.add("hidden");
      document.getElementById("inputStd").focus();
      document.getElementById("inputStd").value = document.getElementById(
        "inputOld"
      ).value;
      document.getElementById("inputOld").value = "";
      break;
  }
}
