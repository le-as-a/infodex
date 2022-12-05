import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAbilityInfo } from '../../store/abilitySlice';
import './abilitypage.css';

export default function() {
    const dispatch = useDispatch();
    const { abilityId } = useParams();
    const id = abilityId.replaceAll('%20', ' ');
    const ability = useSelector(state => state.ability.current);
    const abiName = () => {
        let arr = []
        if (ability.name.includes('-')) {
            arr = ability.name.split('-');
            let capped = arr.map(el => el[0].toUpperCase() + el.slice(1));
            return capped.join(' ');
        } else {
            return ability.name[0].toUpperCase() + ability.name.slice(1);
        }
    }

    const pkmnNames = () => {
        let arr = []
        const pokeNames = ability.pokemon.map(pkmn => {
            if (pkmn.includes('-')) {
                arr = pkmn.split('-');
                let capped = arr.map(el => el[0].toUpperCase() + el.slice(1));
                return capped.join(' ');
            } else {
                return pkmn[0].toUpperCase() + pkmn.slice(1);
            }
        });
        return pokeNames;
    }

    useEffect(() => {
        (async () => {
            dispatch(getAbilityInfo(id));
        })();
    }, [dispatch])

    if (!ability) return;

    return (
        <>
            <div className='abilitypage'>
                <Link to='/browse' className='back-link'>Back to Browse</Link>
                <div className='ability-container'>
                    <div className='ability-title'>
                        {abiName()}
                    </div>
                    <div className='ability-gen'>
                        From: {ability.gen.toUpperCase().replaceAll('-', ' ')}
                    </div>
                    <div className='ability-desc'>
                        {ability.description.map(a => {
                            if (a.language.name === 'en') return (
                                <>
                                    {a.short_effect}
                                </>
                            )
                        })}
                    </div>
                    <div className='more-info'>
                        <a href={`https://www.serebii.net/search.shtml?&q=${ability.name}&sa=Search`} rel="noreferrer" target='_blank'>
                            More Info
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}