export function ceaserHandler(cipherText, shiftCount, alphabets, wholeAlfabet) {
	let result
	if (wholeAlfabet) {
		result = []

		for (let i = 0; i < alphabets[0].length; i++) {
			result.push({"shiftCount" : i, "clearText" : shiftText(cipherText, i, alphabets[0])})
		}
	} else {
		result = cipherText
		for (const alphabet of alphabets) {
			console.log(alphabet)
			result = shiftText(result, shiftCount, alphabet)
		}
	}

	return result
	
}

function shiftText(cipherText, shiftCount, alphabet) {
	let clearText = ""
	alphabet = alphabet.toLowerCase()

	for (let char of cipherText) {

		let lowerChar = char.toLowerCase()
		if (alphabet.includes(lowerChar)) {
			let offSet = (alphabet.indexOf(lowerChar) + shiftCount) % alphabet.length
			let clearChar = alphabet[offSet]

			if(lowerChar === char) {
				clearText += clearChar
			} else {
				clearText += clearChar.toUpperCase()
			}
		} else {
			clearText += char
		}
	}

	return clearText
}
