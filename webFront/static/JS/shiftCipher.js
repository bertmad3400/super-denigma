// Add event listener to disable the shift count input if the checkbox for looping through the alfabet is checked
var checkbox = document.querySelector("input[name=wholeAlfabetRange]");
var numberInput = document.querySelector("input[name=shiftCount]");

checkbox.addEventListener('change', function() {
  if (this.checked) {
		numberInput.disabled = "disabled"
  } else {
		numberInput.disabled = ""
  }
});

function addAlphabetField() {
    // Create an input element for another alphabet
    var alphabetField = document.createElement("input");
    alphabetField.setAttribute("type", "text");
    alphabetField.setAttribute("name", "alfabet");
    alphabetField.setAttribute("placeholder", "abc...");

    // Finally put it where it is supposed to appear.
	document.getElementById("inputOptions").appendChild(alphabetField);
}
