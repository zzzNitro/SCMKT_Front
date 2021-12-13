import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMessages } from '../actions';


const Chatdestination = () => {

    const user = useSelector(state => state.choosed)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMessages(user.id));    
    }, [dispatch]);

    return (
        <div>
            <div className="userDataComponent">
                <div className="caja">
                    <div className="box">
                    <img src={user.image} alt="usuario" />
                    </div>
                </div>
                <h5>{user.name}</h5>

            </div>
        </div>
    )
}

export default Chatdestination;