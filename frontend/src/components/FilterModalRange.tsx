import { useState } from "react"
import styles from "../styles/filterModal.module.css"

interface FilterModalRangeProps {
    symbol: string
    title: string
    textPlaceholder: [string, string]
}

function FilterModalRange({
    symbol,
    title,
    textPlaceholder,
}: FilterModalRangeProps) {
    const [inputValueFirst, setInputValueFirst] = useState("")
    const [inputValueSecond, setInputValueSecond] = useState('')

    function handlerChange(
        e: React.ChangeEvent<HTMLInputElement>,
        setInputValue: React.Dispatch<React.SetStateAction<string>>,
    ) {
        if (/^(\d+)?(\.\d*)?$/.test(e.target.value)) {
            setInputValue(e.target.value)
        }
    }

    return (
        <section className={styles.containerRange}>
            <div
                className={`${styles.containerTitle} ${styles.titleInTheMain}`}
            >
                <span>{title}</span>
            </div>

            <div className={`${styles.range} ${styles.price}`}>
                <div className={styles.inputs}>
                    <span>Oт</span>
                    <label>
                        <input
                            type="text"
                            placeholder={textPlaceholder[0]}
                            value={inputValueFirst}
                            onChange={(e) => handlerChange(e, setInputValueFirst)}
                        />
                        <span>{symbol}</span>
                    </label>
                </div>

                <div className={styles.inputs}>
                    <span>До</span>
                    <label>
                        <input
                            type="text"
                            placeholder={textPlaceholder[1]}
                            value={inputValueSecond}
                            onChange={(e) => handlerChange(e, setInputValueSecond)}
                        />
                        <span>{symbol}</span>
                    </label>
                </div>
            </div>
        </section>
    )
}

export default FilterModalRange
