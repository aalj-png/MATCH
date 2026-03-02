from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class MatchBase(BaseModel):
    title: str
    team_a: str
    team_b: str
    date: datetime
    location: str
    description: Optional[str] = None

class MatchCreate(MatchBase):
    pass

class MatchUpdate(BaseModel):
    title: Optional[str] = None
    team_a: Optional[str] = None
    team_b: Optional[str] = None
    date: Optional[datetime] = None
    location: Optional[str] = None
    status: Optional[str] = None
    score_a: Optional[int] = None
    score_b: Optional[int] = None
    description: Optional[str] = None

class MatchResponse(MatchBase):
    id: int
    status: str
    score_a: int
    score_b: int
    created_by_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class MatchDetailResponse(MatchResponse):
    created_by: UserResponse
