import React from 'react'
import { HeroList } from '../heroes/HeroList'

export const DcScreen = () => {

    return(
        <>
            <h1 className="animate__animated animate__backInDown">DC Screen</h1>
            <hr/>
            <HeroList publisher='DC Comics' />
        </>
    )

}
