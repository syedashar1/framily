import React, { Component , useEffect, useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { Carousel } from 'react-responsive-carousel';
import { Carousel } from 'react-bootstrap';
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


class HomeScreen extends Component {


        constructor(){
                super()
                this.state = {
                        listofLiked : [] , 
                        name : '' , 
                        currentUrl : '' ,
                        currentQuery :'',


                }
        }


        componentDidMount(){

                const { interestsdescription = 'all',  ethinicity = 'all', min = 0, max = 100 } = this.props.match.params;


                console.log('here');
                this.props.listUsers({interestsdescription , ethinicity , min , max })
                this.props.userDetails()
                

                
                this.setState({currentQuery : this.props.match.params.title })
                this.setState({currentUrl : this.props.match.params})


        }


        distance = (a , b) =>{


                const x = getDistance(
                        { latitude: this.props.user.location.latitude , longitude: this.props.user.location.longitude },
                        { latitude: a , longitude: b }
                    );

                // console.log( 'distance from geolib' , x);

                
                
                return x
        }




        getFilterUrl = (filter) => {
                console.log(filter);
                const { interestsdescription = 'all', min = 0, ethinicity = 'all', max = 100 } = this.props.match.params;
                const interestsdescriptionFilter = interestsdescription;
                const ethinicityFilter = filter.ethinicity || ethinicity;
                const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
                const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
                return `/filter/interestsdescription/${interestsdescriptionFilter}/min/${filterMin}/max/${filterMax}/ethinicity/${ethinicityFilter}`;
              
            };





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
                this.props.history.push(`/filter/interestsdescription/${this.state.name === "" ? "all" : this.state.name }/min/${0}/max/${100}/ethinicity/${'all'}`);

                
                // console.log(`/search/name/${this.state.name}`);
              };


        
        render() {
                if (!this.props.userInfo) { this.props.history.push('/') }
                const prices = [
                        {  name: 'All', min: 0, max: 0, },
                        { name: `18 to 25`, min: 18, max: 25, },
                        { name: `25 to 35`, min: 25, max: 35, },
                        { name: `35 and above`, min: 40, max: 100, },
                ]

                const ethinicityList = [
                        { name: 'American' },
                      
                        { name: 'Asian' },
                      
                        { name: 'Latino' },
                      
                        { name: 'African American' },
                        { name: 'Christian' },
                ]


                if(this.props.match.params !== this.state.currentUrl ){
                        this.setState({currentQuery : this.props.match.params.title })
                        this.componentDidMount()
                }
                

                const {loading , families , userInfo , likeLoading , likeSuccess , likeError , likeLoadingID , user }  = this.props
                const {listofLiked} = this.state

                const { interestsdescription = 'all',  ethinicity = 'all', min = 0, max = 100 } = this.props.match.params;
                

                return (
                        
                        <div>
                          <h1>this is home screen</h1>
                          <div>
                          <div className='row center' >
                          <form className="search" onSubmit={this.submitHandler}>
                        <div className="row">
                          <input type="text" name="q" id="q" onChange={(e) => this.setState({name : e.target.value})}
                          ></input>
                          <button className="primary" type="submit">
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </form>
                          </div>
                          <h3>Ages</h3>
                          <ul>
                          {prices.map((p) => (
                            <li key={p.name}>
                              <Link  to={this.getFilterUrl({ min: p.min , max: p.max })}
                                className={ `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''  } >
                              {p.name}
                              </Link>
                            </li> ))}
                            </ul>
                            <h3>Select Ethinicity</h3>
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
                                </ul>
                          </div>



                          <div className="row center">
                        



                
                        {!families || !user ? (<div>loading...</div>) : <div>

                                {families.map((x) => (
                        <div key={x._id} className="card" style={{background:"lightGrey" , minWidth:300 , maxWidth:'600px' }} >
                                <p>{x._id}</p>
                                <div className="card-body">
                                <div className='row' >
                                <h1><Link to={`/families/${x._id}`} >Parent 1</Link></h1>
                                <h3>{x.parent1.name}</h3>
                                <h3>{x.parent1.age}</h3>
                                <h3>{x.parent1.gender}</h3>
                                <h3>{x.parent1.ethnicity}</h3>
                                <h3>{x.parent1.interests}</h3>

                                </div>
                                
                                {x.parent2 && x.parent2.name && <div className='row' >
                                <h1><Link to={`/families/${x._id}`} >Parent 2</Link></h1>
                                <h3>{x.parent2.name}</h3>
                                <h3>{x.parent2.age}</h3>
                                <h3>{x.parent2.gender}</h3>
                                <h3>{x.parent2.ethnicity}</h3>
                                <h3>{x.parent2.interests}</h3>
                                </div>
                                }


                                {x.location && x.location.latitude 
                                && this.props.user.location 
                                && this.props.user.location.latitude 
                                && <div className='row' >
                                <h1>Distance : {this.distance(x.location.latitude , x.location.longitude)} meters </h1>

                                </div>
                                }               


                                

                                {x.descriptions && <div className='row' >
                                <h1>{x.descriptions}</h1>
                                </div>
                                }

                                
                                
                        {/* {x.image1 && <div style={{height: '50%' , textAlign:'center'}}>
                        <Carousel style={{minHeight:'200px' , maxHeight:'650px'}} >
                        {x.image1 && <Carousel.Item>
                        <img src={x.image1}style={{  maxHeight:'650px'}} className="d-block  w-100" alt=' img 1'  ></img> 
                        </Carousel.Item>}
                        {x.image2 && <Carousel.Item>
                        <img src={x.image2}style={{minHeight:'200px' , maxHeight:'650px'}} className="d-block w-100 " alt=' img 2' ></img> 
                        </Carousel.Item>}
                        {x.image3 && <Carousel.Item>
                        <img src={x.image3}style={{minHeight:'200px' , maxHeight:'650px'}} className="d-block  w-100" alt=' img 3'  ></img> 
                        </Carousel.Item>}
                        {x.image4 && <Carousel.Item>
                        <img src={x.image4}style={{minHeight:'200px' , maxHeight:'650px'}} className="d-block w-100" alt=' img 4'  ></img> 
                        </Carousel.Item>}
                        {x.image5 && <Carousel.Item>
                        <img src={x.image5}style={{minHeight:'200px' , maxHeight:'650px'}} className="d-block  w-100" alt=' img 5'  ></img> 
                        </Carousel.Item>}
                        {x.image6 && <Carousel.Item>
                        <img src={x.image6}style={{minHeight:'200px' , maxHeight:'650px'}} className="d-block w-100 " alt=' img 6'  ></img> 
                        </Carousel.Item>}
                        </Carousel>
                        </div> } */}

                                

                                
                                
                                
                                <div className='row center' >
                                
                                <Link to={`/families/${x._id}`} >
                                <Button variant="outline-primary" size='lg'> <h3>View Family<ArrowForwardIosIcon/> </h3> </Button>{' '}
                                </Link>
                                
                                {userInfo && 
                                <p onClick ={() => this.likeHandler( x._id) } >
                                        {
                                        ((x.othersLiked.indexOf(userInfo._id) !== -1) ||  (likeSuccess && (likeSuccess === x._id)) || listofLiked.indexOf(x._id) !== -1 )
                                         ? <>
                                         <IconButton >
                                        <FavoriteIcon  style={{color : "red" , fontSize : '50px'}} />
                                        </IconButton>
                                         </> :
                                         <>
                                         <IconButton>
                                        <FavoriteBorderIcon  style={{color : "red" , fontSize : '50px'}} />
                                        </IconButton>
                                         </>  }
                                </p>
                                
                                }
                                

                                </div>
                                

                                
                                
                                </div>
                        </div>
                        
                        ))}
                        </div> }

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




