import React from "react";


interface Props {
    name: string,
    number: string,
    onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function Person({name, number, onDelete}: Props) {
    return (
        <>
            <p>
                {name}: {number} <button onClick={onDelete}>Delete</button>
            </p>
        </>
    )
}

export default Person