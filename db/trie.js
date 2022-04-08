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
    // console.log(this);
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
}

const trie = new TrieNode();

trie.trieFill(mainList);
console.log(trie.blocks());

// trie.deleteNode(trie.children['A'].children['B'].children['A']);
// console.log(trie.report());

export default trie;
