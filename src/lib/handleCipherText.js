export const nrReps = Object.freeze({
	Binary: 2,
	Decimal: 10,
	Hex: 16,
})

export function numberToText(cipherText, nrRepType, alphabet = "") {
	return cipherText.map(nr => {
		let parsedNr = parseInt(nr, nrReps[nrRepType])

		if (!isNaN(parsedNr)) {
			if (Boolean(alphabet)) {
				if (parsedNr <= alphabet.length) {
					return alphabet[parsedNr - 1]
				} else {
					return parsedNr
				}
			} else {
				return String.fromCharCode(parsedNr)
			}
		} else {
			return nr
		}
	})

}

export function textToNumber(cipherText, nrRepType, alphabet = "") {
	let cipherTextArray = cipherText.split("")
	let numericRepresentations = []

	if (Boolean(alphabet)) {
		alphabet = alphabet.split("")
		cipherTextArray.forEach((cipherPiece) => {
			let number = alphabet.indexOf(cipherPiece) + 1
			if (number > 0) {
				numericRepresentations.push(number)
			} else {
				numericRepresentations.push(cipherPiece)
			}
		})
	} else {
		cipherTextArray.forEach((cipherPiece) => {
			numericRepresentations.push(cipherPiece.charCodeAt(0))
		})
	}

	let finalRepresentation = []

	numericRepresentations.forEach((number) => {
		if (!isNaN(parseFloat(number)) && !isNaN(number - 0)) {
			finalRepresentation.push(number.toString(nrReps[nrRepType]))
		} else {
			finalRepresentation.push(number)
		}
	})

	return finalRepresentation
}


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
