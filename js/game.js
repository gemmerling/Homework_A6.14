const numDivs = 36;
const maxHits = 10;

let hits = 0;
let miss = 0;
let firstHitTime = 0;

function clearRound() {
  // Очищаем игровое поле от цветных пометок и текста
   $(".game-field").removeClass("target");
   $(".game-field").removeClass("miss");
   $(".game-field").text("");
}

function round() {
  // СДЕЛАНО - FIXME: надо бы убрать "target" прежде чем искать новый
  // СДЕЛАНО - FIXME: убирать текст со старых таргетов. Кажется есть .text?
  clearRound();

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  //СДЕЛАНО - TODO: помечать target текущим номером
  $(divSelector).text(hits + 1);  
  // СДЕЛАНО - FIXME: тут надо определять при первом клике firstHitTime
  if (hits === 0) {
    firstHitTime = getTimestamp();
  }
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // СДЕЛАНО - FIXME: спрятать игровое поле сначала
  $(".game-field").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-time-missed").text(miss);
  $("#win-message").removeClass("d-none");
  $("#button-start").addClass("d-none");
  $("#button-reload").click(function () {
    location.reload();
  });
}

  
function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  // СДЕЛАНО - TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  } else {
    $(event.target).addClass("miss");
    miss = miss + 1;
  }
}
  
function startGame() {
  round();
  $("#button-start").hide();
  $(".game-field").click(handleClick);
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-start").click(function () {
        // location.reload();
        startGame();
  }) 
}

$(document).ready(init);
