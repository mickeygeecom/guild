import useOnclickOutside from 'react-cool-onclickoutside';
import { Row, Col, H4 } from './styled-components';
import { mdiPlus, mdiClose } from '@mdi/js';
import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';
import classnames from 'classnames';
import Icon from '@mdi/react';

export default function Class({ _class, updateSpecs }) {
    const styles = createUseStyles({
        icon: {
            position: 'relative',
            height: 50,
            width: 50,
            '&.pointer': {
                cursor: 'pointer',
            },
        },
        classIcon: {
            '&:hover button': {
                display: 'block',
            },
        },
        remove: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '2px solid red',
            position: 'absolute',
            display: 'none',
            height: '100%',
            width: '100%',
            color: 'red',
            outline: 0,
            left: 0,
            top: 0,
        },
    });
    const classes = styles();

    const [editing, setEditing] = useState(false);

    const wrapper = useOnclickOutside(() => {
        if (editing) {
            setEditing(false);
        }
    });

    function addSpec(_class = '', spec = '') {
        updateSpecs('add', _class, spec);
        setEditing(false);
    }

    return (
        <Col>
            <H4 className={classnames(classes.title)} align="left">{_class[0].class}</H4>
            <Row ref={wrapper} style={{ width: 'fit-content' }}>
                {
                    !editing && _class.filter(spec => Boolean(spec.recruiting)).map(spec => (
                        <span className={classnames(classes.classIcon, classes.icon)} key={spec.id}>
                            <img
                                src={`/storage/specs/${spec.class.replace(' ', '_')}-${spec.spec.replace(' ', '_')}.jpg`}
                                className={classnames(classes.icon)}
                                alt={`${spec.spec} ${spec.class}`}
                            />
                            <button className={classnames(classes.remove)} type="button" onClick={() => updateSpecs('remove', spec.class, spec.spec)}>
                                <Icon path={mdiClose} size={1.25} />
                            </button>
                        </span>
                    ))
                }
                {
                    editing && _class.filter(spec => !Boolean(spec.recruiting)).map(spec => (
                        <span className={classnames(classes.classIcon, classes.icon)} key={spec.id}>
                            <img
                                src={`/storage/specs/${spec.class.replace(' ', '_')}-${spec.spec.replace(' ', '_')}.jpg`}
                                onClick={() => addSpec(spec.class, spec.spec)}
                                className={classnames(classes.icon, 'pointer')}
                                alt={`${spec.spec} ${spec.class}`}
                            />
                        </span>
                    ))
                }
                {
                    !editing && _class.filter(spec => Boolean(spec.recruiting)).length < _class.length && (
                        <button className={classnames(classes.add, classes.icon)} type="button" onClick={() => setEditing(true)}>
                            <Icon path={mdiPlus} size={1} />
                        </button>
                    )
                }
            </Row>
        </Col>
    );
}
