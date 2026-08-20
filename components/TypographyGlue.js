import { useEffect } from 'react';

const glueWords = [
  'а',
  'без',
  'бы',
  'в',
  'во',
  'да',
  'для',
  'до',
  'же',
  'за',
  'и',
  'из',
  'или',
  'к',
  'ко',
  'ли',
  'на',
  'над',
  'не',
  'ни',
  'но',
  'о',
  'об',
  'от',
  'по',
  'под',
  'при',
  'про',
  'с',
  'со',
  'у',
  'я',
  'ты',
  'он',
  'мы',
  'вы',
  'она',
  'оно',
  'они',
  'меня',
  'тебя',
  'себя',
  'мне',
  'тебе',
  'себе',
  'ему',
  'ей',
  'им',
  'их',
  'нас',
  'нам',
  'вас',
  'вам',
  'нами',
  'вами',
  'ними',
  'моя',
  'мое',
  'мои',
  'твой',
  'твое',
  'твои',
  'свой',
  'свое',
  'свои',
  'этот',
  'эта',
  'это',
  'эти',
  'тот',
  'та',
  'те',
  'кто',
  'что',
  'чей',
  'чья',
  'чье',
  'чьи',
  'все',
  'весь',
  'сам',
  'сама',
  'сами'
];

const glueRegex = new RegExp(`(^|[\\s([{«"„“])(${glueWords.join('|')})\\s+`, 'giu');
const cyrillicRegex = /[А-Яа-яЕе]/;
const ignoredTags = new Set(['CODE', 'KBD', 'PRE', 'SAMP', 'SCRIPT', 'STYLE']);

function glueShortWords(value) {
  if (!cyrillicRegex.test(value)) {
    return value;
  }

  return value.replace(glueRegex, '$1$2\u00A0');
}

function shouldSkipNode(node) {
  const parent = node.parentElement;

  if (!parent) {
    return true;
  }

  return parent.closest([...ignoredTags].join(','));
}

function glueDocumentText() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach((node) => {
    if (shouldSkipNode(node)) {
      return;
    }

    const nextValue = glueShortWords(node.nodeValue);

    if (nextValue !== node.nodeValue) {
      node.nodeValue = nextValue;
    }
  });
}

export default function TypographyGlue({ children }) {
  useEffect(() => {
    glueDocumentText();
  });

  return children;
}
