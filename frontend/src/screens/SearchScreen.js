import React, { Component } from 'react'
import { listProducts , listProductCategories } from '../actions/productsAction';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Ratings from '../components/Ratings';
import Fade from "react-reveal/Fade"
import { prices, ratings } from '../utils';


class SearchScreen extends Component {

        constructor(){
                super();
                this.state={
                        currentQuery : '',
                        currentUrl : '' ,
                        categoryLoaded : false
                }
        }

        componentDidMount(){
                const { title = 'all', category = 'all' , min = 0, max = 0, rating = 0, order = 'newest' , pageNumber = 1 } = this.props.match.params;

                this.setState({currentQuery : this.props.match.params.title })
                this.setState({currentUrl : this.props.match.params})
                console.log({ title , min,  max,  rating, order, });

                if(!this.state.categoryLoaded){ 
                  this.props.listProductCategories() ; 
                  this.setState({categoryLoaded : true}) 
                }
                
                this.props.listProducts({ title , min,  max,  rating, order,pageNumber , category } )
                
        }



         getFilterUrl = (filter) => {
          console.log(filter);
          const { title = 'all', min = 0, category = 'all', max = 0, rating = 0, order = 'newest' ,  pageNumber = 1 } = this.props.match.params;
          const filterName = title;
          const filterRating = filter.rating || rating;
          const categoryFilter = filter.category || category;
          const sortOrder = filter.order || order;
          const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
          const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
          const filterPageNumber = filter.pageNumber || pageNumber ;
          return `/search/category/${categoryFilter}/title/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPageNumber}`;
        
      };



        render() {

          const { title = '',  category = 'all', min = 0, max = 0, rating = 0, order = 'newest'} = this.props.match.params;

                if(this.props.match.params !== this.state.currentUrl ){
                        this.setState({currentQuery : this.props.match.params.title })
                        this.componentDidMount()
                }
                const {products , error , loading , page ,pages , history , categories , errorCategories , loadingCategories} = this.props

                return (
                        <div>
                          
                        <div className="row">
                          {loading ? ( <div>Loading...</div> ) : error ? ( <div>{error}</div> ) : (
                            <div>{this.props.count} Results</div>
                          )}
                           <div>
                            Sort by{' '}
                            <select
                            value={order}
                            onChange={(e) => {
                              history.push(this.getFilterUrl({ order : e.target.value })) 
                              
                            }}
                          >
                              <option value="newest">Newest Arrivals</option>
                              <option value="lowest">Price: Low to High</option>
                              <option value="highest">Price: High to Low</option>
                              <option value="toprated">Avg. Customer Reviews</option>
                            </select>
                          </div>
                        </div>
                        <div className="row top">
                          <div className="col-1">
                            <Link className="btn" to = {`/search/category/all/title/${title}/min/0/max/0/rating/0/order/newest/pageNumber/1`} >
                              <button>Remove Filters</button>
                            </Link>
                            <h3>Department</h3>
                            <div>

                            {loadingCategories ? (
            <div>Loading...</div>
          ) : errorCategories ? (
            <div>Error</div>
          ) : (
            <ul>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    className={c === category ? 'active' : ''}
                    to={this.getFilterUrl({ category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          )}

                            <h3>Price</h3>
                          <ul>
                          {prices.map((p) => (
                            <li key={p.name}>
                              <Link to={this.getFilterUrl({ min: p.min , max: p.max })}
                                className={ `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''  } >
                              {p.name}
                              </Link>
                            </li> ))}
                        </ul>

            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={this.getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? 'active' : ''}
                  >
                    <Ratings caption={' & up'} rating={r.rating}></Ratings>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
                          </div>
                          <div className="col-3">
                            {loading ? (
                               <div>Loading...</div> 
                            ) : error ? (
                                <div>{error}</div>
                            ) : (
                              <><br/><br/><br/><br/>
                                {products.length === 0 && (
                                  <div>No Product Found</div>
                                )}
                                <div className="row center">
                                <Fade bottom cascade>
                                  
                                <div className="row center">
                                {products.map((product) => (
                                <div key={product._id} className="card">
                                
                                <Link to={`/product/${product._id}`}>
                                <div className="card-img" >
                                <img
                                className="medium"
                                src={product.image}
                                alt={product.title}
                                />
                                </div>
                                </Link>
                                
                                <div className="card-body">
                                <a href={`/product/${product._id}`}>
                                <h2>{product.title}</h2>
                                </a>

                                <Ratings rating={product.rating} numReviews={product.numReviews} ></Ratings>
                                
                                <div className="row">
                                <div className="price">${product.price}</div>
                                <div>
                                {product.seller && 
                                <Link to={`/seller/${product.seller}`}>
                                {product.sellerName}
                                </Link>}
                                </div>
                                </div>
                                </div>

                                
                                
                        </div>
                        
                        ))}

                </div> </Fade>
                
                                </div>
                                <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link className={x + 1 === page ? 'active' : ''}  
              key={x + 1} to={this.getFilterUrl({ pageNumber: x+1 })}
              > {x + 1} </Link>
            ))}
          </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                )
        }
}



export default connect(
        
        (state) => ({ 


        userInfo : state.userSignin.userInfo , 

        products: state.productList.products ,
        error: state.productList.error ,
        loading: state.productList.loading ,
        count: state.productList.count ,

        page: state.productList.page ,
        pages: state.productList.pages ,
        

        categories : state.productCategoryList.categories , 
        loadingCategories : state.productCategoryList.loading , 
        errorCategories : state.productCategoryList.error , 



        }),
        {
                listProducts , listProductCategories
          
        } 
      
)(SearchScreen);