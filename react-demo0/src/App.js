import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            num: 1,
            title: true
        };

        this.handleClickNum = this.handleClickNum.bind(this);
        this.handleClickTitle = this.handleClickTitle.bind(this);
    }

    handleClickNum () {
        this.setState({
            num: this.state.num + 1
        });
    }

    handleClickTitle () {
        this.setState({
            title: !this.state.title
        });
    }

    render () {
        return (
            <div className="App">
                <h2>App, {this.state.num}</h2>
                <button onClick={this.handleClickNum}>btnNum</button>
                <button onClick={this.handleClickTitle}>btnTitle</button>
                <Demo title={this.state.title}/>
            </div>
        );
    }
}

class Demo extends Component {
    // 性能优化
    shouldComponentUpdate (nextProps, nextState) {
        if (nextProps.title === this.props.title) {
            return false;
        }

        return true;
    }

    render () {
        console.log('demo render 执行中');
        return (
            <h2>Hi! {this.props.title ? "Faye" : "Jenny"}</h2>
        );
    }
}

// 当某个组件是根据父组件的某个值来渲染的，即该值没有发生改变这个组件就不渲染，可以使用PureComponent
// class Demo extends React.PureComponent {
//     render () {
//         console.log('demo render 执行中');
//         return (
//             <h2>Hi! {this.props.title ? "Faye" : "Jenny"}</h2>
//         );
//     }
// }


export default App;
