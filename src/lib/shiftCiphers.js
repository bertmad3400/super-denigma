export function vigenereDecode(cipherText, key, alphabet, encrypt = true) {
	let clearText = ""
	alphabet = alphabet.toLowerCase()
	key = key.toLowerCase()
	let i = 0

	for (let cipherChar of cipherText) {
		let keyCharIndex = (encrypt ? 1 : -1) * alphabet.indexOf(key[i % key.length])

		if (alphabet.includes(cipherChar.toLowerCase())) {
			clearText += shiftSingleChar(cipherChar, keyCharIndex, alphabet)
			i++
		} else {
			clearText += cipherChar
		}
	}
	return clearText
}

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
			result = shiftText(result, shiftCount, alphabet)
		}
	}

	return result
}

function shiftText(cipherText, shiftCount, alphabet) {
	let clearText = ""
	alphabet = alphabet.toLowerCase()

	for (let char of cipherText) {
		clearText += shiftSingleChar(char, shiftCount, alphabet)
	}

	return clearText
}

function shiftSingleChar(char, shiftCount, alphabet) {
	let lowerChar = char.toLowerCase()

	if (alphabet.includes(lowerChar)) {
		let offSet = (alphabet.indexOf(lowerChar) + shiftCount) % alphabet.length

		if (offSet < 0) {
			offSet = alphabet.length + offSet
		}

		let clearChar = alphabet[offSet]

		if(lowerChar === char) {
			return clearChar
		} else {
			return clearChar.toUpperCase()
		}
	} else {
		return char
	}
}
