import React from "react";
import "./App.css";
import BusinessList from "../BusinessList/BusinessList";
import SearchBar from "../SearchBar/SearchBar";
import { Yelp } from "../../util/Yelp";



class App extends React.Component {
    constructor(props){
        super(props);
        this.state = { businesses: [], searchButton: "Let's Go" };
        this.searchYelp = this.searchYelp.bind(this);
        
    }
    
    async searchYelp(term, location, sortBy) {
        await this.setState({ searchButton: "Searching..."});
        Yelp.search(term, location, sortBy)
        .then(businesses =>{
            if ( businesses.length === 0 ) {
                this.setState({searchButton: "Cors Error"})
            } else {
                this.setState({ businesses: businesses, searchButton: "Let's Go" })
            }
            
        })
        
    }
    
    render() {
        return (
            <div className="App">
                <h1>ravenous</h1>
                <SearchBar searchYelp={this.searchYelp} searchButton={this.state.searchButton} />
                <BusinessList businesses={this.state.businesses} />
            </div>
        );
    }
    
}

export default App;
