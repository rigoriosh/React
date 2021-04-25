import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux';
import { activarNota } from '../../actions/notesActions';

export const JournalEntry = ({id, title, body, date, url}) => {    
    const dispatch = useDispatch();    
    const clicked = () => {
        const nota = {id, title, body, date, url};
        //console.log(nota)
        dispatch(activarNota(id, nota));
    }
    return (
        <div className="journal__entry pointer" onClick={clicked}>
            {
                url &&
                <div className="journal__entry-picture"
                    style={{backgroundSize: 'cover', backgroundImage: `url(${url})`}}>
                </div>    
            }
            <div className="journal__entry-body">
                <p className="journal__entry-tittle">{title}</p>
                <p className="journal__entry-content"> {body} </p>
            </div>
            <div className="journal__entry-date-box">
                <span>{moment(date).format('MMMM')}</span>
                <h4>{moment(date).format('D')}</h4>
            </div>
        </div>
    )
}
