#!/usr/bin/python3

import re

nonRepeatingNumberPattern = re.compile(r"(?:(?<=\D)|(?<=^))([2-9][1-3]|([79]4))(?=\D|$)")
repeatingNumberPattern = re.compile(r"(?:(?<=\D)|(?<=^))(?:([2-9])\1{0,2})$|^(?:([79])\2{3})(?:\D|$)")

numberedLetters = [
            "abc",
            "def",
            "ghi",
            "jkl",
            "mno",
            "pqrs",
            "tuv",
            "wxyz"
        ]

def solvePhoneCode(cipherText, repeats, seperator=" "):
    sections = cipherText.split(seperator)
    cleanText = ""

    for section in sections:
        currentCleanText = section
        while True:

            if repeats:
                regexMatch = repeatingNumberPattern.search(currentCleanText)
            else:
                regexMatch = nonRepeatingNumberPattern.search(currentCleanText)

            if not regexMatch:
                break

            identifier = int(regexMatch.group(0)[0])
            if repeats:
                count = len(regexMatch.group(0))
            else:
                count = int(regexMatch.group(0)[1])

            translation = numberedLetters[identifier - 2][count - 1]

            currentCleanText = currentCleanText.replace(regexMatch.group(0), translation, 1)

        cleanText += currentCleanText

    return cleanText
