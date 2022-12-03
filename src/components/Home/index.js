import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './home.css';

import { getPokemonById } from '../../store/pokemonSlice';

export default function() {
    const [randomId, setRandomId] = useState(0);
    const dispatch = useDispatch();
    const pkmn = useSelector(state => state.pokemon.random);
    
    useEffect(() => {
        (async () => {
            const pokeId = Math.floor(Math.random() * (905) + 1);
            setRandomId(pokeId);
            dispatch(getPokemonById(pokeId));
        })();
    }, [dispatch]);

    if (pkmn) console.log(pkmn)

    return (
        <>
            <div className='homepage'>
                <div className='welcome'>
                    <div id='welcome-title'>
                        Thanks for stopping by!
                    </div>
                    This is a project using PokeAPI to provide information on the various different Abilities and Items that are referenced to in the Pokemon world! Head over to the Browse page for everything this project has to offer. <br /><br />

                    Have a random pokemon too!
                </div>
                <div className='random-pokemon'>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomId}.png`} alt={`poke-${randomId}`} id='home-random' />
                <div className='home-info'>
                    <div id='random-title'>
                        {pkmn?.species?.name}
                    </div>
                    <div id='random-type'>
                        <b>Type:</b> {pkmn?.types[0]?.type?.name[0].toUpperCase() + pkmn?.types[0]?.type?.name.slice(1)}
                    </div>
                    <div id='random-abilities'>
                        <b>Abilities:</b>
                        {pkmn?.abilities?.map(obj => {
                            let abiName = obj.ability.name;
                            let ediName = ""
                            if (abiName.includes('-')) {
                                let i = abiName.indexOf('-');
                                abiName = abiName.replace('-', ' ');
                                ediName = `${abiName[0].toUpperCase() + abiName.slice(1, i + 1) + abiName[i + 1].toUpperCase() + abiName.slice(i + 2)}`;
                                
                            } else {
                                ediName = `${abiName[0].toUpperCase() + abiName.slice(1)}`;
                            }
                            return (
                                <Link to={`/ability/${abiName}`} className='abi-links'>
                                    {ediName}
                                </Link>
                            )
                        })}
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}