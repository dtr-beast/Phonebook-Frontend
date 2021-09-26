import React from "react";

interface Props {
    value: string;
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

function Filter({value, onChange}: Props) {
    return <p>Filter Shown with <input type="text" value={value} onChange={onChange}/></p>;
}

export default Filter