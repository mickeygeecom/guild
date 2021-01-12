import useOnclickOutside from "react-cool-onclickoutside";
import React, { useState } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

const Col = styled.div`
    flex-direction: column;
    display: flex;
`;

const Row = styled.div`
    flex-direction: row;
    display: flex;
`;

const Usp = styled.div`
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.05), 0 3px 5px 0 rgba(0, 0, 0, 0.15);
    background-color: white;
    flex-direction: column;
    border-radius: 5px;
    text-align: center;
    padding: 25px 40px;
    display: flex;
`;

const Button = styled.button`
    box-shadow: 0 2px 4px 0 rgba(var(--${({ faction }) => faction ?? 'horde'}), 0.5);
    background-color: rgb(var(--${({ faction }) => faction ?? 'horde'}));
    text-transform: uppercase;
    letter-spacing: 2px;
    border-radius: 3px;
    user-select: none;
    padding: 8px 12px;
    color: white;
    outline: 0;
    &[disabled] {
        opacity: 0.5;
    }
`;

const H1 = styled.h1`
    text-align: center;
    font-size: 5rem;
    line-height: 1;
`;

const H2 = styled.h2`
    text-align: center;
    font-size: 2.5rem;
    line-height: 1;
`;

const H3 = styled.h3`
    text-align: center;
    font-size: 2rem;
    line-height: 1;
`;

const H4 = styled.h4`
    text-align: center;
    font-size: 1.5rem;
    line-height: 1;
`;

const H5 = styled.h5`
    text-align: center;
    font-size: 1.25rem;
    line-height: 1;
`;

const H6 = styled.h6`
    text-align: center;
    font-size: 1rem;
    line-height: 1;
`;

const StyledInput = styled.input`
    border: 1px solid rgb(200, 200, 200);
    background-color: white;
    font-family: Montserrat;
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
const StyledLabel = styled.label`
    font-family: Roboto Slab;
    margin-bottom: 5px;
    cursor: text;
`;
const Input = ({ containerClass = '', type = 'text', label = null, ...props }) => {
    return (
        <Col className={classnames(containerClass)}>
            {label && <StyledLabel>{label}</StyledLabel>}
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
    const [open, setOpen] = useState(loading);

    const container = useOnclickOutside(() => {
        setOpen(false);
    });

    document.querySelector('body').style.overflowY = open ? 'hidden' : 'auto';

    if (!open || !loading) {
        return null;
    }

    return (
        <StyledLoadingBackground as={Col}>
            <StyledLoadingSpinnerBackground as={Col} ref={container}>
                <StyledLoadingSpinner src={`/storage/${faction}.svg`} alt="Faction" />
                <p style={{ marginTop: 25 }}>Loading, please wait</p>
            </StyledLoadingSpinnerBackground>
        </StyledLoadingBackground>
    )
}

const Select = styled.select`
    border: 1px solid black;
    padding: 5px;
    outline: 0;
`;

const TabPanel = styled.div`
    user-select: none;
`;

export {
    TabPanel,
    Loading,
    Select,
    Button,
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
