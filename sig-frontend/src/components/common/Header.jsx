import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText, Container } from 'reactstrap';


export default function Header() {
    return (
        <header>
            <Navbar color="dark" dark expand="lg">
                <NavbarBrand tag={RRNavLink} to="/">Ocupación de las playas de Asturias</NavbarBrand>
                <Container>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/">Inicio</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/historial">Historial</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>Daniel Cabal | Alba Cotarelo | Antonio Payá</NavbarText>
                </Container>
            </Navbar>
        </header>
    )
}