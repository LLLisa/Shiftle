import { mainList } from './data';

class TrieNode {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.endOfWord = false;
    this.children = {};
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
    const parentNode = node.parent;
    delete parentNode.children[node.value];
    if (!Object.keys(parentNode.children).length) this.deleteNode(parentNode);
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

  report5(temp = '', result = []) {
    if (this.value) temp += this.value;
    if (this.endOfWord) result.push(temp);
    if (result.length === 5) return result;
    else {
      for (const key in this.children) {
        this.children[key].report5(temp, result);
      }
    }
    return result;
  }
}

const trieFill = (trie, data) => {
  for (let i = 0; i < data.length; i++) {
    trie.insert(data[i]);
  }
};

const trie = new TrieNode();

trieFill(trie, mainList);
console.log(trie.report());
trie.deleteNode(trie.children['A'].children['B']);
console.log(trie.report());

export default trie;
