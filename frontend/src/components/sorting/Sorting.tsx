import styles from '../../styles/sorting.module.css'
import SortOption from './SortOption'

interface SortingProps {
    isOpenSort: boolean
    onSetIsOpenSort: (e: React.MouseEvent<HTMLDivElement>) => void
    sortValue: number
    onSetSortValue: (value: number) => void
}

function Sorting({
    isOpenSort,
    onSetIsOpenSort,
    sortValue,
    onSetSortValue,
}: SortingProps) {
    return (
        <section
            onClick={onSetIsOpenSort}
            className={`${styles.containerSorting} ${isOpenSort ? styles.view : undefined}`}
        >
            <form className={styles.form} onClick={(e) => e.stopPropagation()}>
                <header className={styles.header}>Сортировка</header>

                <ul className={styles.items}>
                    <SortOption
                        title="Цена: по возрастанию"
                        value={1}
                        checked={sortValue === 1}
                        onChange={onSetSortValue}
                    />
                    <SortOption
                        title="Цена: по убыванию"
                        value={2}
                        checked={sortValue === 2}
                        onChange={onSetSortValue}
                    />
                    <span className={styles.separator}></span>
                    <SortOption
                        title="Скидка: по возрастанию"
                        value={3}
                        checked={sortValue === 3}
                        onChange={onSetSortValue}
                    />
                    <SortOption
                        title="Скидка: по убыванию"
                        value={4}
                        checked={sortValue === 4}
                        onChange={onSetSortValue}
                    />
                    <span className={styles.separator}></span>
                    <SortOption
                        title="Рейтинг Steam: по возрастанию"
                        value={5}
                        checked={sortValue === 5}
                        onChange={onSetSortValue}
                    />
                    <SortOption
                        title="Рейтинг Steam: по убыванию"
                        value={6}
                        checked={sortValue === 6}
                        onChange={onSetSortValue}
                    />
                </ul>
            </form>
        </section>
    )
}

export default Sorting
