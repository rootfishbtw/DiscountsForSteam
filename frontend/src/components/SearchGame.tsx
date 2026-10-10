import type { FormEvent } from 'react'
import styles from '../styles/searchGame.module.css'

interface SearchGameProps {
    handlerSubmit: (e: FormEvent<HTMLFormElement>) => void
    onChangeInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void
    inputValue: string
}

function SearchGame({
    handlerSubmit,
    onChangeInputValue,
    inputValue,
}: SearchGameProps) {
    return (
        <form
            className={styles.formSearchGame}
            onSubmit={(e) => handlerSubmit(e)}
        >
            <label>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#828e9c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-search"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                </svg>
                <input
                    placeholder="Поиск игр..."
                    onChange={onChangeInputValue}
                    value={inputValue}
                />
            </label>

            <button className={styles.btnOpenFilter}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e0e5eb"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-adjustments-horizontal"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M16 6l4 0" />
                    <path d="M4 6l8 0" />
                    <path d="M6 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M4 12l2 0" />
                    <path d="M10 12l10 0" />
                    <path d="M15 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M4 18l11 0" />
                    <path d="M19 18l1 0" />
                </svg>
                <span>Сортировка</span>
            </button>
        </form>
    )
}

export default SearchGame
