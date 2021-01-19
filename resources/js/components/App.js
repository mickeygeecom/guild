import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Http } from '../classes';
import Settings from './Settings'; 
import Login from './Login';
import Popup from './Popup';
import Home from './Home';

export default function App() {
    const [guild, setGuild] = useState({ faction: 'horde', region: 'EU', name: '', realm: '' });
    const [specs, setSpecs] = useState([]);
    const [usps, setUsps] = useState([]);

    const [popup, setPopup] = useState({ message: '', type: 'success' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const guild = await Http.get('guild');
            const specs = await Http.get('specs');
            const usps = await Http.get('usps');
            setLoading(false);
            const getGuildValue = name => guild.data.find(object => object.name === name).value;
            setGuild({
                faction: getGuildValue('faction'),
                region: getGuildValue('region'),
                realm: getGuildValue('realm'),
                name: getGuildValue('name'),
            });
            setSpecs(Object.values(specs.data));
            setUsps(usps.data);
        })();
    }, []);

    function handlePopup(message, type) {
        setPopup(p => ({ ...p, message: message, type: type }));
    }

    useEffect(() => {
        document.title = guild.name;
    }, [guild]);

    return (
        <Router>
            <Popup popup={popup} setPopup={setPopup} />
            <Switch>
                <Route path="/" exact>
                    <Home guild={guild} setGuild={setGuild} usps={usps} specs={specs} handlePopup={handlePopup} loading={loading} />
                </Route>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/settings/:tab?" exact>
                    <Settings guild={guild} setGuild={setGuild} usps={usps} setUsps={setUsps} specs={specs} setSpecs={setSpecs} handlePopup={handlePopup} loading={loading} />
                </Route>
            </Switch>
        </Router>
    );
}
