import { mainList } from './data';

class TrieNode {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.endOfWord = false;
    this.children = {};
  }

  trieFill(data) {
    for (let i = 0; i < data.length; i++) {
      this.insert(data[i]);
    }
  }

  insert(word) {
    let node = this;
    for (let i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) {
        node.children[word[i]] = new TrieNode(word[i]);
        node.children[word[i]].parent = node;
      }
      node = node.children[word[i]];
      if (i === word.length - 1) {
        node.endOfWord = true;
      }
    }
  }

  deleteNode(node) {
    if (!node) return;
    if (node.parent) {
      const parentNode = node.parent;
      delete parentNode.children[node.value];
      if (!Object.keys(parentNode.children).length) this.deleteNode(parentNode);
    }
  }

  containsPrefix(prefix) {
    // prefix = prefix.toUpperCase();
    let currentNode = this;
    for (let i = 0; i < prefix.length; i++) {
      if (!currentNode.children[prefix[i]]) {
        return false;
      }
      currentNode = currentNode.children[prefix[i]];
    }
    return true;
  }

  //reconstruct full list from trie
  report(temp = '', result = []) {
    if (this.value) temp += this.value;
    if (this.endOfWord) result.push(temp);
    else {
      for (const key in this.children) {
        this.children[key].report(temp, result);
      }
    }
    return result;
  }

  reportAndScrub(temp = '', result = []) {
    if (this.value) temp += this.value;
    if (this.endOfWord) {
      result.push(temp);
      this.deleteNode(this);
    } else {
      for (const key in this.children) {
        this.children[key].reportAndScrub(temp, result);
      }
    }
    return result;
  }
  /*
  start with first word down
  pair it with next word down
  find `${firstWord[0]}${secondWord[0]} in trie
  if not found, baleet second word
  if found, , move to [1], [2], etc
  if all found, add 3rd word down and repeat
  */

  report1(word = '') {
    if (this.value) word += this.value;
    if (this.endOfWord) {
      this.deleteNode(this);
      return word;
    }
    const next = this.children[Object.keys(this.children)[0]];
    if (!next) return;
    return next.report1(word);
  }
}

const trie = new TrieNode();
trie.trieFill(mainList);

const compareAll = () => {
  const word1 = trie.report1();
  const word2 = trie.report1();
};

const compare5 = (wordArray) => {
  for (let i = 0; i < 5; i++) {
    if (
      !trie.containsPrefix(
        `${wordArray
          .map((word) => {
            return word[i];
          })
          .join('')}`
      )
    ) {
      return false;
    }
  }
  return true;
};

console.log(compare5(['ABATE', 'TONAL']));

// console.log(trie.report());

export default trie;
