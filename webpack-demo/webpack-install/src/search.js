'use strict';

import React from "react";
import ReactDOM from "react-dom";
import './search.less';
import LOGO from './images/logo.JPG';
import limit10k from './images/limit10k.png';

class Search extends React.Component {

  render () {
    return <div className="search-text"> Search Text 搜索 <img src={LOGO} /><img src={limit10k} /> </div>;
  }
}

ReactDOM.render(
  <Search/>,
  document.getElementById('root')
)