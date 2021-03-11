import { useEffect, useState } from 'react';
import axios from 'axios';

const History = () => {
    const [ history, setHistory ] = useState([])

    useEffect(() => {
        axios.get('/history')
        .then(res => {
            setHistory(res.data.history)
        })
        .catch(error => { throw error })
    }, [])
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center">
            {
                history.length > 0 && 
                history.map(item => {
                    return (
                        <div class="card w-100 m-2 p-2">
                            <div class="card-body d-flex justify-content-between">
                                <h1>{`Player: ${item.player}`}</h1>
                                <h1>{`Score: ${item.score}`}</h1>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default History;