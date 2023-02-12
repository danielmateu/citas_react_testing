import React from 'react';
import { fireEvent, render, screen, cleanup } from "@testing-library/react"
import Formulario from "../components/Formulario"
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';


const crearCita = jest.fn();

afterEach(cleanup)

test('<Formulario/> Cargar el form y revisar que todo sea correcto', () => {
    //render the component

    // const { container } = render(<Formulario/>)
    // container.debug();

    // const { getByText } = render(<Formulario />)
    render(<Formulario crearCita={crearCita}/>)
    expect(screen.getByText('Crear Cita')).toBeInTheDocument();


    //Heading
    const titulo = screen.getByTestId('titulo')
    // console.log(screen.getByTestId('titulo').tagName);
    expect(titulo.tagName).toBe('H2')
    expect(titulo.tagName).not.toBe('H1')

    expect(titulo.textContent).toBe('Crear Cita')
    // expect(screen.getByTestId('titulo').tagName).not.toBe('H1')

    //Boton de submit
    const boton = screen.getByTestId('btn-submit')
    expect(boton.tagName).toBe('BUTTON')

})

test('<Formulario> Validación del Formulario', () => {
    render(<Formulario crearCita={crearCita}/>)

    //Hacer submit
    const btnSubmit = screen.getByTestId('btn-submit')
    fireEvent.click(btnSubmit)

    //Revisar que el error exista
    const alerta = screen.getByTestId('alerta')
    expect(alerta).toBeInTheDocument()
    expect(alerta.textContent).toBe('Todos los campos son obligatorios')
    expect(alerta.tagName).toBe('P')
    expect(alerta.tagName).not.toBe('BUTTON')
})

test('<Formulario> Validación del formulario', () => {
    render(<Formulario crearCita={crearCita}/>)

    //Llenar el formulario

    userEvent.type(screen.getByTestId('mascota'), 'Nuk')
    userEvent.type(screen.getByTestId('propietario'), 'Dani')
    userEvent.type(screen.getByTestId('fecha'), '2021-09-10')
    userEvent.type(screen.getByTestId('hora'), '10:30')
    userEvent.type(screen.getByTestId('sintomas'), 'El més guapo')

    fireEvent.change(screen.getByTestId('mascota'), {
        target: {
            value: 'Nuk'
        }
    })

    // fireEvent.change(screen.getByTestId('propietario'), {
    //     target: {
    //         value: 'Dani'
    //     }
    // })


    // fireEvent.change(screen.getByTestId('fecha'), {
    //     target: {
    //         value: '2021-09-10'
    //     }
    // })


    // fireEvent.change(screen.getByTestId('hora'), {
    //     target: {
    //         value: '10:30'
    //     }
    // })


    // fireEvent.change(screen.getByTestId('sintomas'), {
    //     target: {
    //         value: 'El més guapo'
    //     }
    // })

    
    //Hacer submit
    // fireEvent.click(screen.getByTestId('btn-submit'))
    const btnSubmit = screen.getByTestId('btn-submit')
    userEvent.click(btnSubmit);

    //Revisar que el error no exista
    const alerta = screen.queryByTestId('alerta')
    expect(alerta).not.toBeInTheDocument()

    //Revisar que la función se haya llamado
    expect(crearCita).toHaveBeenCalled()
    expect(crearCita).toHaveBeenCalledTimes(1)
})





