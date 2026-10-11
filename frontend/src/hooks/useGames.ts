import { useEffect, useState } from "react"
import { fetchGames } from "../api/games"
import type { Game } from "../types/game"

export function useGames(page: number, search: string, sort: number) {
    const [games, setGames] = useState<Game[]>([])
    const [totalPage, setTotalPage] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadGames() {
            setLoading(true)

            try {
                const data = await fetchGames(page, 60, search, sort)

                setGames(data.games)
                setTotalPage(data.total)
            } finally {
                setLoading(false)
            }
        }

        loadGames()
    }, [page, search, sort])

    return {
        games,
        totalPage,
        loading,
    }
}
