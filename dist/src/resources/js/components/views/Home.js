import { Col, H1, H2, H5, PageLoading, Row, Usp, SpecIcon, OrderHallBackground } from '../styled-components';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import React from 'react';

export default function Home({ guild = {}, usps = [], specs = [], loading = true }) {
    const styles = createUseStyles({
        '@keyframes fadeInUpwards': {
            from: { opacity: 0, transform: 'translateY(20px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
        },
        '@keyframes fadeInRight': {
            from: { opacity: 0, transform: 'translateX(-20px)' },
            to: { opacity: 1, transform: 'translateX(0)' },
        },
        hero: {
            backgroundImage: 'url("/storage/hero.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            justifyContent: 'center',
            backgroundSize: 'cover',
            alignItems: 'center',
            position: 'relative',
            height: 500,
            '@media (max-width: 768px)': {
                height: '100vh',
            },
            '&::after': {
                background: 'rgba(0, 0, 0, 0.5)',
                position: 'absolute',
                height: '100%',
                content: '""',
                width: '100%',
                left: 0,
                top: 0,
            },
        },
        title: {
            animation: '$fadeInUpwards 0.5s 0.25s forwards',
            textShadow: '1px 1px black',
            textTransform: 'uppercase',
            fontStyle: 'italic',
            fontFamily: 'Teko',
            letterSpacing: 3,
            opacity: 0,
            zIndex: 10,
        },
        realm: {
            animation: '$fadeInUpwards 0.5s 0.5s forwards',
            textShadow: '1px 1px black',
            color: 'white',
            opacity: 0,
            zIndex: 10,
        },
        uspRow: {
            justifyContent: 'space-between',
        },
        usps: {
            backgroundColor: 'rgb(20, 20, 20)',
            padding: [0, 200],
            flexWrap: 'wrap',
            '@media (max-width: 1200px)': {
                padding: 0,
                margin: 0,
            },
        },
        usp: {
            animation: '$fadeInRight 0.5s forwards',
            width: '25%',
            opacity: 0,
            margin: 50,
            '@media (max-width: 1200px)': {
                margin: 30,
            },
            '@media (max-width: 768px)': {
                width: '100%',
                '&:not(:first-child)': {
                    marginTop: 0,
                },
            },
        },
        uspTitle: {
            color: 'rgb(var(--expansion))',
            textTransform: 'uppercase',
            marginBottom: 20,
        },
        recruitment: {
            gridTemplateColumns: `repeat(${Math.floor(specs.length / 2) || 6 }, 200px)`,
            backgroundColor: 'rgb(15, 15, 15)',
            justifyContent: 'center',
            padding: [0, 200],
            display: 'grid',
            color: 'white',
            '@media (max-width: 1200px)': {
                padding: 0,
            },
        },
        recruitmentSpecs: {
            marginTop: 10,
        },
        specIcon: {
            boxShadow: [0, 0, 15, 0, 'black'],
            margin: 2,
        },
    });
    const classes = styles();

    return (
        <Col className={classnames(classes.home)}>
            <PageLoading loading={loading} />
            <Col className={classnames(classes.hero)}>
                <H1 className={classnames(classes.title, `color-${guild.faction}`)}>{guild.name}</H1>
                <H2 className={classnames(classes.realm)}>{guild.realm}</H2>
            </Col>
            <Row className={classnames(classes.usps)} justify="center">
                {
                    usps.map((usp, i) => (
                        <Usp className={classnames(classes.usp)} style={{ animationDelay: `${1000 + (100 * i)}ms` }} key={usp.id}>
                            <H5 className={classnames(classes.uspTitle)}>{usp.title}</H5>
                            {
                                usp.value.split('\n').map((row, i) => (
                                    <p className={classnames(classes.uspRow)} key={i}>{row}</p>
                                ))
                            }
                        </Usp>
                    ))
                }
            </Row>
            <div className={classnames(classes.recruitment)}>
                {
                    specs.map((_class, i) => (
                        <Col className={classnames(classes.recruitmentClass)} align="center" title={_class[0].class} key={i}>
                            <OrderHallBackground active={Boolean(_class.find(spec => spec.recruiting === 1))} _class={_class[0].class}>
                                <img style={{ width: 50 }} src={`/storage/classes/${_class[0].class.replace(' ', '-').toLowerCase()}.jpg`} />
                                <Row className={classnames(classes.recruitmentSpecs)}>
                                    {
                                        _class.map((spec, i) => spec.recruiting
                                            ? <SpecIcon className={classnames(classes.specIcon)} spec={spec} key={i} />
                                            : null
                                        )
                                    }
                                </Row>
                            </OrderHallBackground>
                        </Col>
                    ))
                }
            </div>
        </Col>
    );
}
