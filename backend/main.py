from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from pydantic import BaseModel
from typing import Optional

from core.database import get_db, supabase
import models  # ← registers all models with SQLAlchemy Base

app = FastAPI(title="Decode Backend", description="FastAPI Backend for Decode App with Supabase")


# --- Pydantic schema: what the request body looks like ---
class ReviewCreate(BaseModel):
    text: str
    rating: Optional[int] = None
    sentiment: Optional[str] = None  # "positive", "negative", "neutral"


# ✅ Root
@app.get("/")
def read_root():
    return {"message": "Welcome to the Decode API!"}


# ✅ Health check
@app.get("/health")
def health_check():
    status = {"api": "ok", "supabase_client": "unknown"}
    try:
        supabase.auth.get_session()
        status["supabase_client"] = "ok"
    except Exception as e:
        status["supabase_client"] = f"error: {str(e)}"
    return status


# ✅ POST /reviews — Save a review to Supabase
@app.post("/reviews")
def create_review(review: ReviewCreate):
    """
    Saves a review to the Supabase 'reviews' table.
    You can see it appear live in Supabase → Table Editor → reviews
    """
    try:
        result = supabase.table("reviews").insert({
            "text": review.text,
            "rating": review.rating,
            "sentiment": review.sentiment,
        }).execute()

        return {"message": "Review saved to Supabase!", "data": result.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ✅ GET /reviews — Fetch all reviews from Supabase
@app.get("/reviews")
def get_reviews():
    """
    Fetches all reviews from the Supabase 'reviews' table.
    """
    try:
        result = supabase.table("reviews").select("*").order("created_at", desc=True).execute()
        return {"reviews": result.data, "count": len(result.data)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
