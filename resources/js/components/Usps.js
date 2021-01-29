import { Button, Col, Row, Input } from './styled-components';
import { mdiClose, mdiPlus } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import Icon from '@mdi/react';
import React from 'react';

export default function Usps({ usps = [], setUsps, save, saving = false }) {
    const styles = createUseStyles({
        usp: {
            marginBottom: 30,
        },
        uspTitle: {
            marginBottom: 15,
        },
        add: {
            transition: 'all 0.05s linear',
            border: '3px solid',
            cursor: 'pointer',
            marginBottom: 30,
            width: 35,
            '&:hover': {
                borderColor: 'rgb(var(--expansion))',
                color: 'rgb(var(--expansion))',
            },
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
                        <Row className={classnames(classes.uspTitle)}>
                            <Input label="Title" value={usp.title} onChange={e => onChangeHandler(e, usp, 'title')} />
                            <Icon
                                className={classnames(classes.remove)}
                                onClick={() => removeUsp(usp)}
                                path={mdiClose}
                                size={1}
                            />
                        </Row>
                        <Input
                            onChange={e => onChangeHandler(e, usp, 'value')}
                            value={usp.value}
                            label="Content"
                            resize="none"
                            as="textarea"
                            rows={8}
                        />
                    </Col>
                ))
            }
            <Icon className={classnames(classes.add)} path={mdiPlus} onClick={addUsp} />
            <Button disabled={saving} block>Save</Button>
        </form>
    );
}
