import {useMemo, useState} from 'react'
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import './assets/rc_slider_custom.css'
import {useParams,useHistory} from "react-router-dom";

var yearArr = [];
var curYear = new Date().getFullYear();

const WriteReview = () => {
    var {name, hall} = useParams();
    const history = useHistory();
    const [rateRoom, setRateRoom] = useState(1);
    const [rateBuilding, setRateBuilding] = useState(1);
    const [rateBathroom, setRateBathroom] = useState(1);
    const [rateLocation, setRateLocation] = useState(1);
    const [roomType, setRoomType] = useState("single");
    const [calendar, setCalendar] = useState(new Date().getFullYear());
    const [recommend, setRecommend] = useState("yes");
    const [amenity, setAmenity] = useState({
        bath: false,
        air_cond: false,
        dining_hall: false,
        laundry: false,
        mailroom: false,
        lounge_area: false,
        kitchen: false,
        elevator: false
    });
    const [comment, setComment] = useState("");

    useMemo(() => {
        for (var i = new Date().getFullYear() - 10; i < new Date().getFullYear() + 1; i++) {
            yearArr.push(i);
        }
    })

    return (
        <div className=" my-6 mx-auto px-4 md:px-12">

            <span className="text-4xl text-left font-semibold text-black"><span
                className={"font-semibold text-indigo-600"}>Rate</span> {hall} </span>

            <div className={"mt-6"}>
                <span><i className="fa fa-home amenity-icon"></i> See all <span onClick={()=>{history.push(`/detail/${name}`)}} className={'cursor-pointer underline'}>{hall}</span> reviews</span>
            </div>

            <div className="flex flex-wrap  lg:-mx-4">
                <div className="my-1 px-1 w-full md:w-2/5 lg:my-4 lg:px-4 lg:w-2/5">
                    <div>
                        <span className="text-2xl text-left  text-black">Rate the <span
                            className={"font-semibold text-indigo-600"}>room</span> out of 5 stars </span>
                    </div>
                    <div>
                        <span className="text-base text-left  text-gray-500">Keep in mind: size, comfort, natural lighting </span>
                    </div>
                </div>
                <div className="mb-3 px-1 w-full md:w-1/5 lg:my-4 lg:px-4 lg:w-1/5">
                    <Slider min={20} defaultValue={20} marks={{20: 1, 40: 2, 60: 3, 80: 4, 100: 5}} step={null}
                            onChange={(value) => {
                                setRateRoom(value / 20)
                            }}/>
                </div>
            </div>

            <div className="flex flex-wrap  lg:-mx-4">
                <div className="my-1 px-1 w-full md:w-2/5 lg:my-4 lg:px-4 lg:w-2/5">
                    <div>
                        <span className="text-2xl text-left  text-black">Rate the <span
                            className={"font-semibold text-indigo-600"}>building</span> out of 5 stars
                             </span>
                    </div>
                    <div>
                        <span className="text-base text-left  text-gray-500">Keep in mind: amenities, security, age of building </span>
                    </div>
                </div>
                <div className="mb-3 px-1 w-full md:w-1/5 lg:my-4 lg:px-4 lg:w-1/5">
                    <Slider min={20} defaultValue={20} marks={{20: 1, 40: 2, 60: 3, 80: 4, 100: 5}} step={null}
                            onChange={(value) => {
                                setRateBuilding(value / 20)
                            }}/>
                </div>
            </div>

            <div className="flex flex-wrap  lg:-mx-4">
                <div className="my-1 px-1 w-full md:w-2/5 lg:my-4 lg:px-4 lg:w-2/5">
                    <div>
                        <span className="text-2xl text-left  text-black">  Rate the <span
                            className={"font-semibold text-indigo-600"}>bathroom</span> out of 5 stars </span>
                    </div>
                    <div>
                        <span className="text-base text-left  text-gray-500">Keep in mind: cleanliness, private vs communal </span>
                    </div>
                </div>
                <div className="mb-3 px-1 w-full md:w-1/5 lg:my-4 lg:px-4 lg:w-1/5">
                    <Slider min={20} defaultValue={20} marks={{20: 1, 40: 2, 60: 3, 80: 4, 100: 5}} step={null}
                            onChange={(value) => {
                                setRateBathroom(value / 20)
                            }}/>
                </div>
            </div>

            <div className="flex flex-wrap  lg:-mx-4">
                <div className="my-1 px-1 w-full md:w-2/5 lg:my-4 lg:px-4 lg:w-2/5">
                    <div>
                        <span className="text-2xl text-left  text-black">Rate the <span
                            className={"font-semibold text-indigo-600"}>location</span> out of 5 stars </span>
                    </div>
                    <div>
                        <span className="text-base text-left  text-gray-500">Keep in mind: distance to classes, safety of area </span>
                    </div>
                </div>
                <div className="mb-3 px-1 w-full md:w-1/5 lg:my-4 lg:px-4 lg:w-1/5">
                    <Slider min={20} defaultValue={20} marks={{20: 1, 40: 2, 60: 3, 80: 4, 100: 5}} step={null}
                            onChange={(value) => {
                                setRateLocation(value / 20)
                            }}/>
                </div>
            </div>

            {/*dropdown*/}
            <div className="flex flex-wrap  lg:-mx-4">
                <div className="my-1 px-1 w-full md:w-auto lg:my-4 lg:px-4 lg:w-auto">
                    <div>
                        <span className="text-2xl text-left  text-black">What   <span
                            className={"font-semibold text-indigo-600"}>calendar</span> year did you live here?</span>
                    </div>
                </div>
                <div className="my-1 px-1  md:w-1/5 lg:my-4 lg:px-4 lg:w-1/5">
                    <select className={'sel_dropdown'} onChange={(e) => {
                        setCalendar(e.target.value)
                    }}>
                        {
                            yearArr.map((item, i) => {
                                return <option key={i} value={item}
                                               selected={(item == curYear) ? "selected" : ""}>{item}</option>
                            })
                        }

                    </select>
                </div>
            </div>

            <div className="flex flex-wrap  lg:-mx-4">
                <div className="my-1 px-1 w-full md:w-auto lg:my-4 lg:px-4 lg:w-auto">
                    <div>
                        <span className="text-2xl text-left  text-black">What <span
                            className={"font-semibold text-indigo-600"}>type of room</span> did you have?</span>
                    </div>
                </div>
                <div className="my-1 px-1  md:w-1/5 lg:my-4 lg:px-4 lg:w-1/5">
                    <select id="room" className={'sel_dropdown'} onChange={(e) => {
                        setRoomType(e.target.value)
                    }}>
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                        <option value="triple">Triple</option>
                        <option value="studio">Studio</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-wrap  lg:-mx-4">
                <div className="my-1 px-1 w-full md:w-auto lg:my-4 lg:px-4 lg:w-auto">
                    <div>
                        <span className="text-2xl text-left  text-black">Would you  <span
                            className={"font-semibold text-indigo-600"}>recommend</span>  this hall to a friend?</span>
                    </div>
                </div>
                <div className="my-1 px-1  md:w-1/5 lg:my-4 lg:px-4 lg:w-1/5">
                    <select className={'sel_dropdown'} onChange={(e) => {
                        setRecommend(e.target.value)
                    }}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-wrap  lg:-mx-4">
                <div className="my-1 px-1 w-full md:w-auto lg:my-4 lg:px-4 lg:w-auto">
                    <div>
                        <span className="text-2xl text-left  text-black">Select the   <span
                            className={"font-semibold text-indigo-600"}>amenities</span> that this hall offers</span>
                    </div>
                </div>

            </div>

            <div className="flex flex-wrap  lg:-mx-4">
                <div className="my-1 px-1 w-full md:w-2/5 lg:my-4 lg:px-4 lg:w-2/5">


                    <div class="amenities">

                        <div className={"choose-amenities false" + (amenity.bath ? " btn-amenities-clicked" : "")}
                             onClick={() => setAmenity({...amenity, 'bath': !amenity['bath']})}>
                            <span>Private Bathroom <i class="fas fa-restroom amenity-icon"></i></span>
                        </div>
                        <div className={"choose-amenities false" + (amenity.air_cond ? " btn-amenities-clicked" : "")}
                             onClick={() => setAmenity({...amenity, 'air_cond': !amenity['air_cond']})}>
                            <span>Air Conditioning <i class="fas fa-fan amenity-icon"></i></span>
                        </div>
                        <div
                            className={"choose-amenities false" + (amenity.dining_hall ? " btn-amenities-clicked" : "")}
                            onClick={() => setAmenity({...amenity, 'dining_hall': !amenity['dining_hall']})}>
                            <span>In-house Dining Hall <i class="fa fa-burger-soda amenity-icon"></i></span>
                        </div>
                        <div className={"choose-amenities false" + (amenity.laundry ? " btn-amenities-clicked" : "")}
                             onClick={() => setAmenity({...amenity, 'laundry': !amenity['laundry']})}>
                            <span>On-site Laundry <i class="fa fa-washer amenity-icon"></i></span>
                        </div>
                        <div className={"choose-amenities false" + (amenity.mailroom ? " btn-amenities-clicked" : "")}
                             onClick={() => setAmenity({...amenity, 'mailroom': !amenity['mailroom']})}>
                            <span>Pack Recieving Mailroom <i class="fa fa-envelope amenity-icon"></i></span>
                        </div>
                        <div
                            className={"choose-amenities false" + (amenity.lounge_area ? " btn-amenities-clicked" : "")}
                            onClick={() => setAmenity({...amenity, 'lounge_area': !amenity['lounge_area']})}>
                            <span>Lounge/Common Area <i class="fas fa-loveseat"></i></span>
                        </div>
                        <div
                            className={"choose-amenities false" + (amenity.kitchen ? " btn-amenities-clicked" : "")}
                            onClick={() => setAmenity({...amenity, 'kitchen': !amenity['kitchen']})}>
                            <span>Kitchen <i class="fas fa-utensils"></i></span>
                        </div>
                        <div
                            className={"choose-amenities false" + (amenity.elevator ? " btn-amenities-clicked" : "")}
                            onClick={() => setAmenity({...amenity, 'elevator': !amenity['elevator']})}>
                            <span>Elevator <i class="fas fa-arrow-up"></i></span>
                        </div>
                    </div>
                    <textarea maxlength="600" className={" w-full"} placeholder="Write about your experience"
                              value={comment} onChange={(e) => setComment(e.target.value)}
                    /><br/>
                    <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2"
                            onClick={() => {
                                console.log(yearArr);

                                console.log({
                                        rateRoom,
                                        rateBuilding,
                                        rateBathroom,
                                        rateLocation,
                                        roomType,
                                        recommend,
                                        amenity,
                                        comment
                                    }
                                );
                                alert(JSON.stringify({
                                    rateRoom,
                                    rateBuilding,
                                    rateBathroom,
                                    rateLocation,
                                    calendar,
                                    roomType,
                                    recommend,
                                    amenity,
                                    comment
                                }))
                            }}
                    >Submit
                    </button>
                </div>
            </div>

        </div>
    );
}

export default WriteReview;