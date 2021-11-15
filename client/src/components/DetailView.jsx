import {useEffect, useState} from 'react'
import {isMobile} from 'react-device-detect';
import DetailfilerResult from "./DetailFilterResult"
import {useParams} from "react-router-dom";

import {iconArr} from "./data/constants";

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
    const [sortFilterHalls, setSortFilterHalls] = useState([]);

    useEffect(() => {
        fetch('/api/institution', {
            mode: 'cors'
        })
            .then(res => res.json())
            .then(data => {
                console.log("Got data from server ::: ", data);
                for (var item of data) {
                    if (item.Institution_name == name) {
                        setUniversityInfo(item);
                        break;
                    }
                }
            })
            .catch(error => {
                console.log("Get Institution Error ...", error);
            });
    }, []);

    useEffect(() => {
        if (!universityInfo.Institution_name) return;
        sort_filter_hall();
    }, [universityInfo]);

    useEffect(() => {
        console.log("useEffect filterSort ::: ", filterSort);
        sort_filter_hall();
    }, [filterSort, amenity]);

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
        console.log("filter is changed ::: ", filterSort);
        // sort_filter_hall();
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

    function showClassFilter() {
        switch (filterClass) {
            case "all":
                return "All Classes";
                break;
            case "Freshmen":
                return "Majority Freshmen";
                break;
            case "Sophomores":
                return "Majority Sophomores";
                break;
            case "Juniors":
                return "Majority Juniors";
                break;
            case "Seniors":
                return "Majority Seniors";
                break;
            case "Students":
                return "Majority Graduate Students";
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

    function getAvgReview(review) {
        var avgReview = 0;
        if (review.length > 0) {
            for (var item of review) {
                var reviewData = JSON.parse(item.review_data);
                avgReview += (
                    reviewData.rateRoom +
                    reviewData.rateBuilding +
                    reviewData.rateBathroom +
                    reviewData.rateLocation
                ) / 4;
            }
            avgReview /= review.length;
        }
        return avgReview.toFixed(1);
    }

    function compareSort(a, b) {

        console.log('in Compare filter sort ::: ', filterSort);
        switch (filterSort) {
            case "name":
                if (a.hall_name < b.hall_name) {
                    return -1;
                }
                if (a.hall_name > b.hall_name) {
                    return 1;
                }
                return 0;
                break;
            case "review":
                if (a.review.length < b.review.length) {
                    return 1;
                }
                if (a.review.length > b.review.length) {
                    return -1;
                }
                return 0;

                break;
            case "rate":
                var reviewRateA = getAvgReview(a.review);
                var reviewRateB = getAvgReview(b.review);

                if (reviewRateA < reviewRateB) {
                    return 1;
                }
                if (reviewRateA > reviewRateB) {
                    return -1;
                }
                return 0;
                break;
        }


    }

    function sort_filter_hall() {
        //sortFilterHalls
        //sort...
        if (!universityInfo.hall) return;
        var tmpHalls = universityInfo.hall;
        tmpHalls.sort(compareSort);

        //filter...
        var isAllFalse = true;
        for (var key in amenity) {
            if (amenity[key] == true) {
                isAllFalse = false;
                break;
            }
        }

        if (!isAllFalse) {
            console.log('Filter is not all false...');
            tmpHalls = tmpHalls.filter((item, idx) => {
                for (var ireview of item.review) {
                    var reviewData = JSON.parse(ireview.review_data).amenity;
                    for (var key in amenity) {
                        if (amenity[key] == true && reviewData[key] == amenity[key]) {
                            return item;
                        }
                    }
                }
            });
            console.log("After filter ::: ", tmpHalls);
        }


        setSortFilterHalls([]);
        setTimeout(function () {
            setSortFilterHalls(tmpHalls);
        });

    }

    function getAllReviewCnt() {
        if (!universityInfo.hall) return 0;
        var count = 0;
        universityInfo.hall.forEach(function (item) {
            count += item.review.length;
        });
        return count;
    }

    return (
        <div>
            <div className={"school__banner-img"}
                 style={{backgroundImage: 'url("https://res.cloudinary.com/dx5b1ecms/image/upload/v1632276771/generic-college-photo_jv4jqs.jpg")'}}></div>
            <div className=" my-6 mx-auto px-2 md:px-6">
                <div className={"school__body"}>
                    <div className={"school__filter"}>
                        <div className={"mb-4"}>
                            <span
                                className="text-4xl text-left font-bold text-black">
                                   {universityInfo.Institution_name ? universityInfo.Institution_name : ""}
                            </span>
                        </div>
                        <div className={"mb-5"}>
                            <span
                                className=" font-light text-2xl text-left  text-gray-500">{universityInfo.cities ? universityInfo.cities[0].city_name : ""}</span>
                        </div>
                        <div className={"mb-5"}>
                            <span className="text-base text-left  text-gray-900">{getAllReviewCnt()} student reviews</span>
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
                        {/*<div className="mb-3">*/}
                        {/*    <span className="text-xl font-bold text-left">Filter Class</span>*/}
                        {/*    <div className="mt-2">*/}
                        {/*        {!isMobile ? <>*/}
                        {/*            <div>*/}
                        {/*                <label className="inline-flex items-center">*/}
                        {/*                    <input type="radio" className="form-radio" checked={filterClass == "all"}*/}
                        {/*                           name="filterClass" value="all" onChange={() => {*/}
                        {/*                        setFilterClass("all")*/}
                        {/*                    }}/>*/}
                        {/*                    <span className="text-lg ml-2">All Classes</span>*/}
                        {/*                </label>*/}
                        {/*            </div>*/}
                        {/*            <div>*/}
                        {/*                <label className="inline-flex items-center">*/}
                        {/*                    <input type="radio" className="form-radio"*/}
                        {/*                           checked={filterClass == "Freshmen"}*/}
                        {/*                           name="filterClass" value="Freshmen" onChange={() => {*/}
                        {/*                        setFilterClass("Freshmen")*/}
                        {/*                    }}/>*/}
                        {/*                    <span className="text-lg ml-2">Majority Freshmen</span>*/}
                        {/*                </label>*/}
                        {/*            </div>*/}
                        {/*            <div>*/}
                        {/*                <label className="inline-flex items-center">*/}
                        {/*                    <input type="radio" className="form-radio"*/}
                        {/*                           checked={filterClass == "Sophomores"}*/}
                        {/*                           name="filterClass" value="Sophomores" onChange={() => {*/}
                        {/*                        setFilterClass("Sophomores")*/}
                        {/*                    }}/>*/}
                        {/*                    <span className="text-lg ml-2">Majority Sophomores</span>*/}
                        {/*                </label>*/}
                        {/*            </div>*/}
                        {/*            <div>*/}
                        {/*                <label className="inline-flex items-center">*/}
                        {/*                    <input type="radio" className="form-radio"*/}
                        {/*                           checked={filterClass == "Juniors"}*/}
                        {/*                           name="filterClass" value="Juniors" onChange={() => {*/}
                        {/*                        setFilterClass("Juniors")*/}
                        {/*                    }}/>*/}
                        {/*                    <span className="text-lg ml-2">Majority Juniors</span>*/}
                        {/*                </label>*/}
                        {/*            </div>*/}
                        {/*            <div>*/}
                        {/*                <label className="inline-flex items-center">*/}
                        {/*                    <input type="radio" className="form-radio"*/}
                        {/*                           checked={filterClass == "Seniors"}*/}
                        {/*                           name="filterClass" value="Seniors" onChange={() => {*/}
                        {/*                        setFilterClass("Seniors")*/}
                        {/*                    }}/>*/}
                        {/*                    <span className="text-lg ml-2">Majority Seniors</span>*/}
                        {/*                </label>*/}
                        {/*            </div>*/}
                        {/*            <div>*/}
                        {/*                <label className="inline-flex items-center">*/}
                        {/*                    <input type="radio" className="form-radio"*/}
                        {/*                           checked={filterClass == "Students"}*/}
                        {/*                           name="filterClass" value="Students" onChange={() => {*/}
                        {/*                        setFilterClass("Students")*/}
                        {/*                    }}/>*/}
                        {/*                    <span className="text-lg ml-2">Majority Graduate Students</span>*/}
                        {/*                </label>*/}
                        {/*            </div>*/}
                        {/*        </> : <>*/}

                        {/*            <select className={'sel_dropdown'} onChange={(e) => {*/}
                        {/*                setFilterClass(e.target.value)*/}
                        {/*            }}>*/}
                        {/*                <option value={"all"}> All Classes</option>*/}
                        {/*                <option value={"Freshmen"}> Freshmen</option>*/}
                        {/*                <option value={"Sophomores"}> Sophomores</option>*/}
                        {/*                <option value={"Juniors"}> Juniors</option>*/}
                        {/*                <option value={"Seniors"}> Seniors</option>*/}
                        {/*                <option value={"Students"}> Students</option>*/}
                        {/*            </select>*/}
                        {/*        </>*/}
                        {/*        }*/}
                        {/*    </div>*/}
                        {/*</div>*/}
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
                                className={"  text-blue-500"}>{universityInfo.hall ? universityInfo.hall.length : 0} Halls </span> match your filters </span>
                        </div>
                        <div>
                            <div className={"choose-amenities false"}>
                                <span>Sorted by {showSortFilter()}</span>
                            </div>
                            {/*<div className={"choose-amenities false"}>*/}
                            {/*    <span>Showing {showClassFilter()}</span>*/}
                            {/*</div>*/}

                            {getAmenitesComponents()}

                            {getResetFlagStatus() ?
                                <div className={"choose-amenities-inactive false text-gray-600"}
                                     onClick={resetAllFilters}>
                                    <span>Reset <i className="fas fa-times"></i></span>
                                </div> : ""}
                        </div>
                        {/* search result...*/}
                        <div>
                            {sortFilterHalls ? sortFilterHalls.map((item, key) => {
                                return <DetailfilerResult data={item} review={getAvgReview(item.review)} key={key}
                                                          link={`/hall/${universityInfo.Institution_name}/${item.hall_name}`}/>
                            }) : ""}
                        </div>

                    </div>
                </div>


            </div>
        </div>
    );
}

export default DetailView;