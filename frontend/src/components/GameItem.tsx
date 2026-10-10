import styles from '../styles/gameItem.module.css'
import fallbackImage from '../assets/fallbackImage.png'
import type { Game } from '../types/game'

function GameItem({
    name,
    price,
    discounted_price,
    url,
    discount_percent,
}: Game) {
    return (
        <li>
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
                    <span className={styles.discountpercent}>
                        -{discount_percent}%
                    </span>
                </div>
            </div>
        </li>
    )
}

export default GameItem
