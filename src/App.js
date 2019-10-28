import React from 'react'
import axios from 'axios'
import {BrowserRouter, Route, NavLink} from "react-router-dom"
import './App.css'
import PokePage from './components/PokePage'
import {SimpleCard} from './components/SimpleCard'

class App extends React.Component {
    state = {
        pokemons: []
    }

    addCards = async () => {
        const data = (await axios('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=128"')).data
        const results = data.results
        results.map(async ({name, url}) => {
            const result = (await axios(url)).data
            const imgLink = result.sprites.front_default
            const id = result.id
            await this.setState({pokemons: [...this.state.pokemons, {name, url, imgLink, id}]})
        })
    }

    async componentDidMount () {
        await this.addCards()
    }

    render () {
        return (
            <BrowserRouter>
                <div className="App">
                    <header>
                        <NavLink to={`/pokeAPI/`}>
                            <div className="header"></div>
                        </NavLink>
                    </header>
                    <div className='content'>
                        <Route exact path={`/pokeAPI/`}
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
                        {this.state.pokemons.map(({id, url}) =>
                            <Route path={`/pokeAPI/pokemon/${id}`} key={id} render={() => <PokePage url={url}/>}/>
                        )}
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default App
