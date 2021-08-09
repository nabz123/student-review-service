import React from 'react'
import SearchBar from './SeachBar'
var searchArr=require('./data/hallsData');

function Home() {
    return (
        <div className="Home main-bg"
             style={{background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://firebasestorage.googleapis.com/v0/b/rate-my-dorm.appspot.com/o/schools%2FUniversity-of-California-Berkeley.jpg?alt=media&token=8d453e96-187a-44b3-8a21-750494a4286c")'}}>

            <div className="home__landing-text"> The Future Of Hall Reviews</div>
            <SearchBar placeholder="Search" data={searchArr}/>
            
        </div>
    )
}

export default Home;