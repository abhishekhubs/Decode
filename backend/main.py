from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from core.database import get_db, supabase

app = FastAPI(title="Decode Backend", description="FastAPI Backend for Decode App with Supabase")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Decode API!"}

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    """
    Health check endpoint to verify Supabase connections via both methods.
    """
    status = {
        "api": "ok",
        "supabase_client": "unknown",
        "database": "unknown"
    }

    # 1. Test Supabase Client connection (using a simple auth test or getting a table)
    try:
        # Just getting the auth user or making a simple query.
        # This might fail if RLS blocks it, but it proves the client is configured.
        res = supabase.auth.get_session()
        status["supabase_client"] = "ok"
    except Exception as e:
        status["supabase_client"] = f"error: {str(e)}"

    # 2. Test SQLAlchemy connection
    try:
        db.execute(text("SELECT 1"))
        status["database"] = "ok"
    except Exception as e:
        status["database"] = f"error: {str(e)}"

    if status["database"] != "ok":
        raise HTTPException(status_code=500, detail=status)

    return status

