from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import auth, matches

app = FastAPI(title="Match Management API", version="1.0.0")

# Create tables
Base.metadata.create_all(bind=engine)

# CORS middleware
origins = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(matches.router)

@app.get("/")
async def root():
    return {"message": "Match Management API - Running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}
