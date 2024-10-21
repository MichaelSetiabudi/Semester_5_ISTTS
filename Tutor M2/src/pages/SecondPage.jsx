import { useState } from "react"

const SecondPage = () => {
    // kita akan coba buat sebuah simple game untuk menampung angka 0 dan 1
    // 0 berarti card dengan bola merah, 1 berarti card dengan bola biru
    const [map, setMap] = useState([
        0,0,0,0,1,0,0,0,0
    ])
    
    const mapHandler = (idxMap)=>{
        map.find((e,index)=>{
            if(e==1){
                map[index] = 0
            }
        })
        map[idxMap] = 1
        setMap([...map])

        //jika kita tidak memberikan spread operator, maka react tidak akan mendeteksi perubahan pada state
        // setMap(map)
    }

    return(
        <div className="ml-10">
            <h1>Simple card game</h1>
            <div className="flex w-1/4 flex-wrap">
                {map.map((card,idxMap)=>{
                    return(
                        <div key={idxMap} className="card rounded bg-blue-100 p-7 w-auto m-2 hover:bg-blue-200" onClick={()=>mapHandler(idxMap)}>   
                        
                        {card==0 && <div className="rounded-full w-5 h-5 bg-red-500"></div>}

                        {card==1 && <div className="rounded-full w-5 h-5 bg-blue-500"></div>}
                        
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SecondPage