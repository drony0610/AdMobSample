import {useEffect, useState } from "react"
import { Text, View } from "react-native"

const ProgressBar = ({loaded, error, setMain, isClosed}) => {

    const TIMING = 5000
    const [percent, setPercent] = useState(0)

    useEffect(()=>{
        let interval
        if(percent < 100 && !loaded){
             interval = setTimeout(()=>{
                setPercent(p => p+1)
            },TIMING/100) 
        }else if(percent > 100 && error){
            clearTimeout(interval)
            setMain(true)
        }else{
            clearTimeout(interval)
        }
        return () =>{
            clearTimeout(interval)
        }
    },[percent, loaded, isClosed])

    if(loaded){
        return null
    }

    return(
        <View>
            <Text>{percent}%</Text>
        </View>
    )
}

export default ProgressBar