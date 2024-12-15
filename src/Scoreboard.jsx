import './styles/Scoreboard.css'

function Scoreboard({score, highScore}) {

    // TODO: get the score dynamically


    return (
    <div className="scoreboard">
        <div className="score-row">
            <p className="scorelabel">Current score</p>
            <p className="scorenumber">{score}</p>
        </div>
        <div className="score-row">
            <p className="scorelabel">High score</p>
            <p className="scorenumber">{highScore}</p>
        </div>
    </div>
    )
}

export default Scoreboard