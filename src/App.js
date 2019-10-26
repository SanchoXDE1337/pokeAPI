import React from 'react'
import {BrowserRouter, Route} from "react-router-dom";
import './App.css'

const SimpleCard = ({name, imgLink, className, url}) => {
    return (
        <div className={className}>
            <p>{name[0].toUpperCase() + name.slice(1)}</p>
            <img src={imgLink} alt={name}/>
        </div>
    )
}
{/*<Route path={"/messages"} render={() => <Messages state={props.state.messagePage}/>}/>*/}

class App extends React.Component {
    state = {
        pokemons: []
    }

    addCards = async () => {
        const data = await (await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=102"')).json()
        const results = data.results
        results.map(async ({name, url}) => {
            const imgLink = (await (await fetch(url)).json()).sprites.front_default
            await this.setState({pokemons: [...this.state.pokemons, {name, url, imgLink}]})
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
                        {this.state.pokemons.map(({name, imgLink, url}) => <SimpleCard className='card' name={name} url = {url}
                                                                                       imgLink={imgLink} key={name + imgLink}/>)}
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default App
