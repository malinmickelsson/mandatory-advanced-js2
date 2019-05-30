import React, { setState,  Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            title: "",
            director: "",
            discription: "",
            movie: null,
            changed: false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() { 
        this.loadMovie();
    }

    loadMovie() {  // <----------------- ******************
        const movieId = this.props.match.params.id;
        return axios.get('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/' + movieId)
            .then((response) => {
                this.setState({movie: xxxxx }) // <-------------------------- fixa denna
            });
    }

    onChange(event) {  // <----------------- ******************
        event.preventDefault();

        const movieInfo = { ...this.state.movie };
        movieInfo[event.target.id] = event.target.value;
        this.setState({ movie: movieInfo });
    }

    onSubmit(event) {  // <----------------- *****  *************
        event.preventDefault();

        const movieId = this.props.match.params.id;
        axios.put('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/' + movieId, this.state.movie)
            .then(() => {
                this.setState({ changed: true });
            })
            .catch((response) => {
                if (response.response.status === 404) {
                    this.setState({ errorMessage: "Movie not found"});
                }
            }); 
    }

    render() {  
        if (this.state.errorMessage) {
            return <h1>{this.state.errorMessage}</h1>
        }
        if (this.state.changed) {
            return <Redirect to='/' />
        }
        if (!this.state.movie) {
            return (
                <>
                    <Helmet>
                        <title>Edit</title>
                    </Helmet> 
                    
                    <form className='Edit-form' onSubmit={this.onSubmit}>
                        <h1 className='Edit-form-title'>Edit this movie</h1> 

                        <label className='Edit-form-title-label'>Title</label> 
                        <input className='Edit-form-title-input' type='text' name='title' id='title' minLength='1' maxLength='40' 
                               value={this.state.title} onChange={this.onChange} required='required'>
                        </input>  <br></br>

                        <label className='Edit-form-description-label'>Description</label>
                        <textarea className='Edit-form-description-textarea' name='description' id='description' rows='5' cols='50' minLength='1' maxLength='300' 
                                  value={this.state.description} onChange={this.onChange} required='required'>
                        </textarea> <br></br>

                        <label className='Edit-form-director-label'>Director</label> 
                        <input className='Edit-form-director-input' type='text' name='directors' id='director' minLength='1' maxLength='40' 
                               value={this.state.director} onChange={this.onChange} required='required'>
                        </input>  <br></br>

                        <label className='Edit-form-rating-label'>Rating</label> 
                        <div className='Edit-form-rating'>
                            <input className='Edit-form-rating-input' total={5} rating={ Number(this.state.rating )} />( {this.state.rating} )
                        </div> <br></br>

                        <input className='Edit-form-rating-range' type='range' name='rating' id='rating' min='0' max='5' step='0.5' 
                               value={this.state.rating} onChange={this.onChange} required='required'>
                        </input>   

                        <button className='Edit-form-button' type='submit'>Save changes</button>
                    </form> 
                
                </>
            );
        }
    }
}
    
export default Edit;