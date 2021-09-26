import React from "react";

interface Props {
    onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
    onNameChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    nameValue: string;
    numValue: string;
    onNumberChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

function PersonForm({onSubmit, onNameChange, nameValue, onNumberChange, numValue}: Props) {
    return <form onSubmit={onSubmit}>
        <div>
            <div>
                Name: <input onChange={onNameChange} value={nameValue}/>
            </div>
            <div>
                Number: <input onChange={onNumberChange} value={numValue}/>
            </div>
        </div>
        <div>
            <button type="submit">Add</button>
        </div>
    </form>;
}

export default PersonForm