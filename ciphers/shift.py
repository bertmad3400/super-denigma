#!/usr/bin/python3

def shiftText(shiftCount, cipherText, alphabets):
    clearText = ""

    if type(alphabets) != list:
        alphabets = [alphabets]

    for letter in cipherText:
        lowerLetter = letter.lower()
        if lowerLetter in "".join(alphabets):
            for alphabet in alphabets:
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
