import json
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


def request_wants_json():
    '''Determine if client needs json'''
    best = request.accept_mimetypes \
        .best_match(['application/json', 'text/html'])
    return best == 'application/json' and \
        request.accept_mimetypes[best] > \
        request.accept_mimetypes['text/html']


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    '''Catch all for after initial /

    Given:
                      /  ->  path == ''
                    /geo ->  path == 'geo'
       /geo/us/tx/austin -> path == 'geo/us/tx/austin'

    We would then need to parse the url locally to determine what each
    slot means.
    '''
    # Get data
    with open('data.json', 'r') as fd:
        data = json.loads(fd.read())
    return_value = ''
    if request_wants_json():
        return_value = jsonify(data)
    else:
        return_value = render_template('index.html', path=path, data=data)
    return return_value

