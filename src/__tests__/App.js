

import React from 'react';
import { getByTestId, render, screen } from "@testing-library/react"
// import Formulario from "../components/Formulario"
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';
import App from '../App';

// const crearCita = jest.fn();

test('<App/> La aplicación funciona correctamente la primera vez', () => {
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

test('<App/> Validar el formulario y camio de no hay citas a administra tus citas', () => {
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

test('<App/> Verificar las citas en el DOM', async() => {

    render(<App/>)

    const citas = await screen.findAllByTestId('cita')
    // console.log(citas.toString());

    //Snapshot crea un archivo para verificar su contenido
    // expect(citas).toMatchSnapshot()

    // Verificar que el boton eliminar es un boton
    expect(screen.getByTestId('btn-eliminar').tagName).toBe('BUTTON')
    //Y que exista en el documento
    expect(screen.getByTestId('btn-eliminar')).toBeInTheDocument()

    //Verificar alguna cita
    expect(screen.getByText('Nuk')).toBeInTheDocument()


})

//Eliminar la cita
test('<App/> Eliminar una cita', () => {
    render(<App/>)

    //Verificar que exista la cita
    expect(screen.getByText('Nuk')).toBeInTheDocument()

    //Eliminar la cita
    const btnEliminar = screen.getByTestId('btn-eliminar')
    userEvent.click(btnEliminar)

    //Verificar que la cita ya no exista
    expect(screen.queryByText('Nuk')).not.toBeInTheDocument()
    expect(screen.getByText('No hay citas')).toBeInTheDocument()
    expect(screen.getByTestId)

    //El boton ya no debe estar
    expect(screen.queryByTestId('btn-eliminar')).not.toBeInTheDocument()
})

