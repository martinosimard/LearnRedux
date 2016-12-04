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
// var stateDefault = {
//   name : 'Anonymous',
//   hobbies: [],
//   movies: []
// };



// var oldReducer = (state = stateDefault, action) => {
//   //state = state || {name : 'Anonymous'};
//
//   switch (action.type) {
//     case 'CHANGE_NAME':
//         return {
//           ...state,
//           name: action.name
//         };
//     case 'ADD_HOBBY':
//         return {
//           ...state,
//           hobbies: [
//             ...state.hobbies,
//             {
//               id: nextHobbyId++,
//               hobby: action.hobby
//             }
//           ]
//         };
//       case 'REMOVE_HOBBY':
//           return {
//             ...state,
//             hobbies: state.hobbies.filter((hobby) => hobby.id !== action.id)
//           };
//       case 'ADD_MOVIE':
//           return {
//             ...state,
//             movies: [
//               ...state.movies,
//               {
//                 id: nextMovieId++,
//                 title: action.title,
//                 genre: action.genre,
//               }
//             ]
//           };
//       case 'REMOVE_MOVIE':
//           return {
//             ...state,
//             movies: state.hobbies.filter((movie) => movie.id !== action.id)
//           };
//     default:
//       return state;
//   }
// };

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();

// Subscribe to changes
var unsubscribe = store.subscribe(() => {
  var state = store.getState();
  console.log('New state', store.getState());

  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = '<a href="' + state.map.url +'" target="_blank">View you location</a>';
  }
});
//unsubscribe();

store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeName('Martin'));
store.dispatch(actions.addHobby('Running'));
// store.dispatch({
//   type: 'ADD_HOBBY',
//   hobby: 'Running'
// });

store.dispatch(actions.addHobby('Walking'));
store.dispatch(actions.removeHobby(2));
// store.dispatch({
//   type: 'REMOVE_HOBBY',
//   id: 2
// });

store.dispatch(actions.addMovie('Spider-man','Action'));
store.dispatch(actions.addMovie('Mad Max','Action'));
store.dispatch(actions.removeMovie(2));
store.dispatch(actions.changeName('Julie'));
