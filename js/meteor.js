class Meteor {
  constructor(x,y,w,h,img, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    this.ydir = 0;
    this.speed = speed;
  }
  show(){
    image(this.img, this.x, this.y, this.w, this.h);
  }

  move(){
    this.ydir += this.speed;
    this.y = this.ydir;
  }
  destroyed(spaceship){
    let meteorLft = this.x,
        meteorRit = this.x + this.w,
        meteorTop = this.y,
        meteorBtm = this.y + this.h;

    let spaceshipLft = spaceship.x ,
        spaceshipRit = spaceship.x + spaceship.w,
        spaceshipTop = spaceship.y,
        spaceshipBtm = spaceship.y + spaceship.h;
    if(meteorRit >= spaceshipLft && meteorLft < spaceshipRit && meteorTop <= spaceshipBtm && meteorBtm > spaceshipTop ){
      return true;
    } else{
      return false;
    }
  }
}
