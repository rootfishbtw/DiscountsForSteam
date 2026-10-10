import styles from '../styles/pagination.module.css'

interface PaginationProps {
    onSetPage: (action: number) => void
    page: number
    totalPage: number
}

function Pagination({ onSetPage, page, totalPage }: PaginationProps) {
    return (
        <section className={styles.pagination}>
            <button className={styles.arrow} onClick={() => onSetPage(-1)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={page - 1 <= 0 ? undefined : styles.active}
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M5 12l6 6" />
                    <path d="M5 12l6 -6" />
                </svg>
                <span className={page - 1 <= 0 ? undefined : styles.active}>
                    Пребедущая
                </span>
            </button>

            <div className={styles.countPage}>{page}</div>

            <button className={styles.arrow} onClick={() => onSetPage(1)}>
                <span
                    className={
                        page + 1 < totalPage / 59 ? styles.active : undefined
                    }
                >
                    Следующая
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={
                        page + 1 < totalPage / 59 ? styles.active : undefined
                    }
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M13 18l6 -6" />
                    <path d="M13 6l6 6" />
                </svg>
            </button>
        </section>
    )
}

export default Pagination
