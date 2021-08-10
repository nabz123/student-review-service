import React from 'react'

import ReactStars from "react-rating-stars-component";

function DetailfilerResult(props) {

    return (
        <div> <a href="#">
            <div className="hall-card"><img
                src="https://firebasestorage.googleapis.com/v0/b/rate-my-dorm.appspot.com/o/dorm-icon.png?alt=media&amp;token=4b18aa47-b1e5-44b3-bbb1-ce99fd9a8b73"
                alt="Hall" className="hall-card__icon"/>
                <div className="hall-card__content">
                    <div className=" ">
                        <span
                            className="text-2xl text-left font-bold text-black">
                                   {props.data}
                            </span>
                    </div>
                    <div className={"u-m-top--sm u-m-bottom--xs u-d--flex"}>
                        <ReactStars
                            edit={false}
                            size={24}
                            value={3}
                            isHalf={true}
                        />
                        <span> 3</span>
                    </div>

                    <div className="text-gray-500"> {5} reviews</div>
                </div>
            </div>
        </a></div>
    )
}

export default DetailfilerResult;