import { useEffect, useState, type FormEvent } from 'react'

import Header from './components/Header'
import SearchGame from './components/SearchGame'
import GameList from './components/GameList'
import Pagination from './components/Pagination'
import GameSkeleton from './components/GameSkeleton'

import { useGames } from './hooks/useGames'
import Sorting from './components/sorting/Sorting'

function App() {
    const [page, setPage] = useState(1)
    const [previousPage, setPreviousPage] = useState(1)

    const [inputValue, setInputValue] = useState('')
    const [searchValue, setSearchValue] = useState('')

    const [sortValue, setSortValue] = useState(1)
    const [isOpenSort, setIsOpenSort] = useState(false)

    const { games, totalPage, loading } = useGames(page, searchValue, sortValue)


    console.log(sortValue)

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setSearchValue(inputValue)
            if (!inputValue) return
            setPage(1)
        }, 500)

        return () => {
            clearTimeout(timeOut)
        }
    }, [inputValue])

    function onSetPage(action: number) {
        if (page + action > 0 && page + action < totalPage / 59) {
            setPage(page + action)
            setPreviousPage(previousPage + action)
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        }
    }

    function handlerSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
    }

    function onChangeInputValue(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
        if (e.target.value == '') {
            setPage(previousPage)
        }
    }

    function onSetIsOpenSort() {
        setIsOpenSort(!isOpenSort)
    }

    function onSetSortValue(value: number) {
        setSortValue(value)
    }

    return (
        <>
            <Header page={page} />
            <SearchGame
                handlerSubmit={handlerSubmit}
                onChangeInputValue={onChangeInputValue}
                inputValue={inputValue}
                onSetIsOpenSort={onSetIsOpenSort}
            />

            {loading ? <GameSkeleton /> : <GameList games={games} />}

            <Pagination
                onSetPage={onSetPage}
                page={page}
                totalPage={totalPage}
            />

            <Sorting
                isOpenSort={isOpenSort}
                onSetIsOpenSort={onSetIsOpenSort}
                sortValue={sortValue}
                onSetSortValue={onSetSortValue}
            />
        </>
    )
}

export default App
