import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstNameField = screen.getByPlaceholderText('Edd');
    userEvent.type(firstNameField, 'he');

    const firstNameFeedback = screen.getByTestId('error');
    expect(firstNameFeedback).toBeInTheDocument();

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const button = screen.getByRole('button');
    userEvent.click(button)

    const errors = screen.getAllByTestId('error')
    const numOfErrors = errors.length;
    numOfErrors === 3;
   
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstNameField = screen.getByPlaceholderText('Edd');
    const lastNameField = screen.getByPlaceholderText('Burke');
    const button = screen.getByRole('button');

    userEvent.type(firstNameField, 'Felix')
    userEvent.type(lastNameField, 'Felix')

    userEvent.click(button)
    const errors = screen.getAllByTestId('error')
    const numOfErrors = errors.length;
    numOfErrors === 1;

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const email = screen.getByLabelText('Email*');
    userEvent.type(email, 'wheee');

    const emailValidation = screen.getByTestId('error');
    expect(emailValidation).toBeInTheDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const firstNameField = screen.getByPlaceholderText('Edd');
    const emailField = screen.getByLabelText('Email*');
    const button = screen.getByRole('button');

    userEvent.type(firstNameField, 'Felix');
    userEvent.type(emailField, 'felix@gmail.com');

    userEvent.click(button);

    const lastNameError = screen.getByText(/Error: lastName is a required field./i)
    expect(lastNameError).toBeInTheDocument()



});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const firstNameField = screen.getByPlaceholderText('Edd');
    const lastNameField = screen.getByPlaceholderText('Burke');
    const emailField = screen.getByLabelText('Email*');
    const button = screen.getByRole('button');


    userEvent.type(firstNameField, 'Felix');
    userEvent.type(lastNameField, 'Felix');
    userEvent.type(emailField, 'felix@gmail.com');

    userEvent.click(button);

    const firstnameDisplay = screen.getByTestId("firstnameDisplay");
    const lastnameDisplay = screen.getByTestId("lastnameDisplay"); 
    const emailDisplay = screen.getByTestId("emailDisplay");
    const messageDisplay = screen.queryByTestId('messageDisplay');

    expect(firstnameDisplay).toBeInTheDocument();
    expect(lastnameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).toBeNull();


});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const firstNameField = screen.getByPlaceholderText('Edd');
    const lastNameField = screen.getByPlaceholderText('Burke');
    const emailField = screen.getByLabelText('Email*');
    const messageField = screen.getByLabelText('Message')
    const button = screen.getByRole('button');


    userEvent.type(firstNameField, 'Felix');
    userEvent.type(lastNameField, 'Felix');
    userEvent.type(emailField, 'felix@gmail.com');
    userEvent.type(messageField, 'Hello Partner')
    userEvent.click(button);

    const firstnameDisplay = screen.getByTestId("firstnameDisplay");
    const lastnameDisplay = screen.getByTestId("lastnameDisplay"); 
    const emailDisplay = screen.getByTestId("emailDisplay");
    const messageDisplay = screen.getByTestId('messageDisplay');

    expect(firstnameDisplay).toBeInTheDocument();
    expect(lastnameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).toBeInTheDocument();
});