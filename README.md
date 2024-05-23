# cookbook

Making a simple app using React and Flask. Deployed on railway.app and heroku.

# How To Run Locally (For Development)

-   setup venv
-   setup database
-   setup environment variables
-   build the frontend with node 20
-   run the server
-   makefile

## Setup `venv`
- Works on python 3.8
-   Create a python virtual environment (venv) using the command `...`
-   Activate the venv
-   Run the command `pip install -r requirements.txt`

## Setup Database

-   Setup and connect to mysql server
-   Create a cookbook database
-   Run a python shell then run the next two following commands:
    - `python`
    -   `from backend import db`
    -   `db.create_all()`
-   Now, the database should be populated with tables

## Environment Variables Required

| variable name  | prod or dev | required value |
| :------------: | :---------: | :------------: |
|   FLASK_ENV    |     dev     |  development   |
| JWT_SECRET_KEY |    both     |       -        |
| DB_PASSWORD |    both     |       -        |
| DB_USER |    both     |       -        |
|    DB_NAME   |    both     |       -        |
| DB_HOST |    both     |       -        |
| DB_PORT |    both     |       -        |

-   The mysql credentials should match the db created in the previous step
-   Create a file called `.env` in the root of the application. It should look something like (fill the `...`'s with actual values):

    ```
    FLASK_ENV=development
    JWT_SECRET_KEY=...

    MYSQL_PASSWORD=...
    MYSQL_USERNAME=...
    MYSQL_SERVER=...
    MYSQL_DB=...
    ```

-   Make sure the secret key is a long random string. You can generate it by typing the following lines in the python shell:
    ```python
    import secrets
    print(secrets.token_urlsafe(64))
    ```

## Build the frontend

-   Go into the 'frontend' folder and run the command `npm run build`.

## Run the Server

-   In the root folder of the project, run the command `flask run`.
-   This should start a development server.

## React Development Server

-   The flask server runs at `localhost:5000`. If you build the frontend, flask will serve the build at `localhost:5000/`.
-   If you are editing the frontend and want to see the changes updated automatically, run `npm start` in the 'frontend' folder.
-   This will create a react development server running at `localhost:3000`.
-   This will be rerun at every save in a react file, so you can develop easily.

## Makefile

-   These steps have been simplified in the makefile.
-   This is yet to be fully implemented.
-   Once it will be, running the command `new-setup` will do most of the work.
