import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';


class App extends Component {

  state = {
    manageraddress:'',
    players:[],
    balance:'',
    value:'',
    message:''
  }

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address)
    this.setState({manageraddress:manager,players,balance});
  }

  onSubmit = async event =>{
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({message:'等待交易完成……'});

    await lottery.methods.enter().send({from:accounts[0],value:web3.utils.toWei(this.state.value,'ether')});
    this.setState({message:'入场成功……'});
  }

  onClick = async() =>{
    const accounts = await web3.eth.getAccounts();
    this.setState({message:'等待输赢判断……'});

    await lottery.methods.pickwiner().send({from:accounts[0]});
    this.setState({message:'开奖完成'});
  }

  render() {

    console.log(web3.version);
    console.log(this.state.value);
    return (
      <div className='App'>
      <header>
     <img src={require('./top.png')} alt="" align="center" />
      </header>

      <a className='App-link'>
      <h2>lottery管理者地址：</h2>
      <p>This is manager by {this.state.manageraddress}</p>
      <p>当前参与者数量： {this.state.players.length}</p>
      <p>当前资金池： {web3.utils.fromWei(this.state.balance,'ether')}</p>
      <hr/>


      <form onSubmit = {this.onSubmit}>
        <h3>参与到博彩项目？</h3>
        <div>
          <label>你想参与的金额：</label>
          <input
              value = {this.state.value}
              onChange = {event => {this.setState({value:event.target.value})}}
          />
        </div>
        <button>提交</button>
      </form>

      <hr/>
      <h3>判断输赢</h3>
      <button onClick = {this.onClick}>开始判断</button>
      <p>{this.state.message}</p>

      <h6>抵制不良游戏，拒绝盗版游戏。
      注意自我保护，谨防受骗上当。
      适度游戏益脑，沉迷游戏伤身。
      合理安排时间，享受健康生活。</h6>
      </a>
      </div>

    );
  }
}



export default App;
