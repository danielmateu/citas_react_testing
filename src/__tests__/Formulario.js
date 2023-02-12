import React from 'react';
import { render, screen } from "@testing-library/react"
import Formulario from "../components/Formulario"
import '@testing-library/jest-dom/extend-expect'


test('<Formulario/> Cargar el form y revisar que todo sea correcto', () => {
    //render the component

    // const { container } = render(<Formulario/>)
    // container.debug();

    // const { getByText } = render(<Formulario />)
    render(<Formulario/>)
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



