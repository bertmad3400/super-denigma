// Add event listener to disable the shift count input if the checkbox for looping through the alphabet is checked
var checkbox = document.querySelector("input[name=wholeAlfabetRange]");
var numberInput = document.querySelector("input[name=shiftCount]");
var alphabetPlaceholders = ["abc...", "123...", "~/-..."]

checkbox.addEventListener('change', function() {
  if (this.checked) {
		numberInput.disabled = "disabled"
  } else {
		numberInput.disabled = ""
  }
});

function addAlphabetField() {
	// Choose a random placeholder for the alphabet field
	placeholder = alphabetPlaceholders[Math.floor(Math.random()*alphabetPlaceholders.length)]

    // Create an input element for another alphabet
    var alphabetField = document.createElement("input");
    alphabetField.setAttribute("type", "text");
    alphabetField.setAttribute("name", "alphabet");
    alphabetField.setAttribute("placeholder", placeholder);

    // Finally put it where it is supposed to appear.
	var referenceNode = document.querySelectorAll('input[name=alphabet]');
	referenceNode = referenceNode[referenceNode.length - 1];
	referenceNode.parentNode.insertBefore(alphabetField, referenceNode.nextSibling);

	//Also insert linebreak
	var lineBreak = document.createElement("br");
	referenceNode.parentNode.insertBefore(lineBreak, referenceNode.nextSibling);
}
