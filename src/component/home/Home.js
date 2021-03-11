import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [ users, setUser ] = useState([])
    const [ playerTurn, setPlayerTurn ] = useState({
        player_one: true,
        player_two: false
    })
    const [ isEnable, setIsEnable ] = useState({
        player_one_input: false,
        player_two_input: false
    })
    const initial = [
        ['','',''],
        ['','',''],
        ['','','']
    ]
    const [ cell, setCell ] = useState(initial)
    const [ isAlertVisible, setIsAlertVisible ] = useState(false)
    const [ message, setMessage ] = useState('')

    useEffect(() => {
        console.log(users)
        //console.log(cell)
    }, [ users, cell ])

    const inputName = (e) => {
        e.preventDefault()
        const data = {
            player: e.target[0].value,
            token: users.length === 0 ? 'X' : 'O',
            score: 0,
        }
        
        axios.post('/add', data).then((res) => {
            setUser([...users, res.data.users])
            setIsEnable({...isEnable , [ e.target[0].id ]: true })
        }).catch(error => { throw error })
    }

    const updateScore = (id, score) => {
        axios.post('/update', {
            id: id,
            score: score
        }).then(res => {
            console.log('updated')
        }).catch(error => { throw error })
    }

    const placeToken = (row, col) => {
        let newCell = [ ...cell ]
        let newUsers = [ ...users ]

        if (playerTurn.player_one) {
            setPlayerTurn({...playerTurn, player_one: !playerTurn.player_one, player_two: !playerTurn.player_two})
            
            newCell[row][col] = users[0].token
            setCell(newCell)
            if (checkToken('X')) {
                showAlert('Player X wins!')
                setCell(initial)
                newUsers[0].score = newUsers[0].score + 1
                setUser(newUsers)
                updateScore(users[0]._id, newUsers[0].score)
            }
        } else {
            setPlayerTurn({...playerTurn, player_one: !playerTurn.player_one, player_two: !playerTurn.player_two})

            newCell[row][col] = users[1].token
            setCell(newCell)
            if (checkToken('O')) {
                showAlert('Player O wins!')
                setCell(initial)
                newUsers[1].score = newUsers[1].score + 1
                setUser(newUsers)
                updateScore(users[1]._id, newUsers[1].score)
            }
        }
    }

    const checkToken = (token) => {
        if (chekDraw()) {
            showAlert('Draw')
            setCell(initial)
        } else {
            return checkVertical(token)
                || checkHorizontal(token)
                || checkFirstDiagonal(token)
                || checkSecondDiagonal(token)
        }
    }

    const chekDraw = () => {
        const input = []
        for (let i = 0; i < cell.length; i++) {
            for (let j = 0; j < cell[i].length; j++) {
                input.push(cell[i][j])
            }
        }
        return input.every((val) => val === 'X' || val === 'O' )
        
    }

    const checkVertical = (token) => {
        for (let i = 0; i < 3; i++){
          if (cell[0][i] === token 
              && cell[1][i] === token
              && cell[2][i] === token
          ) return true;
        }
        return false;
    }

    const checkHorizontal = (token) => {
        for (let i = 0; i < 3; i++){
            if (cell[i][0] === token 
                && cell[i][1] === token
                && cell[i][2] === token
        ) return true;
        }
        return false;
    }

    const checkFirstDiagonal = (token) => {
        if (cell[0][0] === token
            && cell[1][1] === token
            && cell[2][2] === token)
            return true
    }

    const checkSecondDiagonal = (token) => {
        if (cell[2][0] === token
            && cell[1][1] === token
            && cell[0][2] === token)
            return true
    }

    const showAlert = (message) => {
        setMessage(message)
        setIsAlertVisible(true)
        setTimeout(() => {
            setIsAlertVisible(false)
        }, 1000);
    }

    return (
        <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
            { isAlertVisible && <Alert message={message} />}
            <div className="w-100 d-flex justify-content-between">
                <form onSubmit={inputName}>
                    <div className="form-group">
                        <label>{ users[0] && `Player X Score: ${users[0].score}`}</label>
                        <input class="form-control" id="player_one_input" aria-describedby="emailHelp" placeholder="Enter Player Name" disabled={ isEnable.player_one_input } />
                    </div>
                </form>
                <form onSubmit={inputName}>
                    <div className="form-group">
                        <label>{ users[1] && `Player O Score: ${users[1].score}`}</label>
                        <input class="form-control" id="player_two_input" aria-describedby="emailHelp" placeholder="Enter Player Name" disabled={ isEnable.player_two_input } />
                    </div>
                </form>
            </div>
            <div className="w-100">
            {
                users.length >= 2 && <Game cell={cell} placeToken={placeToken} />
            }
            </div>
        </div>
    ) 
}

const Game = (props) => {
    const { cell, placeToken } = props
    
    return (
        <div style={{height: '100px'}}>
            {
                cell.map((array, row) => {
                    return (
                        <div className="row bg-dark text-light h-100 text-center">
                            {
                                array.map((value, col) => {
                                    return (
                                        <div onClick={() => placeToken(row, col)} className="col border border-danger">
                                            <h1>{ value }</h1>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

const Alert = ({ message }) => {
    return (
        <div class="alert alert-primary" role="alert">
            { message }
        </div>
    )
}

export default Home;