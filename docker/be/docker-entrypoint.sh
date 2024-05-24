#!/bin/sh
set -e

python3.8 -c 'from backend import db; db.create_all()'

# Execute the Flask application
exec flask run --host=0.0.0.0
