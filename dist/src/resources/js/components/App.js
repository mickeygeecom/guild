import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Home, Login, Settings } from './views';
import { Http } from '../classes';
import Popup from './Popup';

export default function App() {
    const [guild, setGuild] = useState({ faction: '', region: '', name: '', realm: '' });
    const [recruiting, setRecruiting] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [specs, setSpecs] = useState([]);
    const [usps, setUsps] = useState([]);

    const [popup, setPopup] = useState({ message: '', type: 'success' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const recruiting = await Http.get('recruiting');
            const questions = await Http.get('questions');
            const guild = await Http.get('guild');
            const specs = await Http.get('specs');
            const usps = await Http.get('usps');

            setLoading(false);

            const parsedGuild = {};
            guild.data.forEach(field => {
                parsedGuild[field.name] = field.value;
            });
            setGuild(parsedGuild);
            
            setRecruiting(Object.values(recruiting.data));
            setSpecs(Object.values(specs.data));
            setQuestions(questions.data);
            setUsps(usps.data);
        })();
    }, []);

    function handlePopup(message, type) {
        setPopup(p => ({ ...p, message: message, type: type }));
    }

    useEffect(() => {
        if (guild.faction) {
            document.querySelector('body').classList = guild.faction;
        }
        if (guild.name) {
            document.title = guild.name;
        }
    }, [guild]);

    return (
        <Router>
            <Popup popup={popup} setPopup={setPopup} />
            <Switch>
                <Route path="/" exact>
                    <Home handlePopup={handlePopup} loading={loading} usps={usps} specs={specs} guild={guild} />
                </Route>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/settings/:tab?" exact>
                    <Settings
                        questions={questions} setQuestions={setQuestions}
                        handlePopup={handlePopup} loading={loading}
                        guild={guild} setGuild={setGuild}
                        specs={specs} setSpecs={setSpecs}
                        usps={usps} setUsps={setUsps}
                    />
                </Route>
            </Switch>
        </Router>
    );
}
