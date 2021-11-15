import React, {useEffect, useState} from 'react'
import ReactStars from "react-rating-stars-component";
import strCapitalize from "./data/util";
import moment from "moment";

function DetailfilerResult(props) {
    const [reviewObj, setReviewObj] = useState(null);
    useEffect(() => {
        setReviewObj(JSON.parse(props.review.review_data));
    });

    return (
        <div className={"mb-5"}>
            <hr/>
            {reviewObj ? <>
                <div className={"flex items-center"}>

                    <ReactStars
                        className={'inline-block'}
                        edit={false}
                        size={24}
                        value={
                            (reviewObj.rateRoom + reviewObj.rateLocation + reviewObj.rateBuilding + reviewObj.rateBathroom) / 4
                        }
                        isHalf={true}
                    />
                    <span
                        className={' ml-3'}>{((reviewObj.rateRoom + reviewObj.rateLocation + reviewObj.rateBuilding + reviewObj.rateBathroom) / 4).toFixed(1)}</span>
                </div>
                <div className={' mt-2'}>
                    <span className={"font-bold"}>{strCapitalize(reviewObj.roomType)}</span> in <span
                    className={"font-bold"}>{reviewObj.calendar}</span>
                </div>
                <div className={' mt-2'}>
                    {reviewObj.recommend =="yes"?
                        <><span className={"fa fa-thumbs-up text-2xl  text-green-700"}></span> Recommend </> :
                        <><span className={"fa fa-thumbs-down text-2xl text-red-700"}></span> Don't recommend </>}
                </div>
                <div className={'break-all mt-2'}>
                    {reviewObj.comment}
                </div>
                <div className={'break-all mt-2'}>
                    <span className={'text-gray-500'}>
                    Reviewed by {moment(reviewObj.created_at).format("MMM D, YYYY")}
                    </span>
                </div>
            </> : ""}
        </div>
    )
}

export default DetailfilerResult;