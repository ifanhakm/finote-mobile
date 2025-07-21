from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from app.fuzzy_logic import fuzzy_system
from app import schemas, models, database 
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime

router = APIRouter(prefix="/fuzzy", tags=["fuzzy"])

class FuzzyRequest(BaseModel):
    income: float = Field(gt=0)
    expense: float = Field(ge=0)
    user_id: int = Field(gt=0)
    category: str
    priority: str = Field(..., description="primer|sekunder|tersier")

@router.post("/status", response_model=schemas.RecommendationOut)  # now schemas is defined
async def get_fuzzy_status(data: FuzzyRequest, db: AsyncSession = Depends(database.get_db)):
    if data.expense > data.income * 2:
        raise HTTPException(status_code=400, detail="Pengeluaran tidak realistis.")

    # Hitung fuzzy
    score, label = fuzzy_system(data.income, data.expense, data.priority)

    # Simpan ke database
    new_rec = models.Recommendation(
        user_id=data.user_id,
        category=data.category,
        fuzzy_score=score,
        priority_level=label,
        time=datetime.utcnow(),
        priority=data.priority
    )
    db.add(new_rec)
    await db.commit()
    await db.refresh(new_rec)

    return new_rec
