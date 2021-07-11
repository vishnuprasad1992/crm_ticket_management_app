import React from 'react'

const Footer = () => {
    const footer = {
        backgroundColor:"wheat",
        textAlign:"center",
        height:"50px",
        position :"fixed",
        bottom:"0",
        width:"100%",
        paddingTop:" 15px"
    }
    return (
        <div className="footer" style={footer}>
            All Rights reserved by CRM app @{ new Date().getFullYear() }            
        </div>
    )
}

export default Footer
