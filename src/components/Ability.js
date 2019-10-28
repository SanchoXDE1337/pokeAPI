import React from 'react'
import firstLetterCapitalize from '../functions/firstLetterCapitalize'

export const Ability = ({name, effect}) => {
    return (
        <div className={"ability"}>
            <div className={"abilityName"}>{firstLetterCapitalize(name)}</div>
            <div>{effect}</div>
        </div>
    )
}