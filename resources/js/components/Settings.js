import { Col, Row, Input, Select, Button, Loading, H6, H4, FactionToggler, PageLoading } from './styled-components';
import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import Recruitment from './Recruitment';
import CreateForm from './CreateForm';
import classnames from 'classnames';
import { mdiClose } from '@mdi/js';
import { Http } from '../classes';
import Icon from '@mdi/react';
import Usps from './Usps';

export default function Settings({ guild = {}, setGuild, usps = [], setUsps, specs = [], setSpecs, loading = true, handlePopup }) {
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
            borderRadius: 5,
            marginTop: 15,
            padding: 5,
        },
        tabWrapper: {
            maxHeight: '60vh',
            overflowY: 'auto',
            minWidth: 500,
            padding: 30,
            '&::-webkit-scrollbar': {
                width: 8,
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgb(var(--expansion))',
                borderRadius: 10,
            },
        },
        marginTop: {
            marginTop: 30,
        },
        tabPanel: {
            transition: 'background-color 0.1s linear',
            textTransform: 'uppercase',
            textAlign: 'center',
            userSelect: 'none',
            padding: [20, 30],
            cursor: 'pointer',
            letterSpacing: 2,
            color: 'inherit',
            '&:first-child': {
                borderBottomLeftRadius: 5,
                borderTopLeftRadius: 5,
            },
            '&:last-child': {
                borderBottomRightRadius: 5,
                borderTopRightRadius: 5,
            },
            '&.active, &:hover': {
                color: 'rgb(var(--expansion))',
            },
            '&.active': {
                backgroundColor: 'rgb(var(--expansion))',
                color: 'white',
            },
        },
        tabPanels: {
            marginTop: '15vh',
            borderRadius: 5,
            padding: 0,
        },
    });
    const classes = styles();

    const [saving, setSaving] = useState(false);

    const [guildInputs, setGuildInputs] = useState({
        faction: guild.faction,
        region: guild.region,
        about: guild.about,
        realm: guild.realm,
        name: guild.name,
    });

    useEffect(() => {
        setGuildInputs({
            faction: guild.faction,
            region: guild.region,
            about: guild.about,
            realm: guild.realm,
            name: guild.name,
        });
    }, [guild]);

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
                args.setter(args.data);
            }
        } else {
            handlePopup(args.errorMessage, 'error');
        }
    }

    return (
        <Col className={classnames(classes.wrapper)}>
            <PageLoading loading={loading} />
            <Row className={classnames(classes.tabPanels, classes.settings)}>
                <H6 as={NavLink} className={classnames(classes.tabPanel)} to="/settings/guild">Guild</H6>
                <H6 as={NavLink} className={classnames(classes.tabPanel)} to="/settings/recruitment">Recruitment</H6>
                <H6 as={NavLink} className={classnames(classes.tabPanel)} to="/settings/usps">USPs</H6>
                <H6 as={NavLink} className={classnames(classes.tabPanel)} to="/settings/form">Form</H6>
            </Row>
            <Col className={classnames(classes.settings)}>
                <Col className={classnames(classes.tabWrapper)}>
                    <Route path="/settings/guild" exact>
                        <form onSubmit={e => save(e, {
                            successMessage: 'Successfully updated guild',
                            data: guildInputs,
                            setter: setGuild,
                            name: 'guild',
                            url: 'guild',
                        })}>
                            <Input
                                autoFocus label="Name" autoComplete="off" value={guildInputs.name}
                                onChange={e => handleGuildInput(e.target.value, 'name')}
                            />
                            <Input
                                containerClass={classnames(classes.marginTop)} label="About" as="textarea"
                                onChange={e => handleGuildInput(e.target.value, 'about')}
                                autoComplete="off" value={guildInputs.about}
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
                        <Recruitment specs={specs} setSpecs={setSpecs} save={save} saving={saving} />
                    </Route>
                    <Route path="/settings/usps" exact>
                        <Usps usps={usps} setUsps={setUsps} save={save} saving={saving} />
                    </Route>
                    <Route path="/settings/form" exact>
                        <CreateForm faction={guild.faction} />
                    </Route>
                </Col>
            </Col>
            <Loading faction={guild.faction || 'horde'} loading={saving} />
        </Col>
    );
}
