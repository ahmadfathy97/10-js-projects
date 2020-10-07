function hexToRgbA(hex){
  let c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
    c= hex.substring(1).split('');
    if(c.length== 3){
        c= [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c= '0x'+c.join('');
    return {
      r: (c>>16)&255,
      g: (c>>8)&255,
      b: c&255
    };
  }
  return {
    r: 0,
    g: 0,
    b: 0
  };
}
