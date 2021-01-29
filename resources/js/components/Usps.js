import { Button, Col, Row, Input } from './styled-components';
import { mdiClose, mdiPlus } from '@mdi/js';
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import Icon from '@mdi/react';

export default function Usps({ usps = [], setUsps, save, saving = false }) {
    const styles = createUseStyles({
        usp: {
            marginBottom: 30,
        },
        add: {
            border: '3px solid rgb(var(--expansion))',
            color: 'rgb(var(--expansion))',
            cursor: 'pointer',
            marginBottom: 30,
            width: 35,
        },
    });
    const classes = styles();

    function removeUsp(usp) {
        setUsps(usps => usps.filter(_usp => _usp.id !== usp.id));
    }

    function addUsp() {
        setUsps(usps => [ ...usps, { id: usps[usps.length - 1].id + 1, value: '', title: '' } ]);
    }

    function onChangeHandler(e, usp, input) {
        e.persist();
        setUsps(usps => usps.map(_usp => _usp.id === usp.id ? { ...usp, [input]: e.target.value } : _usp));
    }

    return (
        <form onSubmit={e => save(e, {
            successMessage: 'Successfully updated USPs',
            setter: setUsps,
            name: 'usps',
            url: 'usps',
            data: usps,
        })}>
            {
                usps.map(usp => (
                    <Col className={classnames(classes.usp)} key={usp.id}>
                        <Row align="center" style={{ marginBottom: 10 }}>
                            <Input value={usp.title} onChange={e => onChangeHandler(e, usp, 'title')} />
                            <Icon
                                style={{ marginLeft: 'auto', cursor: 'pointer' }}
                                onClick={() => removeUsp(usp)}
                                path={mdiClose}
                                size={1}
                            />
                        </Row>
                        <Input as="textarea" rows={8} resize="none" onChange={e => onChangeHandler(e, usp, 'value')} value={usp.value} />
                    </Col>
                ))
            }
            <Icon className={classnames(classes.add)} path={mdiPlus} onClick={addUsp} />
            <Button disabled={saving} block>Save</Button>
        </form>
    );
}
