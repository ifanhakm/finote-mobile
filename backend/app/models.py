from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
import enum
from datetime import datetime

# === ENUM Definitions ===
class UserRole(str, enum.Enum):
    mahasiswa = "mahasiswa"
    pekerja = "pekerja"
    rumah_tangga = "rumah_tangga"

class LifeStyle(str, enum.Enum):
    hemat = "hemat"
    sedang = "sedang"
    konsumtif = "konsumtif"

class TransactionType(str, enum.Enum):
    pemasukan = "pemasukan"
    pengeluaran = "pengeluaran"

class NotificationType(str, enum.Enum):
    info = "info"
    warning = "warning"
    alert = "alert"

# === MODELS ===

# USER
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    income = Column(Float, nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    dependents = Column(Integer, default=0)
    lifestyle = Column(Enum(LifeStyle), nullable=False)

    transactions = relationship("Transaction", back_populates="user", cascade="all, delete-orphan")
    budgets = relationship("Budget", back_populates="user", cascade="all, delete-orphan")
    recommendations = relationship("Recommendation", back_populates="user", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")

# TRANSACTION
class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    date = Column(Date, nullable=False)
    amount = Column(Float, nullable=False)
    type = Column(Enum(TransactionType), nullable=False)
    category = Column(String(100), nullable=False)
    description = Column(String(255), nullable=True)

    user = relationship("User", back_populates="transactions")

# BUDGET
class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category = Column(String(100), nullable=False)
    limit_manual = Column(Float, default=0.0)
    limit_fuzzy = Column(Float, default=0.0)

    user = relationship("User", back_populates="budgets")

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category = Column(String(100), nullable=False)
    fuzzy_score = Column(Float, nullable=False)
    priority_level = Column(String(50), nullable=False)
    time = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="recommendations")


# NOTIFICATION
class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    type = Column(Enum(NotificationType), default=NotificationType.info)
    message = Column(String(255), nullable=False)
    time = Column(DateTime, default=datetime.utcnow)
    read = Column(Boolean, default=False)

    user = relationship("User", back_populates="notifications")

# PRIORITY
class Recommendation(Base):
    __tablename__ = "recommendations"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category = Column(String(100), nullable=False)
    fuzzy_score = Column(Float, nullable=False)
    priority_level = Column(String(50), nullable=False)  # tetap simpan label hasil, e.g. "hemat"
    time = Column(DateTime, default=datetime.utcnow)

    # === Tambahkan kolom priority ===
    priority = Column(String(20), nullable=False, default="sekunder")
    # ==================================

    user = relationship("User", back_populates="recommendations")
