// QSA ITERATOR

var elements = $('.classname');

for (var i = 0; i < elements.length; i++) {}

function $(el) {
  return document.querySelectorAll(el);
}

//JSON EXCERCISE - DOORWAY TO THE REST API WORLD :D
//json-excercise.html
//
// var pageCounter = 1;
// var animalContainer = document.getElementById('animal-info');
// var btn = document.getElementById('fetchanimals')
//
// btn.addEventListener('click', function(){
//
//     var ourRequest = new XMLHttpRequest();
//     ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
//
//     ourRequest.onload = function(){
//       if (ourRequest.status >= 200 && ourRequest.status < 400){
//         var ourData = JSON.parse(ourRequest.responseText);
//         renderHTML( ourData );
//       } else {
//         console.log("We connected to the server, but encountered an error.")
//
//       }
//
//     }
//
//     ourRequest.onerror = function(){
//       console.log("Connection error, or whichever method you wann do.")
//     }
//
//     ourRequest.send();
//     pageCounter++;
//
//
//   if (pageCounter > 3){
//     btn.style.display = "none";
//   }
//
// })
//
// function renderHTML(data){
//   var htmlString = ""
//
//   for ( i = 0; i < data.length; i++ ){
//     htmlString += '<p>' + data[i].name + ' is a ' + data[i].species + ' that likes to eat ';
//
//     //iterate through likes
//
//     for ( j = 0; j < data[i].foods.likes.length; j++ ){
//       htmlString += data[i].foods.likes[j];
//
//       if (data[i].foods.likes.length == 2 && j == (data[i].foods.likes.length - 2) ){
//         htmlString += ' and  ';
//       }
//     }
//
//     htmlString += ' and dislikes ';
//
//     //iterate through dislikes
//
//     for ( j = 0; j < data[i].foods.dislikes.length; j++ ){
//       htmlString += data[i].foods.dislikes[j];
//
//       if (data[i].foods.dislikes.length == 2 && j == (data[i].foods.dislikes.length - 2) ){
//         htmlString += ' and ';
//       }
//     }
//
//     htmlString += '.</p>';
//   }
//   animalContainer.insertAdjacentHTML('beforeend', htmlString)
// }