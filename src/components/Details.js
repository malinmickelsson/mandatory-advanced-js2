import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null,
            errorMessage: '',
        }
    }

    componentDidMount() {  // <----------------- ******************
        this.loadMovie();
    }

    loadMovie() {  // <----------------- ******************
        const movieId = this.props.match.params.id;
        return axios.get('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/' + movieId)
            .then((response) => {
                this.setState({ movie: response.data })
            })
            .catch((response) => {
                if (response.response.status === 404) {
                    this.setState({ errorMessage: 'Oops... 404 movie not found'});
                }
            }); 

    }

    render() {  // <----------------- ******************
        if (this.state.errorMessage) {
            return <h1>{this.state.errorMessage}</h1>
        }
        if (!this.state.movie) {
            return <></>;
        }
        return (
            <>
            <Helmet>
                <title>Details</title>
            </Helmet> 
           
               <h1 className='Details-title'>More info about the movie</h1> 

               <div className='Details-card'>
            
                        <h2 className='Details-card-title'>Title</h2>
                        <p className='Details-card-title-info'>{this.state.movie.title}</p>
                        
                    
                        <h2 className='Details-card-description'>Description</h2>
                        <p className='Details-card-decription-info'>{this.state.movie.description}</p>
                        
                    
                        <h2 className='Details-card-director'>Director</h2>
                        <p className='details-info'>{this.state.movie.director}</p>
                        
                   
                        <h2 className='Details-card-rating'>Rating</h2>
                        <div className='Details-card-rating-info'>
                             <Rater total={5} interactive={false} rating={Number(this.state.movie.rating)} />({this.state.movie.rating})
                        </div>
                        <br></br>

                    <button className='Details-card-button-edit'><Link to={'/edit/' + this.state.movie.id } style={{textDecoration: 'none', color: 'black'}}>Edit</Link></button>
                </div>
            </>
        );
    }
}

export default Details;