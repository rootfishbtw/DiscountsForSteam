import type { FormEvent } from "react"
import styles from "../styles/filterModal.module.css"
import FilterModalRange from "./FilterModalRange"

interface FilterModalProps {
    toggleFilter: () => void
    handlerSubmit: (e: FormEvent<HTMLFormElement>) => void
    isOpen: boolean
    maxDiscountedPrice: number
}

function FilterModal({
    toggleFilter,
    handlerSubmit,
    isOpen,
    maxDiscountedPrice,
}: FilterModalProps) {
    return (
        <div className={`${styles.filterModal} ${isOpen ? styles.open : ""}`}>
            <form
                className={styles.formFilters}
                onSubmit={(e) => handlerSubmit(e)}
            >
                <header>
                    <div className={styles.containerTitle}>
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
                        <span>Фильтры</span>
                    </div>

                    <button
                        onClick={toggleFilter}
                        className={styles.btnCloseFilter}
                    >
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
                            className="icon icon-tabler icons-tabler-outline icon-tabler-x"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                <main>
                    <FilterModalRange
                        symbol={"$"}
                        title={"Цена"}
                        textPlaceholder={["0", String(maxDiscountedPrice)]}
                    />
                    <FilterModalRange
                        symbol={"%"}
                        title={"% скидки"}
                        textPlaceholder={["0", "100"]}
                    />
                    <FilterModalRange
                        symbol={"%"}
                        title={"% позитивных отзывов"}
                        textPlaceholder={["0", "100"]}
                    />
                </main>

                <footer>
                    <button>
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
                            className="icon icon-tabler icons-tabler-outline icon-tabler-check"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                        </svg>
                        <span>Применить</span>
                    </button>
                </footer>
            </form>
        </div>
    )
}

export default FilterModal
