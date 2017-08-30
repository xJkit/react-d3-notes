export const f2e = {
  name: 'f2e',
  children: [
    { name: 'react', isLeaf: false },
    { name: 'vue', isLeaf: false },
    { name: 'd3', isLeaf: false },
    { name: 'design', isLeaf: false },
  ],
  isLeaf: false,
};

export const react = {
  name: 'react',
  children: [
    { name: 'redux', isLeaf: false },
    { name: 'mobx', isLeaf: true },
    { name: 'react-router', isLeaf: true },
  ],
  isLeaf: false,
};

export const vue = {
  name: 'vue',
  isLeaf: false,
  children: [
    { name: 'vuex', isLeaf: true },
    { name: 'vue-router', isLeaf: true },
  ],
};

export const d3 = {
  name: 'd3',
  isLeaf: false,
  children: [
    { name: 'd3-scale', isLeaf: true },
    { name: 'd3-color', isLeaf: true },
    { name: 'd3-hierarchy', isLeaf: true },
    { name: 'd3-force', isLeaf: true },
  ],
};

export const design = {
  name: 'design',
  isLeaf: false,
  children: [
    { name: 'ant-design', isLeaf: true },
    { name: 'material-design', isLeaf: true },
    { name: 'bootstrap', isLeaf: true },
    { name: 'foundation', isLeaf: true },
  ],
};

export const redux = {
  name: 'redux',
  isLeaf: false,
  children: [
    { name: 'redux-saga', isLeaf: true },
    { name: 'redux-observable', isLeaf: true },
    { name: 'redux-router', isLeaf: true },
    { name: 'redux-form', isLeaf: true },
  ],
};
