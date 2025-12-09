from fastapi import FastAPI
from db import get_connection
from models import User, CreateUser
import bcrypt
from fastapi import HTTPException

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Budget App API"}

@app.get("/users", response_model=list[User])
def get_users():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, username, name, password_hash FROM users;")
    users = cur.fetchall()
    cur.close()
    conn.close()
    return users


@app.post("/users", status_code=201)
def create_user(user: CreateUser):
    conn = get_connection()
    cur = conn.cursor()

    hashed = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    try:
        cur.execute("""
            INSERT INTO users (username, name, password_hash)
            VALUES (%s, %s, %s)
            RETURNING id;
        """, (user.username, user.name, hashed))

        new_id = cur.fetchone()["id"]
        conn.commit()

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))

    finally:
        cur.close()
        conn.close()

    return {"message": "User created", "id": new_id}