import React from 'react'

import ReactStars from "react-rating-stars-component";

function DetailfilerResult(props) {

    return (
        <div><a href={props.link}>
            <div className="hall-card"><img
                src="https://res.cloudinary.com/dx5b1ecms/image/upload/v1631499211/dorm-icon.29a83936_ep19rk.svg"
                alt="Hall" className="hall-card__icon"/>
                <div className="hall-card__content">
                    <div className=" ">
                        <span
                            className="text-2xl text-left font-bold text-black">
                                   {props.data.hall_name}
                            </span>
                    </div>
                    <div className={"u-m-top--sm u-m-bottom--xs u-d--flex"}>
                        <ReactStars
                            edit={false}
                            size={24}
                            value={props.review}
                            isHalf={true}
                        />
                        <span> {props.review}</span>
                    </div>

                    <div className="text-gray-500"> {props.data.review.length} review</div>
                </div>
            </div>
        </a></div>
    )
}

export default DetailfilerResult;