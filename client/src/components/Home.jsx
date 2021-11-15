import React, {useEffect, useState} from 'react'
import SearchBar from './SeachBar'

function Home() {

    const [institutions, setInstitutions] = useState(null);
    useEffect(() => {
        fetch('/api/institution',{
            mode: 'cors'
        })
            .then(res => res.json())
            .then(data => {
                setInstitutions(data);
            })
            .catch(error => {
                console.log("Get Institution Error ...", error);
            });
    },[])

    return (
        <div className="Home main-bg"
             style={{background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://res.cloudinary.com/dx5b1ecms/image/upload/e_grayscale/a_90/v1628732099/student_vrs0qq.jpg")'}}>

            <div className="home__landing-text"> A better way to choose a hall</div>
            <SearchBar clickAction={"main"} placeholder="Search" className={"home__landing-search"}
                       data={institutions}/>
        </div>
    )
}

export default Home;