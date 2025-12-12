from pydantic import BaseModel

class User(BaseModel):
    id: int
    username: str
    name: str
    password_hash: str
    income: float
    expenses: float

class CreateUser(BaseModel):
    username: str
    name: str
    password: str
    income: float
    expenses: float

class Category(BaseModel):
    id: int
    name: str
    description: str | None = None
    user_id: int
    color: int
    icon: str
    budget: float
    recurrence_type: str
    recurrence_interval: int
    last_used: str | None = None

class CreateCategory(BaseModel):
    name: str
    description: str | None = None
    color: int
    icon: str
    budget: float
    recurrence_type: str
    recurrence_interval: int

class Transaction(BaseModel):
    tid: int
    category_id: int
    user_id: int
    type: bool
    amount: float
    description: str | None = None
    recurrence_type: str
    recurrence_interval: int
    start_date: str
    end_date: str | None = None
    created_at: str | None = None

class CreateTransaction(BaseModel):
    amount: float
    start_date: str
    end_date: str | None = None
    description: str | None = None
    category_id: int
    recurrence_type: str
    recurrence_interval: int
    type: bool

