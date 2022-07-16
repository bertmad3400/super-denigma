export const morseToLetter = {
	'.-':     'a',
	'-...':   'b',
	'-.-.':   'c',
	'-..':    'd',
	'.':      'e',
	'..-.':   'f',
	'--.':    'g',
	'....':   'h',
	'..':     'i',
	'.---':   'j',
	'-.-':    'k',
	'.-..':   'l',
	'--':     'm',
	'-.':     'n',
	'---':    'o',
	'.--.':   'p',
	'--.-':   'q',
	'.-.':    'r',
	'...':    's',
	'-':      't',
	'..-':    'u',
	'...-':   'v',
	'.--':    'w',
	'-..-':   'x',
	'-.--':   'y',
	'.-.-':   'æ',
	'---.':   'ø',
	'.--.-':  'å',
	'--..':   'z',
	'.----':  '1',
	'..---':  '2',
	'...--':  '3',
	'....-':  '4',
	'.....':  '5',
	'-....':  '6',
	'--...':  '7',
	'---..':  '8',
	'----.':  '9',
	'-----':  '0',
}

export const letterToMorse = Object.fromEntries(Object.entries(morseToLetter).map(([k, v]) => [v, k]))
letterToMorse[" "] = ""

export function handleMorse(cipherText, alphabet, prevDelim = "/", newDelim = "", notRecognized = false) {
	let solution = ""

	let cipherPieces = cipherText.split(prevDelim).map(v => v.toLowerCase())

	for (const cipherPiece of cipherPieces) {
		if (cipherPiece === "") {
			solution += " "
		} else if (cipherPiece in alphabet) {
			solution += alphabet[cipherPiece] + newDelim
		} else {
			if (Boolean(notRecognized)) {
				solution += notRecognized
			} else {
				solution += cipherPiece
			}
		}
	}

	return solution
}

export function substitute(cipherText, substitutionTable) {
	const result = []

	let ID = 0
	for (let char of cipherText) {
		let clearChar
		let modified

		const lowerChar = char.toLowerCase()

		if (lowerChar in substitutionTable && Boolean(substitutionTable[lowerChar])) {
			clearChar = substitutionTable[lowerChar]
			if (lowerChar !== char) {
				clearChar = clearChar.toUpperCase()
			}

			modified = true
		} else {
			clearChar = char
			modified = false
		}
		result.push({"modified" : modified, "char" : clearChar, "ID" : ID})
		ID++
	}
	return result
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
