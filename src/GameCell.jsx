

export default function GameCell( {value} ) {


    return (
        <div className={value === 2 ? "bg-red-500 rounded-full" : value === 1 ? "bg-blue-500" : ""}>

        </div>
    )
}