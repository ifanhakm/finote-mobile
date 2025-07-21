from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app import models, schemas, database

router = APIRouter(
    prefix="/notifications",
    tags=["Notification"]
)

@router.post("/", response_model=schemas.NotificationOut)
async def create_notification(data: schemas.NotificationCreate, db: AsyncSession = Depends(database.get_db)):
    notif = models.Notification(**data.dict())
    db.add(notif)
    await db.commit()
    await db.refresh(notif)
    return notif
