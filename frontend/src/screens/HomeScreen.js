import React, { Component , useEffect, useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { Carousel } from 'react-responsive-carousel';
import { Accordion, Card, Carousel, Col, Container, Row , Image } from 'react-bootstrap';
import { listTopSellers , listUsers , like , userDetails} from '../actions/userActions';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Button } from 'react-bootstrap';
import SearchBox from '../components/searchBox';
import { getDistance , getPreciseDistance } from 'geolib';
import Fade from "react-reveal/Fade";
import loading from '../avatars/loading.gif';
import no from '../avatars/no.png';
import Bounce from 'react-reveal/Bounce';
import Pulse from 'react-reveal/Pulse';

class HomeScreen extends Component {


        constructor(){
                super()
                this.state = {
                        listofLiked : [] , 
                        name : '' , 
                        currentUrl : {} ,
                        

                        rendered: false
                }
        }






        componentDidMount(){

                const { interestsdescription = 'all',  ethinicity = 'all', min = 0, max = 100 , order  = 'mix' } = this.props.match.params;


                console.log('comppnent did mounted');

                


                
                this.props.listUsers({interestsdescription , ethinicity , min , max , order })
                


                setTimeout(function() {
                this.setState({render: true}) 
                }.bind(this), 3000)


                
                this.props.userDetails()
                

                
                
                this.setState({currentUrl : this.props.match.params})
                this.setState({render:true})



        }


        distance = (a , b) =>{


                const x = getDistance(
                        { latitude: this.props.user.location.latitude , longitude: this.props.user.location.longitude },
                        { latitude: a , longitude: b }
                    );

                // console.log( 'distance from geolib' , x);

                
                
                return x
        }




        handleScroll = () => {
                console.log("scrollig")
        }





        getFilterUrl = (filter) => {
                console.log(filter);
                const { interestsdescription = 'all', min = 0, ethinicity = 'all', max = 100 , order = 'mix'} = this.props.match.params;
                const interestsdescriptionFilter = interestsdescription;
                const ethinicityFilter = filter.ethinicity || ethinicity;
                const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
                const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
                const sortOrder = filter.order || order;

                return `/filter/interestsdescription/${interestsdescriptionFilter}/min/${filterMin}/max/${filterMax}/ethinicity/${ethinicityFilter}/order/${sortOrder}`;
              
            };


        

        shuffleArray = (array) => {
                let i = array.length - 1;
                for (; i > 0; i--) 
                        {
                        const j = Math.floor(Math.random() * (i + 1));
                        const temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                        }
        return array;
        }





        likeHandler = (x) =>{
                var joined = this.state.listofLiked.concat(x)
                this.setState({ listofLiked : joined })
                console.log(this.state.listofLiked);

                // this.props.userDetails()
                this.props.like(this.props.userInfo._id , x)
        }

        submitHandler = (e) => {
                e.preventDefault();
                console.log(this.state.name);
                this.props.history.push(`/filter/interestsdescription/${this.state.name === "" ? "all" : this.state.name }/min/${0}/max/${100}/ethinicity/${'all'}/order/${'mix'}`);

                
                // console.log(`/search/name/${this.state.name}`);
              };


        
        render() {
                if (!this.props.userInfo) { this.props.history.push('/') }
                const prices = [
                        {  name: 'All', min: 0, max: 0, },
                        { name: `18 to 25`, min: 18, max: 25, },
                        { name: `25 to 35`, min: 25, max: 35, },
                        { name: `35 and above`, min: 35, max: 150, },
                ]

                const ethinicityList = [
                        { name: 'American' },
                      
                        { name: 'Asian' },
                      
                        { name: 'Latino' },
                      
                        { name: 'African American' },

                        { name: 'Christian' },
                        { name: 'Arab' },
                ]

                const orderList = [
                        {name:'mix'} ,
                        {name:'shortest'} ,

                ]


                


                if(this.props.match.params != this.state.currentUrl && this.props.families  ){

                        console.log('hereeeee');
                        console.log(this.props.match.params);
                        console.log(this.state.currentUrl);
                        this.setState({currentUrl : this.props.match.params})
                        this.componentDidMount()
                }
                

                const {loading , families , userInfo , likeLoading , likeSuccess , likeError , likeLoadingID , user }  = this.props
                const {listofLiked , render} = this.state

                const { interestsdescription = 'all',  ethinicity = 'all', min = 0, max = 100 , order = 'mix' } = this.props.match.params;
                
                // const shuffled = shuffleArray(this.props.families)

                return (
                        
                        <div onScroll={()=>console.log('hey its scrolling')}
                        >
                                
                          <div className='row'>
                          <div></div>
        
                          <Accordion>
<Card><Card.Header>
      <Accordion.Toggle as={Button} variant="" eventKey="0"> <p>Search</p></Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
        <Card.Body><form className="search" onSubmit={this.submitHandler}>
                        <div className="row">
                          <input type="text" name="q" id="q" onChange={(e) => this.setState({name : e.target.value})}
                          ></input>
                          <button className="primary" style={{backgroundColor:'#287094' , color :'white'}} type="submit">
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </form></Card.Body>
    </Accordion.Collapse>
  </Card><Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="" eventKey="1">
        <p>Age</p>
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="1">
      <Card.Body>
                          <ul>
                          {prices.map((p) => (
                            <li key={p.name}>
                              <Link  to={this.getFilterUrl({ min: p.min , max: p.max })}
                                className={ `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''  } >
                              {p.name}
                              </Link>
                            </li> ))}
                            </ul>
                            </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="" eventKey="2">
      <p>Ethinicity</p>
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="2">
      <Card.Body>
                                <ul>
                                {ethinicityList.map((r) => (
                                        <li key={r.name}>
                                        <Link to={this.getFilterUrl({ ethinicity : r.name })}
                                        className={`${r.name}` === `${ethinicity}` ? 'active' : ''}
                                        >
                                                {r.name}
                                                
                                        </Link>
                                        </li>
                                ))}
                                </ul></Card.Body>
    </Accordion.Collapse>
  </Card>
  {/* <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="" eventKey="3">
      <p>Distance</p>
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="3">
      <Card.Body>
                                <ul>
                                {orderList.map((r) => (
                                        <li key={r.name}>
                                        <Link to={this.getFilterUrl({ order : r.name })}
                                        className={`${r.name}` === `${order}` ? 'active' : ''}
                                        >
                                                {r.name}
                                                
                                        </Link>
                                        </li>
                                ))}
                                </ul></Card.Body>
    </Accordion.Collapse>
  </Card> */}
</Accordion>
                          </div>
                          <div>
                          <div className='row center' >


                          
                          </div>
                          
                          </div>



                          <div className="row center">
                        


 
                
                        {!families || !user  ? (<div className='cm-spinner' ></div>) : 
                        
                        <Container > 
                        
                        
                
                        
                                
                                {families.map((x , i) => (
                                
                                <Fade  left={(i % 2 == 0) ? true : false} right={(i % 2 == 0) ? false : true}  cascade>
                                
                                <Row>

                                

                                <Col lg={{span : 8 , order : (i % 2 == 0) ? 0 : 12 }} >
                                      
                        <div key={x._id} className="form" style={{minWidth:300 , maxWidth:'770px' ,paddingRight:'20px',borderRadius:'7px' }} >
                                
                                
                                <Container>
                                <Row>
                                <Col md={{span : 6 , order : (i % 2 == 0) ? 0 : 12 }} className={ (i % 2 == 0) ? 'lineright' : 'lineleft' } >

                                <h2> 
                                        <span><b>{x.parent1.name}</b></span> , <span>{x.parent1.age}</span> ,  <span>{x.parent1.gender}</span> , <span>{x.parent1.ethnicity}</span> 
                                        , <span><i style={{fontSize:'20px' , color:'#287094'}}>{x.parent1.interests}</i></span> 
                                </h2>
                                
                                

                                
                                
                                {x.parent2 && x.parent2.name && 
                                
                                <h2> 
                                        <span><b>{x.parent2.name}</b></span> , <span>{x.parent2.age}</span> ,  <span>{x.parent2.gender}</span> , <span>{x.parent2.ethnicity}</span> 
                                        , <span><i style={{fontSize:'20px' , color:'#287094'}}>{x.parent2.interests}</i></span> 
                                </h2>
                                
                                }


                                {x.child1 && x.child1.name && 
                                
                                <h2> 
                                        <span><b>{x.child1.name}</b></span> , <span>{x.child1.age}</span> ,  <span>{x.child1.gender}</span> , <span>{x.child1.ethnicity}</span> 
                                        , <span><i style={{fontSize:'20px' , color:'#287094'}}>{x.child1.interests}</i></span> 
                                </h2>
                                
                                }

                                {x.child2 && x.child2.name && 
                                
                                <h2> 
                                        <span><b>{x.child2.name}</b></span> , <span>{x.child2.age}</span> ,  <span>{x.child2.gender}</span> , <span>{x.child2.ethnicity}</span> 
                                        , <span><i style={{fontSize:'20px' , color:'#287094'}}>{x.child2.interests}</i></span> 
                                </h2>
                                
                                }


                                {x.child3 && x.child3.name && 
                                
                                <h2> 
                                        <span><b>{x.child3.name}</b></span> , <span>{x.child3.age}</span> ,  <span>{x.child3.gender}</span> , <span>{x.child3.ethnicity}</span> 
                                        , <span><i style={{fontSize:'20px' , color:'#287094'}}>{x.child3.interests}</i></span> 
                                </h2>
                                
                                }

                                {x.child4 && x.child4.name && 
                                
                                <h2> 
                                        <span><b>{x.child4.name}</b></span> , <span>{x.child4.age}</span> ,  <span>{x.child4.gender}</span> , <span>{x.child4.ethnicity}</span> 
                                        , <span><i style={{fontSize:'20px' , color:'#287094'}}>{x.child4.interests}</i></span> 
                                </h2>
                                
                                }

                                {x.descriptions && x.descriptions !== '' &&
                                
                                <Fade up cascade>
                                <div>
                                <h2 className='text-center'> 
                                        <span><i style={{fontSize:'25px' , color:'#287094'}}>"{x.descriptions}"</i></span>
                                </h2>
                                </div>
                                </Fade>
                                
                                }



                                {x.location && x.location.latitude 
                                && this.props.user.location 
                                && this.props.user.location.latitude 
                                && 
                                <h2><span><b>Distance</b></span>  : {this.distance(x.location.latitude , x.location.longitude)} meters </h2>
                                }                


                                

                                
                                
                                
                                <div className='text-center' >
                                
                                
                                
                                {userInfo && 
                                <p onClick ={() => this.likeHandler( x._id) } style={{marginTop:'20px'}}  >
                                        {
                                        ((x.othersLiked.indexOf(userInfo._id) !== -1) ||  (likeSuccess && (likeSuccess === x._id)) || listofLiked.indexOf(x._id) !== -1 )
                                         ? <>
                                         < >
                                        <Bounce>
                                        <FavoriteIcon style={{color : "red" , fontSize : '70px' , margin:'10px'}} />
                                        </Bounce>
                                        </>
                                         </> :
                                         <>
                                         <>
                                        <FavoriteBorderIcon className='uibutton' style={{color : "red" , fontSize : '70px' , margin:'10px' }} />
                                        </>
                                         </>  }
                                </p>
                                
                                }

                                
                                

                                </div>
                                {/* <Link to={`/families/${x._id}`} style={{textAlign:'right'}} >
                                <Button variant="outline-light" style={{backgroundColor:'#287094', color:'white' , marginTop:'20px' }} size='sm'> 
                                <h3  >View Family<ArrowForwardIosIcon/> </h3> </Button>
                                </Link> */}
                                
                                </Col>


                                
                                <Col md={{span : 6 }} style={{paddingLeft : '20px' , overflow : 'hidden'}}>
                                <div >
                                <Fade left={(i % 2 == 0) ? true : false} right={(i % 2 == 0) ? false : true}  cascade >
                                <img src={x.image1  ? x.image1 : no }  className='img-fluid center text-center' style={{cursor:'pointer'}}
                                onClick={ () => {this.props.history.push(`/families/${x._id}`)} }
                                ></img>
                                </Fade>
                                </div>
                                </Col>
                                </Row>


                                </Container>


                                
                        </div>
                        
                        
                                </Col>

                                <Col lg={{span : 4  }}></Col>


                                
                                

                                </Row> </Fade>  )  ) }
                                
                                
                                
                        </Container> }

                </div>
                        
                        </div>
                )
        }
}



export default connect(
        
        (state) => ({ 
                families : state.userList.users , 
                loading : state.userList.loading , 

                userInfo : state.userSignin.userInfo ,


                likeLoading : state.like.loading , 
                likeLoadingID : state.like.id , 
                likeSuccess : state.like.success , 
                likeError : state.like.error , 

                user : state.getDetails.user


        
        }),
        {
                listUsers , like , userDetails
        } 
      
)(HomeScreen);




