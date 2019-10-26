import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {BrowserRouter, Route, NavLink} from "react-router-dom"
import './App.css'

const SimpleCard = ({name, imgLink, className, url, id}) => {
    return (
        <NavLink to={`/pokemon/${id}`} className={className}>
            <div>
                <p>{name[0].toUpperCase() + name.slice(1)}</p>
                <img src={imgLink} alt={name}/>
            </div>
        </NavLink>
    )
}

const PokemonPage = ({url}) => {
    const [data, setData] = useState({})
    useEffect(() => {
        async function fetchData() {
            const result = await axios(url)
            await setData(result.data)
        }
        fetchData()
    }, )
    return (
        <div>
            {data.name}
            <NavLink to={`/`}>Back</NavLink>
        </div>
    )
}

class App extends React.Component {
    state = {
        pokemons: []
    }

    addCards = async () => {
        const data = await (await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"')).json()
        const results = data.results
        results.map(async ({name, url}) => {
            const result = await (await fetch(url)).json()
            const imgLink = result.sprites.front_default
            const id = result.id
            await this.setState({pokemons: [...this.state.pokemons, {name, url, imgLink, id}]})
        })
    }

    async componentDidMount () {
        await this.addCards()
    }

    render () {
        console.log(this.state)
        return (
            <BrowserRouter>
                <div className="App">
                    <header>Pokemon</header>
                    <div className='content'>
                        <Route exact path={`/`}
                               component={() => {
                                   return this.state.pokemons.map(({name, imgLink, url, id}) =>
                                       <SimpleCard
                                           className='card'
                                           name={name}
                                           url={url}
                                           key={name + imgLink}
                                           imgLink={imgLink}
                                           id={id}
                                       />
                                   )
                               }
                               }
                        />
                        {this.state.pokemons.map(({name, id, url}) =>
                            <Route path={`/pokemon/${id}`} key={id} render={() => <PokemonPage url={url}/>}/>
                        )}
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default App
