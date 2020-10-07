let objProperties = {
  ['color']: '#222222',
  ['background']: '#dddddd',
  ['auto-rotation']: true,
  ['light']: 0xffffff,
  ['color1']: '#ffffff',
  ['color2']: '#ffffff',
  ['color3']: '#ffffff',
  ['reset']: function (){
    this.color= '#222222';
    this.bg= '#dddddd';
    this.autoRotation= true;
    this.lightColor= 0xffffff;

    document.body.style.background = objProperties.bg;
    ambientLight.color.setHex( objProperties.lightColor );
    obj.position.set(0,0,0);
    obj.rotation.set(.5,0,0);
    // camera.position.z = 5;
    controls.reset();
    camera.position.set(0,0,5)
  }
};


//controls
function objControl(obj, colors){
    const gui = new dat.GUI({ autoPlace: false });
    //position
    let f1 = gui.addFolder('position');
    f1.add(obj.position, 'x', obj.position.x - 25, obj.position.x + 25)
    .onChange = function(e){
      changProp(e)
    };
    f1.add(obj.position, 'y', obj.position.y - 25, obj.position.y + 25)
    .onChange = function(e){
      changProp(e)
    };
    f1.add(obj.position, 'z', obj.position.z - 25, obj.position.z + 25)
    .onChange = function(e){
      changProp(e)
    };

    //rotation
    let f2 = gui.addFolder('rotation');
    f2.add(obj.rotation, 'x', obj.rotation.x - 5, obj.rotation.x + 5)
    .onChange = function(e){
      changProp(e)
    };
    f2.add(obj.rotation, 'y', obj.rotation.y - 5, obj.rotation.y + 5)
    .onChange = function(e){
      changProp(e)
    };
    f2.add(obj.rotation, 'z', obj.rotation.z - 5, obj.rotation.z + 5)
    .onChange = function(e){
      changProp(e)
    };

    let f3 = gui.addFolder('car colors');
    f3.addColor(objProperties, ['color1']).onChange(
      function(e){
        colors[0].color.setRGB(
          hexToRgbA(objProperties['color1']).r,
          hexToRgbA(objProperties['color1']).g,
          hexToRgbA(objProperties['color1']).b
        );
      }
    )
    f3.addColor(objProperties, ['color2']).onChange(
      function(e){
        colors[1].color.setRGB(
          hexToRgbA(objProperties['color2']).r,
          hexToRgbA(objProperties['color2']).g,
          hexToRgbA(objProperties['color2']).b
        );
      }
    )
    f3.addColor(objProperties, ['color3']).onChange(
      function(e){
        colors[2].color.setRGB(
          hexToRgbA(objProperties['color3']).r,
          hexToRgbA(objProperties['color3']).g,
          hexToRgbA(objProperties['color3']).b
        );
      }
    )

    //scene
    let f4 = gui.addFolder('scene');
    f4.addColor(objProperties, ['background']).onChange(
      function(e){
        document.body.style.background = objProperties['background'];
      }
    )
    f4.addColor( objProperties, ['light']).onChange(
      function(e){
        ambientLight.color.setHex( objProperties['light'] );
      }
    );
    f4.add(objProperties, ['auto-rotation']);
    f4.add(objProperties, ['reset'])
    f1.open();
    f2.open();
    f3.open();
    f4.open();


    //gui.close();
    document.getElementById('my-gui-container').style.display = "block";
    let customContainer = document.getElementById('my-gui-container');
    customContainer.appendChild(gui.domElement);
}

function changProp(e){
  obj.rotation.x = e;
  obj.rotation.y = e;
  obj.rotation.z = e;
  obj.position.x = e;
  obj.position.y = e;
  obj.position.z = e;
  colors[0].color.setRGB(hexToRgbA(e));
}
