import React from "react";
import Link from "next/link";

const ListHeading = (props : any) => {
    return (
        <div className="col">
            {(props.link) ? (
                <Link className="head-link" href='/' >
                    <h1>{props.heading}</h1>
                </Link>
            ) : (
                <h1>{props.heading}</h1>
            )}
        </div>
    );
};

export default ListHeading;