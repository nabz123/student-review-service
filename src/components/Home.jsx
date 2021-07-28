import { Link, withRouter } from "react-router-dom";
const Home = () => {
    return ( 
        <div className="home">
            
            <h1>Home Page</h1>
          
                
                <Link class="nav-link" to="/write-review">
                  <span style={{color:"blue"}}>Write a review</span>
                </Link><br/>
            
            <input type="text" placeholder="Search for dorm"/>

        </div>
    );
}
 
export default Home;