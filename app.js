'use strict';

let Trip = function (name,place, transport) {
  this.name = name;
  this.place = place;
  this.transport = transport;
  this.img=`${place}.png`
  Trip.all.push(this);
};
Trip.all = [];

// DOM Elements
let form = document.getElementById('form');
let result = document.getElementById('result');




Trip.prototype.addTolocalStorage = function () {
  localStorage.setItem('trips', JSON.stringify(Trip.all));
};

// //Event listners functions decleration
let Submit = function (event) {
  event.preventDefault();
  let name = event.target.name.value;
  let place=event.target.place.value;
  let transport = event.target.transport.value;

  let trip = new Trip(name,place, transport);
  trip.addTolocalStorage();
  
  ResultRender();
  form.reset();
};

let REMOVE = function (event) {
  if (event.target.matches('.remove')) {
    Trip.all.splice(event.target.id, 1);
    if (Trip.all.lengp !== 0) {
      localStorage.setItem('trips', JSON.stringify(Trip.all));
      ResultRender();
    } else {
      localStorage.removeItem('trips');
      ResultRender();
    }

  }
};


let ResultRender = function () {
  if (localStorage.Trip) {
    Trip.all = JSON.parse(localStorage.getItem('trips'));}
  // } else {
  //   Trip.all=[];
  // }
  result.innerHTML = '';


  let div = document.createElement('div');
  for (let index = 0; index < Trip.all.length; index++) {


    let img=document.createElement('img');
    img.src=Trip.all[index].img;
    div.appendChild(img);

    let placeName = document.createElement('p');
    placeName.textContent = `place name : ${Trip.all[index].name}`;
    div.appendChild(placeName);

    let place = document.createElement('p');
    place.textContent = `Trip place : ${Trip.all[index].place}`;
    div.appendChild(place);


    let transport = document.createElement('p');
    transport.textContent = `Type of transport: ${Trip.all[index].transport}`;
    div.appendChild(transport);

   

    let remove = document.createElement('p');
    remove.innerHTML = `Remove : <span class="remove" id="${index}">X</span>`;
    div.appendChild(remove);

   let HR = document.createElement('hr');
   div.appendChild(HR);
  }

  result.appendChild(div);

};
ResultRender();


// Event Listners

form.addEventListener('submit', Submit);
result.addEventListener('click', REMOVE);
