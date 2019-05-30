import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            search: '',
            loaded: false
        };
        this.deleteMovie = this.deleteMovie.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.loadMovies();
    }

    loadMovies(response) { 
        return axios.get('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies')
            .then(response => this.setState({ movies: response.data, loaded: true }));
    }

    filteredMovies() {
        return this.state.movies.filter((movie) => {
                return (
                  movie.title.toLowerCase().includes(this.state.search.toLowerCase()) || 
                  movie.director.toLowerCase().includes(this.state.search.toLowerCase())
                )
        })
    };
    
    deleteMovie(movieId) {
        axios.delete('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/' + movieId)
            .then(() => this.loadMovies())
            .catch((response) => {
                this.loadMovies();
            }); 
    }

    onChange(event) {
        this.setState({ search: event.target.value });
        return;
    }

    render() {
        if (this.state.loaded === false) {
            return <p>Loading.. Please wait</p>
        }

        return (
            <div>
                <Helmet>
                    <title>Home</title>
                </Helmet>
               
                <input className="Home-search" 
                       type="text" 
                       placeholder=" Search for a specific movie or director" 
                       onChange={this.onChange}>
                </input> 
                
                <table className="Home-table">
                    <thead className="Home-table-thead">
                        <tr className="Home-table-thead-tr">
                            <th className="Home-table-thead-title">Title</th>
                            <th className="Home-table-thead-director">Director</th>
                            <th className="Home-table-thead-Rating">Rating</th>
                            <th className="Home-table-thead-empty">Edit</th>           
                        </tr>
                    </thead>
                    
                    <tbody className="Home-table-tbody"> {this.filteredMovies().map(movie =>
                                                                
                            <tr className="Home-table-tbody-tr" key={movie.id}> 

                                <Link to={'/details/' + movie.id} className='Home-table-tbody-title-details' style={{textDecoration: 'none', color: 'black', fontWeight: 'bold'}}>
                                    <td className="Home-table-tbody-title">{movie.title}</td>
                                </Link>

                                <td className="Home-table-tbody-director">{movie.director}</td>
                                <td className="Home-table-tbody-rating">
                                    <span total={5} interactive={false} rating={Number(movie.rating)} />({movie.rating})</td>
                                
                                <td className="links">
                                    <button>
                                        <Link to={'/edit/' + movie.id} 
                                        className="Home-table-tbody-edit" style={{textDecoration: 'none', color: 'black'}}>Edit</Link>
                                    </button>
                                    <button className="Home-table-tbody-delete" 
                                            onClick={() => this.deleteMovie(movie.id)}>Delete
                                    </button>
                                </td>
                            </tr>
                            )}
                    </tbody>
                </table>    
            </div>
        );
    }
}

export default Home;