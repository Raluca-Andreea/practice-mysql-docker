import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {getAllDrawings} from '../actions/actionCreator'
import { bindActionCreators } from "redux"
import DrawingCard from './drawings/DrawingCard'
import {Container, Row, }from 'react-bootstrap'


const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth.loggedInUser,
    allDrawings: state.drawings
  };
}


const mapDispatchToProps = dispatch => {

  return bindActionCreators(
    {
      getAllDrawings,
    },
    dispatch
  );
}


class Home extends Component {

  componentDidMount(){
    this.props.loggedInUser ? this.props.getAllDrawings(this.props.loggedInUser.id) : 
    this.props.getAllDrawings(this.props.loggedInUser)
   
  }

  render() {
    return (
      <>
      <article className="home-page-article">
           <h3>Start sharing your works</h3>
           <div></div>
      </article>

     
      <Container> 
          <div className="drawings">
          <Row  >
          {this.props.allDrawings.drawings.length !== 0 ? 
              this.props.allDrawings.drawings.map(drawing => <DrawingCard key={drawing.id} {...drawing}></DrawingCard>):
          null}
          </Row>
          </div>
      </Container>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
