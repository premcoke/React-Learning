import React from "react";

const Header = ({ data }) => {
    return (
        <>
            <div className="modal-header text-light bg-dark">Chennai jobs
                {data != null && <span style={{ right: 0 }}>{data.name}</span>}
            </div>
        </>
    )
};

export default Header;