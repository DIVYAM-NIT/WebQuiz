import React from "react";

const Buttons=(props)=>{
    return (
        <div className="">
            <button ref={props.ynext} onClick={props.handlenext} id="next" type="button" className="btn btn-info rounded-circle m-auto ">NEXT</button>
        </div>
    )
}

export default Buttons;