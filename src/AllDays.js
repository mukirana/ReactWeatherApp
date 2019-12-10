import React from 'react'

class AllDays extends React.Component{
constructor(props){
    super(props)  
}

getData = (value)=>{
    
     const temp = value.map((data,index)=>{
          return(
              <>
                <div key={data.dt} className="card-body">   
                    <p style={{color:"#708090", fontFamily:"sans-serif", fontSize:"2.6rem"}}>{data.weather[0].description}</p>
                    <div className="row">
                        <div className="col-lg-2">
                            <h4 className="card-text">Time:<span className="badge badge-danger badge-lg"> {(data.dt_txt).slice(11,16)}</span></h4>
                        </div>
                        <div className="col-lg-2">
                            <h4 className="card-text">Avg:<span className="badge badge-secondary badge-lg">{Math.round((data.main.temp)-273.15)}&#8451; </span></h4>
                        </div>
                        <div className="col-lg-2">  
                            <h4 className="card-text" style={{whiteSpace:"nowrap"}}>Humidity:<span className="badge badge-primary badge-lg">{Math.round(data.main.humidity) }% </span></h4>
                        </div>
                        <div className="col-lg-3">
                            <h4 className="card-text" >MaxTemp:<span className="badge badge-warning badge-lg">{Math.round((data.main.temp_max)-273.15) }&#8451;</span></h4>
                        </div>
                        <div className="col-lg-3"> 
                            <h4 className="card-text ">MinTemp:<span className="badge badge-success badge-lg">{Math.round((data.main.temp_min)-273.15) }&#8451; </span></h4>
                        </div>    
                    </div>
                    <hr></hr>
                </div>
              </>
          )
      })
      return temp
}

render(){
    return(
     <>
       {(this.props.tempAllDays) && (Object.keys(this.props.tempAllDays)).map((key,index)=>{
          var data = this.props.tempAllDays[key]
          return(
               <>
                <div key={key}>
                    <div className="row justify-content-center">
                        <div className="card mt-5" style={{width: "60rem"}}>
                            <div className="card-head ml-3"> 
                                <h3  className="card-title mt-4 "><span className="badge badge-warning badge-lg">{data[0].dt_txt.slice(0,10)}</span></h3>
                            </div>
                            <hr></hr>
                            {this.getData(data)}
                        </div>
                   </div>
                </div>
               </>
            )
        })}


    </>
     ) 
}
}

export default AllDays