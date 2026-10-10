export interface Game {
    steam_app_id?: number
    name: string
    price: number
    discounted_price: number
    url: string
    discount_percent: number
    steam_rating_percent?: number
}

export interface GamesResponse {
    games: Game[]
    page: number
    limit: number
    total: number
}
