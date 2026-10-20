import type { GamesResponse } from '../types/game'

export async function fetchGames(
    page: number,
    limit: number,
    search: string,
    sort: number,
): Promise<GamesResponse> {
    const response = await fetch(
        `https://discountsforsteam.onrender.com/games?page=${page}&limit=${limit}&search=${search}&sort=${sort}`,
    )

    if (!response.ok) {
        throw new Error('Failed to fetch games')
    }

    return response.json()
}
