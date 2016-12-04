var redux = require('redux');
var axios = require('axios');

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

// Name reducer and action generators
// ----------------------
var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
    return action.name;
    default :
      return state;
  }
};

var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  }
};

// Hobbie reducer and action generators
// ----------------------
var nextHobbyId =1;
var hobbiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      return [
          ...state,
          {
            id: nextHobbyId++,
            hobby: action.hobby
          }
        ];
    case 'REMOVE_HOBBY':
      return state.filter((hobby) => hobby.id !== action.id);
    default :
      return state;
  }
};

var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  }
};

var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
};

// Movies reducer and action generators
// ----------------------
var nextMovieId =1;
var moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
          ...state,
          {
            id: nextMovieId++,
            title: action.title,
            genre: action.genre
          }
        ];
    case 'REMOVE_MOVIE':
      return state.filter((movie) => movie.id !== action.id);
    default :
      return state;
  }
};

var addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title,
    genre
  }
};

var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  }
};

// Map reducer and action generators
// ----------------------
var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
  switch (action.type) {
    case 'START_LOCATION_FETCH':
      return {
        isFetching: true,
        url: undefined
      };
    case 'COMPLETE_LOCATION_FETCH':
      return {
        isFetching: false,
        url: action.url
      };
    default:
      return state;
  }
};

var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  }
};

var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  }
};

var fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then(function (res) {
    var loc = res.data.loc;
    var baseUrl = 'https://maps.google.com?q=';

    store.dispatch(completeLocationFetch(baseUrl + loc));
  });
};

// Combined reducers
var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer,
  map: mapReducer
});

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

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

fetchLocation();

store.dispatch(changeName('Martin'));
store.dispatch(addHobby('Running'));
// store.dispatch({
//   type: 'ADD_HOBBY',
//   hobby: 'Running'
// });

store.dispatch(addHobby('Walking'));
store.dispatch(removeHobby(2));
// store.dispatch({
//   type: 'REMOVE_HOBBY',
//   id: 2
// });

store.dispatch(addMovie('Spider-man','Action'));
store.dispatch(addMovie('Mad Max','Action'));
store.dispatch(removeMovie(2));
store.dispatch(changeName('Julie'));
