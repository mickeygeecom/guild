import { Button, Col, TabWrapper } from './styled-components';
import { createUseStyles } from 'react-jss';
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Class from './Class';

export default function Recruitment({ specs = [], setSpecs, save, saving = false }) {
    const styles = createUseStyles({
        wrapper: {
            gridTemplateColumns: 'repeat(3, 1fr)',  
            display: 'grid',
            gridGap: 15,
        },
        toggler: {
            marginBottom: 15,
        },
        icon: {
            width: 50,
        },
        submit: {
            marginTop: 15,
        },
    });
    const classes = styles();

    const [amountOfCheckedSpecs, setAmountOfCheckedSpecs] = useState(0);

    useEffect(() => {
        let amountOfCheckedSpecs = 0;
        specs.forEach(_class => {
            _class.forEach(spec => {
                amountOfCheckedSpecs += spec.recruiting;
            });
        });
        setAmountOfCheckedSpecs(amountOfCheckedSpecs);
    });

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

    function submit(e) {
        save(e, {
            successMessage: 'Successfully updated recruitment',
            name: 'specs',
            url: 'specs',
            data: specs,
        });
    }

    function toggleAll() {
        setSpecs(p => p.map(_class => {
            _class.forEach(spec => {
                spec.recruiting = amountOfCheckedSpecs > 0 ? 0 : 1;
            });
            return _class;
        }));
    }

    return (
        <Col align="center" as="form" onSubmit={submit}>
            <Button className={classnames(classes.toggler)} type="button" onClick={toggleAll}>Toggle all</Button>
            <TabWrapper>
                <div className={classnames(classes.wrapper)}>
                    {specs.map(_class => <Class key={_class[0].class} updateSpecs={updateSpecs} _class={_class} />)}
                </div>
            </TabWrapper>
            <Button className={classnames(classes.submit)} block disabled={saving}>Save</Button>
        </Col>
    );
}
