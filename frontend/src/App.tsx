import { useEffect, useState, type FormEvent } from 'react'

import Header from './components/Header'
import SearchGame from './components/SearchGame'
import GameList from './components/GameList'
import Pagination from './components/Pagination'
import GameSkeleton from './components/GameSkeleton'

import { useGames } from './hooks/useGames'

function App() {
    const [page, setPage] = useState(1)
    const [previousPage, setPreviousPage] = useState(1)

    const [inputValue, setInputValue] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const { games, totalPage, loading } = useGames(page, searchValue)

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setSearchValue(inputValue)
            if (inputValue == '') {
                return
            }

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

    function onChangeInputValue(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value)
        if (event.target.value == '') {
            setPage(previousPage)
        }
    }

    return (
        <>
            <Header page={page} />
            <SearchGame
                handlerSubmit={handlerSubmit}
                onChangeInputValue={onChangeInputValue}
                inputValue={inputValue}
            />

            {loading ? <GameSkeleton /> : <GameList games={games} />}

            <Pagination
                onSetPage={onSetPage}
                page={page}
                totalPage={totalPage}
            />
        </>
    )
}

export default App
