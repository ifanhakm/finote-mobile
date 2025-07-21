from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app import models, schemas, database

router = APIRouter(
    prefix="/budgets",
    tags=["Budgets"]
)

@router.post("/", response_model=schemas.BudgetOut)
async def create_budget(budget: schemas.BudgetCreate, db: AsyncSession = Depends(database.get_db)):
    bgt = models.Budget(**budget.dict())
    db.add(bgt)
    await db.commit()
    await db.refresh(bgt)
    return bgt
