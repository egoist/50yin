var correct = 0
var limit = 100
var current_count = 0
var errors = []
var timer = []
var now_timestamp = 0

var chars = {
  aline: ['あ', 'い', 'う', 'え', 'お', 'ア', 'イ', 'ウ', 'エ', 'オ'],
  kaline: ['か', 'き', 'く', 'け', 'こ', 'カ', 'キ', 'ク', 'ケ', 'コ'],
  saline: ['さ', 'し', 'す', 'せ', 'そ', 'サ', 'シ', 'ス', 'セ', 'ソ']
}
var bingo = {
  'あ': 'a',
  'い': 'i',
  'う': 'u',
  'え': 'e',
  'お': 'o',
  'ア': 'a',
  'イ': 'i',
  'ウ': 'u',
  'エ': 'e',
  'オ': 'o',
  'か': 'ka',
  'き': 'ki',
  'く': 'ku',
  'け': 'ke',
  'こ': 'ko',
  'カ': 'ka',
  'キ': 'ki',
  'ク': 'ku',
  'ケ': 'ke',
  'コ': 'ko',
  'さ': 'sa',
  'し': 'shi',
  'す': 'su',
  'せ': 'se',
  'そ': 'so',
  'サ': 'sa',
  'シ': 'shi',
  'ス': 'su',
  'セ': 'se',
  'ソ': 'so'
}

var target = $('.output')

$(function() {

  $('body')
    .on('click', '.choice', function() {
      el = $(this)


      if (current_count >= 100) {
        clockStop()
        return
      } else {
        $('#result').html(correct + 1 + '/100')
      }
      var your_answer = $(this).text()
      if (!your_answer) {
        alert('你必须先回答这道题才能继续!')
        return
      }
      var item = $('#char').html()
      if (bingo[item] == your_answer) {
        correct++
      } else {
        errors.push({
          name: item,
          sound: bingo[item]
        })

      }
      current_count++
      clockStop()
      renderQ(el.data('id'))
    })
})

function render(tpl, data) {
  var template = $('#' + tpl + '-template').html()
  Mustache.parse(template)
  var rendered = Mustache.render(template, data)
  target.html(rendered)
  var newDivs = reorderDivs('.choice')
  $('.choices').html(newDivs)
  
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function renderQ(id) {
  var item = randomItem(chars[id])
  render(id, {
    char_name: item,
    current_count: current_count,
    errors: errors,
    correct: correct,
    wrong: current_count - correct
  })
  clockStart()
}

function reorderDivs(className) {
  var newDivs = []
  var length = $(className).length
  for (var i = 0; i < length; i++) {
    var randomIndex = NumberBetween(0, $(className).length)
    newDivs[newDivs.length] = $(className).eq(randomIndex).clone()
    $(className).eq(randomIndex).remove()
  }
  return newDivs


}

function NumberBetween(start, end) {
  return Math.floor(Math.random() * end) + start
}

function clockStart() {
  var minutes = parseInt(now_timestamp/60)
  var seconds = now_timestamp - minutes*60
  if (minutes.toString().length == 1) {
    minutes = '0' + minutes
  }
  if (seconds.toString().length == 1) {
    seconds = '0' + seconds
  }
  $('.clock').html(minutes + ':'+ seconds)
  now_timestamp++
  timer.push(setTimeout(function() {
    clockStart()
  }, 1000))
}

function clockStop() {
  for (var i in timer) {
    clearTimeout(timer[i]);
  }
  timer = []
}

Q.reg('home', function() {
  render('choose')
})

Q.reg('c', function(line) {
  console.log(line)
  renderQ(line)
})

Q.init({
  index: 'home'
})
