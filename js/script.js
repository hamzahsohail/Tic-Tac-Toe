let toggle = true;
let nOP = document.querySelector("#player-selector :nth-child(1)");
let player = document.querySelector("#player-selector :nth-child(2)");

let gameBoard = document.getElementById("tic-tac-toe-box");
let progress = document.getElementById("progress");

let targetBox = document.getElementsByClassName("box");
let turnDisplay = document.getElementById("turn-display");

let tbArray = [];

let isWin = false;

Array.from(targetBox).forEach((element) =>
{
    tbArray.push(element.getAttribute("id"));
});

function shuffle(tbArray)
{
    let shuffledArray = [];
    let usedIndexes = [];

    let i = 0;
    while (i < tbArray.length)
    {
        let randomNumber = Math.floor(Math.random() * tbArray.length);
        if (!usedIndexes.includes(randomNumber))
        {
            shuffledArray.push(tbArray[randomNumber]);
            usedIndexes.push(randomNumber);
            i++
        }
    }
    return shuffledArray;
}

function computer(arr)
{
    checkWin()

    if (tbArray.length != 0)
    {
        if (isWin == false)
        {
            turnDisplay.innerHTML = "O turn";
            document.getElementById(arr[0]).innerHTML = "O"
            arr.shift();
            turnDisplay.innerHTML = "X turn"

            checkWin()

            if (isWin == true)
            {
                toggle = false;
                setTimeout(() =>
                {
                    playerfunc(targetBox)
                }, 1000);
            }
        }
        else
        {
            toggle = false;
            setTimeout(() =>
            {
                playerfunc(targetBox)
            }, 1000);
        }
    }
    else
    {
        if (isWin == false)
        {
            turnDisplay.innerHTML = "Draw"
        }

        toggle = false;
        setTimeout(() =>
        {
            playerfunc(targetBox)
        }, 1000);
    }
}

function checkWin()
{
    let wins = 
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    wins.forEach(element =>
    {
        if((targetBox[element[0]].innerHTML === targetBox[element[1]].innerHTML) && (targetBox[element[1]].innerHTML === targetBox[element[2]].innerHTML) && (targetBox[element[0]].innerHTML !== ""))
        {
            turnDisplay.innerHTML = targetBox[element[0]].innerHTML + " wins"
            tbArray.length = 0;
            isWin = true;

            Array.from(targetBox).forEach((element) =>
            {
                element.classList.add("grayed-out");
            });

            targetBox[element[0]].classList.add("highlight");
            targetBox[element[1]].classList.add("highlight");
            targetBox[element[2]].classList.add("highlight");
        }
    });
}

function oneplayerfunc(e)
{
    e.target.innerHTML = "X";

    checkWin()

    tbArray.splice(tbArray.indexOf(e.target.getAttribute("id")), 1);

    let shuffledArray = shuffle(tbArray);
    tbArray = shuffledArray;

    setTimeout(() =>
    {
        computer(tbArray);
    }, 500);
}

function twoplayerfunc()
{
    // Under Construction
}

function playerfunc(targetBox)
{
    Array.from(targetBox).forEach((element) =>
    {
        element.classList.remove("grayed-out");
        element.classList.remove("highlight");
    });
    
    isWin = false
    toggle = !toggle;
    if (toggle == true)
    {
        nOP.innerHTML = "1P";
        player.firstElementChild.classList.remove("fa-dice-two");
        player.firstElementChild.classList.add("fa-dice-one");

        gameBoard.classList.remove("none");
        gameBoard.classList.add("grid");

        progress.classList.remove("flex");
        progress.classList.add("none");
        
        turnDisplay.classList.remove("none")
    }
    else
    {
        nOP.innerHTML = "2P";
        player.firstElementChild.classList.remove("fa-dice-one");
        player.firstElementChild.classList.add("fa-dice-two");

        gameBoard.classList.remove("grid");
        gameBoard.classList.add("none");

        progress.classList.remove("none");
        progress.classList.add("flex");

        turnDisplay.classList.add("none")
    }
    
    Array.from(targetBox).forEach((element) =>
    {
        element.innerHTML = "";
    });

    turnDisplay.innerHTML = "X turn";

    tbArray.length = 0;
    Array.from(targetBox).forEach((element) =>
    {
        tbArray.push(element.getAttribute("id"));
    });
}

Array.from(targetBox).forEach((element) =>
{
    element.addEventListener("click", (e) =>
    {
        if (toggle == true)
        {
            oneplayerfunc(e);
        }
        else
        {
            console.log("two player");
            // twoplayerfunc()
        }
    });
});