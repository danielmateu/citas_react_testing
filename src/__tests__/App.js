

import React from 'react';
import { render, screen } from "@testing-library/react"
// import Formulario from "../components/Formulario"
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';
import App from '../App';

// const crearCita = jest.fn();

test('La aplicación funciona correctamente la primera vez', () => {
    //Para probar que el componente se monta correctamente
    // const wrapper = render(<App/>)
    // wrapper.debug()

    render(<App/>);
    expect(screen.getByText('Administrador de Pacientes')).toBeInTheDocument();
    expect(screen.getByTestId('nombre-app').textContent).toBe('Administrador de Pacientes')
    expect(screen.getByTestId('nombre-app').tagName).toBe('H1')
    expect(screen.getByTestId('nombre-app').tagName).not.toBe('H2')

    expect(screen.getByText('Crear Cita')).toBeInTheDocument()
    expect(screen.getByText('No hay citas')).toBeInTheDocument()

})

test('Validar el formulario y camio de no hay citas a administra tus citas', () => {
    //Llenar el formulario
    render(<App/>)

    userEvent.type(screen.getByTestId('mascota'), 'Nuk')
    userEvent.type(screen.getByTestId('propietario'), 'Dani')
    userEvent.type(screen.getByTestId('fecha'), '2021-09-10')
    userEvent.type(screen.getByTestId('hora'), '10:30')
    userEvent.type(screen.getByTestId('sintomas'), 'El més guapo')

      //Hacer submit
    const btnSubmit = screen.getByTestId('btn-submit')
    userEvent.click(btnSubmit);

    //Revisar que el error no exista
    const alerta = screen.queryByTestId('alerta')
    expect(alerta).not.toBeInTheDocument()

    //Revisar que el texto de no hay citas cambie a administra tus citas
    expect(screen.getByTestId('titulo-dinamico').textContent).toBe('Administra tus Citas')
    expect(screen.getByTestId('titulo-dinamico').textContent).not.toBe('No hay citas')

})