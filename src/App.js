import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {About, Contact, DetailView, Footer, Home, Navigation, RateHall, WriteReview} from "./components";

function App() {
    return (
        <div className="App">
            <Router>
                <Navigation/>
                <Switch>
                    <Route path="/" exact component={() => <Home/>}/>
                    <Route path="/about" exact component={() => <About/>}/>
                    <Route path="/contact" exact component={() => <Contact/>}/>
                    <Route path="/write-review" exact component={() => <WriteReview/>}/>
                    <Route path="/rate" exact component={() => <RateHall/>}/>
                    <Route path="/university/:name" exact component={() => <DetailView/>}/>
                </Switch>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;