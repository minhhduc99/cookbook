#!/bin/sh
set -e

python3.8 -c 'import run; db.create_all()'

# Execute the Flask application
exec flask run
