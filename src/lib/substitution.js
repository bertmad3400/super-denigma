import { countChars, summarizeCharCount } from "./statistics.js"
import { danishAlphabet, danishFreq, englishAlphabet, englishFreq} from "./shared.js"

const sortBasedOnFreq = subTable => {
	return Object.entries(subTable).map(([k, v]) => [parseFloat(v), k]).sort(function(a, b) {return b[0] - a[0]}).map(([k, v]) => v)
}

const createSubTableFromArrays = function (alphabetArray, userInputArray) {
	return Object.fromEntries(userInputArray.map((_, i) => [alphabetArray[i], userInputArray[i]]))
}

export const subLangs = Object.freeze({
	"Danish" : {
		"tableTemplate" : sortBasedOnFreq(danishFreq),
		"alphabet" : danishAlphabet
	},
	"English" : {
		"tableTemplate" : sortBasedOnFreq(englishFreq),
		"alphabet" : englishAlphabet
	},

})

export function createRandomTable(alphabet) {
	let alphabetList = alphabet.split("")
	let shuffledAlphabetList = [...alphabetList].sort((a, b) => 0.5 - Math.random())

	return createSubTableFromArrays(alphabetList, shuffledAlphabetList)
}

export function createTableFromTemplate(cipherText, subLang) {
	let cipherCharCount = summarizeCharCount(countChars(cipherText, subLang.alphabet))
	let sortedCipherChars = sortBasedOnFreq(cipherCharCount)

	return createSubTableFromArrays(sortedCipherChars, subLang.tableTemplate)
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
