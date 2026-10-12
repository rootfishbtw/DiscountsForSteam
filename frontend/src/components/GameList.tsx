import styles from '../styles/gameList.module.css'
import type { Game } from '../types/game'
import GameItem from './GameItem'

interface GameListProps {
    games: Game[]
}

function GameList({ games }: GameListProps) {
    return (
        <ul className={games.length ? styles.gameList : styles.gameListNoItem}>
            {games.length
                ? games.map((game) => (
                <GameItem
                    key={game.steam_app_id}
                    name={game.name}
                    price={game.price}
                    discounted_price={game.discounted_price}
                    url={game.url}
                    discount_percent={game.discount_percent}
                    steam_rating_percent={game.steam_rating_percent}
                    steam_app_id={game.steam_app_id}
                />
                ))
                : <span className={styles.noItem}>¯\_(ツ)_/¯</span>
            }
        </ul>
    )
}

export default GameList
