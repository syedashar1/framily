import React, { Component } from 'react'

export default class SearchBox extends Component {

        constructor(){
                super();
                this.state ={
                        name : ''
                }
        }

        submitHandler = (e) => {
                e.preventDefault();
                console.log(this.state.name);
                this.props.history.push(`/filter/interestsdescription/${this.state.name === "" ? "all" : this.state.name }/min/${0}/max/${100}/ethinicity/${'all'}`);

                
                // console.log(`/search/name/${this.state.name}`);
              };

        render() {
                return (
                        <form className="search" onSubmit={this.submitHandler}>
                        <div className="row">
                          <input type="text" name="q" id="q" onChange={(e) => this.setState({name : e.target.value})}
                          ></input>
                          <button className="primary" type="submit">
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </form>
                )
        }
}
