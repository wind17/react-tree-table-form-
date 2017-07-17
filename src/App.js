import React, { Component } from 'react'
import logo from './logo.svg'
import style from './App.css'

class App extends Component {
  render() {
    return (
      <div className={style.app}>
        <div className={style['app-header']}>
          <img src={logo} className={style['app-logo']} alt='logo' />
          <h2>Welcome to React</h2>
        </div>
        <p className={style['app-intro']}>
          To get started, edit <code>src/App.js</code> and save to reload.1111
        </p>
      </div>
    )
  }
}

export default App
