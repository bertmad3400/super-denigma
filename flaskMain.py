#!/usr/bin/python3

from flask import Flask, abort, render_template, request, redirect, flash, send_file, url_for

import werkzeug

from ciphers import *

app = Flask(__name__)
app.static_folder = "./webFront/static"
app.template_folder = "./webFront/templates"

def hasNoEmptyParams(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)


def getSiteMap():
    links = []

    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and hasNoEmptyParams(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            links.append((url, rule.endpoint))

    return links

@app.context_processor
def injectSiteMap():
    return dict(endpoints=getSiteMap())

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

        requestDetails["alphabets"] = request.form.getlist("alphabet")

        if requestDetails["alphabets"] == []:
            abort(422)

        if requestDetails["wholeAlfabetRange"]:
            solutions = [shift.shiftText(shiftCount, requestDetails["cipherText"], requestDetails["alphabets"][0]) for shiftCount in range(len(requestDetails["alphabets"][0]))]
            return render_template("solvers/shiftCiphers.html", solutions=solutions)
        else:
            solution = shift.shiftText(requestDetails["shiftCount"], requestDetails["cipherText"], requestDetails["alphabets"])
            return render_template("solvers/shiftCiphers.html", solution=solution)



if __name__ == '__main__':
    app.run(debug=True)
