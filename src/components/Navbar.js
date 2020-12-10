import React, { useState, useEffect, useRef } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

const NavbarComp = ({ detail }) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [navBackground, setNavBackground] = useState(false);

  const navRef = useRef();
  navRef.current = navBackground;
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  const scrollBottom = () => {
    history.push('/');
    window.scroll(0, document.body.scrollHeight);
  };

  return (
    <Navbar
      dark
      expand='md'
      fixed={detail ? false : 'top'}
      sticky={!detail ? false : 'top'}
      style={{
        transition: '1s ease',
        backgroundColor: detail
          ? 'black'
          : navBackground
          ? 'black'
          : 'transparent',
      }}
    >
      <Container fluid='md'>
        <NavbarBrand
          style={{ color: 'white', cursor: 'pointer' }}
          onClick={() => {
            history.push('/');
          }}
        >
          LARUNO TEST
        </NavbarBrand>
        <NavbarToggler onClick={toggle} style={{ color: 'white' }} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem onClick={scrollBottom}>
              <NavLink style={{ color: 'white' }}>Tentang Kami</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
