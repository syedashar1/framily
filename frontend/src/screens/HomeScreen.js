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


class HomeScreen extends Component {


        constructor(){
                super()
                this.state = {
                        listofLiked : []
                }
        }


        componentDidMount(){
                console.log('here');
                this.props.listUsers()
                this.props.userDetails()


        }


        likeHandler = (x) =>{
                var joined = this.state.listofLiked.concat(x)
                this.setState({ listofLiked : joined })
                console.log(this.state.listofLiked);

                this.props.userDetails()
                this.props.like(this.props.userInfo._id , x)
        }


        
        render() {
                if (!this.props.userInfo) { this.props.history.push('/') }

                const {loading , families , userInfo , likeLoading , likeSuccess , likeError , likeLoadingID  }  = this.props
                const {listofLiked} = this.state
                return (
                        
                        <div>
                          <h1>this is home screen</h1>
                          <div className="row center">
                        {!families ? (<div>loading...</div>) : <div>

                                {families.map((x) => (
                        <div key={x._id} className="card" style={{background:"lightGrey" , minWidth:300 , maxWidth:'600px' }} >
                                
                                <div className="card-body">
                                <div className='row' >
                                <h1>Parent 1</h1>
                                <h3>{x.parent1.name}</h3>
                                <h3>{x.parent1.age}</h3>
                                <h3>{x.parent1.gender}</h3>
                                <h3>{x.parent1.ethnicity}</h3>
                                <h3>{x.parent1.interests}</h3>

                                </div>
                                
                                {x.parent2 && x.parent2.name && <div className='row' >
                                <h1>Parent 2</h1>
                                <h3>{x.parent2.name}</h3>
                                <h3>{x.parent2.age}</h3>
                                <h3>{x.parent2.gender}</h3>
                                <h3>{x.parent2.ethnicity}</h3>
                                <h3>{x.parent2.interests}</h3>
                                </div>
                                }

                                {x.descriptions && <div className='row' >
                                <h1>{x.descriptions}</h1>
                                </div>
                                }

                                
                                {/* {x.image1 && <div style={{height:'150px' , textAlign:'center'}} >
                                {x.image1 && <img src={x.image1} alt='an img' height='150px' ></img> }
                                {x.image2 && <img src={x.image2} alt='an img' height='150px' ></img> }
                                {x.image3 && <img src={x.image3} alt='an img' height='150px' ></img> }
                                {x.image4 && <img src={x.image4} alt='an img' height='150px' ></img> }
                                {x.image5 && <img src={x.image5} alt='an img' height='150px' ></img> }
                                {x.image6 && <img src={x.image6} alt='an img' height='150px' ></img> }
                                </div>} */}


                                {/* { x.image1 &&  <div style={{height:'150px' , textAlign:'center'}} className="carousel-container" >
                                <Carousel id={x._id} showArrows autoPlay showThumbs={false}>
                                {x.image1 && <img src={x.image1} alt='an img' height='150px' ></img> }
                                {x.image2 && <img src={x.image2} alt='an img' height='150px' ></img> }
                                {x.image3 && <img src={x.image3} alt='an img' height='150px' ></img> }
                                {x.image4 && <img src={x.image4} alt='an img' height='150px' ></img> }
                                {x.image5 && <img src={x.image5} alt='an img' height='150px' ></img> }
                                {x.image6 && <img src={x.image6} alt='an img' height='150px' ></img> }
                                </Carousel>
                                </div>} */}
                        {x.image1 && <div style={{height: '50%' , textAlign:'center'}}>
                        <Carousel >
                        {x.image1 && <Carousel.Item>
                        <img src={x.image1} className="d-block  w-100" alt=' img 1'  ></img> 
                        </Carousel.Item>}
                        {x.image2 && <Carousel.Item>
                        <img src={x.image2} className="d-block w-100 " alt=' img 2' ></img> 
                        </Carousel.Item>}
                        {x.image3 && <Carousel.Item>
                        <img src={x.image3} className="d-block  w-100" alt=' img 3'  ></img> 
                        </Carousel.Item>}
                        {x.image4 && <Carousel.Item>
                        <img src={x.image4} className="d-block w-100" alt=' img 4'  ></img> 
                        </Carousel.Item>}
                        {x.image5 && <Carousel.Item>
                        <img src={x.image5} className="d-block  w-100" alt=' img 5'  ></img> 
                        </Carousel.Item>}
                        {x.image6 && <Carousel.Item>
                        <img src={x.image6} className="d-block w-100 " alt=' img 6'  ></img> 
                        </Carousel.Item>}
                        </Carousel>
                        </div> }

                                

                                
                                
                                
                                <div>
                                {userInfo && 
                                <p style={{textAlign:'center'}} onClick ={() => this.likeHandler( x._id) } className="primary" >
                                        {
                                        ((x.othersLiked.indexOf(userInfo._id) !== -1) ||  (likeSuccess && (likeSuccess === x._id)) || listofLiked.indexOf(x._id) !== -1 )
                                         ? <>
                                         <IconButton edge={false} >
                                        <FavoriteIcon  style={{color : "red" , fontSize : '50px'}} />
                                        </IconButton>
                                         </> :
                                         <>
                                         <IconButton edge={false} >
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

        
        }),
        {
                listUsers , like , userDetails
        } 
      
)(HomeScreen);




