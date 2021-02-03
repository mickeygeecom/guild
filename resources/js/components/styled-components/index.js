import React, { useEffect, useRef, useState } from 'react';
import { mdiPlus, mdiMinus, mdiLoading } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import styled from 'styled-components';
import classnames from 'classnames';
import Icon from '@mdi/react';

const Col = styled.div`
    ${({ justify }) => justify ? 'justify-content:' + justify + ';' : ''}
    ${({ align }) => align ? 'align-items:' + align + ';' : ''}
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

const StyledTextButton = styled.a`
    color: rgb(var(--expansion));
    text-decoration: underline;
    font-weight: bold;
    cursor: pointer;
`;

const TextButton = ({ children, onClick, ...props }) => {
    function click(e) {
        e.preventDefault();
        onClick();
    }
    return <StyledTextButton onClick={click} {...props}>{children}</StyledTextButton>;
};

const StyledTabWrapper = styled.div`
    max-height: 50vh;
    min-width: 500px;
    overflow: auto;
    padding: 15px;
`;
const TabWrapper = ({ children }) => {
    return <StyledTabWrapper className="scrollbar">{children}</StyledTabWrapper>
};

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
    text-align: ${({ align }) => align ? align : 'center'};
    text-decoration: none;
    font-size: 5rem;
    line-height: 1;
`;

const H2 = styled.h2`
    text-align: ${({ align }) => align ? align : 'center'};
    text-decoration: none;
    font-size: 2.5rem;
    line-height: 1;
`;

const H3 = styled.h3`
    text-align: ${({ align }) => align ? align : 'center'};
    text-decoration: none;
    font-size: 2rem;
    line-height: 1;
`;

const H4 = styled.h4`
    text-align: ${({ align }) => align ? align : 'center'};
    text-decoration: none;
    font-size: 1.5rem;
    line-height: 1;
`;

const H5 = styled.h5`
    text-align: ${({ align }) => align ? align : 'center'};
    text-decoration: none;
    font-size: 1.25rem;
    line-height: 1;
`;

const H6 = styled.h6`
    text-align: ${({ align }) => align ? align : 'center'};
    text-decoration: none;
    font-size: 1rem;
    line-height: 1;
`;

const Label = styled.label`
    font-family: Roboto Slab;
    margin-bottom: 5px;
    cursor: text;
    &::after {
        content: "${({ obligatory }) => obligatory ? '*' : ''}";
        margin-left: 5px;
        color: red;
    }
`;

const StyledInput = styled.input`
    resize: ${({ resize }) => resize ?? 'auto'};
    border: 1px solid rgb(100, 100, 100);
    background-color: white;
    transition: all 0.05s;
    font-family: inherit;
    border-radius: 2px;
    font-size: 0.9rem;
    padding: 6px;
    outline: 0;
    &:focus {
        box-shadow: 0 0 3px 0 rgb(var(--expansion));
        border-color: rgb(var(--expansion));
    }
`;

const Input = ({ containerClass = '', obligatory = false, type = 'text', label = null, ...props }) => {
    return (
        <Col className={classnames(containerClass)}>
            {label && <Label obligatory={obligatory}>{label}</Label>}
            <StyledInput type={type} id={label} {...props} />
        </Col>
    );
};

const StyledLoadingBackground = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.25s ease-in-out;
    pointer-events: none;
    position: fixed;
    height: 100vh;
    width: 100vw;
    opacity: 0;
    left: 0;
    top: 0;
    &.loading {
        pointer-events: all;
        opacity: 1;
    }
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
    animation: loading-spin 2s infinite linear;
    height: 100px;
    margin: auto;
    width: 100px;

    @keyframes loading-spin {
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

    return (
        <StyledLoadingBackground className={classnames({ loading: loading })} as={Col}>
            <StyledLoadingSpinnerBackground as={Col}>
                <StyledLoadingSpinner src={`/storage/${faction}.svg`} loading="lazy" alt="Faction" />
                <p style={{ marginTop: 25 }}>Loading, please wait</p>
            </StyledLoadingSpinnerBackground>
        </StyledLoadingBackground>
    )
}

const StyledPageLoading = styled.div`
    background-color: rgb(25, 25, 25);
    transition: all 0.25s ease-in-out;
    pointer-events: none;
    z-index: 1000000;
    position: fixed;
    display: flex;
    height: 100%;
    width: 100%;
    opacity: 0;
    left: 0;
    top: 0;
    &.loading {
        opacity: 1;
    }
`;
const PageLoading = ({ loading = true }) => {
    return (
        <StyledPageLoading className={classnames({ loading: loading })}>
            <Icon path={mdiLoading} size={4} spin={1} color="rgb(var(--expansion))" style={{ margin: 'auto' }} />
        </StyledPageLoading>
    );
}

const StyledSelect = styled.select`
    border: 1px solid black;
    font-family: Roboto;
    user-select: none;
    font-size: 1rem;
    cursor: pointer;
    padding: 5px;
    outline: 0;
`;

const Select = ({ containerClass = '', obligatory = false, label = null, ...props }) => {
    return (
        <Col className={classnames(containerClass)}>
            {label && <Label obligatory={obligatory}>{label}</Label>}
            <StyledSelect id={label} {...props} />
        </Col>
    );
}

const StyledAccordionLabel = styled.p`
    font-weight: bold;
`;
const StyledAccordionContent = styled.div`
    border: 1px solid rgb(var(--expansion));
    transition: all 0.25s linear;
    overflow: hidden;
`;
const StyledAccordionHead = styled.div`
    background-color: rgb(var(--expansion));
    user-select: none;
    cursor: pointer;
    padding: 15px;
    color: white;
`;
const Accordion = ({ className = '', label = null, open = false, toggle, children }) => {
    const [height, setHeight] = useState();
    const wrapper = useRef();
    
    useEffect(() => {
        if (open) {
            setHeight(wrapper.current.getBoundingClientRect().height || 0);
        } else {
            setHeight(0);
        }
    });

    return (
        <Col className={classnames(className)}>
            <StyledAccordionHead align="center" as={Row} onClick={toggle}>
                {label && <StyledAccordionLabel>{label}</StyledAccordionLabel>}
                <Icon style={{ marginLeft: 'auto' }} path={open ? mdiMinus : mdiPlus} size={1} />
            </StyledAccordionHead>
            <StyledAccordionContent as={Col} style={{ height: height }}>
                <Col ref={wrapper} style={{ padding: 15 }}>
                    {children}
                </Col>
            </StyledAccordionContent>
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
    H1, H2, H3, H4, H5, H6,
    Label, Input, Select,
    PageLoading, Loading,
    TabPanel, TabWrapper,
    TextButton, Button,
    FactionToggler,
    Accordion,
    Col, Row,
    Usp,
};
