const Notif = ({message}) =>{

    const style= {
        backgroundColor:"grey",
        color: "darkGreen" ,
        border:"5px solid green",
        padding:"10px",
        margin:"10px 40px",
        borderRadius:"10px",
        fontWeight:"600",
        fontSize:"25px"
      }

    
    if(message== null){
        return null
    }
    return(
        <div style={style}>
            {message}
        </div>
    )
}

export default Notif