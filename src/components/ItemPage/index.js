import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getItemInfo } from '../../store/itemSlice';
import './itempage.css';

export default function() {
    const dispatch = useDispatch();
    const { itemId } = useParams();
    const id = itemId.replaceAll('%20', ' ');
    const item = useSelector(state => state.item.current);
    const itemName = () => {
        let arr = []
        if (item.name.includes('-')) {
            arr = item.name.split('-');
            let capped = arr.map(el => el[0].toUpperCase() + el.slice(1));
            return capped.join(' ');
        } else {
            return item.name[0].toUpperCase() + item.name.slice(1);
        }
    }
    const catName = () => {
        let arr = []
        if (item.category.includes('-')) {
            arr = item.category.split('-');
            let capped = arr.map(el => el[0].toUpperCase() + el.slice(1));
            return capped.join(' ');
        } else return item.category[0].toUpperCase() + item.category.slice(1);
    }

    useEffect(() => {
        (async () => {
            dispatch(getItemInfo(id));
        })();
    }, [dispatch]);

    if (!item) return;

    return (
        <>
            <div className='itempage'>
                <Link to='/browse' className='back-link'>Back to Browse</Link>
                <div className='item-container'>
                    <img src={`${item.img}`} alt={`${item.name}`} className='item-img' />
                    <div className='item-info'>
                        <div className='item-title'>
                            {itemName()}
                        </div>
                        <div className='item-cost'>
                            Cost: {item.cost} ₽
                        </div>
                        <div className='item-cat'>
                            Category: {catName()}
                        </div>
                        <div className='more-info'>
                            <a href={`https://www.serebii.net/search.shtml?&q=${item.name}&sa=Search`} target='_blank'>
                                More Info
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}