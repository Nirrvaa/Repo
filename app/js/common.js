var count = 0;
function ChangeWheelInfo(dataBase,answerBase) {
  this.CreateInfo(count);
}
ChangeWheelInfo.prototype.newElement = function(name,classes,attridutes,content) {
  var elem = document.createElement(name);

  classes.forEach(function(item,i) {
    elem.classList.add(item);
  });

  for (var value in attridutes) {
    elem.setAttribute(value, attridutes[value]);
  }

  if (content) {
    if (typeof content == 'string') {
    elem.appendChild(document.createTextNode(content));
    } else if (typeof content == 'object'){
      content.forEach = Array.prototype.forEach;
      content.forEach(function(item,i) {
        elem.appendChild(item);
      });
    } 
  }

  return elem;};
ChangeWheelInfo.prototype.messagesAndSlides = function(content,messageType) {
  var that = this;
  var background = document.querySelector('.background-for-messages');
  background.style.height = document.documentElement.clientHeight + 'px';

  if (!messageType) {
    var cont = content.split('"')[1];
    var photo = document.createElement('img');
    photo.setAttribute('src', cont);
    var width = photo.naturalWidth + 'px';
    var height = photo.naturalHeight + 'px';
    var div = document.createElement('div');
    div.classList.add('big-photo');
    div.style.width = width;
    div.style.height = height;
    div.style.backgroundImage = content;
    
  } else if (messageType == 'confirm') {
    var message = this.newElement('span',[],{},[document.createTextNode('Вы хотитие подтвердить свой выбор: ' + content + '?')]);
    
    var buttonYes = this.newElement('button',[],{},'ДА');
    buttonYes.addEventListener('click',function() {
      count+= 1;
      that.CreateInfo(count);
      
    });
    var buttonNo = this.newElement('button',[],{},'НЕТ');
    var div = this.newElement('div',[],{},[message,buttonYes,buttonNo]);
    div.classList.add('confirm');
  }
  div.addEventListener('click', function() {
    background.classList.remove('activated');
  });
  background.innerHTML = '';
  background.classList.add('activated');
  background.appendChild(div);};
ChangeWheelInfo.prototype.answers = function(answerBase,answerPlace) {
  var that = this;
  var answers = document.querySelector(answerPlace);
  answerBase.forEach(function(item,i) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    li.addEventListener('click',function() {
      that.messagesAndSlides(item,'confirm');
    });
    answers.appendChild(li);
  });};
ChangeWheelInfo.prototype.CreateInfo = function(count) {
  var wrapper = document.getElementById('spinner');
  wrapper.innerHTML = '';
  var wheel = new Wheel(databaseArray[count],'spinner','.ss-icon');
  wheel.styles();
  wheel.events();
}
function Wheel(info,place,buttonsClass) {
  var that = this;
  this.place = document.getElementById(place);
  this.info = info;
  this.buttons = document.querySelectorAll(buttonsClass);
  this.info.forEach(function(item) {
  this.wheelItem = new WheelItem(item);
  
  that.place.appendChild(this.wheelItem.itemEvents(this.wheelItem.makeItem()));
  });
};
Wheel.prototype = Object.create(ChangeWheelInfo.prototype);
Wheel.prototype.constructor = Wheel;
Wheel.prototype.angle = 0;

Wheel.prototype.zTranslate = function(child,parent,orientation) {
  var parameter;
  if (orientation == 'vertical') {
    parameter = child.scrollHeight;
  } else {
    parameter = child.scrollWidth;
  }
  return (parameter/2) * Math.tan((90-(180/parent.length))/57.2958);};

Wheel.prototype.wheelSpin = function(sign) {
  var list = this.place.children;
  if (!sign) { this.angle += 360/list.length; } else { this.angle -=360/list.length;}
  this.place.setAttribute("style","-webkit-transform: rotateX("+ this.angle +"deg) translatex(2.5%); -moz-transform: rotateX("+ this.angle +"deg) translatex(2.5%); transform: rotateX("+ this.angle +"deg) translatex(2.5%); transform-origin: 50% 50% -"  + this.zTranslate(list[0],list,'vertical') + "px;");};
Wheel.prototype.styles = function() {
  var that = this;
  var list = this.place.children;
  list.forEach = Array.prototype.forEach;
  that.place.setAttribute('style', 'transform-origin: 50% 50% -' + that.zTranslate(list[0],list,'vertical') + 'px;');
  list.forEach(function(item,i) {
    that.itemStyles(item);
    item.setAttribute("style", "transform: rotateX(" + (360/list.length)*i + "deg); transform-origin: 50% 50% -"  +  that.zTranslate(list[0],list,'vertical') + "px;");
  });};
Wheel.prototype.itemStyles = function(item){
  var that = this;
  var photos = item.querySelector('.photos');
  var photosChildren = item.querySelectorAll('.photos div');
  var points = item.querySelectorAll('.points div');
  //var description = item.querySelector('.description');

  points[0].classList.add('checked');
  photos.setAttribute('style', 'transform-origin: 50% 50% -' + that.zTranslate(photosChildren[0],photosChildren) + 'px;');
  photosChildren.forEach(function(it,i) {
    it.style.transform =  "rotateY(" + (360/photosChildren.length)*i + "deg)"; 
    it.style.transformOrigin = "50% 50% -"  + that.zTranslate(photosChildren[0],photosChildren) + "px";
  });
  return item;};
Wheel.prototype.events = function() {
  var that = this;
  this.buttons[0].addEventListener('click', function() {that.wheelSpin(1)});
  this.buttons[1].addEventListener('click', function() {that.wheelSpin(0)});};

function WheelItem(params) {
  this.name = params['name'];
  this.description = params['description'];
  this.photos = params['photos'];
  this.id = params['id'];
  this.angle = [0,0];};
WheelItem.prototype = Object.create(Wheel.prototype);
WheelItem.prototype.constructor = WheelItem;
WheelItem.prototype.makeItem = function() {
  var that = this;
  
  var header = this.newElement('header',[],{}, [this.newElement('h3',[],{}, this.name)]);
  
  var h4 = this.newElement('h4',[],{},'Описание:');
  var descriptionHeader = this.newElement('header',[],{}, [h4]);
  var descriptionInfo = this.newElement('p',[],{}, this.description);
  var description = this.newElement('section', ['description'],{'data-check': '0'}, [descriptionHeader,descriptionInfo]);

  var photos = this.newElement('section',['photos'],{});
  var points = this.newElement('nav',['points'],{});

  this.photos.forEach(function(it,i) {
    var item = that.newElement('div',[],{});
    item.style.backgroundImage = 'url('+ it +')';
    photos.appendChild(item);
    points.appendChild(document.createElement('div'));
  });
  var article = this.newElement('article',[],{},[header,description,photos,points]);
   return this.newElement('li',[],{},[article]);};


WheelItem.prototype.itemEvents = function(item) {
  var that = this;
  var photos = item.querySelector('.photos');
  var photosChildren = item.querySelectorAll('.photos div');
  var points = item.querySelectorAll('.points div');
  var description = item.querySelector('.description');
  
  var ang = 0;
  photos.addEventListener('mousedown', function(e) {
  var y = e.pageX;
    photos.onmouseup = function(e) {
      if (e.pageX - y > 50) {
        ang += (360/photosChildren.length) + 0.001; 
      } else if (y - e.pageX  > 50) {
        ang -= (360/photosChildren.length) - 0.001; 
      }
      photos.style.transform = "rotateY(" + ang + "deg)";
      var coef = Math.abs((Math.round(ang) %360))/(360/points.length);
      points.forEach(function(a,s) {
        a.classList.remove('checked');
      });
      points[coef].classList.add('checked');
    };
  
  
  });


  description.addEventListener('click', function() {
    var dataSet = this.getAttribute('data-check');  
    if (dataSet == 0) {
      this.style.height = "12rem";
      this.setAttribute('data-check', 1);
    } else  {
      this.style.height = "2rem";
      this.setAttribute('data-check', 0);
   }
  });

  points.forEach(function(it,i) {
    it.addEventListener('click',function() {
      ang = (360/points.length)*i;
      photos.style.transform = "rotateY(" + ang + "deg)";
        points.forEach(function(a,s) {
        a.classList.remove('checked');
      });
      it.classList.add('checked');
    });

  });

  photosChildren.forEach(function(item,i) {
    item.addEventListener('click', function() {
      var start = new Date();
      item.addEventListener('click', function() {
        if (new Date() - start <= 400) {
          that.messagesAndSlides(item.style.backgroundImage);
        }
      });
    });
  });
    return item;
};


var viktorina = new ChangeWheelInfo(databaseArray,answersArray);
viktorina.answers(answersArray,'.answers_list ul');

