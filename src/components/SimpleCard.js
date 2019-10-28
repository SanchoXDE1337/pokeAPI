import {NavLink} from 'react-router-dom'
import firstLetterCapitalize from '../functions/firstLetterCapitalize'
import React from 'react'

export const SimpleCard = ({name, imgLink, className, id}) => {
    return (
        <NavLink to={`/pokeAPI/pokemon/${id}`} className={className}>
            <div>
                <p>{firstLetterCapitalize(name)}</p>
                <img src={imgLink} alt={name}/>
            </div>
        </NavLink>
    )
}