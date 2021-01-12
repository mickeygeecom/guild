import { Col, Row, Input, Select, Button, Loading } from './styled-components';
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import { Http } from '../classes';
import Tab from './Tab';

export default function Settings({ guild, setGuild, handlePopup }) {
    const styles = createUseStyles({
        wrapper: {
            backgroundImage: 'url("/storage/covenants.jpg")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: '100vh',
        },
        settings: {
            backgroundColor: 'white',
            margin: [0, 'auto'],
            marginTop: '25vh',
            borderRadius: 5,
            padding: 30,
            width: 400,
        },
        marginTop: {
            marginTop: 25,
        },
        tabLink: {
            borderBottom: '2px solid transparent',
            textTransform: 'uppercase',
            textAlign: 'center',
            userSelect: 'none',
            cursor: 'pointer',
            letterSpacing: 2,
            padding: 10,
            flex: 1,
            '&.active': {
                borderColor: 'rgb(var(--expansion))',
            },
        },
    });
    const classes = styles();

    const [activeTab, setActiveTab] = useState('guild');

    const [guildInputs, setGuildInputs] = useState({
        faction: guild.faction,
        region: guild.region,
        realm: guild.realm,
        name: guild.name,
    });

    useEffect(() => {
        setGuildInputs({
            faction: guild.faction,
            region: guild.region,
            realm: guild.realm,
            name: guild.name,
        });
    }, [guild]);

    function handleGuildInput(value, input) {
        setGuildInputs(p => ({ ...p, [input]: value }));
    }

    async function saveGuild(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('guild', JSON.stringify(guildInputs));
        const { code } = await Http.post('guild', { body: formData });
        if (code === 200) {
            handlePopup('Successfully updated guild', 'success');
            setGuild(guildInputs);
        } else {
            handlePopup('Something went wrong', 'error');
        }
    }

    return (
        <Col className={classnames(classes.wrapper)}>
            <Col className={classnames(classes.settings)}>
                <Row className={classnames(classes.tabs)}>
                    <div className={classnames(classes.tabLink, { active: activeTab === 'guild' })} onClick={() => setActiveTab('guild')}>
                        Guild
                    </div>
                    <div className={classnames(classes.tabLink, { active: activeTab === 'recruitment' })} onClick={() => setActiveTab('recruitment')}>
                        Recruitment
                    </div>
                    <div className={classnames(classes.tabLink, { active: activeTab === 'usps' })} onClick={() => setActiveTab('usps')}>
                        USPs
                    </div>
                </Row>
                <Tab active={activeTab === 'guild'}>
                    <form onSubmit={saveGuild}>
                        <Input
                            containerClass={classnames(classes.marginTop)} autoFocus label="Name" autoComplete="off"
                            value={guildInputs.name} onChange={e => handleGuildInput(e.target.value, 'name')}
                        />
                        <Input
                            containerClass={classnames(classes.marginTop)} label="Realm" autoComplete="off"
                            value={guildInputs.realm} onChange={e => handleGuildInput(e.target.value, 'realm')}
                        />
                        <Select 
                            className={classnames(classes.marginTop)} value={guildInputs.region} 
                            onChange={e => handleGuildInput(e.target.value, 'region')}
                        >
                            <option value="EU">Europe</option>
                            <option value="NA">North America</option>
                            <option value="CN">China</option>
                            <option value="OCE">Oceanic</option>
                            <option value="RU">Russia</option>
                            <option value="DE">Germany</option>
                            <option value="FR">France</option>
                            <option value="ES">Spain</option>
                            <option value="KR">Korean</option>
                            <option value="SA">South America</option>
                            <option value="TW">Taiwanese</option>
                        </Select>
                        <Row className={classnames(classes.marginTop)}>
                            <Button faction={guild.faction}>Save</Button>
                        </Row>
                    </form>
                </Tab>
                <Tab active={activeTab === 'recruitment'}>
                    2
                </Tab>
                <Tab active={activeTab === 'usps'}>
                    3
                </Tab>
            </Col>
            <Loading loading={true} />
        </Col>
    );
}
