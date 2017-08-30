# React + D3

Please note that this project is not [react-d3](https://github.com/esbullington/react-d3). Instead, this project is focused on combining most popular UI library `React` and `D3` for rendering different type of charts. Rather than `<script>` tag from the html page when using D3, I choose `npm` and `webpack`.

使用 React + D3(v4.x) 有幾個地方是需要注意的：

* 把 D3 render function 寫在 `componentDidMount` 跟 `componentDidUpdate`
* React 負責資料存放， D3 負責 SVG 內部的畫面渲染
* 資料更新步驟:
  1. 新資料從 componentWillReceiveProps 進來, 或是按鈕點擊事件發動
  1. setState 改變資料
  1. React 畫面更新： render
  1. D3 在 componentDidUpdate 的時候開始自己的渲染（此時 state 上的資料已經是最新狀態）
  1. 注意: 一開始的 D3 應該在 componentDidMount 的時候畫畫

## TODO

- [x] BarChart
- [x] Force-directed Graph