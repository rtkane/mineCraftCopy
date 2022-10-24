import { useCallback, useEffect, useState } from "react"

function actionByKey(key){
    const keyActionMap = {
        keyW: 'moveForward',
        KeyS: 'moveBackwards',
        KeyA: 'moveLeft',
        KeyD: 'moveRight',
        Space: 'jump',
        Digital1: 'dirt',
        Digital2: 'grass',
        Digital3: 'glass',
        Digital4: 'wood',
        Digital5: 'log',
    }

    return keyActionMap[key]
}

export const useKeyboard = () => {
    const [actions, setActions] = useState({
        moveFoward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        texture1: false,
        texture2: false,
        texture3: false,
        texture4: false,
        texture5: false,
    })
    
    const handleKeyDown = useCallback((e) => {
        const action = actionByKey(e.code)
        if(action){
            setActions((prev) =>{
                return({
                        ...prev,
                        [action]: true
                })
            })
        }
    },[])

    const handleKeyUp = useCallback((e) => {
        const action = actionByKey(e.code)
        if(action){
            setActions((prev) =>{
                return({
                        ...prev,
                        [action]: false
                })
            })
        }
    },[])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [handleKeyDown, handleKeyUp])

    return actions
}