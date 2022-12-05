import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './browse.css';

export default function({ abilities, items, loaded }) {
    const allItems = [];
    const [filter, setFilter] = useState('none');
    const [search, setSearch] = useState('');

    if (!loaded) return null;

    useEffect(() => {
        (async () => {
            if (search) {
                if (filter === 'ability') {
                    setFilter('ability-search');
                } else if (filter === 'item') {
                    setFilter('item-search');
                } else {
                    setFilter('search');
                }
            } 
        })();
    }, [search])
    
    for (let a of abilities) {
        let arr = a.split('-');
        arr = arr.map(wrd => wrd[0]?.toUpperCase() + wrd?.slice(1));
        const abilityTitle = arr.join(' ');
        allItems.push({
            name: abilityTitle,
            type: 'ability',
            slug: a
        })
    }

    for (let i of items) {
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
            <div className='result-reducer'>
            <div className='browse-search'>
                <input 
                    id='searchbar'
                    placeholder='Narrow your results...'
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                />
                <button
                    onClick={() => setSearch('')}
                >
                    Reset 
                </button>
            </div>
            <div className='browse-btns'>
                <button onClick={() => setFilter('none')}>All</button>
                <button onClick={() => setFilter('item')}>Items</button>
                <button onClick={() => setFilter('ability')}>Abilities</button>
            </div>
            </div>
            <div className='browse'>
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
                        case 'ability-search':
                            if (item.type === 'ability' && item.name.toLowerCase().includes(search.toLowerCase())) {
                                return (
                                    <div className='browse-opt'>
                                        <Link to={`/ability/${item.slug}`} className='browse-link'>
                                            {item.name}
                                        </Link>
                                    </div>
                                )
                            }
                            break;
                        case 'item-search':
                            if (item.type === 'item' && item.name.toLowerCase().includes(search.toLowerCase())) {
                                return (
                                    <div className='browse-opt'>
                                        <Link to={`/ability/${item.slug}`} className='browse-link'>
                                            {item.name}
                                        </Link>
                                    </div>
                                )
                            }
                            break;
                        case 'search':
                            if (item.name.toLowerCase().includes(search.toLowerCase())) {
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
                    }
                })}
            </div>
        </>
    );
}