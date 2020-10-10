class LaserShoot {
  constructor(x,y,w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ydir = 0;
  }
  show(){
    fill(249, 11, 252);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }
  move(){
    this.ydir = 2;
    this.y -= this.ydir;
  }


  destroyMeteor(meteors){
    let destroyed = {};

    let lasershootLft = this.x,
        lasershootRit = this.x + this.w,
        lasershootTop = this.y,
        lasershootBtm = this.y + this.h;

    meteors.forEach((meteor,i)=>{
      let meteorLft = meteor.x ,
          meteorRit = meteor.x + meteor.w,
          meteorTop = meteor.y,
          meteorBtm = meteor.y + meteor.h;
      if(lasershootRit >= meteorLft &&
         lasershootLft < meteorRit &&
         lasershootTop <= meteorBtm &&
         lasershootBtm > meteorTop ) {
        destroyed = {destroyed: true, meteor: i};
      }
    })
    return destroyed;
  }
}
