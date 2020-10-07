let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({alpha: true});
controls = new THREE.OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
let objContainer = document.getElementById('obj-container');
let obj;
function loadobject (mtlFile, objFile){
  objContainer.appendChild( renderer.domElement );
  loading(mtlFile, objFile);
}


function loading(mtlFile, objFile){
  let mtl = new THREE.MTLLoader()
  mtl.setPath( '../models/' );
  mtl.load( mtlFile, function ( materials ) {
      materials.preload();
      new THREE.OBJLoader()
      .setMaterials( materials )
      .setPath( '../models/' )
      .load(objFile, function ( object ) {
          // object.position.y = -2;
          object.scale.x = .02;
          object.scale.y = .02;
          object.scale.z = .02;
          object.rotation.x = .5;

          obj = object;
          nodes = []
          obj.traverse( function ( child ) {
            Array.isArray(child.material) ? nodes.push(child.material) : null
          });
          colors = nodes[0];
          scene.add( obj);
          objControl(obj, colors);
          animate();
          document.getElementById('load-percent').style.display = 'none';
          document.body.style.overflowY = 'auto'

        },
        function ( xhr ) {
          let percent = Math.ceil( ( xhr.loaded / xhr.total * 100 ), 2 ) + '%'
          document.getElementById('load-percent').textContent = percent;

      	},
      	function ( error ) {
      		console.log( 'An error happened' );
        }
      );
  } );
}



let ambientLight = new THREE.AmbientLight( objProperties.lightColor, 0.4 );
scene.add( ambientLight );
//scene background
document.body.style.background = objProperties.bg;
camera.position.z = 5;
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  if(objProperties['auto-rotation']){
    obj.rotation.y += .005;
  }
}


window.addEventListener('resize', onResize);

function onResize(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
};
