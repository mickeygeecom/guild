import { Button, Col, TabWrapper } from './styled-components';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import Class from './Class';
import React from 'react';

export default function Recruitment({ specs = [], setSpecs, save, saving = false }) {
    const styles = createUseStyles({
        wrapper: {
            gridTemplateColumns: 'repeat(3, 1fr)',  
            display: 'grid',
            gridGap: 15,
        },
        icon: {
            width: 50,
        },
        marginTop: {
            marginTop: 30,
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

    function submit(e) {
        save(e, {
            successMessage: 'Successfully updated recruitment',
            name: 'specs',
            url: 'specs',
            data: specs,
        });
    }

    return (
        <Col as="form" onSubmit={submit}>
            <TabWrapper>
                <div className={classnames(classes.wrapper)}>
                    {specs.map(_class => <Class key={_class[0].class} updateSpecs={updateSpecs} _class={_class} />)}
                </div>
            </TabWrapper>
            <Button className={classnames(classes.marginTop)} disabled={saving} block>Save</Button>
        </Col>
    );
}
