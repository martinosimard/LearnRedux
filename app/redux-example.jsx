var redux = require('redux');

console.log('Starting redux example');

//// Pure function
//// 1- Same output with the same input
//// 2- No side effect : Do not update uting
//// Do not update externam variable
//// Do not use an external variable
//// 3- Avoid promesses and async call. Should be synchronized
//function add(a, b) {
//  return a + b;
//}

//// Not a pure function because that need an external variable
//var a = 3;
//function add (b) {
//  return a + b;
//}

//// Not a pure function because that update a external variable
//var result;
//function add (a, b) {
//  result = a + b;
//  return result;
//}

//// Not a pure function because that depend on a value
//// that we can't know before calling the function
//// Always a different value in return
//function add (a, b) {
//  return a + b + new Date().getSeconds();
//}


//function changeProp(obj) {
//  // Here we copy into a new object
//  return {
//    ...obj,
//    name: 'Julie'
//  };
//  // Here we change the existing object
//  // return obj;
//  // obj.name = 'Julie';
//}

//var startingValue = {
//  name: 'Martin',
//  age: 37
//};

//var res = changeProp(startingValue);
//console.log(startingValue);
//console.log(res);

// 1- Reducer must have a default satate
// 2- Te reducer function must always return a state
var reducer = (state = {name : 'Anonymous'}, action) => {
  //state = state || {name : 'Anonymous'};

  return state;
};

var store = redux.createStore(reducer);

var currentState = store.getState();
console.log('currenState', currentState);
