import React from 'react'

import ReactStars from "react-rating-stars-component";

function DetailfilerResult(props) {
    return (
        <div><a href={props.link}>
            <div className="dorm-card"><img
                src="https://res.cloudinary.com/dx5b1ecms/image/upload/v1631499211/dorm-icon.29a83936_ep19rk.svg"
                alt="Dorm" className="dorm-card__icon"/>
                <div className="dorm-card__content">
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

                    <div className="text-gray-500"> {5} review</div>
                </div>
            </div>
        </a></div>
    )
}

export default DetailfilerResult;