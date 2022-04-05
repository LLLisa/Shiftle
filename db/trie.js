import { mainList } from './data';

class TrieNode {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.endOfWord = false;
    this.children = {};
  }

  contains(word) {
    // word = word.toUpperCase();
    let currentNode = this;
    for (let i = 0; i < word.length; i++) {
      if (!currentNode.children[word[i]]) {
        return false;
      }
      currentNode = currentNode.children[word[i]];
    }
    return true;
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
}

const trieFill = (trie, data) => {
  for (let i = 0; i < data.length; i++) {
    trie.insert(data[i]);
  }
};

const trie = new TrieNode();
trieFill(trie, mainList);

export default trie;
