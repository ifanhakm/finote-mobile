from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from enum import Enum
from datetime import date, datetime

# ==== ENUMS ====
class UserRole(str, Enum):
    mahasiswa = "mahasiswa"
    pekerja = "pekerja"
    rumah_tangga = "rumah_tangga"

class LifeStyle(str, Enum):
    hemat = "hemat"
    sedang = "sedang"
    konsumtif = "konsumtif"

class TransactionType(str, Enum):
    pemasukan = "pemasukan"
    pengeluaran = "pengeluaran"

class NotificationType(str, Enum):
    info = "info"
    warning = "warning"
    alert = "alert"

# ==== USER ====
class UserBase(BaseModel):
    name: str
    email: EmailStr
    income: float
    role: UserRole
    dependents: int
    lifestyle: LifeStyle

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int

    class Config:
        orm_mode = True

# ==== TRANSACTION ====
class TransactionBase(BaseModel):
    date: date
    amount: float
    type: TransactionType
    category: str
    description: Optional[str] = None

class TransactionCreate(TransactionBase):
    user_id: int

class TransactionOut(TransactionBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

# ==== BUDGET ====
class BudgetBase(BaseModel):
    category: str
    limit_manual: float
    limit_fuzzy: float

class BudgetCreate(BudgetBase):
    user_id: int

class BudgetOut(BudgetBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

class RecommendationBase(BaseModel):
    category: str
    fuzzy_score: float
    priority_level: str
    time: Optional[datetime] = None
    # === baru ===
    priority: str  # "primer", "sekunder", atau "tersier"
    # ============

class RecommendationCreate(RecommendationBase):
    user_id: int

class RecommendationOut(RecommendationBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

# ==== NOTIFICATION ====
class NotificationBase(BaseModel):
    type: NotificationType
    message: str
    time: Optional[datetime] = None
    read: bool = False

class NotificationCreate(NotificationBase):
    user_id: int

class NotificationOut(NotificationBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True