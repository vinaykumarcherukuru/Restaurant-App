import React, { Fragment } from 'react'

import Fade from 'react-reveal/Fade'

function CategoryDetails({ categories, editEvent, deleteEvent }) {
    return (
        <Fade bottom cascade>
            <div className="table-responsive  ml-3 mt-2">

                {categories && categories.map(item =>
                    (

                        <div key={item._id} className="btn btn-light mr-3 mb-3">{item.name}
                            <a href="#" className="ml-2" aria-hidden="true" onClick={() => editEvent(item)}><i className="fa fa-pencil" /> </a>
                            <a href="#" className="ml-2" aria-hidden="true" onClick={() => window.confirm("Are you sure you wish to delete this item?") && deleteEvent(item._id)}><i className="fa fa-trash" /></a>
                        </div>

                    )
                )}
            </div>
        </Fade>
    )
    const handleEdit = () => {

    }


}

export default CategoryDetails
