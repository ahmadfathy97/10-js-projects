let badWords = ['fuck', 'dick', 'bitch', 'hore', 'shit', 'slut', 'hooker', 'butt ', 'asshole'];
let regex = new RegExp(badWords.join('|'), 'gim');
function AntiBadWords(){
  setInterval(function () {
    replaceText(document.body)
  }, 1000)
}

function replaceText(element) {
  if (element.hasChildNodes()) {
    element.childNodes.forEach(replaceText)
  } else if (element.tagName === "TEXTAREA" || element.tagName === "INPUT") {
    if (element.value.match(regex)) {
      element.value = element.value.replace(regex, '*@*#$*!')
    }
  } else if (element.nodeType === Text.TEXT_NODE) {
    if (element.textContent.match(regex)) {
      const newElement = document.createElement('span');
      newElement.innerHTML = element.textContent.replace(regex, '<b class="bad-word">*@*#$*!</b>')
      element.replaceWith(newElement)
    }
  }
}

AntiBadWords();
