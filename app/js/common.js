//РАЗДЕЛ ЗАДАНИЯ ПРОТОТИПА
function City(cityItem,wrapper) {
  this.wrapper = document.getElementById(wrapper);
  cityItem.forEach(function(item,i) {
  var memorial = new Memorial(item);
  var li = memorial.makeItem(wrapper);
  });
  this.buttons = document.querySelectorAll(".ss-icon");
  this.angle = 0;
};
City.prototype.styles = function() {
  var self = this;
  var list = this.wrapper.children;
  var Ztranslate = (list[0].clientWidth/2) * Math.tan((90-(180/list.length))/57.2958);
  list.forEach = Array.prototype.forEach;
  this.wrapper.setAttribute("style", "transform-origin: 50% 50% -"  + Ztranslate + "px;");
  list.forEach(function(item,i) {
  var smallButtons = item.querySelector('.points').children;
  smallButtons.forEach = Array.prototype.forEach;
  item.setAttribute("style", "transform: rotateY(" + (360/list.length)*i + "deg); transform-origin: 50% 50% -"  + Ztranslate + "px;");
  var photos = item.querySelector('.photos');
  var Ztranslate2 =  (photos.children[0].clientHeight/2) * Math.tan((90-(180/photos.children.length))/57.2958); 
  photos.setAttribute("style", "transform-origin: 50% 50% -"  + Ztranslate2 + "px;");
  photos.children.forEach = Array.prototype.forEach;
  photos.children.forEach(function(it,j) {
    
  it.style.transform =  "rotateX(" + (360/photos.children.length)*j + "deg)"; 
  it.style.transformOrigin = "50% 50% -"  + Ztranslate2 + "px";
  /*
    it.setAttribute("style", "transform: rotateX(" + (360/photos.children.length)*j + "deg); transform-origin: 50% 50% -"  + Ztranslate2 + "px;");
    */
  }); 
    
    
function goTo(obj,direction,numb) {
  if (direction) {
    obj.forEach(function(item,i) {
      
    });
  }
}
  
  

    var ang = 0;
  photos.addEventListener('mousedown', function(e) {
  var y = e.pageY;
  
    photos.onmouseup = function(q) {
    if (q.pageY - y > 50) {
      ang -= (360/photos.children.length) + 0.001; 
      
  } else if (y - q.pageY  > 50) {
    ang += (360/photos.children.length) - 0.001; 
    
  }  
    smallButtons.forEach(function(button) {
      button.removeAttribute('checked');
    });
    var coef = Math.abs((Math.round(ang) %360))/(360/smallButtons.length)
    smallButtons[coef].setAttribute('checked','checked');
    photos.style.transform = "rotateX(" + ang + "deg)"; 
  }
  });


  
  smallButtons.forEach(function(q,w) {
    q.addEventListener('click',function() {
      photos.style.transform = "rotateX(" + (360/smallButtons.length)*w + "deg)";
      ang = (360/smallButtons.length)*2;
    });
  });
   /*
  photos.addEventListener('mouseup', function(e) {
    var y = e.pageY;
    console.log(y);
  
  });
  */ 

  }); 

  var angle = 0;
  var width = 540;
  function galleryspin(sign) { 
  if (!sign) { angle += 360/list.length; } else { angle -=360/list.length; }
  self.wrapper.setAttribute("style","-webkit-transform: rotateY("+ angle +"deg) translatex(20%); -moz-transform: rotateY("+ angle +"deg) translatex(20%); transform: rotateY("+ angle +"deg) translatex(20%); transform-origin: 50% 50% -"  + Ztranslate + "px;");
  
  }
  this.buttons[0].addEventListener('click', function() {galleryspin(0)});
  this.buttons[1].addEventListener('click', function() {galleryspin(1)});
};
City.prototype.makingElementsAndClasses = function() {
  var args = arguments[0];
  var result = document.createElement(args['element']);
  if (args['classes']) {
    args['classes'].forEach(function(item,i) {
      result.classList.add(item);
    });
  } if (args['attributes']) {
    for (var value in args['attributes']) {
      result.setAttribute(value, args['attributes'][value]);
    }
    } if (args['content']) {
    result.appendChild(document.createTextNode(args['content']));
  }
  return result;
};
/*!!!создает добавляет сразу элемент с классами, айди, атрибутами и контентом!!!

this.makingElementsAndClasses({element:'...',classes:['...'],attributes:{...},content:'...'});

*/

function Memorial(params) {
  this.name = params['memorialName'];
  this.description = params['memorialDescription'];
  this.photos = params['memorialPhotos'];
  this.id = params['memorialId'];
}
Memorial.prototype = Object.create(City.prototype);
Memorial.prototype.constructor = Memorial;
Memorial.prototype.makeItem = function(item) {
  var propperPlace = document.getElementById(item);
  var li = this.makingElementsAndClasses({element:'li'});
   var self= this;
  var article = this.makingElementsAndClasses({element:'article'});
  var header = document.createElement('header');
  header.appendChild(this.makingElementsAndClasses({element:'h3',content:this.name}));
  article.appendChild(header);
  var section = this.makingElementsAndClasses({element:'section',classes:['description'],attributes:{'data-check':'0'}});
  section.addEventListener('click', function() {
  var dataSet = this.getAttribute('data-check');  
    if (dataSet == 0) {
      this.style.height = "12rem";
      this.setAttribute('data-check', 1);
    } else  {
      this.style.height = "2rem";
      this.setAttribute('data-check', 0);
    }
  });
  var header = document.createElement('header');
  section.appendChild(header).appendChild(this.makingElementsAndClasses({element:'h4',content:'Описание:'}));
  section.appendChild(this.makingElementsAndClasses({element:'p',content:this.description}));
  article.appendChild(section);
  var photos = this.makingElementsAndClasses({element:'section',classes:['photos']});
  var points = this.makingElementsAndClasses({element:'ul',classes:['points']});
 
  this.photos.forEach(function(it,i) {
    var item = self.makingElementsAndClasses({element:'div'});
    item.style.backgroundImage = 'url('+ it +')';
    photos.appendChild(item);
    var input = self.makingElementsAndClasses({element:'input',attributes: {type: 'radio', id: self.id + i, name: self.id}});
    if (!i) input.setAttribute('checked', 'checked');
    points.appendChild(input);
    var label = self.makingElementsAndClasses({element:'label',attributes: {for:self.id + i}});
    points.appendChild(label);
  });
  article.appendChild(points);  
  article.appendChild(photos);     
      
  li.appendChild(article);    
  
  propperPlace.appendChild(li);
}

var city = new City(databaseArray[0]['cityContent'],'spinner');
city.styles();
window.addEventListener('resize',function() {
  city.styles();
});

var answers = document.querySelector('.answers_list button');
var ul = document.querySelector('.answers_list ul');
answers.addEventListener('click',function() {
  if (!ul.classList.contains('opened')) {
    ul.classList.add('opened');
  } else {
    ul.classList.remove('opened');
  }
});

