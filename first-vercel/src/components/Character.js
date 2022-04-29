// Write your Character component here

const Character = props => {
     
    const {info, openDetails} = props
    const divStyle = {
        // color: 'blue',
        // backgroundImage: `url( ${props.info.url} )`
      };

    return (
        <div className="boxChar">
            <div className={`character`}>
                <p className="actorName" >{info.name}</p>
                <button className="actorBtn" onClick={() => openDetails({detailInfo:info, id:info.birth_year}) }>{info.birth_year}</button>
            </div>
        </div>
    )
}



export default Character;