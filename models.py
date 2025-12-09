from pydantic import BaseModel

class User(BaseModel):
    id: int
    username: str
    name: str
    password_hash: str

class CreateUser(BaseModel):
    username: str
    name: str
    password: str
