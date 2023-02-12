import React from 'react';
import { fireEvent, render, screen, cleanup } from "@testing-library/react"
import Formulario from "../components/Formulario"
import '@testing-library/jest-dom/extend-expect'


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



