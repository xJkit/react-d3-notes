import React, { Component } from 'react';
import styled from 'styled-components';

const HomeBlock = styled.div`
  > .info {
    text-align: center;

    > ol {
      width: 400px;
      display: block;
      margin: 0 auto;
      text-align: left;
      padding-left: 32px;
      list-style-type: circle;
    }
  }
`;

class Home extends Component {
  render() {
    return (
      <HomeBlock>
        <h1>React + D3</h1>
        <div className="info">
          <ol>
            <li>把 D3 render function 寫在 componentDidMount 跟 componentDidUpdate</li>
            <li>React 負責資料存放， D3 負責 SVG 內部的畫面渲染</li>
            <li>
              <p>資料更新步驟:</p>
              <ol>
                <li>新資料從 componentWillReceiveProps 進來, 或是按鈕點擊事件發動</li>
                <li>setState 改變資料</li>
                <li>React 畫面更新： render</li>
                <li>D3 在 componentDidUpdate 的時候開始自己的渲染（此時 state 上的資料已經是最新狀態）</li>
                <li>注意: 一開始的 D3 應該在 componentDidMount 的時候畫畫</li>
              </ol>
            </li>
          </ol>
        </div>
      </HomeBlock>
    );
  }
}

export default Home;