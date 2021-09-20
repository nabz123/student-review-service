import React, {useEffect, useState} from 'react'
import SearchBar from './SeachBar'
import DetailfilerResult from "./DetailFilterResult";
import {useHistory, useParams} from "react-router-dom";
var searchArr = require('./data/hallsData');

function Rate() {
    var {university} = useParams();
    const history = useHistory();
    const [selectedItem, setSelectedItem] = useState({});
    const onSelected = (name) => {
        console.log("selected Name ::: ", name);
        history.push(`/rate/${name}`)
    }

    useEffect(()=>{
       if(university!=undefined && university.length>0){
           setSelectedItem(searchArr.filter((item, idx) => {
               if (item.name == university)
                   return item;
           })[0]);
       }
    });

    return (
        <div className=" my-6 mx-auto px-2 md:px-10">

            <div className="home__landing-text text-center">
                <span className="text-3xl text-left  text-black">Write a <span
                    className={"font-bold  text-indigo-600"}>Review</span>
                </span>
            </div>
            <SearchBar
                placeholder="Search"
                clickAction={"rate"}
                className={"home__landing-search full"}
                data={searchArr}
                onSelected={onSelected}
            />
            {selectedItem&& selectedItem.name ?
                <div className={"mt-4"}>
                    <div className={"text-3xl font-bold"}>
                        {selectedItem.name ? selectedItem.name : ""}
                    </div>
                    <div className={"mt-1"}>
                    <span
                        className="text-base text-left  text-gray-700">{selectedItem.location ? selectedItem.location : ""} </span>
                    </div>
                    <div className={"mt-3"}>
                    <span
                        className="text-base text-left  text-gray-800">{selectedItem.halls ? selectedItem.halls.length : ""} hall results. Click on a hall to write a review. </span>
                    </div>
                    <div>
                        {selectedItem.halls ? selectedItem.halls.map((item, key) => {
                            return <DetailfilerResult data={item} key={key}
                                                      link={`/rate/${selectedItem.name}/${item}`}/>
                        }) : ""}
                    </div>

                    <div className={'text-center'}>
                        <span className="text-3xl text-left font-bold text-black"> Don't see your hall? <span
                            className={"font-bold cursor-pointer text-blue-500 underline"} onClick={()=>{history.push(`/rate/${selectedItem.name}/add-dorm`)}}> Add it here</span>
                        </span>
                    </div>
                </div> : ""}
        </div>
    )
}

export default Rate;