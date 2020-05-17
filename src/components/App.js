import React, { useEffect, useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import reducer from '../reducers'
import shortid from 'shortid';

import EventForm from './EventForm'
import Events from './Events'
import OperationLogs from './OperationLogs'
import AppContext from '../contexts/AppContext'

const APP_KEY = 'appWithRedux'

const App = () => {
    const appState = localStorage.getItem(APP_KEY)
    const initialState = appState ? JSON.parse(appState) : {//Contextで全体に回すものを決める
        events: [],
        operationLogs: []
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    //stateを監視する,変化があったらコールバックを呼び出す
    useEffect(() => {
        localStorage.setItem('appWithRedux', JSON.stringify(state))
    }, [state])
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <div className="container-fluid">
                <EventForm />
                <Events />
                <OperationLogs />
            </div >
        </AppContext.Provider>
    )
}



export default App;