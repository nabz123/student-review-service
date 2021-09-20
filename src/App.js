import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {About, Contact, DetailView, Footer, Home, Navigation, RateHall, WriteReview, AddSchool} from "./components";

function App() {
    return (
        <div className="App">
            <Router>
                <Navigation/>
                <Switch>
                    <Route path="/" exact component={() => <Home/>}/>
                    <Route path="/about" exact component={() => <About/>}/>
                    <Route path="/contact" exact component={() => <Contact/>}/>
                    <Route path="/rate/:name/:hall" exact component={() => <WriteReview/>}/>
                    <Route path="/rate/:university?" exact component={() => <RateHall/>}/>
                    <Route path="/detail/:name" exact component={() => <DetailView/>}/>
                    <Route path="/add-school" exact component={() => <AddSchool/>}/>
                </Switch>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;