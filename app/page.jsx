'use client'
import Buttons from "@/components/Buttons"
import styles from '@/styles/Home.module.css'
import { v4 } from 'uuid'

import { useState, useRef } from "react"

export default function Home() {

  let [gamestart, setgamestart] = useState(false);
  let [counter, setcounter] = useState(0);
  let [count, setcount] = useState(0);

  var [quizquestion, setquizquestion] = useState(['']);
  var [quizoption, setquizoption] = useState([['']]);
  var [quizanswer, setquizanswer] = useState(['']);

  var [quizhint, setquizhint]=useState(['']);
  var [hintsh,sethint]=useState(false);
  let hintpa=useRef();
  let hintcontain=useRef();

  var quizquestion;
  var quizoption;
  // let answbtn = document.getElementsByClassName("answbtn");
  let main = useRef();
  let yscore = useRef();
  let yscore1 = useRef();
  let ynext = useRef();


  const handleStart = async () => {
    setgamestart(true);
    setcounter(0);
    setcount(0);
    let res = await fetch("/api");
    let data = await res.json();
    setquizquestion(data.data[0].Questions);
    setquizoption(data.data[1].Options);
    setquizanswer(data.data[2].answers);
    setquizhint(data.data[3].hints);
    ynext.current.disabled = true;
  }

  const handlenext = (e) => {
    if ((count + 2) < quizquestion.length) {
      setcounter(counter + 1);
      setcount(count + 1);
      sethint(false);
      ynext.current.disabled = true;
      hintpa.current.classList.add("d-none");

    }
    else if ((count + 2) == quizquestion.length) {
      setcounter(counter + 1);
      setcount(count + 1)
      sethint(false);
      e.target.innerHTML = "SUBMIT";
      ynext.current.disabled = true;
      hintpa.current.classList.add("d-none");
    }
    else if ((count + 1) == quizquestion.length) {
      setcount(count + 1);
      sethint(false);

      main.current.classList.add("d-none");
      hintcontain.current.classList.add("d-none");
      hintpa.current.classList.add("d-none");

      yscore.current.classList.remove("d-none");
      ynext.current.innerHTML = "Play Again";
    }
    else {
      setgamestart(false);
    }
  }

  const handleanswer = (e) => {
    if (quizoption[counter][quizanswer[counter]] == e.target.innerHTML) {
      ynext.current.disabled = false;
      let i;
      e.target.classList.add("text-bg-success");
      for (i = 0; i < quizoption[0].length; i++) {
        answbtn[i].disabled = true;
      }
      let str=yscore1.current.innerText;
      if(hintsh==true){
        yscore1.current.innerHTML=eval(str + "+" + "5");
      }
      else{
        yscore1.current.innerHTML=eval(str + "+" + "10");
      }
    }
    else {
      ynext.current.disabled = false;
      answbtn[quizanswer[counter]].classList.add("text-bg-success");
      e.target.classList.add("text-bg-danger");
    }
  }

  const handlehintbtn = ()=>{
    sethint(true);
    hintpa.current.innerHTML=quizhint[counter];
    hintpa.current.classList.remove("d-none");
  }

  return (
    <>
      <h1 className="text-light">WebQuiz</h1>
      <div className={styles.container}>
        {gamestart ?
          <>
            <div ref={main} className={styles.quiz}>
              <h2 id="question">{`Question-${counter + 1}: ${quizquestion[counter]}`}</h2>
              {quizoption[counter].map((item) => {
                return (
                  <>
                    <button key={v4()} onClick={handleanswer} className={`${styles.btn} answbtn`}>{item}</button>
                  </>
                )
              })};
            </div>

            <div ref={hintcontain} className="hint">
              <button onClick={handlehintbtn} className=" btn btn-primary mb-3 btnhint">HINT(-5)</button>
              <div ref={hintpa} className="hintp d-none">
                Hint will be shown.
              </div>
            </div>

            <div ref={yscore} className=" d-none">
              <span>Your Score is </span>
              <span ref={yscore1} className="score">
                0
              </span>
              <span>{`/${quizquestion.length * 10}`}</span>
            </div>
            <Buttons ynext={ynext} handlenext={handlenext} />
          </> :
          <button className="btn-primary " onClick={handleStart}>Start Quiz</button>}
      </div>


    </>
  );
}
