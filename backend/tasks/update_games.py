import asyncio
from datetime import datetime, timezone

import database
import httpx
from main import logging

HTTPX_TIMEOUT = 30
BASE_URL = 'https://www.cheapshark.com/api/1.0/deals'
PAGE_SIZE = 60
STORE_ID = 1  # Steam


async def insert_page(conn, games):
    for game in games:
        if game['steamAppID'] is None:
            logging.warning(
                f'Пропyщена игра: {game["title"]} - отсутствует steam app id'
            )
            continue

        await conn.execute(
            """
            insert into games (
                steam_app_id,
                name,
                price,
                discounted_price,
                updated_at,
                url,
                discount_percent,
                steam_rating_percent
            )
            values ($1, $2, $3, $4, now(), $5, $6, $7)

            on conflict (steam_app_id)
            do update set
                name = excluded.name,
                price = excluded.price,
                discounted_price = excluded.discounted_price,
                updated_at = now(),
                url = excluded.url,
                discount_percent = excluded.discount_percent,
                steam_rating_percent = excluded.steam_rating_percent 
            """,
            int(game['steamAppID']),
            game['title'],
            game['normalPrice'],
            game['salePrice'],
            game['thumb'],
            round(float(game['savings'])),
            int(game['steamRatingPercent']),
        )


async def get_page(client, pageNumber):
    response = await client.get(
        BASE_URL,
        params={'storeID': STORE_ID, 'pageNumber': pageNumber, 'pageSize': PAGE_SIZE},
    )

    response.raise_for_status()
    return response


async def update_games():
    logging.info('Началось обновление игр')

    started_at = datetime.now(timezone.utc)

    async with httpx.AsyncClient(
        headers={'User-Agent': 'SteamDeals/1.0'}, timeout=HTTPX_TIMEOUT
    ) as client:
        response = await get_page(client, 0)
        total_pages = int(response.headers['X-Total-Page-Count'])

        async with database.pool.acquire() as conn:
            await insert_page(conn, response.json())

            for page in range(1, total_pages + 1):
                response = await get_page(client, page)
                await insert_page(conn, response.json())
                await asyncio.sleep(1)

            await conn.execute('DELETE FROM games WHERE updated_at < $1', started_at)

    logging.info('Обновление игр завершено')
