import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {mensajes} from '../../../constants';

export default function SimpleForm({ onSubmit }) {
    const {distancia, calcular} = mensajes;
    return(
        <Form onSubmit={onSubmit}>
            <FormGroup>
                <Label for="distancia">{distancia}</Label>
                <Input type="text" name="distancia" className="form-control" />
            </FormGroup>
            <Button block={true}>{calcular}</Button>
        </Form>
    );
}