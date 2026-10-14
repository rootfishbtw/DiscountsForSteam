import asyncio
from contextlib import asynccontextmanager

import database
from database import close_db, connect_db
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from tasks.scheduler import scheduler


@asynccontextmanager
async def lifespan(app: FastAPI):

    await connect_db()
    task = asyncio.create_task(scheduler())

    yield

    task.cancel()
    await close_db()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'https://rootfishbtw.github.io',
    ],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

sort_type = {
    1: 'discounted_price DESC',
    2: 'discounted_price ASC',
    3: 'discount_percent DESC',
    4: 'discount_percent ASC',
    5: 'steam_rating_percent DESC',
    6: 'steam_rating_percent ASC',
}

@app.get('/ping') 
async def ping():
    return {'ok'}

@app.get('/games')
async def games(
    search: str | None = None,
    sort: int = Query(1, ge=1, le=6),
    page: int = Query(1, ge=1),
    limit: int = Query(60, ge=1, le=60),
):
    order_by_clause = sort_type[sort]
    
    has_search = bool(search and search.strip())

    async with database.pool.acquire() as conn:
        games_record = await conn.fetch(
            f"""
            SELECT  
                steam_app_id, 
                name,  
                price,  
                discounted_price, 
                updated_at, 
                url, 
                discount_percent, 
                steam_rating_percent 
            FROM games 
            WHERE ($2 = FALSE OR name % $1) 
            ORDER BY {order_by_clause} 
            LIMIT $3 
            OFFSET $4
            """,
            search,
            has_search,
            limit,
            (page - 1) * limit,
        )

        total = await conn.fetch('SELECT COUNT(*) FROM games WHERE ($2 = FALSE OR name % $1)', search, bool(len(search)))

    games = [dict(record) for record in games_record]

    return {
        'games': games,
        'page': page,
        'limit': limit,
        'total': total[0]['count'],
    }
