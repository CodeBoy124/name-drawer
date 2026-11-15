// Name Drawer Assignment Logic
// For static hosting, each user runs on their own page
// Assignment is based on random selection from possible names (excluding user's name)

let seed = 7;

function random() {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function getNames() {
  const input = document.getElementById("names");
  const names = input.value
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return names;
}

function getYourName() {
  const input = document.getElementById("yourName");
  return input.value.trim();
}

function getShuffledNames(possibleNames) {
  const shuffled_names = JSON.parse(JSON.stringify(possibleNames)).sort(
    () => random() - 0.5,
  );
  for (let i = 0; i < possibleNames.length; i++) {
    if (shuffled_names[i] == possibleNames[i])
      return getShuffledNames(possibleNames);
  }
  return shuffled_names;
}

function getAssignedPerson(possibleNames, yourName) {
  const original_names = possibleNames;
  seed = parseInt(document.getElementById("seed").value);
  const shuffled_names = getShuffledNames(possibleNames);
  seed = parseInt(document.getElementById("seed").value);

  for (let i = 0; i < possibleNames.length; i++) {
    if (original_names[i] != yourName) continue;
    return shuffled_names[i];
  }
  return null;
}

function clearResult() {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
}

function showResult(message, isError = false) {
  clearResult();
  if (isError) {
    const div = document.createElement("div");
    div.className = "error";
    div.innerHTML = message;
    document.body.appendChild(div);
  } else {
    const div = document.createElement("div");
    div.className = "result";
    div.innerHTML = `<strong>Assigned:</strong> ${message}`;
    document.body.appendChild(div);
  }
}

function assign() {
  const names = getNames();
  const yourName = getYourName();

  if (names.length === 0 || yourName === "") {
    showResult("Please fill in the possible names and your name first.", true);
    return;
  }

  const assigned = getAssignedPerson(names, yourName);

  if (assigned) {
    showResult(assigned);
  } else {
    showResult("No other person available for assignment.", true);
  }
}

// Run on page load to initialize any state
document.addEventListener("DOMContentLoaded", () => {
  const start_seed = Math.floor(Math.random() * 10000);
  document.getElementById("seed").value = start_seed;
  seed = start_seed;
  assign();
});
