import useOnclickOutside from "react-cool-onclickoutside";
import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

const Col = styled.div`
    flex-direction: column;
    display: flex;
`;

const Row = styled.div`
    ${({ justify }) => justify ? 'justify-content:' + justify + ';' : ''}
    ${({ align }) => align ? 'align-items:' + align + ';' : ''}
    flex-direction: row;
    display: flex;
`;

const Usp = styled.div`
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.05), 0 3px 5px 0 rgba(0, 0, 0, 0.15);
    background-color: white;
    flex-direction: column;
    border-radius: 5px;
    text-align: center;
    padding: 30px;
    display: flex;
`;

const Button = styled.button`
    box-shadow: 0 2px 4px 0 rgba(var(--${({ faction }) => faction ?? 'expansion'}), 0.5);
    background-color: rgb(var(--${({ faction }) => faction ?? 'expansion'}));
    padding: ${({ block }) => block ? '12px' : '8px 12px'};
    font-size: ${({ size }) => (size ?? 1) + 'rem'};
    ${({ block }) => block ? 'width: 100%;' : ''}
    text-transform: uppercase;
    letter-spacing: 2px;
    border-radius: 3px;
    user-select: none;
    font-weight: bold;
    color: white;
    outline: 0;
    &:hover {
        background-color: rgba(var(--${({ faction }) => faction ?? 'expansion'}), 0.95);
    }
    &[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

const H1 = styled.h1`
    text-decoration: none;
    text-align: center;
    font-size: 5rem;
    line-height: 1;
    &:visited {
        color: inherit;
    }
`;

const H2 = styled.h2`
    text-decoration: none;
    text-align: center;
    font-size: 2.5rem;
    line-height: 1;
    &:visited {
        color: inherit;
    }
`;

const H3 = styled.h3`
    text-decoration: none;
    text-align: center;
    font-size: 2rem;
    line-height: 1;
    &:visited {
        color: inherit;
    }
`;

const H4 = styled.h4`
    text-decoration: none;
    text-align: center;
    font-size: 1.5rem;
    line-height: 1;
    &:visited {
        color: inherit;
    }
`;

const H5 = styled.h5`
    text-decoration: none;
    text-align: center;
    font-size: 1.25rem;
    line-height: 1;
    &:visited {
        color: inherit;
    }
`;

const H6 = styled.h6`
    text-decoration: none;
    text-align: center;
    font-size: 1rem;
    line-height: 1;
    &:visited {
        color: inherit;
    }
`;

const StyledInput = styled.input`
    border: 1px solid rgb(200, 200, 200);
    background-color: white;
    transition: all 0.05s;
    border-radius: 2px;
    font-size: 1rem;
    padding: 6px;
    outline: 0;
    &:focus {
        box-shadow: 0 0 3px 0 rgb(var(--expansion));
        border-color: rgb(var(--expansion));
    }
`;
const Label = styled.label`
    font-family: Roboto Slab;
    margin-bottom: 5px;
    cursor: text;
`;
const Input = ({ containerClass = '', type = 'text', label = null, ...props }) => {
    return (
        <Col className={classnames(containerClass)}>
            {label && <Label>{label}</Label>}
            <StyledInput id={label} {...props} />
        </Col>
    );
}

const StyledLoadingBackground = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    height: 100vh;
    width: 100vw;
`;
const StyledLoadingSpinnerBackground = styled.div`
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
    border: 1px solid rgb(var(--expansion));
    background-color: white;
    border-radius: 5px;
    padding: 35px;
    margin: auto;
`;
const StyledLoadingSpinner = styled.img`
    animation: spin 2s infinite linear;
    height: 100px;
    margin: auto;
    width: 100px;

    @keyframes spin {
        from {
            transform: rotateY(0deg);
        }
        to {
            transform: rotateY(360deg);
        }
    }
`;
const Loading = ({ loading = false, faction = 'horde' }) => {
    document.querySelector('body').style.overflowY = loading ? 'hidden' : 'auto';

    if (!loading) {
        return null;
    }

    return (
        <StyledLoadingBackground as={Col}>
            <StyledLoadingSpinnerBackground as={Col}>
                <StyledLoadingSpinner src={`/storage/${faction}.svg`} alt="Faction" />
                <p style={{ marginTop: 25 }}>Loading, please wait</p>
            </StyledLoadingSpinnerBackground>
        </StyledLoadingBackground>
    )
}

const StyledSelect = styled.select`
    border: 1px solid black;
    font-family: Roboto;
    font-size: 1rem;
    padding: 5px;
    outline: 0;
`;

const Select = ({ containerClass = '', label = null, ...props }) => {
    return (
        <Col className={classnames(containerClass)}>
            {label && <Label>{label}</Label>}
            <StyledSelect id={label} {...props} />
        </Col>
    );
}

const FactionToggler = ({ label = null, active = 'horde', toggleActive, ...props }) => {
    const styles = createUseStyles({
        toggler: {
            border: '1px solid rgb(100, 100, 100)',
            backgroundColor: 'rgb(200, 200, 200)',
            transition: 'all 0.1s linear',
            position: 'relative',
            margin: ['auto', 25],
            cursor: 'pointer',
            borderRadius: 25,
            height: 25,
            width: 50,
            '&.horde': {
                backgroundColor: 'rgb(var(--horde))',
            },
            '&.alliance': {
                backgroundColor: 'rgb(var(--alliance))',
            },
        },
        ball: {
            border: '1px solid rgb(100, 100, 100)',
            transition: 'all 0.1s linear',
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
            position: 'absolute',
            borderRadius: '50%',
            height: 20,
            top: '50%',
            width: 20,
            '&.horde': {
                left: 2,
            },
            '&.alliance': {
                left: 26,
            },
        },
        icon: {
            transition: 'all 0.1s linear',
            height: 100,
            width: 100,
            '&:not(.active)': {
                filter: 'grayscale(1)',
            },
        },
    });
    const classes = styles();

    return (
        <Col {...props}>
            {label && <Label>{label}</Label>}
            <Row justify="center">
                <img 
                    className={classnames(classes.icon, { active: active === 'horde' })}
                    src="/storage/horde.svg" alt="Horde" title="Horde"
                />
                <Row className={classnames(classes.toggler, active)} onClick={toggleActive}>
                    <span className={classnames(classes.ball, active)} />
                </Row>
                <img 
                    className={classnames(classes.icon, { active: active === 'alliance' })}
                    src="/storage/alliance.svg" alt="Alliance" title="Alliance"
                />
            </Row>
        </Col>
    );
}

const TabPanel = styled.div`
    user-select: none;
`;

export {
    FactionToggler,
    TabPanel,
    Loading,
    Select,
    Button,
    Label,
    Input,
    Col,
    Row,
    Usp,
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
};
