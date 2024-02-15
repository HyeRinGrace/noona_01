
import { useState } from 'react';
import './App.css';
import Box from './component/box';
import Counter from './component/Counter';

// 1. 박스 2개, 
// 2. 박스정보 : 타이틀, 사진정보, 결과
// 3. 가위 바위 보 버튼이 있다.
// 4. 버튼을 클릭하면 클릭한 값이 박스에 보임
// 5. 컴퓨터는 랜덤하게 아이템 선택이 된다.
// 6. 4,5 결과를 가지고 승패를 따진다.
// 7. 지면 빨간색 테두리, 이기면 초록색 테두리로 변경

//가위,바위,보 객체
const choice = {
  rock: {
    name:"Rock",
    img: "https://cdn-icons-png.flaticon.com/512/231/231640.png",
  
  },
  scissor:{
    name : "Scissor",
    img: "https://blog.kakaocdn.net/dn/HfURw/btqXKvOTNWK/gWTwPXEg9QzSV0ilOuwuak/img.png",
  },
  paper:{
    name : "Paper",
    img: "https://blog.kakaocdn.net/dn/bmjB2s/btqXHhp6kpG/TH14W4U612SxKo9uuR2sB0/img.png",
  }
  
};

//메인
function App() {

  let [totalCount,setTotalCount] = useState(0); //총 유저가 플레이한 수
  let [winCount,setWinCount] = useState(0); //총 유저가 이긴 수
  let [loseCount,setLoseCount] = useState(0); // 총 유저가 진 수
  let drawCount = totalCount - (winCount + loseCount);

  let [userSelect,setUserSelect] = useState(null); //유저의 상태변화에 따른 useState 값
  let [computerSelect,setComputerSelect] = useState(null); //유저가 임의의 버튼을 눌렀을 때 컴퓨터의 useState값
  let [userJudge,setUserJudge] = useState(""); //유저의 승패 useState값 
  let [computerJudge,setComputerJudge] = useState("") //컴퓨터의 승패 useState 값
  let [color,setColor] = useState(""); //승패에 따른 테두리 색상 변화

  //유저가 임의의 버튼을 선택했을 때 실행되어야 할 함수
  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
    let computerChoice = computerPlay();
    setComputerSelect(choice[computerChoice]); //computerSelect에 따른 컴퓨터의 값
    setUserJudge(winner(choice[userChoice],choice[computerChoice])); // judge에 상태 업데이트되어 들어가야할 함수

    const returnJudge = winner(choice[userChoice],choice[computerChoice]); //유저의 승패여부를 returnJudge에 담음(이걸이용해서 count쓸 수 있다.)
    ComputerWinner(returnJudge);
    setComputerJudge(ComputerWinner(returnJudge));
    judgeColor(returnJudge);
    setColor(judgeColor(returnJudge));
    

  };


  // 컴퓨터의 랜덤값 생성 후 인덱스에 넣어주는 함수
  const computerPlay = () => {
    let randNum = Math.floor(Math.random()*3);
    let choiceIndex = Object.keys(choice);
    return choiceIndex[randNum];
  }

  // 유저의 승패를 결정내주는 함수
  /* eslint-disable */
  const winner = (user, computer) =>{
    setTotalCount(totalCount+1);
    if(user.name == computer.name){
      return "draw"
    }else if(user.name == "Rock") 
    return computer.name == "Scissor"? "win" : "lose";
    else if(user.name == "Scissor")
    return computer.name == "Paper"? "win":"lose";
    else if(user.name == "Paper")
    return computer.name == "Rock"? "win":"lose";
  }

  //컴퓨터의 승패를 결정내주는 함수
  /* eslint-disable */
  const ComputerWinner = (returnJudge) =>{
    if(returnJudge == "draw"){
      return "draw"
    }else if(returnJudge == "win"){
      return "lose"
    }else if(returnJudge == "lose"){
      return "win"
    }
  }


  // 승패 확인 후 컬러값을 지정해주는 함수
  /* eslint-disable */
  const judgeColor = (colorChoice) => {
    if(colorChoice == "draw"){
      return "lightgray";
    }else if(colorChoice == "win") {
      setWinCount(winCount+1);
      return "yellowgreen";
    }else if(colorChoice == "lose"){
      setLoseCount(loseCount+1);
      return "tomato";
    }
  }



  // 화면에 보여지는 부분
  return (
    <div>
      <Counter count = {totalCount} winCount = {winCount} loseCount = {loseCount} drawCount = {drawCount}/>
    <div className='main'> 
      <Box title = "You" item={userSelect} result = {userJudge} color = {color}/>
      <Box title = "Computer" item = {computerSelect} result = {computerJudge}/>
    </div>
    <div className="buttons">
      <button onClick={()=>play('scissor')}>가위</button>
      <button onClick={()=>play("rock")}>바위</button>
      <button onClick={()=>play("paper")}>보</button>
    </div>
    </div>
  );
}

export default App;

// {/* 함수를 넣으면 리액트는 실행되는 특징이 있다.(UI를 그려줘야하기 때문에) 따라서 콜백함수형태로 넣어야함 ()=>함수명 */}
