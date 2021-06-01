'use strict';
let Trip=function(name, place,transport){
    this.name=name;
    this.place=place;
    this.transport=transport;
    Trip.all.push(this);
};
Trip.all=[];

let form = document.getElementById('form')

Trip.prototype.addToLocalStorage=function(){
    localStorage.setItem('trip', JSON.stringify(Trip.all));
};

let submit=function(event){
    event.preventDefault();
    
    let name=event.target.name.value;
    let place=event.target.place.value;
    let transport=event.target.transport.value;

    let trip;
trip = new Trip (name,place,transport);
    trip.addToLocalStorage();
    
    
    ResultRender();
    form.reset(); //buld in function
};

let ResultRender =function(){
    Trip.all=JSON.parse(localStorage.getItem('trip'));
    for (let index = 0; index < Trip.all.length; index++) {
        let Result= document.createElement('p')
        let Result1=document.createElement('p');


        let PlaceName=document.createElement('p');
        PlaceName.textContent=`'Place Name:' + ${Trip.all[index].name}`;
        Result1.appendChild(PlaceName);
        
        let TripPlace=document.createElement('p');
        TripPlace.textContent=`'Trip place: '  + ${Trip.all[index].place}`;
        Result1.appendChild(TripPlace);
        
        
        let TypeOfTransport=document.createElement('p');
        TypeOfTransport.textContent=`'Type Of Transport : ' + ${Trip.all[index].transport}`;
        Result1.appendChild(TypeOfTransport);

        Result.appendChild(Result1);

    };
    ResultRender();
}

form.addEventListener('submit', submit);
