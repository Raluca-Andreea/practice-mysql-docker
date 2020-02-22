import React, {Component} from 'react'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import {showAllBoughtDrawings, showAllListings, showAllPersonalDrawings} from '../../actions/actionCreator'
import {Container, Row, Col, Card }from 'react-bootstrap'
import {Spinner} from 'react-bootstrap'

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth.loggedInUser,
    boughtDrawings: state.profile.boughtDrawings,
    allListings: state.profile.allListings,
    pageOnload: state.profile.pageOnload,
    personalDrawigs: state.profile.personalDrawigs
  };
}


const mapDispatchToProps = dispatch => {

  return bindActionCreators(
    {
      showAllBoughtDrawings,
      showAllListings,
      showAllPersonalDrawings
    },
    dispatch
  );
}


class Profile extends Component {

  componentDidMount() {
    this.props.showAllBoughtDrawings(this.props.loggedInUser.id)
    this.props.showAllListings(this.props.loggedInUser.id)
    this.props.showAllPersonalDrawings(this.props.loggedInUser.id)
  }

  render() {
   
    return (
      <Container fluid style={{padding: 0}}> 
          <Row  >
          <Col lg={6} md={12}>
              {this.props.pageOnload ?              
                this.props.boughtDrawings.length !== 0 ? 
                <article className="drawings-container">
                  <h4 >List of bought drawings</h4>
                {this.props.boughtDrawings.map(drawing => 
                  <div className="profile-bought-drawings">

                  <Card className="text-left">
                      <Card.Header>Drawings</Card.Header>
                      <Card.Body>
                        <Card.Title>{drawing.title}</Card.Title>
                        <Card.Text>price: {drawing.price}$</Card.Text>
                        <Card.Text>{drawing.description}</Card.Text>
                        <img src={drawing.image} alt="drawing-image"></img>
                      </Card.Body>
                    </Card>
                  </div>
                 
                 )}
                 </article>                
                : <Spinner animation="grow" />
                : 
                <div className="profile-drawings">
                    <h6>Currently you have no bought drawings</h6>                   
               </div>
            }

            {/* {this.props.pageOnload ?              
                this.props.personalDrawings.length !== 0 ? 
                <article className="drawings-container">
                  <h4 >List of your personal drawings</h4>
                
                {this.props.personalDrawings.map(drawing => 
                  <div className="profile-bought-drawings">

                    <Card className="text-left">
                      <Card.Header>Drawings</Card.Header>
                      <Card.Body>
                        <Card.Title>{drawing.title}</Card.Title>
                        <Card.Text>price: {drawing.price}$</Card.Text>
                        <Card.Text>{drawing.description}</Card.Text>
                        <img src={drawing.image} alt="drawing-image"></img>
                      </Card.Body>
                    </Card>          
                  </div>
                 
                 )}
        
                 </article>                
                : <Spinner animation="grow" />
                : 
                <div className="profile-drawings">
                    <h6>Currently you have no personal drawings</h6>                   
               </div>
            } */}
      
        </Col>
        <Col lg={6} md={12}>
              
              {this.props.allListings.length !== 0 ? 
              <article className="listings-container">
              <h4 >Personal listings</h4>

              {this.props.allListings.map(listing => 
                <div className="profile-personal-listings">
              <Card className="text-left">
                <Card.Header>Listings</Card.Header>
                <Card.Body>
                  <Card.Title>{listing.title}</Card.Title>
                  <Card.Text>
                  {listing.description}
                  </Card.Text>
                </Card.Body>
              </Card>

               </div>           
            
            )}

            </article> 
              : <div className="profile-listings">
                  <h6>Currently you have no listings</h6>                  
                </div>
            }

        </Col>  
       </Row>
       </Container>
 
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)


