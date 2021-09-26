import React from "react";
import Person from "./Person";
import {PersonParam} from "../App";


interface Props {
    persons: PersonParam[]
    onClick: (id: string, name: string, number: string) => void
}

function Persons({persons, onClick}: Props) {
    return (
        <>
            {
                persons.map(person =>
                    <Person key={person.id}
                            name={person.name} number={person.number}
                            onDelete={() => {
                                onClick(person.id, person.name, person.number)
                            }}
                    />)
            }
        </>
    )
}

export default Persons