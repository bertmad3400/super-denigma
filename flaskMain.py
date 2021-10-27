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

if __name__ == '__main__':
    app.run(debug=True)
