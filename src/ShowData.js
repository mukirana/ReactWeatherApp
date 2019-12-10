import React from 'react'


class ShowData extends React.Component{

    constructor(props){
        super(props)  
    }

    render(){
        return( 
            <>  
                {this.props.tempData && this.props.tempData.map((data,index)=>{
                   return(
                    <div className="row justify-content-center">
                        <div key={index} className="card mt-5" style={{width: "60rem"}}>       
                            <div className="card-body">
                                <h5 className="card-title ">{this.props.name} temperature in {this.props.cityName} at <span className="badge badge-danger badge-lg">{(data.dt_txt).slice(11,16)} O'clock</span></h5>
                                <p style={{color:"#708090", fontFamily:"sans-serif", fontSize:"2.6rem"}}>{data.weather[0].description}</p>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-lg-6  mt-3">
                                        <h4 className="card-text">Average: <span className="badge badge-secondary badge-sm">{Math.round((data.main.temp)-273.15) }&#8451; </span></h4>
                                    </div>
                                    <div className="col-lg-6 mt-3">  
                                        <h4 className="card-text">Humidity: <span className="badge badge-primary badge-sm">{Math.round(data.main.humidity) }% </span></h4>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-lg-6 mt-3">
                                        <h4 className="card-text">Max-Temp: <span className="badge badge-warning badge-lg">{Math.round((data.main.temp_max)-273.15) }&#8451;</span></h4>
                                    </div>
                                    <div className="col-lg-6 mt-3"> 
                                        <h4 className="card-text">Min-Temp: <span className="badge badge-success badge-lg">{Math.round((data.main.temp_min)-273.15) }&#8451; </span></h4>
                                    </div>
                                </div> 
                                                                        
                            </div>
                        </div>
                    </div>
                   )
                })}
            </>   
        )
    }
}

export default ShowData