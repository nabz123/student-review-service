import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

function SearchBar(props) {
    const [searchterm, setSearchterm] = useState("");
    const [searchresult, setSearchResult] = useState([]);
    const history = useHistory();


    useEffect(() => {
        //request server...
        if (searchterm == "" || !props.data) {
            setSearchResult([]);
            return;
        }

        setSearchResult(props.data.filter((item) => {
                if (item.Institution_name.toLowerCase().includes(searchterm.toLowerCase())) {
                    return item
                }
            }
        ));
        console.log("result ", searchresult);

    }, [searchterm]);

    const clickSearchItem = (name) => {
        if (props.clickAction == "main") {
            history.push(`/detail/${name}`)
        } else if (props.clickAction == "rate") {
            props.onSelected(name);
            setSearchterm("");
        }
    }

    return (
        <div className={props.className}>
            <div className="search-bar">
                <div className="search-bar__input-wrapper">
                    <input id="search_school" type="text" onChange={(e) => {
                        {
                            setSearchterm(e.target.value)
                        }
                    }}
                           className="search-bar__input"
                           placeholder="Search for your school to get started"
                           autoComplete="off" value={searchterm}/>
                    <svg className="MuiSvgIcon-root search-bar__icon MuiSvgIcon-fontSizeLarge" focusable="false"
                         viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                    </svg>
                </div>
                {searchresult.length > 0 ?
                    <div className="search-bar__result-wrapper">
                        {searchresult.map((item, idx) => {
                                return <div className="search-bar__result-item" key={idx} onClick={() => {
                                    clickSearchItem(item.Institution_name);
                                }}>{item.Institution_name}</div>
                            }
                        )}
                        <div className="search-bar__add-it-here">
                            <a href="/add-school">Don't see your school?
                                <span
                                    className="u-d--link u-t--primary"> Add it here</span>
                            </a>
                        </div>
                    </div> : ""
                }
            </div>
            <div className="home__landing-link"><a href="/rate">Write a review</a></div>
        </div>
    )
}

export default SearchBar;