from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app import models, schemas, database

router = APIRouter(
    prefix="/transactions",
    tags=["Transactions"]
)

@router.post("/", response_model=schemas.TransactionOut)
async def create_transaction(tx: schemas.TransactionCreate, db: AsyncSession = Depends(database.get_db)):
    trx = models.Transaction(**tx.dict())
    db.add(trx)
    await db.commit()
    await db.refresh(trx)
    return trx

@router.get("/user/{user_id}", response_model=list[schemas.TransactionOut])
async def get_transactions(user_id: int, db: AsyncSession = Depends(database.get_db)):
    result = await db.execute(select(models.Transaction).where(models.Transaction.user_id == user_id))
    return result.scalars().all()
