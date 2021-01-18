import { Button } from './styled-components';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import Class from './Class';
import React from 'react';

export default function Recruitment({ save, specs = [], setSpecs }) {
    const styles = createUseStyles({
        wrapper: {
            gridTemplateColumns: 'repeat(3, 1fr)',  
            marginBottom: 30,
            display: 'grid',
            gridGap: 10,
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
        <form onSubmit={e => save(e, {
            successMessage: 'Successfully updated recruitment',
            name: 'specs',
            url: 'specs',
            data: specs,
        })}>
            <div className={classnames(classes.wrapper)}>
                {specs.map(_class => <Class key={_class[0].class} updateSpecs={updateSpecs} _class={_class} />)}
            </div>
            <Button block>Save</Button>
        </form>
    );
}
