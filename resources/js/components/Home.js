import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Col } from './styled-components';
import classnames from 'classnames';

export default function Home() {
    const styles = createUseStyles({
        home: {

        },
    });
    const classes = styles();

    return (
        <Col className={classnames(classes.home)}>
            <Col className={classnames(classes.hero)}>
                <h1 className={classnames(classes.title)}>Guild</h1>
                <h2 className={classnames(classes.realm)}>Realm</h2>
            </Col>
        </Col>
    );
}
