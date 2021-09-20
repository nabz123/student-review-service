import {useEffect, useState} from 'react'
import {isMobile} from 'react-device-detect';
import DetailfilerResult from "./DetailFilterResult"

import {useParams} from "react-router-dom";

var searchArr = require('./data/hallsData');


var iconArr = {
    bath: ["Private Bathroom", "fa-restroom"],
    air_cond: ["Air Conditioning", "fa-fan"],
    dining_hall: ["In-house Dining Hall", "fa-burger-soda"],
    laundry: ["On-site Laundry", "fa-washer"],
    mailroom: ["Package Receiving Mailroom", "fa-envelope "],
    elevator: ["Elevator", "fa-telegram-plane"],
    kitchen: ["Kitchen", "fa-sink"],
    lounge_area: ["Lounge/Common Area", "fa-loveseat"],

}

var dormArr = [
    {
        name: "Olmeca",
        review: 2,
        rate: 3.2
    },
    {
        name: "Olmeca",
        review: 2,
        rate: 4
    }
]

const DetailView = () => {

    var {name} = useParams();

    const [filterSort, setFilterSort] = useState("name");
    const [filterClass, setFilterClass] = useState("all");
    const [amenity, setAmenity] = useState({
        bath: false,
        air_cond: false,
        dining_hall: false,
        laundry: false,
        mailroom: false,
        elevator: false,
        kitchen: false,
        lounge_area: false,
    });
    const [resetFlag, setResetFlag] = useState(false);
    const [universityInfo, setUniversityInfo] = useState({});

    useEffect(() => {
        for (var key in searchArr) {
            if (searchArr[key].name == name) {
                searchArr[key].halls.sort();
                setUniversityInfo(searchArr[key]);
                break;
            }
        }
    });

    function getResetFlagStatus() {
        var tmp = false;
        if (filterSort && filterSort != "name") tmp = true;

        if (filterClass && filterClass != "all") tmp = true;

        for (var key in amenity) {
            if (amenity[key] == true) tmp = true;
        }
        return tmp;
    }

    function showSortFilter() {
        switch (filterSort) {
            case "name":
                return "Name"
                break;
            case "review":
                return "Most Reviewed";
                break;
            case "rate":
                return "Most Rated"
                break;
        }
    }

    function resetAllFilters() {
        console.log(amenity);
        setFilterClass("all");
        setFilterSort("name");
        setAmenity({
            bath: false,
            air_cond: false,
            dining_hall: false,
            laundry: false,
            mailroom: false,
            elevator: false,
            kitchen: false,
            lounge_area: false,
        });
        setTimeout(function () {
            setResetFlag(false);
        }, 100);
    }

    function getAmenitesComponents() {
        var tmpArr = [];

        for (var key in amenity) {
            if (amenity[key] == true)
                tmpArr.push(
                    <div className={"choose-amenities false"}>
                        <span>{iconArr[key][0]} <i className={"fas  amenity-icon " + iconArr[key][1]}></i></span>
                    </div>)
        }
        return tmpArr;
    }

    return (
        <div>
            <div className={"school__banner-img"}
                 style={{backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/rate-my-dorm.appspot.com/o/generic-college-photo.jpg?alt=media&token=5e4d1cd6-1110-435c-8597-363775101471")'}}></div>
            <div className=" my-6 mx-auto px-2 md:px-6">
                <div className={"school__body"}>
                    <div className={"school__filter"}>
                        <div className={"mb-4"}>
                            <span
                                className="text-4xl text-left font-bold text-black">
                                   {universityInfo.name?universityInfo.name:""}
                            </span>
                        </div>
                        <div className={"mb-5"}>
                            <span
                                className=" font-light text-2xl text-left  text-gray-500">{universityInfo.location ? universityInfo.location : ""}</span>
                        </div>
                        <div className={"mb-5"}>
                            <span className="text-base text-left  text-gray-900">2 student reviews</span>
                        </div>

                        <div className="mb-3">
                            <span className="text-xl font-bold text-left">Sort</span>
                            <div className="mt-2">
                                {!isMobile ? <>
                                    <div>
                                        <label className="inline-flex items-center">
                                            <input type="radio" className="form-radio" checked={filterSort == "name"}
                                                   name="filterSort" value="name" onChange={() => {
                                                setFilterSort("name")
                                            }}/>
                                            <span className="text-lg ml-2">Name</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex items-center">
                                            <input type="radio" className="form-radio" checked={filterSort == "review"}
                                                   name="filterSort" value="review" onChange={() => {
                                                setFilterSort("review")
                                            }}/>
                                            <span className="text-lg ml-2">Most Reviewed</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex items-center">
                                            <input type="radio" className="form-radio" checked={filterSort == "rate"}
                                                   name="filterSort" value="rate" onChange={() => {
                                                setFilterSort("rate")
                                            }}/>
                                            <span className="text-lg ml-2">Highest Rated</span>
                                        </label>
                                    </div>
                                </> : <>
                                    <select className={'sel_dropdown'} onChange={(e) => {
                                        setFilterSort(e.target.value)
                                    }}>
                                        <option value="name">Name</option>
                                        <option value="review">Most Reviewed</option>
                                        <option value="rate">Highest Rated</option>
                                    </select>
                                </>}
                            </div>
                        </div>
                        
                        <div className="mb-3">
                            <span className="text-xl font-bold text-left">Filter Amenities</span>
                            <div>
                                <span
                                    className="text-lg text-left  italic text-gray-500">generated from our reviewers </span>
                            </div>

                            <div className="mt-2">
                                <div>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox"
                                               checked={amenity.bath == true ? "checked" : ""} onChange={(e) => {
                                            setAmenity({...amenity, bath: e.target.checked})
                                        }}/>
                                        <span className="text-lg ml-2">Private Bathroom</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox"
                                               checked={amenity.air_cond == true ? "checked" : ""} onChange={(e) => {
                                            setAmenity({...amenity, air_cond: e.target.checked})
                                        }}/>
                                        <span className="text-lg ml-2">Air Conditioning</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox"
                                               checked={amenity.dining_hall == true ? "checked" : ""} onChange={(e) => {
                                            setAmenity({...amenity, dining_hall: e.target.checked})
                                        }}/>
                                        <span className="text-lg ml-2">In-house Dining Hall</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox"
                                               checked={amenity.laundry == true ? "checked" : ""} onChange={(e) => {
                                            setAmenity({...amenity, laundry: e.target.checked})
                                        }}/>
                                        <span className="text-lg ml-2">On-site Laundry</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox"
                                               checked={amenity.mailroom == true ? "checked" : ""} onChange={(e) => {
                                            setAmenity({...amenity, mailroom: e.target.checked})
                                        }}/>
                                        <span className="text-lg ml-2">Package Receiving Mailroom</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox"
                                               checked={amenity.elevator == true ? "checked" : ""} onChange={(e) => {
                                            setAmenity({...amenity, elevator: e.target.checked})
                                        }}/>
                                        <span className="text-lg ml-2">Elevator</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox"
                                               checked={amenity.kitchen == true ? "checked" : ""} onChange={(e) => {
                                            setAmenity({...amenity, kitchen: e.target.checked})
                                        }}/>
                                        <span className="text-lg ml-2">Kitchen</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox"
                                               checked={amenity.lounge_area == true ? "checked" : ""} onChange={(e) => {
                                            setAmenity({...amenity, lounge_area: e.target.checked})
                                        }}/>
                                        <span className="text-lg ml-2">Lounge/Common Area</span>
                                    </label>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className={'school__results'}>
                        <div className={"mb-4"}>
                            <span className="text-3xl text-left  text-black"><span
                                className={"  text-blue-500"}>{universityInfo.halls ? universityInfo.halls.length : 0} Dorms </span> match your filters </span>
                        </div>
                        <div>
                            <div className={"choose-amenities false"}>
                                <span>Sorted by {showSortFilter()}</span>
                            </div>

                            {getAmenitesComponents()}

                            {getResetFlagStatus() ?
                                <div className={"choose-amenities-inactive false text-gray-600"}
                                     onClick={resetAllFilters}>
                                    <span>Reset <i className="fas fa-times"></i></span>
                                </div> : ""}
                        </div>
                        {/* search result...*/}
                        <div>
                            {universityInfo.halls ? universityInfo.halls.map((item, key) => {
                                return <DetailfilerResult data={item} key={key} link={`/dorm/${universityInfo.name}/${item}`}/>
                            }) : ""}
                        </div>

                    </div>
                </div>


            </div>
        </div>
    );
}

export default DetailView;