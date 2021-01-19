import { Col, Row, Input, Select, Button, Loading, H6, FactionToggler } from './styled-components';
import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import { Http } from '../classes';
import CreateForm from './CreateForm';
import Recruitment from './Recruitment';

export default function Settings({ guild, setGuild, handlePopup }) {
    const styles = createUseStyles({
        wrapper: {
            backgroundImage: 'url("/storage/covenants.jpg")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: '100vh',
        },
        settings: {
            boxShadow: [0, 0, 10, 0, 'rgba(0, 0, 0, 0.5)'],
            backgroundColor: 'white',
            margin: [0, 'auto'],
            marginTop: '15vh',
            borderRadius: 5,
        },
        tabWrapper: {
            maxHeight: '60vh',
            overflowY: 'auto',
            padding: 30,
        },
        marginTop: {
            marginTop: 25,
        },
        tabPanel: {
            borderBottom: '2px solid transparent',
            transition: 'all 0.1s linear',
            textTransform: 'uppercase',
            textAlign: 'center',
            userSelect: 'none',
            cursor: 'pointer',
            letterSpacing: 2,
            padding: 20,
            flex: 1,
            '&:first-child': {
                borderTopLeftRadius: 5,
            },
            '&:last-child': {
                borderTopRightRadius: 5,
            },
            '&.active, &:hover': {
                color: 'rgb(var(--expansion))',
            },
            '&.active': {
                borderColor: 'rgb(var(--expansion))',
            },
        },
        tabPanels: {
            padding: [10, 30],
        },
    });
    const classes = styles();
    
    const [saving, setSaving] = useState(false);

    const [guildInputs, setGuildInputs] = useState({
        faction: guild.faction,
        region: guild.region,
        realm: guild.realm,
        name: guild.name,
    });
    const [specs, setSpecs] = useState([]);

    useEffect(() => {
        setGuildInputs({
            faction: guild.faction,
            region: guild.region,
            realm: guild.realm,
            name: guild.name,
        });
    }, [guild]);

    useEffect(() => {
        (async () => {
            const { data, code } = await Http.get('specs');
            if (code >= 400) {
                popup('Couldn\'t load specs', 'error');
            } else {
                setSpecs(Object.values(data));
            }
        })();
    }, []);

    function handleGuildInput(value, input) {
        setGuildInputs(p => ({ ...p, [input]: value }));
    }

    function toggleFaction() {
        handleGuildInput(guildInputs.faction === 'horde' ? 'alliance' : 'horde', 'faction');
    }

    async function save(e, args = { data: [], name: '', setter: null, url: '', successMessage: '', errorMessage: 'Something went wrong' }) {
        e.preventDefault();
        const formData = new FormData();
        formData.append(args.name, JSON.stringify(args.data));
        setSaving(true);
        const { code } = await Http.post(args.url, { body: formData });
        setSaving(false);
        if (code === 200) {
            handlePopup(args.successMessage, 'success');
            if (args.setter) {
                setGuild(args.data);
            }
        } else {
            handlePopup(args.errorMessage, 'error');
        }
    }

    return (
        <Col className={classnames(classes.wrapper)}>
            <Col className={classnames(classes.settings)}>
                <Row className={classnames(classes.tabPanels)}>
                    <H6 as={NavLink} className={classnames(classes.tabPanel)} to="/settings/guild">Guild</H6>
                    <H6 as={NavLink} className={classnames(classes.tabPanel)} to="/settings/recruitment">Recruitment</H6>
                    <H6 as={NavLink} className={classnames(classes.tabPanel)} to="/settings/usps">USPs</H6>
                    <H6 as={NavLink} className={classnames(classes.tabPanel)} to="/settings/form">Form</H6>
                </Row>
                <Col className={classnames(classes.tabWrapper)}>
                    <Route path="/settings/guild" exact>
                        <form onSubmit={e => save(e, {
                            successMessage: 'Successfully updated guild',
                            data: guildInputs,
                            name: 'guild',
                            url: 'guild',
                        })}>
                            <Input
                                autoFocus label="Name" autoComplete="off" value={guildInputs.name}
                                onChange={e => handleGuildInput(e.target.value, 'name')}
                            />
                            <Input
                                containerClass={classnames(classes.marginTop)} label="Realm" autoComplete="off"
                                value={guildInputs.realm} onChange={e => handleGuildInput(e.target.value, 'realm')}
                            />
                            <Select 
                                containerClass={classnames(classes.marginTop)} value={guildInputs.region} 
                                label="Region" onChange={e => handleGuildInput(e.target.value, 'region')}
                            >
                                <option value="EU">Europe</option>
                                <option value="NA">North America</option>
                                <option value="CN">China</option>
                                <option value="OC">Oceanic</option>
                                <option value="RU">Russia</option>
                                <option value="DE">Germany</option>
                                <option value="FR">France</option>
                                <option value="ES">Spain</option>
                                <option value="KR">Korean</option>
                                <option value="SA">South America</option>
                                <option value="TW">Taiwanese</option>
                            </Select>
                            <FactionToggler className={classnames(classes.marginTop)} active={guildInputs.faction} toggleActive={toggleFaction} />
                            <Row justify="center" className={classnames(classes.marginTop)}>
                                <Button block disabled={saving}>Save</Button>
                            </Row>
                        </form>
                    </Route>
                    <Route path="/settings/recruitment" exact>
                        <Recruitment specs={specs} setSpecs={setSpecs} save={save} popup={handlePopup} />
                    </Route>
                    <Route path="/settings/usps" exact>
                        3
                    </Route>
                    <Route path="/settings/form" exact>
                        <CreateForm faction={guild.faction} />
                    </Route>
                </Col>
            </Col>
            <Loading faction={guild.faction} loading={saving} />
        </Col>
    );
}
