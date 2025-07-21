from fastapi import FastAPI
from app.database import engine
from app.models import Base 
from app.routers import users, transactions, budgets, recommendations, notifications, fuzzy

app = FastAPI()
app.include_router(fuzzy.router)
app.include_router(users.router)
app.include_router(transactions.router)
app.include_router(budgets.router)
app.include_router(recommendations.router)
app.include_router(notifications.router)

@app.on_event("startup")
async def startup():
    # Membuat tabel otomatis jika belum ada
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get("/")
def read_root():
    return {"message": "Connected to PostgreSQL via Neon"}
