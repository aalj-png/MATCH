from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Match, User
from app.schemas import MatchCreate, MatchResponse, MatchUpdate, MatchDetailResponse
from app.routers.auth import get_current_user

router = APIRouter(prefix="/api/matches", tags=["matches"])

@router.get("", response_model=List[MatchDetailResponse])
def get_matches(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    status: str = Query(None),
    db: Session = Depends(get_db)
):
    """Get all matches with pagination"""
    query = db.query(Match)
    
    if status:
        query = query.filter(Match.status == status)
    
    matches = query.offset(skip).limit(limit).all()
    return matches

@router.get("/{match_id}", response_model=MatchDetailResponse)
def get_match(match_id: int, db: Session = Depends(get_db)):
    """Get a specific match by ID"""
    match = db.query(Match).filter(Match.id == match_id).first()
    
    if not match:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Match not found"
        )
    
    return match

@router.post("", response_model=MatchDetailResponse)
def create_match(
    match: MatchCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new match"""
    db_match = Match(
        title=match.title,
        team_a=match.team_a,
        team_b=match.team_b,
        date=match.date,
        location=match.location,
        description=match.description,
        created_by_id=current_user.id
    )
    
    db.add(db_match)
    db.commit()
    db.refresh(db_match)
    
    return db_match

@router.put("/{match_id}", response_model=MatchDetailResponse)
def update_match(
    match_id: int,
    match_update: MatchUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a match"""
    db_match = db.query(Match).filter(Match.id == match_id).first()
    
    if not db_match:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Match not found"
        )
    
    if db_match.created_by_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only update your own matches"
        )
    
    update_data = match_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_match, field, value)
    
    db.add(db_match)
    db.commit()
    db.refresh(db_match)
    
    return db_match

@router.delete("/{match_id}")
def delete_match(
    match_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a match"""
    db_match = db.query(Match).filter(Match.id == match_id).first()
    
    if not db_match:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Match not found"
        )
    
    if db_match.created_by_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own matches"
        )
    
    db.delete(db_match)
    db.commit()
    
    return {"message": "Match deleted successfully"}

@router.get("/user/{user_id}", response_model=List[MatchDetailResponse])
def get_user_matches(
    user_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Get all matches created by a user"""
    matches = db.query(Match).filter(Match.created_by_id == user_id).offset(skip).limit(limit).all()
    return matches
