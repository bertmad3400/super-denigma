#!/usr/bin/python3

from flask import Flask, abort, render_template, request, redirect, flash, send_file

import werkzeug

from ciphers import *

app = Flask(__name__)
app.static_folder = "./webFront/static"
app.template_folder = "./webFront/templates"

@app.errorhandler(werkzeug.exceptions.HTTPException)
def handleHTTPErrors(e):
    return render_template("HTTPError.html", errorCode=e.code, errorName=e.name, errorDescription=e.description), e.code

@app.route("/", methods = ['POST', 'GET'])
def solveShiftCiphers():
    if request.method == 'GET':
        return render_template("solvers/shiftCiphers.html")
    elif request.method == 'POST':


        requestDetails = {}

        for detail in ["shiftCount", "wholeAlfabetRange", "cipherText"]:
            requestDetails[detail] = request.form.get(detail)


        if not requestDetails['wholeAlfabetRange']:
            try:
                requestDetails["shiftCount"] = int(requestDetails["shiftCount"])
            except:
                abort(422)

        requestDetails["alfabets"] = request.form.getlist("alfabet")

        if requestDetails["alfabets"] == []:
            abort(422)

        if requestDetails["wholeAlfabetRange"]:
            solutions = [shift.shiftText(shiftCount, requestDetails["cipherText"], requestDetails["alfabets"][0]) for shiftCount in range(len(requestDetails["alfabets"][0]))]
            return render_template("solvers/shiftCiphers.html", solutions=solutions)
        else:
            solution = shift.shiftText(requestDetails["shiftCount"], requestDetails["cipherText"], requestDetails["alfabets"])
            return render_template("solvers/shiftCiphers.html", solution=solution)



if __name__ == '__main__':
    app.run(debug=True)
