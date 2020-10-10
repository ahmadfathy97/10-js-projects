class Spaceship {
  constructor(x,y,w,h, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    this.xdir = 0;
    this.ydir = 0;
  }
  show(){
    // fill(255,255,230);
    image(this.img, this.x, this.y, this.w, this.h);
  }
  move(w, h){
    if(this.x <= 0){
      this.x = 0;
      this.xdir = 0;
    } else if(this.x >= w - this.w){
      this.x = w - this.w;
      this.xdir = 0;
    }
    if(this.y <= 0){
      this.y = 0;
      this.ydir = 0;
    } if(this.y >= h - this.h){
      this.y = h - this.h;
      this.ydir = 0;
    }
  }
  setXAndY(x, y){
    this.xdir += x;
    this.x += this.xdir;
    this.xdir = 0;
    this.ydir += y;
    this.y += this.ydir;
    this.ydir = 0;
  }
}
