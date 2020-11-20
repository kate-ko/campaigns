import csv
import json
import sqlite3
import logging
from flask import Flask, render_template, request, g, jsonify

app = Flask(__name__, static_url_path='', static_folder='static')
DATABASE = "database.db"
COLUMNS = ["name", "daily_spend", "is_accelerated_daily_spend", "creative_url", "daily_frequency_capping", "priority", "bid_cpm"]


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


def query_db(query, args=(), one=False):
    db = get_db()
    db.row_factory = dict_factory
    cur = db.execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


@app.route('/campaigns')
def campaigns():
    return jsonify(query_db("select * from campaigns"))


@app.route('/new_campaign', methods=['POST'])
def new_campaigns():
    try:
        request_data = request.get_json()
        if request_data is None:
            raise Exception("missing request json")

        db = get_db()
        cur = db.cursor()
        columns_str = ", ".join(COLUMNS)
        columns_input_str = ", ".join("?" * len(COLUMNS))
        values = [request_data[c] for c in COLUMNS]

        cur.execute(f"INSERT INTO campaigns({columns_str}) VALUES({columns_input_str});", values)

        db.commit()

        cur.close()

        return jsonify({"ok": True}), 200
    except Exception as e:
        logging.exception("error!")
        return jsonify({"ok": False, "error": f"{type(e).__name__}: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
