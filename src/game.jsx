import React from 'react';
import * as $ from 'jquery';
import Button from 'react-bootstrap/Button';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            highScore: 0,
            currentScore: 0,
            currentNum: 5,
            nextNum: null,
            pastNum: null,
            message: "Will the next number be Higher or Lower than...",
            secondMessage: "Let's Find out shall we?",
            congrats: "",
        })
        this.isHigher = this.isHigher.bind(this);
        this.isLower = this.isLower.bind(this);
        this.endGame = this.endGame.bind(this);
        this.renderHint = this.renderHint.bind(this);
        this.tryAgain = this.tryAgain.bind(this);
        this.isEqual = this.isEqual.bind(this);
    }

    componentDidMount() {
        if(sessionStorage.getItem("highscore")) {
            this.setState({ highScore: sessionStorage.getItem("highscore")});
        } else {
            sessionStorage.setItem("highscore", 0);
        }
    }

    isHigher() {
        const nextNumber = Math.floor(Math.random() * 10);
        const { currentNum } = this.state;
        let score = this.state.currentScore;
        if(currentNum === nextNumber) {
            const { currentScore } = this.state;
            this.setState({ currentScore: currentScore})
        } else if(currentNum < nextNumber) {
            score += 1;
            this.setState({
                currentScore: score,
                currentNum: nextNumber,
            })
        } else {
            const newHighScore = score;
            const { highScore } = this.state;
            const past = nextNumber;
            if(newHighScore > highScore){
                const congratMessage = "A NEW HIGHSCORE OF " + newHighScore;
                this.setState({
                    currentScore: 0,
                    highScore: newHighScore,
                    currentNum: 5,
                    pastNum: past,
                    congrats: congratMessage,
                })
                sessionStorage.setItem("highscore", newHighScore);
            } else {
                this.setState({
                    currentScore: 0,
                    currentNum: 5,
                    pastNum: past,
                    congrats: newHighScore,
                });
            }
            this.endGame();
        }
    }

    isLower() {
        const nextNumber = Math.floor(Math.random() * 10);
        const { currentNum } = this.state;
        let score = this.state.currentScore;
        if(currentNum === nextNumber) {
            const { currentScore } = this.state;
            this.setState({ currentScore: currentScore})
        } else if(currentNum > nextNumber) {
            score += 1;
            this.setState({
                currentScore: score,
                currentNum: nextNumber,
            })
        } else {
            const newHighScore = score;
            const { highScore } = this.state;
            const past = nextNumber;
            if(newHighScore > highScore){
                const congratMessage = "A NEW HIGHSCORE OF " + newHighScore;
                this.setState({
                    currentScore: 0,
                    highScore: newHighScore,
                    currentNum: 5,
                    pastNum: past,
                    congrats: congratMessage,
                })
                sessionStorage.setItem("highscore", newHighScore);
            } else {
                this.setState({
                    currentScore: 0,
                    currentNum: 5,
                    pastNum: past,
                    congrats: newHighScore,
                });
            }
            this.endGame();
        }
    }

    isEqual() {
        const nextNumber = Math.floor(Math.random() * 10);
        const { currentNum } = this.state;
        let score = this.state.currentScore;
        if(currentNum === nextNumber) {
            if(score === 0 || score === 1) {
                score = 2;
                this.setState({
                    currentScore: score,
                    currentNum: nextNumber,
                })
            } else {
                score *= 2;
                this.setState({
                    currentScore: score,
                    currentNum: nextNumber,
                })
            }
        } else {
            const newHighScore = score;
            const { highScore } = this.state;
            const past = nextNumber;
            if(newHighScore > highScore){
                const congratMessage = "A NEW HIGHSCORE OF " + newHighScore;
                this.setState({
                    currentScore: 0,
                    highScore: newHighScore,
                    currentNum: 5,
                    pastNum: past,
                    congrats: congratMessage,
                })
                sessionStorage.setItem("highscore", newHighScore);
            } else {
                this.setState({
                    currentScore: 0,
                    currentNum: 5,
                    pastNum: past,
                    congrats: newHighScore,
                });
            }
            this.endGame();
        }
    }

    endGame(){
        $('.gameButtons').css('display', 'none');
        $('#currentNum').css('display', 'none');
        $('#hint').css('display', 'none');
        $('#message').css('display', 'none');
        $('#secondMessage').css('display', 'none');

        $('#pastNum').css('display', 'block');
        $('#tryAgainButton').css('display', 'block');
        $('#congrats').css('display', 'block');
        $('#youScored').css('display', 'block');
    }

    tryAgain() {
        $('.gameButtons').css('display', 'block');
        $('#currentNum').css('display', 'block');
        $('#hint').css('display', 'block');
        $('#message').css('display', 'block');
        $('#secondMessage').css('display', 'block');

        $('#pastNum').css('display', 'none');
        $('#tryAgainButton').css('display', 'none');
        $('#congrats').css('display', 'none'); 
        $('#youScored').css('display', 'none'); 
    }

    renderHint() {
        const { currentNum } = this.state;
        const above = 10 - currentNum;
        const below = (0 - currentNum)*(-1);

        return(
            <p><span id="greenText">Hint: </span>{below} below, {above} above</p>
        )
    }

    render() {
        const doubleDown = this.state.currentNum + " Again! (Double Your Score)";
        const higher = "Higher than " + this.state.currentNum;
        const lower = "Lower than " + this.state.currentNum;
        return(
            <React.Fragment>
                <div className="scores">
                    <div className="highScore">
                        <span className="highScoreText">Highscore:&emsp;</span>
                        <span className="highScoreValue">{this.state.highScore}</span>
                    </div>
                    <div className="currentScore">
                        <span className="currentScoreText">Your Score:&emsp;</span>
                        <span className="currentScoreValue">{this.state.currentScore}</span>
                    </div>
                </div>
                <div className="messageDiv">
                    <span className="message" id="message">{this.state.message}</span>
                </div>
                <div className="numberDiv">
                    <span className="numberMessage" id="currentNum">{this.state.currentNum}</span>
                    <span className="numberMessage" id="pastNum">Unlucky friend, it was {this.state.pastNum}</span>
                    <span className="numberMessage" id="youScored">You Scored:</span>
                    <span className="numberMessage" id="congrats">{this.state.congrats}</span>
                    <span className="secondMessage" id="secondMessage">{this.state.secondMessage}</span>
                </div>
                <div className="gameButtons">
                  <Button type="button" onClick={this.isLower} value={lower}>{lower}</Button>
                  <Button type="button" onClick={this.isHigher} value={higher}>{higher}</Button><br />
                  <Button type="button" onClick={this.isEqual} value={doubleDown}>{doubleDown}</Button>
                </div>
                <div id="tryAgainButton">
                  <Button type="button" onClick={this.tryAgain} value="Try Again">Try Again</Button>
                </div>
                <div id="hint">
                    {this.renderHint()}
                </div>
            </React.Fragment>
        )
    }
}
