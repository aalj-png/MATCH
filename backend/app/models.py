from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    full_name = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    matches = relationship("Match", back_populates="created_by")

class Match(Base):
    __tablename__ = "matches"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    team_a = Column(String)
    team_b = Column(String)
    date = Column(DateTime)
    location = Column(String)
    status = Column(String, default="scheduled")  # scheduled, ongoing, completed
    score_a = Column(Integer, default=0)
    score_b = Column(Integer, default=0)
    description = Column(String, nullable=True)
    created_by_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    created_by = relationship("User", back_populates="matches")
