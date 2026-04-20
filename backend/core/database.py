from supabase import create_client, Client
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from .config import settings

# --- Supabase Python Client Setup ---
supabase: Client = create_client(settings.supabase_url, settings.supabase_key)

# --- SQLAlchemy Setup (only if DATABASE_URL is provided) ---
Base = declarative_base()
engine = None
SessionLocal = None

if settings.database_url:
    db_url = settings.database_url

    # Convert postgresql:// to postgresql+psycopg2://
    if db_url.startswith("postgresql://"):
        db_url = db_url.replace("postgresql://", "postgresql+psycopg2://", 1)

    engine = create_engine(
        db_url,
        pool_pre_ping=True,
        connect_args={"connect_timeout": 10},
    )
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    if SessionLocal is None:
        raise RuntimeError("DATABASE_URL not configured")
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
