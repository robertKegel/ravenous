import React from "react";
import "./SearchBar.css";


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: "",
            location: "",
            sortBy: "best_match"
        };
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleEnterKeyDown = this.handleEnterKeyDown.bind(this);
        this.sortByOptions = {
            "Best Match": "best_match",
            "Highest Rated": "rating",
            "Most Reviewed": "review_count"
        };
        
        
    }
    
    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return <li onClick={this.handleSortByChange.bind(this, sortByOptionValue)} className={this.getSortByClass(sortByOptionValue)} key={sortByOptionValue}>{sortByOption}</li>;
        });
    }
    
    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption) {
            return 'active';
        } else {
            return '';
        }
    }
    
    async handleSortByChange(sortByOption) {
        await this.setState({ sortBy: sortByOption });
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    }
    
    handleTermChange(event) {
        this.setState({ term: event.target.value });
    }
    
    handleLocationChange(event) {
        this.setState({ location: event.target.value });
    }
    
    handleSearch(event) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault();
    }
    handleEnterKeyDown(e) {
        if ( e.keyCode === 13 && this.state.term !== "" && this.state.location !== "") {
            this.handleSearch(e);
        }
    }
    render() {
        return (
            <div className="SearchBar">
              <div className="SearchBar-sort-options">
                <ul>
                {this.renderSortByOptions()}
                </ul>
              </div>
              <div className="SearchBar-fields">
                <input onChange={this.handleTermChange} onKeyDown={this.handleEnterKeyDown} placeholder="Search Businesses" />
                <input onChange={this.handleLocationChange} onKeyDown={this.handleEnterKeyDown} placeholder="Where?" />
              </div>
              <div className="SearchBar-submit">
                <button onClick={this.handleSearch}>{this.props.searchButton}</button>
              </div>
            </div>
        )
    }
}

export default SearchBar;