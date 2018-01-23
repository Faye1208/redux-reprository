/* 简版redux */

// 发布订阅机制

// 添加第二个参数
export function createStore (reducer, enhancer) {
    if (enhancer) {
        return enhancer(createStore)(reducer);
    }
    // 当前的状态
    let currentState = {};
    // 监听函数
    let currentListener = [];

    // 读取当前的状态
    function getState () {
        return currentState;
    }

    // 订阅功能，添加监听函数
    function subscribe (listener) {
        currentListener.push(listener);
    }

    // 事件派发功能
    function dispatch (action) {
        currentState = reducer(currentState, action);
        currentListener.forEach(v => v());
        return action;
    }

    // 获取一个初始的state,让reducer命中default时的state
    dispatch({type: '@FAYE/SELF-REDUX'});

    return {getState, subscribe, dispatch}
}

// 中间件函数
export function applyMiddleware (middleware) {
    // ...args:获取所有的参数，并以数组的形式存在
    return createStore => (...args) => {
        const store = createStore(...args);
        let dispatch = store.dispatch;

        const midApi = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        }

        // 只有一个中间件的情况下
        dispatch = middleware(midApi)(store.dispatch);
        // middleware(midApi)(store.dispatch)(action)

        return {
            ...store,
            dispatch
        }
    }
}

function bindActionCreator (creator, dispatch) {
    return (...args) => dispatch(creator(...args))
}

// 派发事件函数
export function bindActionCreators (creators, dispatch) {
    // 功能实现方法一:
    // let bound = {};
    // Object.keys(creators).forEach(v => {
    //     let creator = creators[v];
    //     bound[v] = bindActionCreator(creator, dispatch);
    // });
    // return bound;

    // 功能实现方法二:
    return Object.keys(creators).reduce((ret, item) => {
        ret[item] = bindActionCreator(creators[item], dispatch);
        return ret;
    }, {});
}