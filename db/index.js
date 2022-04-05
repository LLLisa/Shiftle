import mainList from './data';

class bigTree {
  constructor(value) {
    this.value = value;
  }

  setup(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] !== this.value) {
        this[i] = new bigTree(array[i]);
      }
    }
  }
}

const init = (array) => {
  const tree = new bigTree(array[0]);
  tree.setup(array);
  for (let key in tree) {
    console.log(tree[key]);
    if (key !== 'value') tree[key].setup(array);
  }
  return tree;
};

init(mainList);

const testDisplay = [mainList[0]];

export default testDisplay;
