import { Row, Col, H4, H5 } from './styled-components';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import React from 'react';

export default function Class({ _class, updateSpecs }) {
    const styles = createUseStyles({
        icon: {
            border: '3px solid transparent',
            transition: 'all 0.05s linear',
            filter: 'brightness(0.5)',
            cursor: 'pointer',
            margin: [0, 5],
            height: 50,
            width: 50,
            '&.active': {
                boxShadow: [0, 0, 1, 2, `rgb(var(--${_class[0].class.replace(' ', '-').toLowerCase()}))`],
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
            <H4 className={classnames(classes.title)}>{_class[0].class}</H4>
            <H5 className={classnames(classes.counter)}>
                {recruitingAmount} / {_class.length}
            </H5>
            <Row justify="center">
                {
                    _class.map(spec => (
                        <img
                            src={`/storage/specs/${spec.class.replace(' ', '_')}-${spec.spec.replace(' ', '_')}.jpg`}
                            onClick={() => updateSpecs(spec.recruiting ? 'remove' : 'add', spec.class, spec.spec)}
                            className={classnames(classes.icon, { active: Boolean(spec.recruiting) })}
                            title={`${spec.spec} ${spec.class}`}
                            alt={`${spec.spec} ${spec.class}`}
                            key={spec.id}
                        />
                    ))
                }
            </Row>
        </Col>
    );
}
