import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../contexts/AppContext'

import {
    ADD_OPERATION_LOG,
    DELETE_EVENT,
    REVERSE_DONE_FLAG
} from '../actions/index'
import { timeCurrentIso8601 } from '../utils'


const Event = ({ event }) => {
    const { state, dispatch } = useContext(AppContext)
    const id = event.id


    const handleClickDeleteButton = e => {
        e.preventDefault()
        const result = window.confirm(`イベント(id=${id})を本当に削除して良いですか？`)
        if (result) {
            dispatch({ type: DELETE_EVENT, id });
            dispatch({
                type: ADD_OPERATION_LOG,
                description: `イベント(id=${id})を削除しました。`,
                operateAt: timeCurrentIso8601()
            })
        }
    }

    const handleDone = () => {
        dispatch({ type: REVERSE_DONE_FLAG, id })
    }




    return (
        <tr>
            <td><input type="checkbox" onChange={handleDone} checked={event.isChecked} /></td>
            <td>{id}</td>
            <td>{event.title}</td>
            <td>{event.body}</td>
            <td><button type="button" className="btn btn-danger" onClick={handleClickDeleteButton}>削除</button></td>
        </tr>
    )

}

export default Event;