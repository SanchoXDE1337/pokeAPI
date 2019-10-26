import React from 'react'
import axios from 'axios'
import {BrowserRouter, Route, NavLink} from "react-router-dom"
import './App.css'

const SimpleCard = ({name, imgLink, className, url, id}) => {
    return (
        <NavLink to={`/pokemon/${id}`} className={className}>
            <div>
                <p>{pokeName(name)}</p>
                <img src={imgLink} alt={name}/>
            </div>
        </NavLink>
    )
}

const Img = ({src}) => {
    return (
        <img src={src} alt="" style={{width: '20vw', height: '100%'}}/>
    )
}

const pokeName = (name) => name[0].toUpperCase() + name.slice(1)


class PokePage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
        this.fetchData(this.props.url)
    }

    fetchData = async (url) => {
        const result = await axios(url)
        await this.setState(result.data)
    }

    fetchAbilities = async (state) => {
        let abilities = state.abilities
        console.log(state)
        let abilityLinks = await abilities.map((ability) => {
            console.log(ability.ability.url)
            return ability.ability.url
        })
        console.log(abilityLinks)
    }

    async componentDidUpdate () {
        await this.fetchAbilities(this.state)
    }

    render () {
        let imgLinks = {...this.state.sprites}
        let imgLinkArr = []
        for (let key in imgLinks) {
            if (imgLinks[key] !== null) {
                imgLinkArr.push(imgLinks[key])
            }
        }
        imgLinkArr.reverse()

        return (
            <div>
                <div>
                    {this.state.name}
                </div>
                <div>
                    {imgLinkArr.map((imgLink) => <Img src={imgLink} alt={this.state.name} key={imgLink}/>)}
                </div>
                <div>
                    <p>Weight: {this.state.weight / 10 + 'kg'}</p>
                    <p>Height: {this.state.height / 10 + 'm'}</p>
                </div>
                <NavLink to={`/`}>
                    <div>
                        <button>Back</button>
                    </div>
                </NavLink>
            </div>
        )
    }

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
                            <Route path={`/pokemon/${id}`} key={id} render={() => <PokePage url={url}/>}/>
                        )}
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default App
