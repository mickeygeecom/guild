import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Http } from '../classes';
import Settings from './Settings'; 
import Login from './Login';
import Popup from './Popup';
import Home from './Home';

export default function App() {
    const [guild, setGuild] = useState({ faction: 'horde', region: 'EU', name: '', realm: '' });
    const [popup, setPopup] = useState({ message: '', type: 'success' });

    useEffect(() => {
        (async () => {
            const { data } = await Http.get('guild');
            const getValue = name => data.find(object => object.name === name).value;
            setGuild({
                faction: getValue('faction'),
                region: getValue('region'),
                realm: getValue('realm'),
                name: getValue('name'),
            });
        })();
    }, []);

    function handlePopup(message, type) {
        setPopup(p => ({ ...p, message: message, type: type }));
    }

    useEffect(() => {
        document.querySelector('body').classList = guild.faction;
        document.title = guild.name;
    }, [guild]);

    return (
        <Router>
            <Popup popup={popup} setPopup={setPopup} />
            <Switch>
                <Route path="/" exact>
                    <Home guild={guild} setGuild={setGuild} handlePopup={handlePopup} />
                </Route>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/settings/:tab?" exact>
                    <Settings guild={guild} setGuild={setGuild} handlePopup={handlePopup} />
                </Route>
            </Switch>
        </Router>
    );
}
