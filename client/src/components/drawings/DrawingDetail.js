import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {getOneDrawing, buyDrawing} from '../../actions/actionCreator'
import { bindActionCreators } from "redux"



const mapStateToProps = (state) => {
  return {
    drawing: state.drawings,
    auth: state.auth,
  };
}


const mapDispatchToProps = dispatch => {

  return bindActionCreators(
    {
      getOneDrawing,
      buyDrawing
    },
    dispatch
  );
}


class DrawingDetail extends Component {
  
  componentDidMount(){
    this.props.getOneDrawing(this.props.match.params.id)
  }

  render() {

    return (
      <div> 
      <div className="drawing-detail">
      {this.props.drawing.drawing ? 
           <>
           <h2>{this.props.drawing.drawing.title}</h2> 
           <p>Author: {this.props.drawing.drawing.name}</p>
           <p>Price: {this.props.drawing.drawing.price}$</p> 
           <p>{this.props.drawing.drawing.description}</p>
           {this.props.auth.isAuthenticated && <button onClick={()=>this.props.buyDrawing(this.props.drawing.drawing.id, this.props.auth.loggedInUser.id, this.props.history)}>Buy now</button> }

           <img src={this.props.drawing.drawing.image} ></img>
           </>
           :
      <p>Loading product...</p>}

      
      </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawingDetail)
