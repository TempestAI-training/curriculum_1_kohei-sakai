from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
import os
import ssl

ASYNC_DB_URL = os.getenv("DATABASE_URL")

ssl_context = ssl.create_default_context()

async_engine = create_async_engine(
    ASYNC_DB_URL,
    echo=True,
    connect_args={"ssl": ssl_context},
    pool_pre_ping=True
)
async_session = sessionmaker(
    autocommit=False, autoflush=False, bind=async_engine, class_=AsyncSession
)

Base = declarative_base()


async def get_db():
    async with async_session() as session:
        yield session