import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAbilityInfo } from '../../store/abilitySlice';

export default function() {
    const dispatch = useDispatch();
    const { abilityId } = useParams();

    useEffect(() => {
        (async () => {
            dispatch(getAbilityInfo(abilityId));
        })();
    }, [dispatch])

    return (
        <>
            <div className='abilitypage'>
                Look in the redux.
            </div>
        </>
    )
}