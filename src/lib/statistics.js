export const countChars = function (str, alphabet = false) {
	return [...str.toLowerCase()].reduce((total, letter) => {
		if (!Boolean(alphabet) || alphabet.includes(letter)) {
			total["total"] = total["total"] + 1
			if (!total[letter]) {
				return {
					...total,
					[letter]: 1
				}
			} else {
				return {
					...total,
					[letter]: total[letter] + 1
				}
			}
		} else {
			return total
		}
	}, {"total" : 0});
};


export const summarizeCharCount = charCounts => {
	return Object.fromEntries(Object.entries(charCounts).filter(([char, count]) => char != "total").map(([char, count]) => [char, (count / charCounts["total"]) * 100 ]).sort())
}
