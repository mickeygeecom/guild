import { Col, H1, H2, H5, PageLoading, Usp } from './styled-components';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import React from 'react';

export default function Home({ guild = {}, usps = [], loading = true }) {
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
            justifyContent: 'center',
            flexWrap: 'wrap',
            display: 'flex',
            margin: 'auto',
            width: '50%',
            '@media (max-width: 768px)': {
                width: '100%',
                margin: 0,
            },
        },
        usp: {
            animation: '$fadeInRight 0.5s forwards',
            width: '25%',
            opacity: 0,
            margin: 50,
            '&:nth-child(1)': {
                animationDelay: 1000,
            },
            '&:nth-child(2)': {
                animationDelay: 1150,
            },
            '&:nth-child(3)': {
                animationDelay: 1300,
            },
            '@media (max-width: 768px)': {
                width: '100%',
                margin: 30,
            },
        },
        uspTitle: {
            textTransform: 'uppercase',
            marginBottom: 20,
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
            <div className={classnames(classes.usps)}>
                {
                    usps.map(usp => (
                        <Usp className={classnames(classes.usp)} key={usp.id}>
                            <H5 className={classnames(classes.uspTitle)}>{usp.title}</H5>
                            {
                                usp.value.split('\n').map(row => (
                                    <p className={classnames(classes.uspRow)} key={Math.random()}>
                                        {row}
                                    </p>
                                ))
                            }
                        </Usp>
                    ))
                }
            </div>
        </Col>
    );
}
