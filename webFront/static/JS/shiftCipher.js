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
