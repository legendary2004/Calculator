import React from "react";

export default function(buttonProps) {
    const classes = `btn ${buttonProps.color}`
    return (
        <div className="col-3 ">
            <button type="button" className={classes} onClick={buttonProps.function}>{buttonProps.content}</button>
        </div>
    )
}