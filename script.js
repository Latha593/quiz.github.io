const questions=[
    {
        question:"Which is largest animal in the world?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Blue whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false}
        ]
    },
    {
        question:"Which animal in the world?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Blue whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false}
        ]
    },
    {
        question:"Which largest animal in the world?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Blue whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false}
        ]
    },
    {
        question:"Which is largest in the world?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Blue whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false}
        ]
    },
    {
        question:"Which is largest animal world?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Blue whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false}
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");
const quiz_div=document.getElementById("quiz");
const restart=document.getElementById("reset-btn");
const timerDisplay = document.getElementById('timer');
const submit=document.getElementById('submit-btn');
const user=document.getElementById('name');
const main=document.getElementById('quiz_content');
const details=document.getElementById('name_card');


let currentQuestionIndex=0;
let score=0;
let reset=0;
let intervalId = null;
let secondsRemaining = 0;


function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    secondsRemaining=15;
    timerDisplay.textContent ="Time Remaining: "+ secondsRemaining + " seconds";
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    if (questionNo<=questions.length){
        clearInterval(intervalId)
        startTimer(15);
    }
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;
    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`${user.value} you have scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again!";
    nextButton.style.display="block";
    timerDisplay.style.display='None';
    restart.style.display='None';
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        clearInterval(intervalId);
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){   
        handleNextButton();
    }else{
        startQuiz();
    }
});

restart.addEventListener('click',() => {
    clearInterval(intervalId); 
}); 


function startTimer(durationInSeconds) {
    timerDisplay.style.color='green'
    timerDisplay.style.display='block';
    secondsRemaining = durationInSeconds;
    intervalId = setInterval(function() {
        timerDisplay.textContent ="Time Remaining: "+ secondsRemaining + " seconds";
        if (secondsRemaining<10){
            timerDisplay.style.color='red'
        }
        else{
            timerDisplay.style.color='green'
        }
        if (secondsRemaining === 0) {
            handleNextButton()
        } else {
            secondsRemaining--;
          
        }
    }, 1000);
}


function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    reset = 0;
    resetState();
    clearInterval(intervalId);
    startTimer(15)
    showQuestion();
    
}

submit.addEventListener("click",()=>{
    if(user.value){
        main.style.display='block';
        details.style.display='none'
        startQuiz()
    }
    else{
        alert("Enter your name")
        
    }
});

restart.addEventListener('click', resetQuiz);

