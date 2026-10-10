import styles from '../styles/gameSkeleton.module.css'

function GameSkeleton() {
    const el = []

    for (let i = 0; i < 60; i++) {
        el.push(<li key={i}></li>)
    }

    return <ul className={styles.skeletonGames}>{el}</ul>
}

export default GameSkeleton
