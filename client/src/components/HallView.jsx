import {useHistory, useParams} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import React, {useEffect, useState} from "react";
import {iconArr} from "./data/constants";
import DetailfilerResult from "./DetailFilterResult";
import ReviewItem from "./ReviewItem";

const HallView = () => {
    var {university, hallname} = useParams();
    const history = useHistory();
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
    const [universityInfo, setUniversityInfo] = useState(null);
    const [hallInfo, setHallInfo] = useState(null);
    const [hallAttribute, setHallAttribute] = useState(null);


    useEffect(() => {
        fetch('/api/institution', {
            mode: 'cors'
        })
            .then(res => res.json())
            .then(data => {
                console.log("Got data from server ::: ", data);
                for (var item of data) {
                    if (item.Institution_name == university) {
                        setUniversityInfo(item);
                        for (var itemHall of item.hall) {
                            if (itemHall.hall_name == hallname) {
                                setHallInfo(itemHall);
                                break;
                            }
                        }
                        break;
                    }
                }
            })
            .catch(error => {
                console.log("Get Institution Error ...", error);
            });
    }, []);

    useEffect(() => {
        if (hallInfo)
            setHallAttribute(getHallAttributes());
    }, [hallInfo]);


    function getAmenitesComponents() {
        var tmpArr = [];

        for (var key in amenity) {
            if (amenity[key] == true)
                tmpArr.push(
                    <div className={"choose-amenities false"}>
                        <span> <i className={"fas  amenity-icon " + iconArr[key][1]}></i> {iconArr[key][0]}</span>
                    </div>)
        }
        return tmpArr;
    }

    function sort_filter_hall() {
        //sortFilterHalls
        //sort...
        if (!universityInfo.hall) return;
        var tmpHalls = universityInfo.hall;
        // tmpHalls.sort(compareSort);

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

        // setSortFilterHalls([]);
        setTimeout(function () {
            // setSortFilterHalls(tmpHalls);
        });
    }

    function getHallAttributes() {
        if (!hallInfo || hallInfo.review.length == 0)
            return {
                room: 0,
                location: 0,
                building: 0,
                bathroom: 0,
                avg: 0,
                recommend: 0,
            }

        var sum_room = 0;
        var sum_location = 0;
        var sum_building = 0;
        var sum_bathroom = 0;
        var sum_recommend = 0;

        for (var item of hallInfo.review) {
            var reviewObj = JSON.parse(item.review_data);

            sum_room += reviewObj.rateRoom;
            sum_location += reviewObj.rateLocation;
            sum_building += reviewObj.rateBuilding;
            sum_bathroom += reviewObj.rateBathroom;

            if (reviewObj.recommend == "yes")
                sum_recommend += 1;

            const tmpState = {};
            for (var key in reviewObj.amenity) {
                if (reviewObj.amenity[key]) {
                    tmpState[key] = reviewObj.amenity[key];
                    setAmenity({...amenity, ...tmpState});
                }

            }
        }

        sum_room /= hallInfo.review.length;
        sum_location /= hallInfo.review.length;
        sum_building /= hallInfo.review.length;
        sum_bathroom /= hallInfo.review.length;
        sum_recommend = (sum_recommend / hallInfo.review.length) * 100;

        return {
            room: parseFloat((sum_room).toFixed(1)),
            location: parseFloat((sum_location).toFixed(1)),
            building: parseFloat((sum_building).toFixed(1)),
            bathroom: parseFloat((sum_bathroom).toFixed(1)),
            avg: parseFloat(((sum_room + sum_location + sum_building + sum_bathroom) / 4).toFixed(1)),
            recommend: sum_recommend
        }

    }

    function generateAmenity() {
        var component = [];
        for (var key in iconArr) {
            if (amenity[key]) {
                component.push(<div><i className={"fas  amenity-icon mt-4 " + iconArr[key][1]}></i> {iconArr[key][0]}
                </div>);
            }
        }
        return component;
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


    return (
        <div>
            <div className=" my-6 md:mx-7 px-6 md:px-6">
                <div className={"mt-6"}>
                    <span><i className="fa fa-long-arrow-alt-left amenity-icon"></i> All <span onClick={() => {
                        history.push(`/detail/${university}`)
                    }} className={'cursor-pointer underline'}>{hallname}</span> halls</span>
                </div>
                <span className="text-4xl text-left font-semibold text-black"><span
                    className={"font-semibold text-blue-500"}></span> {hallname} </span>

            </div>
            <div className="hall__overview ">
                <div className={"school__banner-img hall__overview-banner"}
                     style={{backgroundImage: 'url("https://res.cloudinary.com/dx5b1ecms/image/upload/v1632276771/generic-college-photo_jv4jqs.jpg")'}}></div>
                <div className="hall__overview-rating-wrapper bg-gray-50  inline-block w-full">
                    <div className=" my-6 md:mx-7 px-6 md:px-6">
                        <span className="text-3xl block text-left  text-black"> Overall Quality Rating </span>
                        <span
                            className="text-5xl mt-3 text-left font-bold text-black block"> {hallAttribute ? hallAttribute.avg : ""} </span>
                        {hallAttribute ?
                            <ReactStars
                                edit={false}
                                size={40}
                                value={hallAttribute.avg}
                                isHalf={true}
                            /> : ""}
                        <a href={`/rate/${university}/${hallname}`}>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded mt-2">
                                Write a Review
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            <div className=" my-6 mx-auto px-2 md:px-6">
                <div className={"school__body"}>
                    <div className={"school__filter"}>
                        <div className="mb-6">
                            <span className="text-xl font-bold text-left">Rating Breakdown</span>
                            {hallAttribute ?
                                <div className="mt-2">
                                    <div className={"flex items-center"}>
                                    <span className={'mt-1 mr-3'}>Room - <span
                                        className={'font-bold'}> {hallAttribute.room}</span></span>
                                        <span>
                                        <ReactStars
                                            className={'inline-block'}
                                            edit={false}
                                            size={24}
                                            value={hallAttribute.room}
                                            isHalf={true}
                                        />
                                    </span>
                                    </div>
                                    <div className={"flex items-center"}>
                                    <span className={'mt-1 mr-3'}>Location - <span
                                        className={'font-bold'}>{hallAttribute.location}</span></span>
                                        <span>
                                        <ReactStars
                                            className={'inline-block'}
                                            edit={false}
                                            size={24}
                                            value={hallAttribute.location}
                                            isHalf={true}
                                        />
                                    </span>
                                    </div>
                                    <div className={"flex items-center"}>
                                    <span className={'mt-1 mr-3'}>Building - <span
                                        className={'font-bold'}>{hallAttribute.building} </span></span>
                                        <span>
                                        <ReactStars
                                            className={'inline-block'}
                                            edit={false}
                                            size={24}
                                            value={hallAttribute.building}
                                            isHalf={true}
                                        />
                                    </span>
                                    </div>
                                    <div className={"flex items-center"}>
                                    <span className={'mt-1 mr-3'}>Bathroom - <span
                                        className={'font-bold'}>{hallAttribute.bathroom} </span></span>
                                        <span>
                                        <ReactStars
                                            className={'inline-block'}
                                            edit={false}
                                            size={24}
                                            value={hallAttribute.bathroom}
                                            isHalf={true}
                                        />
                                    </span>
                                    </div>
                                </div> : ""}
                        </div>

                        <div className="mb-6">
                            <span className="text-xl font-bold text-left">Amenities</span>
                            <div>
                                <span
                                    className="text-lg text-left  italic text-gray-500">generated from our reviewers </span>
                            </div>
                            <div>
                                {generateAmenity()}
                            </div>
                        </div>

                        <div className="mb-6">
                            <span className="text-xl font-bold text-left">Would recommend to a friend</span>
                            <div>
                                <div className="relative pt-1">
                                    {hallAttribute ?
                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200 h-6">
                                            <div
                                                style={{width: `${hallAttribute.recommend}%`}}
                                                className="
                                            shadow-none
                                            flex flex-col
                                            text-center
                                            whitespace-nowrap
                                            text-white
                                            justify-center
                                            bg-blue-500
                                          "
                                            ></div>
                                        </div> : ""}
                                </div>
                            </div>
                        </div>
                        <hr className={"mb-6"}/>
                        <div className="mb-6">
                            <span className="text-xl font-bold text-left">More Halls From Duke University</span>
                            <div>
                                <div className="relative pt-1">
                                    {universityInfo ? universityInfo.hall.map((item, key) => {
                                        if (item.hall_name != hallname)
                                            return <DetailfilerResult data={item} review={getAvgReview(item.review)}
                                                                      key={key}
                                                                      link={`/hall/${universityInfo.Institution_name}/${item.hall_name}`}/>
                                    }) : ""}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*right side.*/}
                    <div className={'school__results'}>
                        <div className={"mb-4"}>
                            <span
                                className="text-4xl text-left  font-bold text-black">All Reviews ({hallInfo ? hallInfo.review.length : 0}) </span>
                        </div>
                        <div>
                            {
                                hallInfo?hallInfo.review.map((item,idx)=>{
                                    return <ReviewItem review={item} />
                                }):""
                            }
                        </div>

                    </div>
                </div>


            </div>
        </div>
    );

}

export default HallView;