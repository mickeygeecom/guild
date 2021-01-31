import { TabWrapper, Col, Input, Select, FactionToggler, Button } from './styled-components';
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';

export default function Guild({ guild = {}, setGuild, save, saving = false }) {
    const styles = createUseStyles({
        marginTop: {
            marginTop: 30,
        },
    });
    const classes = styles();

    function parseGuildInputs() {
        const newGuild = {};
        for (const property in guild) {
            newGuild[property] = guild[property];
        }
        return newGuild;
    }

    const [guildInputs, setGuildInputs] = useState(parseGuildInputs());

    useEffect(() => {
        setGuildInputs(parseGuildInputs());
    }, [guild]);

    function handleGuildInput(value, input) {
        setGuildInputs(p => ({ ...p, [input]: value }));
    }

    function toggleFaction() {
        handleGuildInput(guildInputs.faction === 'horde' ? 'alliance' : 'horde', 'faction');
    }

    function submit(e) {
        save(e, {
            successMessage: 'Successfully updated guild',
            data: guildInputs,
            setter: setGuild,
            name: 'guild',
            url: 'guild',
        });
    }

    return (
        <Col as="form" onSubmit={submit}>
            <TabWrapper>
                <Input
                    autoFocus label="Name" autoComplete="off" value={guildInputs.name}
                    onChange={e => handleGuildInput(e.target.value, 'name')}
                />
                <Input
                    containerClass={classnames(classes.marginTop)} label="About" as="textarea"
                    autoComplete="off" value={guildInputs.about} resize="none" rows={5}
                    onChange={e => handleGuildInput(e.target.value, 'about')}
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
            </TabWrapper>
            <Button className={classnames(classes.marginTop)} block disabled={saving}>Save</Button>
        </Col>
    );
}
