import { v4 as uuid } from 'uuid';

const Details = props => { 

    // debugger
    const { detailInfo, close} = props

   

    return (
        <>
         <h2>{detailInfo.name}'s Details </h2>
        <div className={`boxDetail overFLow`}>
         
          {
            detailInfo &&
            <>
                { Object.entries(detailInfo).map(([key, value]) => {
                        // console.log(`${key}: ${value}`)                                 
                        return (
                        <div key={uuid()} className={``}>
                            <div className="boxDetail">{key.replace('_', ' ')} : {value}</div>
                        </div>
                        )
                    })
                }
            </>
          }
         
        </div>
        <button className="CloseDetailBtn" onClick={() => { close() }} >Close</button>
        </>
      )
    

}



export default Details;