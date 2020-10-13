let badWords = ['fuck', 'dick', 'bitch', 'hore', 'shit', 'slut', 'hooker', 'butt', 'asshole'];
let regex = new RegExp(badWords.join('|'), 'gim');
function AntiBadWords(){
  setInterval(function () {
    replaceText(document.body)
  }, 1000)
}

function replaceText(element) {
  if (element.hasChildNodes()) {
    element.childNodes.forEach(replaceText)
  } else if (element.nodeType === Text.TEXT_NODE) {
    if (element.textContent.match(regex)) {
      const newElement = document.createElement('span');
      newElement.innerHTML = element.textContent.replace(regex, '<b class="bad-word">*@*#$*!</b>')
      element.replaceWith(newElement)
    }
  } else if (element.nodeType === 1) {
    if (element.textContent.match(regex)) {
      element.textContent = element.textContent.replace(regex, '*@*#$*!')
    }
  }
}

AntiBadWords();
