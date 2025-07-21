from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app import models, schemas, database

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendation"]
)

@router.post("/", response_model=schemas.RecommendationOut)
async def add_recommendation(data: schemas.RecommendationCreate, db: AsyncSession = Depends(database.get_db)):
    rec = models.Recommendation(**data.dict())
    db.add(rec)
    await db.commit()
    await db.refresh(rec)
    return rec

@router.get("/user/{user_id}", response_model=list[schemas.RecommendationOut])
async def get_recommendations(user_id: int, db: AsyncSession = Depends(database.get_db)):
    result = await db.execute(select(models.Recommendation).where(models.Recommendation.user_id == user_id))
    return result.scalars().all()
