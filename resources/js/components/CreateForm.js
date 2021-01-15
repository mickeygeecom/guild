import { Select, Accordion, Input, Row, Label, Button, Loading } from './styled-components';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import { Http } from '../classes';

export default function CreateForm({ faction = 'horde' }) {
    const styles = createUseStyles({
        marginTop: {
            marginTop: 15,
            '&:first-child': {
                marginTop: 0,
            },
        },
        remove: {
            textDecoration: 'underline',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: 'red',
        },
        add: {
            color: 'rgb(var(--expansion))',
        },
    });
    const classes = styles();

    const [questions, setQuestions] = useState([
        { id: 1, label: 'A question', type: 'radio', obligatory: true },
        { id: 2, label: 'Some other question', type: 'radio', obligatory: true },
    ]);
    const [openAccordion, setOpenAccordion] = useState(null);
    const [saving, setSaving] = useState(false);

    function onChangeHandler(e, input, id) {
        e.persist();
        setQuestions(p => {
            let question = p.find(question => question.id === id);
            const filtered = p.filter(element => element !== question);
            question = { ...question, [input]: e.target.value };
            return [ ...filtered, question ].sort((a, b) => a.id - b.id);
        });
    }

    function toggleAccordion(id) {
        setOpenAccordion(p => p === id ? null : id);
    }

    function removeQuestion(id) {
        if (questions.find(question => question.id === id && question.label) && !confirm('Remove this question?')) {
            return;
        }
        setQuestions(p => p.filter(question => question.id !== id));
    }

    function addQuestion() {
        setQuestions(p => {
            const id = p[p.length - 1].id + 1;
            setOpenAccordion(id);
            return [ ...p, { id: id, label: '', type: 'text', obligatory: true } ];
        });
    }

    async function saveQuestions(e) {
        e.preventDefault();
        setSaving(true);
        const { code } = await Http.post('questions');
        setSaving(false);
    }

    return (
        <form onSubmit={saveQuestions}>
            {
                questions.map(question => (
                    <Accordion 
                        toggle={() => toggleAccordion(question.id)} 
                        className={classnames(classes.marginTop)}
                        open={openAccordion === question.id}
                        label={question.label}
                        key={question.id}
                    >
                        <Input
                            value={question.label} onChange={e => onChangeHandler(e, 'label', question.id)}
                            label="Question" autoFocus autoComplete="off" containerClass={classes.marginTop}
                        />
                        <Select 
                            onChange={e => onChangeHandler(e, 'type', question.id)}
                            containerClass={classes.marginTop} 
                            value={question.type}
                            label="Input type"
                        >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="textarea">Textarea</option>
                            <option value="select">Select</option>
                            <option value="radio">Radio</option>
                            <option value="check">Check</option>
                        </Select>
                        <Row className={classnames(classes.marginTop)} align="center">
                            <Label style={{ margin: 0 }}>Obligatory</Label>
                            <input type="checkbox" onChange={e => onChangeHandler(e, 'obligatory', question.id)} checked={questions.obligatory} />
                        </Row>
                        {/* options */}
                        <p className={classnames(classes.remove)} onClick={() => removeQuestion(question.id)}>Remove</p>
                    </Accordion>
                ))
            }
            <p className={classnames(classes.remove, classes.add, classes.marginTop)} onClick={addQuestion}>Add question</p>
            <Button block style={{ marginTop: 30 }} disabled={saving}>Save</Button>
            <Loading faction={faction} loading={saving} />
        </form>
    );
}
