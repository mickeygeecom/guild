import { Button, Col, Row, Input, Select, TextButton, TabWrapper } from './styled-components';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';

export default function Questions({ questions = [], setQuestions, save, saving = false }) {
    const styles = createUseStyles({
        question: {
            border: '2px solid rgb(var(--expansion))',
            marginBottom: 30,
            padding: 15,
        },
        marginBottom: {
            marginBottom: 15,
        },
        submit: {
            margin: [30, 15, 15, 15],
        },
        remove: {
            transition: 'all 0.05s linear',
            marginLeft: 'auto',
            cursor: 'pointer',
            '&:hover': {
                color: 'rgb(var(--expansion))',
            },
        },
        obligatory: {
            flexDirection: 'row !important',
            alignItems: 'center',
        },
    });
    const classes = styles();

    function removeQuestion(questionToRemove) {
        setQuestions(p => p.filter(question => question.id !== questionToRemove.id));
    }

    function addQuestion() {
        setQuestions(p => [ ...p, {
            id: (p[p.length - 1]?.id ?? 0) + 1,
            obligatory: true,
            options: null,
            type: 'text',
            label: '',
        }]);
    }

    function onChangeHandler(e, questionToUpdate, input) {
        e.persist();
        setQuestions(p => p.map(question => question.id === questionToUpdate.id ? { ...questionToUpdate, [input]: e.target.value } : question));
    }

    function obligatoryOnChangeHandler(e, questionToUpdate, input) {
        e.persist();
        setQuestions(p => p.map(question => question.id === questionToUpdate.id ? {...questionToUpdate, [input]: e.target.checked } : question));
    }

    function submit(e) {
        save(e, {
            successMessage: 'Successfully updated questions',
            setter: setQuestions,
            name: 'questions',
            url: 'questions',
            data: questions,
        });
    }

    return (
        <Col as="form" onSubmit={submit}>
            <TabWrapper>
                {
                    questions.map(question => (
                        <Col className={classnames(classes.question)} key={question.id}>
                            <Row className={classnames(classes.marginBottom)}>
                                <Input label="Label" value={question.label} onChange={e => onChangeHandler(e, question, 'label')} />
                                <Icon
                                    onClick={() => removeQuestion(question)} path={mdiClose} size={1}
                                    className={classnames(classes.remove)} title="Remove question"
                                />
                            </Row>
                            <Select
                                onChange={e => onChangeHandler(e, question, 'type')} value={question.type}
                                className={classnames(classes.marginBottom)} label="Input type"
                            >
                                <option value="text">Text</option>
                                <option value="number">Number</option>
                                <option value="radio">Radio</option>
                                <option value="textarea">Textarea</option>
                            </Select>
                            {
                                question.type === 'radio' && (
                                    '<radio options>'
                                )
                            }
                            <Input
                                containerClass={classnames(classes.obligatory)} label="Obligatory" checked={question.obligatory}
                                onChange={e => obligatoryOnChangeHandler(e, question, 'obligatory')} type="checkbox"
                            />
                        </Col>
                    ))
                }
                <TextButton onClick={addQuestion}>Add question</TextButton>
            </TabWrapper>
            <Button className={classnames(classes.submit)} disabled={saving}>Save</Button>
        </Col>
    );
}
