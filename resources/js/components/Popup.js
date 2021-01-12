import { mdiCheckCircleOutline, mdiAlert } from '@mdi/js';
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Row } from './styled-components';
import classnames from 'classnames';
import Icon from '@mdi/react';

export default function Popup({ popup, setPopup, ...props }) {
    const styles = createUseStyles({
        popup: {
            boxShadow: [0, 0, 10, 0, 'rgba(0, 0, 0, 0.5)'],
            backgroundColor: 'rgb(var(--expansion))',
            transition: 'top 0.5s ease-in-out',
            justifyContent: 'center',
            alignItems: 'center',
            userSelect: 'none',
            position: 'fixed',
            color: 'white',
            width: '100%',
            height: 50,
            top: -50,
            left: 0,
            '&.show': {
                top: 0,
            },
            '&.success': {
                backgroundColor: 'rgb(0, 200, 0)',
            },
            '&.error': {
                backgroundColor: 'rgb(200, 0, 0)',
            },
        },
    });
    const classes = styles();
    
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        if (popup.message) {
            setTimeout(() => {
                setShow(false);
            }, 5000);
        }
    }, [popup]);

    return (
        <Row className={classnames(classes.popup, { show: show && popup.message }, popup.type)} {...props}>
            <Icon style={{ marginRight: 5 }} path={popup.type === 'error' ? mdiAlert : mdiCheckCircleOutline} size={1} />
            {popup.message}
        </Row>
    );
}
