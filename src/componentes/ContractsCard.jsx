import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/Chat';
import { useDispatch } from 'react-redux';
import { setChat } from '../actions';

import './styles/contractscard.css';

const ContractsCard = (props) => {
    const { check, onCheck, id, chat } = props
    const dispatch = useDispatch();
    const openChat = () => {
        dispatch(setChat());
    }

    return (
        <div className='contractsCardComponent'>
            <div className={check ? 'borradoresContracts' : 'activeContracts'}>
                {chat ?
                    <Button
                        className="chatIcon"
                        variant="error"
                        startIcon={<ChatIcon />}
                        onClick={openChat}
                        size='lg'
                    /> : <></>}
                <div className="info-contrato">
                    <h6>{props.name}</h6>
                    <h6>{props.amount}</h6>
                    <NavLink to={`/detalle/${props.id}`}>
                        <h6>ver detalles</h6>
                    </NavLink>
                </div>
                {check ? <input type="checkbox" name={props.id} onChange={e => { onCheck(e) }} /> : <></>}
            </div>
        </div>
    );
}

export default ContractsCard;
