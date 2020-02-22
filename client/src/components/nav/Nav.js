import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/actionCreator'
import { bindActionCreators } from "redux"
import { Navbar, Nav, Button, Form, NavDropdown, Dropdown, } from 'react-bootstrap'
import Modal from 'react-modal'
import { openModal, closeModal } from '../../actions/actionCreator'
import PostDrawing from '../drawings/PostDrawing'
import CreateListing from '../listings/createListing'
import Login from '../auth/Login'
import Signup from '../auth/Signup'
import backgroundImage from '../../images/login-background.png'


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    opacity: '0.8'
  }
}
Modal.setAppElement('#root')


const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    modal: state.modal
  };
}

const mapDispatchToProps = dispatch => {

  return bindActionCreators(
    {
      logoutUser,
      openModal,
      closeModal
    },
    dispatch
  );
};


function Navigation(props) {

  return (
    <>
      <Navbar collapseOnSelect bg="light" expand="md" >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav className="mr-auto">
            {props.auth.isAuthenticated ?
              <Nav.Link ><Link className="nav-link" onClick={props.logoutUser}>Logout</Link></Nav.Link>
              :
              <NavDropdown title={`Manage account`} id="basic-nav-dropdown">
                <Dropdown.Item ><Link className="nav-link" onClick={() => props.openModal("login")}>Login</Link></Dropdown.Item>
                <Dropdown.Item ><Link className="nav-link" onClick={() => props.openModal("signup")}>Signup</Link></Dropdown.Item>
              </NavDropdown>
            }
          </Nav>
          <Nav>
            {props.auth.isAuthenticated ?
              <NavDropdown title={`Welcome, ${props.auth.loggedInUser.name}`} id="basic-nav-dropdown">

                <Dropdown.Item ><Link className="nav-link" to={'/'}>Home</Link></Dropdown.Item>
                <Dropdown.Item ><Link className="nav-link" to={'/profile'}>Profile</Link></Dropdown.Item>
                <Dropdown.Item ><Link className="nav-link" onClick={() => props.openModal("drawing")}>Post Drawing</Link></Dropdown.Item>
                <Dropdown.Item ><Link className="nav-link" onClick={() => props.openModal("listing")}>Create Listing</Link></Dropdown.Item>
              </NavDropdown>
              :
              null
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal isOpen={props.modal.modalDrawingIsOpen} onRequestClose={props.closeModal} style={customStyles}>
        <PostDrawing ></PostDrawing>
      </Modal>

      <Modal isOpen={props.modal.modalListingIsOpen} onRequestClose={props.closeModal} style={customStyles} >
        <CreateListing ></CreateListing>
      </Modal>

      <Modal isOpen={props.modal.modalLoginIsOpen} onRequestClose={props.closeModal} style={customStyles} >
        <Login ></Login>
      </Modal>

      <Modal isOpen={props.modal.modalSignupIsOpen} onRequestClose={props.closeModal} style={customStyles} >
        <Signup ></Signup>
      </Modal>
    </>
  )

}





export default connect(mapStateToProps, mapDispatchToProps)(Navigation)

