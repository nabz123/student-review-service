import React from 'react'
import SearchBar from './SeachBar'
var searchArr=require('./data/hallsData');

function Home() {
    return (
        <div className="Home main-bg"
             style={{background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://res.cloudinary.com/dx5b1ecms/image/upload/e_grayscale/a_90/v1628732099/student_vrs0qq.jpg")'}}>
                 
            <div className="home__landing-text"> The Future Of Hall Reviews</div>
            <SearchBar placeholder="Search" data={searchArr}/>
            
        </div>
    )
}

export default Home;