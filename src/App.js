import React from 'react'
import axios from 'axios'
import {BrowserRouter, Route, NavLink} from "react-router-dom"
import './App.css'

const SimpleCard = ({name, imgLink, className, id}) => {
    return (
        <NavLink to={`/pokeAPI/pokemon/${id}`} className={className}>
            <div>
                <p>{firstLetterCapitalize(name)}</p>
                <img src={imgLink} alt={name}/>
            </div>
        </NavLink>
    )
}

const Img = ({src}) => {
    return (
        <img src={src} alt="" style={{width: '', height: '15vh'}}/>
    )
}

const Ability = ({name, effect}) => {
    return (
        <div className={"ability"}>
            <div className={"abilityName"}>{firstLetterCapitalize(name)}</div>
            <div>{effect}</div>
        </div>
    )
}

const firstLetterCapitalize = (name) => name[0].toUpperCase() + name.slice(1)

class PokePage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    fetchData = async (url) => {
        const result = await (await fetch(url)).json()
        await this.setState({data: result, abilityLink: [], abilities: []})
    }

    fetchAbilities = async () => {
        let abilities
        let abilityLinks = []
        abilities = this.state.data.abilities
        for (let key in abilities) {
            abilityLinks.push(abilities[key].ability.url)
        }
        await abilityLinks.map(async (link) => {
            const result = (await axios(link)).data
            await this.setState({
                abilities: [...this.state.abilities, {name: result.name, effect: result.effect_entries[0].effect}]
            })
        })
    }

    async componentDidMount () {
        await this.fetchData(this.props.url)
        await this.fetchAbilities()
    }

    render () {
        if (!this.state.abilities) {
            return null
        } else {
            let imgLinks = {...this.state.data.sprites}
            let imgLinkArr = []
            for (let key in imgLinks) {
                if (imgLinks[key] !== null) {
                    imgLinkArr.push(imgLinks[key])
                }
            }
            imgLinkArr.reverse()
            return (
                <div className="pokeCard">
                    <div className={"pokeName"}>
                        {firstLetterCapitalize(this.state.data.name)}
                    </div>
                    <div>
                        {imgLinkArr.map((imgLink) => <Img src={imgLink} alt={this.state.data.name} key={imgLink}/>)}
                    </div>
                    <div>
                        <p>Weight: {this.state.data.weight / 10 + 'kg'}</p>
                        <p>Height: {this.state.data.height / 10 + 'm'}</p>
                    </div>
                    <div>
                        {this.state.abilities.map(({name, effect}) => <Ability name={name} effect={effect}
                                                                               key={name + effect}/>)}
                    </div>
                    <NavLink to={`/pokeAPI/`}>
                        <div>
                            <button>Back</button>
                        </div>
                    </NavLink>
                </div>
            )
        }
    }
}


class App extends React.Component {
    state = {
        pokemons: []
    }

    addCards = async () => {
        const data = (await axios('https://pokeapi.co/api/v2/pokemon/')).data
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
