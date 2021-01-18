import React, { useState, useEffect } from 'react';
import { Col, H4, Row } from './styled-components';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import { Http } from '../classes';
import Class from './Class';

export default function Recruitment({ save, popup, specs = [], setSpecs }) {
    const styles = createUseStyles({
        wrapper: {
            gridTemplateColumns: 'repeat(2, 1fr)',  
            display: 'grid',
            gridGap: 26,
        },
        icon: {
            width: 50,
        },
    });
    const classes = styles();

    function updateSpecs(action = 'add', _class = '', spec = '') {
        setSpecs(p => p.map(element => {
            for (let i = 0; i < element.length; i++) {
                if (element[i].class === _class && element[i].spec === spec) {
                    element[i].recruiting = action === 'add' ? true : false;
                }
            }
            return element;
        }));
    }

    return (
        <form className={classnames(classes.wrapper)} onSubmit={save}>
            {specs.map(_class => <Class key={_class[0].class} updateSpecs={updateSpecs} _class={_class} />)}
        </form>
    );
}
