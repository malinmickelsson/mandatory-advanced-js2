import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
 
class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    onChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();

        const newMovie = {
            title: this.state.title,
            description: this.state.description,
            director: this.state.director,
            rating: parseFloat(this.state.rating)
        };

        axios.post('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies', newMovie)
            .then(() => {
                this.setState({ added: true });
            })
            .catch((error) => {
                console.log(error.response);
                
            });
    }

    render() {
        if (this.state.added) {
            return <Redirect to='/' />
        }
        return (
            <>
            <Helmet>
                <title>Add</title>
            </Helmet>    
            
            <form className='Add-form' onSubmit={this.onSubmit}>
               <h1 className='Add-form-title'>Add a new movie to the list</h1>  

               <label className='Add-form-title-label'>Title</label> 
               <input className='Add-form-title-input' type='text' name='title' id='title' minLength='1' maxLength='40' 
                      value={this.state.title} onChange={this.onChange} required='required' placeholder=' Name of the movie'>
               </input>  <br></br>
            
               <label className='Add-form-description-label'>Description</label>
               <textarea className='Add-form-description-textarea' name='description' id='description' rows='5' cols='50' minLength='1' maxLength='300' 
                         value={this.state.description} onChange={this.onChange} required='required' placeholder='Short description of the movie'>
               </textarea>  <br></br>

               <label className='Add-form-director-label'>Director</label> 
               <input className='Add-form-director-input' type='text' name='director' id='director' minLength='1' maxLength='40' 
                      value={this.state.director} onChange={this.onChange} required='required' placeholder='Who directed the movie?' >
               </input>  <br></br>

               <label className='Add-form-rating-label'>Rating</label> 
               <div className='Add-form-rating'>
                    <input className='Add-form-rating-input' total={5} rating={ Number(this.state.rating )} />( {this.state.rating} )
               </div> <br></br>
               
               <input className='Add-form-rating-range' type='range' name='rating' id='rating' min='0' max='5' step='0.5' 
                      value={this.state.rating} onChange={this.onChange} required='required'>
               </input>  

               <button className='Add-form-button' type='submit'>Add movie</button>
            </form>    
           
            </>
        );
    }
}

export default Add;