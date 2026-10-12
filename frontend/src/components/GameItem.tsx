import styles from '../styles/gameItem.module.css'
import fallbackImage from '../assets/fallbackImage.png'
import type { Game } from '../types/game'
import Star from './Star'

function getStars(percent: number) {
    if (percent >= 90) return 5
    if (percent >= 75) return 4
    if (percent >= 50) return 3
    if (percent >= 30) return 2
    return 1
}

function GameItem({
    steam_app_id,
    name,
    price,
    discounted_price,
    url,
    discount_percent,
    steam_rating_percent,
}: Game) {
    const totalStars = 5
    const activeStars = getStars(steam_rating_percent)

    return (
        <li>
            <a
                href={`https://store.steampowered.com/app/${steam_app_id}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src={url}
                    onError={(e) => {
                        const target = e.currentTarget
                        target.onerror = null
                        target.src = fallbackImage
                    }}
                />
                <div className={styles.info}>
                    <div className={styles.title}>{name}</div>

                    <div className={styles.containerPrice}>
                        <div className={styles.price}>
                            <span>{discounted_price}$</span> <del>{price}$</del>
                        </div>

                        <div className={styles.stars} title={`${steam_rating_percent}% положительных отзывов Steam`}>
                            {Array.from({ length: totalStars }).map(
                                (_, index) => (
                                    <Star
                                        key={index}
                                        type={
                                            index < activeStars
                                                ? 'default'
                                                : 'empty'
                                        }
                                    />
                                ),
                            )}
                        </div>
                    </div>
                </div>
                <span className={styles.discountpercent}>
                    -{discount_percent}%
                </span>
            </a>
        </li>
    )
}

export default GameItem
