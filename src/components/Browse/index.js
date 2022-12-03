import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './browse.css';

export default function({}) {
    const allItems = [];
    const [filter, setFilter] = useState('item');
    const abilityNames = useSelector(state => state.ability.names);
    const itemNames = useSelector(state => state.item.names);

    for (let a of abilityNames) {
        let arr = a.split('-');
        arr = arr.map(wrd => wrd[0]?.toUpperCase() + wrd?.slice(1));
        const abilityTitle = arr.join(' ');
        allItems.push({
            name: abilityTitle,
            type: 'ability',
            slug: a
        })
    }

    for (let i of itemNames) {
        let arr = i.split('-');
        arr = arr.map(wrd => wrd[0]?.toUpperCase() + wrd?.slice(1));
        const itemTitle = arr.join(' ');
        if (!itemTitle.includes('undefined') && !itemTitle.includes('Data')) {
            allItems.push({
                name: itemTitle,
                type: 'item',
                slug: i
            })
        }
    }

    allItems.sort((a, b) => {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        return 0;
    });

    return (
        <>
            <div className='browse'>
                <div className='browse-btns'>

                </div>
                {allItems.map(item => {
                    switch(filter) {
                        case 'ability':
                            if (item.type === 'ability') {
                                return (
                                    <div className='browse-opt'>
                                        <Link to={`/ability/${item.slug}`} className='browse-link'>
                                            {item.name}
                                        </Link>
                                    </div>
                                )
                            }
                            break;
                        case 'item':
                            if (item.type === 'item') {
                                return (
                                    <div className='browse-opt'>
                                        <Link to={`/item/${item.slug}`} className='browse-link'>
                                            {item.name}
                                        </Link>
                                    </div>
                                )
                            }
                            break;
                        default:
                            if (item.type === 'ability') {
                                return (
                                    <div className='browse-opt'>
                                        <Link to={`/ability/${item.slug}`} className='browse-link'>
                                            {item.name}
                                        </Link>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className='browse-opt'>
                                        <Link to={`/item/${item.slug}`} className='browse-link'>
                                            {item.name}
                                        </Link>
                                    </div>
                                )
                            }
                            break;
                    }
                })}
            </div>
        </>
    );
}