import type { GamesResponse } from '../types/game'

export async function fetchGames(
    page: number,
    limit: number,
    search: string,
    sort: number
): Promise<GamesResponse> {
    const response = await fetch(
        `http://127.0.0.1:8000/games?page=${page}&limit=${limit}&search=${search}&sort=${sort}`,
    )

    if (!response.ok) {
        throw new Error('Failed to fetch games')
    }

    return response.json()
}
