import os
import asyncpg
from dotenv import load_dotenv

pool: asyncpg.Pool | None = None


load_dotenv()

DATA_BASE_URL= os.environ.get('DATA_BASE_URL')


async def connect_db():
    global pool
    pool = await asyncpg.create_pool(DATA_BASE_URL)


async def close_db():
    global pool

    if pool:
        await pool.close()
