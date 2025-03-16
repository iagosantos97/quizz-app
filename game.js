const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'HIMYM - Qual o nome completo do Ted?',
        choice1: 'Ted Mosby',
        choice2: 'Theodore Evelyn Mosby',
        choice3: 'Ted Edwards',
        choice4: 'Teddy Edwards Mosby',
        answer: 2,
    },
    {
        question:
            'HIMYM - O que o Marshall tenta esconder de Lily enquanto viaja para o casamento de Barney e Robin?',
        choice1: 'Que Ted estava apaixonado por Robin',
        choice2: 'Que o Ted iria se mudar para Chicago um dia após o casamento',
        choice3: 'Que aceitou um emprego de juiz em Nova York',
        choice4: 'Que não queria morar na Itália',
        answer: 3,
    },
    {
        question:
            'HIMYM - Qual o nome da última namorada do Ted antes de conhecer a Tracy?',
        choice1: 'Robin',
        choice2: 'Jeanette',
        choice3: 'Victoria',
        choice4: 'Zoey',
        answer: 2,
    },
    {
        question:
            'The Last of Us - Qual o nome do grupo que está tentando achar uma cura para os infectados?',
        choice1: 'Os Lobos',
        choice2: 'Os Cascavéis',
        choice3: 'Os Vagalumes',
        choice4: 'As Mariposas',
        answer: 3,
    },
    {
        question: 'The Last of Us 2 - Qual o nome da esposa do Tommy?',
        choice1: 'Dina',
        choice2: 'Maria',
        choice3: 'Abby',
        choice4: 'Alice',
        answer: 2,
    },
    // {
    //     question:
    //         'The Walking Dead - Em que o Glen trabalhava antes do apocalipse?',
    //     choice1: 'No correio',
    //     choice2: 'Na loja de camiseta',
    //     choice3: 'Numa pizzaria',
    //     choice4: 'Na polícia',
    //     answer: 3,
    // },
    // {
    //     question: 'The Walking Dead - Qual o nome do grupo do Negan?',
    //     choice1: 'Os Lobos',
    //     choice2: 'Os Sussurradores',
    //     choice3: 'Os Catadores',
    //     choice4: 'Os Salvadores',
    //     answer: 4,
    // },
    // {
    //     question: 'Supernatural - Qual o nome do escriba de Deus?',
    //     choice1: 'Castiel',
    //     choice2: 'Azazel',
    //     choice3: 'Metatron',
    //     choice4: 'Uriel',
    //     answer: 3,
    // },
    // {
    //     question:
    //         'Supernatural - Quem fez um pacto para salvar o Dean da morte?',
    //     choice1: 'Castiel',
    //     choice2: 'Sam Winchester',
    //     choice3: 'Bobby Singer',
    //     choice4: 'John Winchester',
    //     answer: 4,
    // },
    // {
    //     question:
    //         'Supernatural - Como se chama a mãe do rei do inferno (Crowley) e o que ela é?',
    //     choice1: 'Rowena - uma bruxa muito poderosa',
    //     choice2: 'Royna - um demônio muito poderosa',
    //     choice3: 'Abbadon - um cavaleiro',
    //     choice4: 'Lilith - um leviatã',
    //     answer: 1,
    // },
    // {
    //     question: 'Game of Thrones - Quem é o "King of the North"?',
    //     choice1: 'Joffrey Baratheon',
    //     choice2: 'Eddard Stark',
    //     choice3: 'Renly Baratheon',
    //     choice4: 'Robb Stark',
    //     answer: 4,
    // },
    // {
    //     question: 'Game of Thrones - Quem possui dragões?',
    //     choice1: 'Joffrey Baratheon',
    //     choice2: 'Daenerys Targaryen, a Khaleesi',
    //     choice3: 'Cersei Lannister',
    //     choice4: 'Ned Stark',
    //     answer: 2,
    // },
    // {
    //     question: 'Stranger Things - Quem é raptado na primeira temporada?',
    //     choice1: 'Dustin',
    //     choice2: 'Mike',
    //     choice3: 'Lucas',
    //     choice4: 'Will',
    //     answer: 4,
    // },
    // {
    //     question:
    //         'Stranger Things - Quem foi a primeira pessoa que morreu na série?',
    //     choice1: 'Nancy Wheller',
    //     choice2: 'Bárbara',
    //     choice3: 'Chrissy',
    //     choice4: 'Will Byers',
    //     answer: 2,
    // },
    // {
    //     question:
    //         'Resident Evil 4 - Qual o nome do(a) melhor amigo(a) do Leon que ele pensava que estava morto(a)?',
    //     choice1: 'Jack Krauser',
    //     choice2: 'Luis Sera',
    //     choice3: 'Chris Redfield',
    //     choice4: 'Ada Wong',
    //     answer: 1,
    // },
    // {
    //     question:
    //         'Resident Evil 4 - Quem mata Luis Sera logo quando ele havia recuperado a amostra da Plaga?',
    //     choice1: 'Jack Krauser',
    //     choice2: 'Osmund Saddler',
    //     choice3: 'Bitores Mendez',
    //     choice4: 'Ramon Salazar',
    //     answer: 2,
    // },
    // {
    //     question: 'One Punch Man - Qual o personagem mais forte?',
    //     choice1: 'King',
    //     choice2: 'Bang',
    //     choice3: 'Saitama',
    //     choice4: 'Blast',
    //     answer: 3,
    // },
    // {
    //     question: 'Harry Potter - Severos Snape é professor de qual matéria?',
    //     choice1: 'Transfiguração',
    //     choice2: 'Feitiços',
    //     choice3: 'Poções',
    //     choice4: 'Trato das Criaturas Mágicas',
    //     answer: 3,
    // },
    // {
    //     question:
    //         'Dragon Ball Z - Qual o personagem mata o Goku pela primeira vez?',
    //     choice1: 'Freeza',
    //     choice2: 'Vegeta',
    //     choice3: 'Cell',
    //     choice4: 'Piccolo',
    //     answer: 4,
    // },
    // {
    //     question:
    //         'Dragon Ball Clássico - Qual o nome do primeira pessoa que o Goku conhece quando chega na Terra?',
    //     choice1: 'Yamcha',
    //     choice2: 'Bulma',
    //     choice3: 'Son Gohan',
    //     choice4: 'Kuririn',
    //     answer: 3,
    // },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText = `Pergunta ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(
        Math.random() * availableQuestions.length,
    );
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();
