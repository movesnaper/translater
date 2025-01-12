import React from "react"
import style from './style.module.css'
import DocTitle from '../../../components/docTitle'


const Footer = ({schema}) => {
    return <div className={style.text__footer}>
        {schema().map(({title, menu}, index) => {
            return <DocTitle key={index} title={title} menu={menu}/>
            // DocTitle({title, menu, key: index})
            // <div key={index}>{`${title} ${value}`}</div>
        })}
    </div>
}

export default Footer