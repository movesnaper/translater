import React from "react";
import DocTitle from '../../docTitle'

const PageSettings = ({schema}) => {
    const {title, menu} = schema
    return <div key={'page-settings'}>{DocTitle({title, menu})}</div>
}

export default PageSettings