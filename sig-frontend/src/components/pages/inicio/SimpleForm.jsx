import React from 'react';

export default function SimpleForm({ onSubmit }) {
    return(
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="ubicacion">¿Dónde te encuentras?</label>
                <input type="text" name="ubicación" className="form-control" />
                <label htmlFor="distancia">Como mucho, ¿Cuántos minutos quieres tardar?</label>
                <input type="text" name="distancia" className="form-control" />
            </div>
            <button type="submit" className="btn btn-secondary btn-block">Enviar</button>
        </form>
    );
}