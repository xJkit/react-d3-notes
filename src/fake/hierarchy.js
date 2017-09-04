export const f2e = {
  name: 'Front End',
  value: 'f2e',
  children: [
    { name: 'React.js', value: 'react', isLeaf: false },
    { name: 'Vue.js', value: 'vue', isLeaf: false },
    { name: 'd3.js', value: 'd3', isLeaf: false },
    { name: 'Design', value: 'design', isLeaf: false },
  ],
  isLeaf: false,
};

export const react = {
  name: 'React.js',
  value: 'react',
  children: [
    { name: 'Redux', value: 'redux', isLeaf: false },
    { name: 'Mobx', value: 'mobx', isLeaf: true },
    { name: 'react-router', value: 'reactRouter', isLeaf: true },
  ],
  isLeaf: false,
};

export const vue = {
  name: 'Vue.js',
  value: 'vue',
  isLeaf: false,
  children: [
    { name: 'Vuex', value: 'vuex', isLeaf: true },
    { name: 'vue-router',  value: 'vueRouter', isLeaf: true },
  ],
};

export const d3 = {
  name: 'd3.js',
  value: 'd3',
  isLeaf: false,
  children: [
    { name: 'd3-scale', value: 'd3Scale', isLeaf: true },
    { name: 'd3-hierarchy', value: 'd3Hierarchy', isLeaf: true },
    { name: 'd3-force', value: 'd3Force', isLeaf: true },
  ],
};

export const design = {
  name: 'Design',
  value: 'design',
  isLeaf: false,
  children: [
    { name: 'ant-design', value: 'antDesign', isLeaf: true },
    { name: 'material-design',  value: 'materialDesign', isLeaf: true },
    { name: 'bootstrap', value: 'bootStrap', isLeaf: true },
  ],
};

export const redux = {
  name: 'Redux',
  value: 'redux',
  isLeaf: false,
  children: [
    { name: 'redux-saga', value: 'reduxSaga', isLeaf: true },
    { name: 'redux-observable',value: 'reduxObservable', isLeaf: true },
    { name: 'redux-form', value: 'reduxForm', isLeaf: true },
  ],
};

export const mobx = {
  name: 'Mobx',
  value: 'mobx',
  isLeaf: true,
};

export const reactRouter = {
  name: 'react-router',
  value: 'reactRouter',
  isLeaf: true,
};

export const vuex = {
  name: 'Vuex',
  value: 'veux',
  isLeaf: true,
};

export const vueRouter = {
  name: 'vue-router',
  value: 'vueRouter',
  isLeaf: true,
};

export const d3Scale = {
  name: 'd3-scale',
  value: 'd3Scale',
  isLeaf: true,
};

export const d3Hierarchy = {
  name: 'd3-hierarchy',
  value: 'd3Hierarchy',
  isLeaf: true,
};

export const d3Force = {
  name: 'd3-force',
  value: 'd3Force',
  isLeaf: true,
};

export const bootStrap = {
  name: 'bootstrap',
  value: 'bootStrap',
  isLeaf: true,
};

export const materialDesign = {
  name: 'material-design',
  value: 'materialDesign',
  isLeaf: true,
};

export const antDesign = {
  name: 'ant-design',
  value: 'antDesign',
  isLeaf: true,
};

export const reduxSaga = {
  name: 'redux-saga',
  value: 'reduxSaga',
  isLeaf: true,
};

export const reduxObservable = {
  name: 'redux-observable',
  value: 'reduxObservable',
  isLeaf: true,
};

export const reduxForm = {
  name: 'redux-form',
  value: 'reduxForm',
  isLeaf: true,
};
