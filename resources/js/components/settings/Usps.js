import { Button, Col, Row, Input, TextButton, TabWrapper } from '../styled-components';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';

export default function Usps({ usps = [], setUsps, save, saving = false }) {
    const styles = createUseStyles({
        usp: {
            border: '2px solid rgb(var(--expansion))',
            marginBottom: 30,
            padding: 15,
        },
        uspTitle: {
            marginBottom: 15,
        },
        submit: {
            margin: [30, 15, 15, 15],
        },
        remove: {
            transition: 'all 0.05s linear',
            marginLeft: 'auto',
            cursor: 'pointer',
            '&:hover': {
                color: 'rgb(var(--expansion))',
            },
        },
    });
    const classes = styles();

    function removeUsp(usp) {
        setUsps(p => p.filter(_usp => _usp.id !== usp.id));
    }

    function addUsp() {
        setUsps(p => [ ...p, { id: (p[p.length - 1]?.id ?? 0) + 1, value: '', title: '' } ]);
    }

    function onChangeHandler(e, usp, input) {
        e.persist();
        setUsps(p => p.map(_usp => _usp.id === usp.id ? { ...usp, [input]: e.target.value } : _usp));
    }

    function submit(e) {
        save(e, {
            successMessage: 'Successfully updated USPs',
            setter: setUsps,
            name: 'usps',
            url: 'usps',
            data: usps,
        });
    }

    return (
        <Col as="form" onSubmit={submit}>
            <TabWrapper>
                {
                    usps.map(usp => (
                        <Col className={classnames(classes.usp)} key={usp.id}>
                            <Row className={classnames(classes.uspTitle)}>
                                <Input label="Title" value={usp.title} onChange={e => onChangeHandler(e, usp, 'title')} />
                                <Icon
                                    className={classnames(classes.remove)} title="Remove USP"
                                    onClick={() => removeUsp(usp)} path={mdiClose} size={1}
                                />
                            </Row>
                            <Input
                                onChange={e => onChangeHandler(e, usp, 'value')} as="textarea"
                                value={usp.value} label="Content" resize="none" rows={8}
                            />
                        </Col>
                    ))
                }
                <TextButton onClick={addUsp}>Add USP</TextButton>
            </TabWrapper>
            <Button className={classnames(classes.submit)} disabled={saving}>Save</Button>
        </Col>
    );
}
