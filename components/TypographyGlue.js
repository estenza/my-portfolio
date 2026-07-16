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
  'у'
];

const glueRegex = new RegExp(`(^|[\\s([{«"„“])(${glueWords.join('|')})\\s+`, 'giu');
const cyrillicRegex = /[А-Яа-яЁё]/;
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
