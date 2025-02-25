let questions = [{
    question : "which is the largest animal in the world?",
    answers:[
        {text:"shark",correct:false},
        {text:"Blue whale",correct:true},
        {text:"Elephant",correct:false},
        {text:"Giraffe",correct:false},
    ]
},
{question : "which is the smallest city in the world?",
    answers:[
        {text:"Vatican city",correct:true},
        {text:"bhutan",correct:false},
        {text:"Nepal",correct:false},
        {text:"Sri lanka",correct:false},
    ]},
    {question : "which is the largest desert in the world?",
    answers:[
        {text:"kalahari",correct:false},
        {text:"Gobi",correct:false},
        {text:"Sahara",correct:false},
        {text:"Antarctica",correct:true},
    ]},
    {question : "which is the Smallest continent in the world?",
    answers:[
        {text:"Asia",correct:false},
        {text:"Austriala",correct:true},
        {text:"Arctica",correct:false},
        {text:"Africa",correct:false},
    ]}
]
const questionElement = document.getElementById('question');
const answerbuttons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex=0;
    score =0;
    nextButton.innerHTML='Next';
    ShowQuestions();
}
function ShowQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerbuttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click" , selectAnswer);
    })
}
function resetState(){
    nextButton.style.display='none';
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct==='true';
    score++;
    if(isCorrect){
        selectedBtn.classList.add("correct");

    }
    else{
        selectedBtn.classList.add("Incorrect")
    }
    Array.from(answerbuttons.children).forEach(button=>{
        if(button.dataset.correct==='true'){
            button.classList.add("correct");
        }
        button.disabled = true
    });
    nextButton.style.display = 'block';

}
function showScore(){
    resetState();
    questionElement.innerHTML =`you scored ${score} out of ${questions.length}!`
    nextButton.innerHTML="Play Again"
    nextButton.style.display ="block"
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        ShowQuestions();
    }else{
        showScore();
    }

}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex <questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();