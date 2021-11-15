import React, {useEffect, useState} from 'react'
import SearchBar from './SeachBar'
import DetailfilerResult from "./DetailFilterResult";
import {useHistory, useParams} from "react-router-dom";

function Rate() {
    var {university} = useParams();
    const history = useHistory();
    const [selectedItem, setSelectedItem] = useState({});
    const [institutions, setInstitutions] = useState(null);

    useEffect(() => {
        fetch('/api/institution', {
            mode: 'cors'
        })
            .then(res => res.json())
            .then(data => {
                console.log("get data from server ... ", data);
                setInstitutions(data);
            })
            .catch(error => {
                console.log("Get Institution Error ...", error);
            });
    }, [])

    useEffect(() => {
        refreshSelectedData(university);
    }, [institutions]);

    const refreshSelectedData = (universityName) => {
        if (universityName != undefined && universityName.length > 0 && institutions) {
            setSelectedItem(institutions.filter((item, idx) => {
                if (item.Institution_name == universityName)
                    return item;
            })[0]);
        }
    }

    const onSelected = (name) => {
        history.push(`/rate/${name}`);
        refreshSelectedData(name);
    }


    return (
        <div className=" my-6 mx-auto px-2 md:px-10">

            <div className="home__landing-text text-center">
                <span className="text-3xl text-left  text-black">Write a <span
                    className={"font-bold  text-blue-500"}>Review</span>
                </span>
            </div>
            <SearchBar
                placeholder="Search"
                clickAction={"rate"}
                className={"home__landing-search full"}
                data={institutions}
                onSelected={onSelected}
            />
            {selectedItem && selectedItem.Institution_name ?
                <div className={"mt-4"}>
                    <div className={"text-3xl font-bold"}>
                        {selectedItem.Institution_name ? selectedItem.Institution_name : ""}
                    </div>
                    <div className={"mt-1"}>
                    <span
                        className="text-base text-left  text-gray-700">{selectedItem.cities[0] ? selectedItem.cities[0].city_name : ""} </span>
                    </div>
                    <div className={"mt-3"}>
                    <span
                        className="text-base text-left  text-gray-800">{selectedItem.hall ? selectedItem.hall.length : ""} hall results. Click on a hall to write a review. </span>
                    </div>
                    <div>
                        {selectedItem.hall ? selectedItem.hall.map((item, key) => {
                            return <DetailfilerResult data={item} key={key}
                                                      link={`/rate/${selectedItem.Institution_name}/${item.hall_name}`}/>
                        }) : ""}
                    </div>

                    <div className={'text-center'}>
                        <span className="text-3xl text-left font-bold text-black"> Don't see your hall? <span
                            className={"font-bold cursor-pointer text-blue-500 underline"} onClick={() => {
                            history.push(`/rate/${selectedItem.Institution_name}/add-hall`)
                        }}> Add it here</span>
                        </span>
                    </div>
                </div> : ""}
        </div>
    )
}

export default Rate;