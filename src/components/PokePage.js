import React from 'react'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import firstLetterCapitalize from "../functions/firstLetterCapitalize"
import {Ability} from './Ability'
import {Img} from './Img'

export default class PokePage extends React.Component {
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