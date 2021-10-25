#!/usr/bin/python3

def shiftText(shiftCount, cipherText, alphabets):
    clearText = ""
    alphabetList = alphabets.split(";")

    for letter in cipherText:
        lowerLetter = letter.lower()
        if lowerLetter in alphabets:
            for alphabet in alphabetList:
                if lowerLetter in alphabet:
                    offSet = (alphabet.index(lowerLetter) + shiftCount) % len(alphabet)
                    clearCharacter = alphabet[offSet]

                    if letter.isupper():
                        clearText += clearCharacter.upper()
                    else:
                        clearText += clearCharacter

                    break
        else:
            clearText += letter


    return clearText
