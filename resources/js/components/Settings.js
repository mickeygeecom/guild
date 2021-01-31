import { Col, Row, Loading, H6, PageLoading } from './styled-components';
import { NavLink, Route } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';
import Recruitment from './Recruitment';
import CreateForm from './CreateForm';
import classnames from 'classnames';
import { Http } from '../classes';
import Guild from './Guild';
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
            padding: 15,
        },
        tabPanel: {
            boxShadow: [0, 0, 10, 0, 'rgba(0, 0, 0, 0.5)'],
            transition: 'background-color 0.1s linear',
            textTransform: 'uppercase',
            backgroundColor: 'white',
            textAlign: 'center',
            userSelect: 'none',
            fontWeight: 'bold',
            padding: [20, 30],
            cursor: 'pointer',
            letterSpacing: 2,
            margin: [0, 5],
            color: 'inherit',
            borderRadius: 5,
            '&.active, &:hover': {
                color: 'rgb(var(--expansion))',
            },
            '&.active': {
                backgroundColor: 'rgb(var(--expansion))',
                color: 'white',
            },
        },
        tabPanels: {
            margin: [0, 'auto'],
            background: 'none',
            marginTop: '10vh',
        },
    });
    const classes = styles();

    const [saving, setSaving] = useState(false);

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
            <Row className={classnames(classes.tabPanels)}>
                <H6 as={NavLink} className={classnames(classes.tabPanel)} to="/settings/guild">Guild</H6>
                <H6 as={NavLink} className={classnames(classes.tabPanel)} to="/settings/recruitment">Recruitment</H6>
                <H6 as={NavLink} className={classnames(classes.tabPanel)} to="/settings/usps">USPs</H6>
                <H6 as={NavLink} className={classnames(classes.tabPanel)} to="/settings/form">Form</H6>
            </Row>
            <Col className={classnames(classes.settings)}>
                <Route path="/settings/guild" exact>
                    <Guild guild={guild} setGuild={setGuild} save={save} saving={saving} />
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
            <Loading faction={guild.faction || 'horde'} loading={saving} />
        </Col>
    );
}
