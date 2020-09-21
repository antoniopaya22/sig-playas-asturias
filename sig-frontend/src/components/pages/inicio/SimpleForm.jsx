import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

export default function SimpleForm({ onSubmit }) {
    return(
        <Form onSubmit={onSubmit}>
            <FormGroup>
                <Label for="ubicacion">¿Dónde te encuentras?</Label>
                <Input type="text" name="ubicación" className="form-control" />
                <Label for="distancia">Como mucho, ¿Cuántos minutos quieres tardar?</Label>
                <Input type="text" name="distancia" className="form-control" />
            </FormGroup>
            <Button block={true}>Enviar</Button>
        </Form>
    );
}