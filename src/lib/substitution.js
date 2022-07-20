const createSubTableFromArrays = function (alphabetArray, userInputArray) {
	return Object.fromEntries(userInputArray.map((_, i) => [alphabetArray[i], userInputArray[i]]))
}

export function createRandomTable(alphabet) {
	let alphabetList = alphabet.split("")
	let shuffledAlphabetList = [...alphabetList].sort((a, b) => 0.5 - Math.random())

	return createSubTableFromArrays(alphabetList, shuffledAlphabetList)
}

export function substitute(substitutionTable, cipherText) {
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
		result.push({"modified" : modified, "clearChar" : clearChar, "oldChar" : char, "ID" : ID})
		ID++
	}
	return result
}
