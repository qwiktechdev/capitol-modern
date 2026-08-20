import React from 'react'
import WhoWeAreBanner from '../comp/WhoWeAreBanner'
import Navbar from '../comp/Navbar'
import Integrety from '../comp/Integrety'
import Footer from '../comp/Footer'
import HowWeWork from '../comp/HowWeWork'

function WhoWeAre() {
  return (
    <div>
        <Navbar/>
        <WhoWeAreBanner/>
        <Integrety/>
        <HowWeWork/>
        <Footer/>
    </div>
  )
}

export default WhoWeAre