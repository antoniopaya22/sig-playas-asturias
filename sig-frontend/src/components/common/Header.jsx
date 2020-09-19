import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


export default function Header() {
    return (
        <header>
            <Navbar color="dark" dark expand="lg">
                <NavbarBrand tag={RRNavLink} to="/">Ocupación de las playas de Asturias</NavbarBrand>
                <div className="container">
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/">Inicio</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/ocupacion">Ocupación</NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </Navbar>
        </header>
    )
}