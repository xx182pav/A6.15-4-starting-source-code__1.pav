const numDivs = 36; //ЧТО ЭТО?
const maxHits = 10; //количество попаданий для окончания игры

let horisontalDivs = 6; //размер игрового поля по горизонтали
let verticalDivs = 6; //размер игрового поля по вертикали


let hits = 0;
let missies = 0;

let firstHitTime = 0;


// FIXME: как вставлять в JS переменную в строку?
const gameFieldDiv1 = '<div class="grid-item game-field" id="slot-'
const gameFieldDiv2 = '"></div>'


//Формируем игровое поле заданной размерности
function buildGameField(x, y) {
  for(let i = 1; i <= x; i++) {
    for(let j = 1; j <= y; j++) {
      $('.gameField').append(gameFieldDiv1 + i + j + gameFieldDiv2);
    }
  }
  $('.grid-wrapper').css('grid-template-columns', 'repeat(' + x + ', 1fr)');
  $('.grid-wrapper').css('grid-template-rows', 'repeat(' + y + ', 1fr)');
  $('.grid-wrapper').css('grid-gap', (3/x)+'vw');
}


function round() {
  let divSelector = randomDivId(horisontalDivs, verticalDivs);
  $(divSelector).addClass("target");
  $(divSelector).html(hits+1); // помечаем target текущим номером

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $('.gameField').addClass('d-none');
  $("#total-time-played").text(totalPlayedSeconds);
  $('#missies').text(missies);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    $(event.target).removeClass("target");
    $(event.target).html("");
    $('.miss').removeClass('miss');
    hits = hits + 1;
    if (hits >= maxHits) {
      endGame();
    }
    else {
      round();
    }
  }
  else {
    $(event.target).addClass("miss"); // Отмечаем если мы промахнулись
    missies++;
  }
  
 
}

function game() {
  horisontalDivs = $('#x').val();
  verticalDivs = $('#y').val();
  buildGameField(horisontalDivs, verticalDivs);
  $("#button-reload").removeClass('d-none')

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });

  round();

}

function init() {
  $("#button-start").click(function() {
    $("#button-start").addClass('d-none');
    $("#game-conditions").addClass('d-none');
    firstHitTime = getTimestamp();
    game()
  });
  

}

$(document).ready(init);
