from fastapi import FastAPI
from db import get_connection
from models import User, CreateUser, Category, CreateCategory, Transaction, CreateTransaction
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
    cur.execute("SELECT id, username, name, password_hash, income, expenses FROM users;")
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
            INSERT INTO users (username, name, password_hash, income, expenses)
            VALUES (%s, %s, %s, %s)
            RETURNING id;
        """, (user.username, user.name, hashed, user.income, user.expenses))

        new_id = cur.fetchone()["id"]
        conn.commit()

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))

    finally:
        cur.close()
        conn.close()

    return {"message": "User created", "id": new_id}


@app.get("/categories", response_model=list[Category])
def get_categories():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM categories;")
    categories = cur.fetchall()
    cur.close()
    conn.close()
    return categories


@app.post("/categories", status_code=201)
def create_category(category: CreateCategory):
    conn = get_connection()
    cur = conn.cursor()

    try:
        cur.execute("""
            INSERT INTO categories (name, description, color, icon, budget, recurrence_type, recurrence_interval)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
        """, (category.name, category.description, category.color, category.icon, category.budget, category.recurrence_type, category.recurrence_interval))

        new_id = cur.fetchone()["id"]
        conn.commit()

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))

    finally:
        cur.close()
        conn.close()

    return {"message": "Category created", "id": new_id}


@app.get("/transactions", response_model=list[Transaction])
def get_transactions():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM transactions;")
    transactions = cur.fetchall()
    cur.close()
    conn.close()
    return transactions


@app.post("/transactions", status_code=201)
def create_transaction(transaction: CreateTransaction):
    conn = get_connection()
    cur = conn.cursor()

    try:
        cur.execute("""
            INSERT INTO transactions (amount, start_date, end_date, description, category_id, recurrence_type, recurrence_interval, type)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING tid;
        """, (transaction.amount, transaction.start_date, transaction.end_date, transaction.description, transaction.category_id, transaction.recurrence_type, transaction.recurrence_interval, transaction.type))

        new_id = cur.fetchone()["tid"]
        conn.commit()

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))

    finally:
        cur.close()
        conn.close()

    return {"message": "Transaction created", "id": new_id}


@app.get("/users/{user_id}/dashboard")
def get_user_dashboard(user_id: int):
    conn = get_connection()
    cur = conn.cursor()
    
    # Get user
    cur.execute("SELECT id, username, name, income, expenses FROM users WHERE id = %s;", (user_id,))
    user = cur.fetchone()
    
    # Get categories
    cur.execute("SELECT * FROM categories WHERE user_id = %s;", (user_id,))
    categories = cur.fetchall()
    
    # Get transactions
    cur.execute("SELECT * FROM transactions WHERE user_id = %s ORDER BY transaction_date DESC;", (user_id,))
    transactions = cur.fetchall()
    
    # # Calculate balance
    # cur.execute("SELECT SUM(amount) as balance FROM transactions WHERE user_id = %s;", (user_id,))
    # balance_result = cur.fetchone()
    # balance = balance_result['balance'] if balance_result['balance'] else 0
    
    cur.close()
    conn.close()
    
    return {
        "user": user,
        "categories": categories,
        "transactions": transactions
    }


@app.get("/users/{user_id}/transactions")
def get_user_transactions(user_id: int):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT * FROM transactions WHERE user_id = %s ORDER BY start_date DESC;", (user_id,))
        transactions = cur.fetchall()
        cur.close()
        conn.close()
        return transactions
    except Exception as e:
        cur.close()
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@app.get("/users/{user_id}/categories")
def get_user_categories(user_id: int):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT * FROM categories WHERE user_id = %s;", (user_id,))
        categories = cur.fetchall()
        cur.close()
        conn.close()
        return categories
    except Exception as e:
        cur.close()
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")