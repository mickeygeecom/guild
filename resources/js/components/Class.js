import { Row, Col, H5, H6 } from './styled-components';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import React from 'react';

export default function Class({ _class, updateSpecs }) {
    const styles = createUseStyles({
        icon: {
            border: '2px solid transparent',
            transition: 'all 0.05s linear',
            filter: 'brightness(0.5)',
            cursor: 'pointer',
            margin: [0, 5],
            height: 40,
            width: 40,
            '&.active': {
                boxShadow: [0, 0, 1, 1, `rgb(var(--${_class[0].class.replace(' ', '-').toLowerCase()}))`],
                filter: 'brightness(1)',
                borderColor: 'black',
            },
        },
        title: {
            marginBottom: 10,
        },
        counter: {
            marginBottom: 15,
        },
        container: {
            border: '1px solid rgb(150, 150, 150)',
            backgroundColor: 'rgb(250, 250, 250)',
            padding: 15,
        },
    });
    const classes = styles();

    const recruitingAmount = _class.filter(spec => Boolean(spec.recruiting)).length;

    return (
        <Col className={classnames(classes.container)}>
            <H5 className={classnames(classes.title)}>{_class[0].class}</H5>
            <H6 className={classnames(classes.counter)}>
                {recruitingAmount} / {_class.length}
            </H6>
            <Row justify="center">
                {
                    _class.map(spec => (
                        <img
                            src={`/storage/specs/${spec.class.replace(' ', '_').toLowerCase()}-${spec.spec.replace(' ', '_').toLowerCase()}.jpg`}
                            onClick={() => updateSpecs(spec.recruiting ? 'remove' : 'add', spec.class, spec.spec)}
                            className={classnames(classes.icon, { active: Boolean(spec.recruiting) })}
                            title={spec.spec}
                            alt={spec.spec}
                            key={spec.id}
                        />
                    ))
                }
            </Row>
        </Col>
    );
}
