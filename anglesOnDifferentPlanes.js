var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Create the boxes
    var xsquare = BABYLON.MeshBuilder.CreateBox('xsquare', { size: 0.5 }, scene);
    var ysquare = BABYLON.MeshBuilder.CreateBox('ysquare', { size: 0.5 }, scene);
    var zsquare = BABYLON.MeshBuilder.CreateBox('zsquare', { size: 0.5 }, scene);

    // Set random positions for the boxes
    xsquare.position = new BABYLON.Vector3(Math.random() * 10 - 5, 0, Math.random() * 10 - 5);
    ysquare.position = new BABYLON.Vector3(0, Math.random() * 10 - 5, Math.random() * 10 - 5);
    zsquare.position = new BABYLON.Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, 0);

    // Create and assign materials with colors for the boxes
    var redBoxMaterial = new BABYLON.StandardMaterial("redBoxMaterial", scene);
    redBoxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0); // Red
    xsquare.material = redBoxMaterial;

    var blueBoxMaterial = new BABYLON.StandardMaterial("blueBoxMaterial", scene);
    blueBoxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1); // Blue
    ysquare.material = blueBoxMaterial;

    var yellowBoxMaterial = new BABYLON.StandardMaterial("yellowBoxMaterial", scene);
    yellowBoxMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0); // Yellow
    zsquare.material = yellowBoxMaterial;

    // Create the cones
    var coneX = BABYLON.MeshBuilder.CreateCylinder('coneX', { diameterTop: 0.4, diameterBottom: 0, height: 1.2, tessellation: 32 }, scene);
    var coneY = BABYLON.MeshBuilder.CreateCylinder('coneY', { diameterTop: 0.4, diameterBottom: 0, height: 1.2, tessellation: 32 }, scene);
    var coneZ = BABYLON.MeshBuilder.CreateCylinder('coneZ', { diameterTop: 0.4, diameterBottom: 0, height: 1.2, tessellation: 32 }, scene);

    // Set positions for the cones
    coneX.position = new BABYLON.Vector3(5, 1, 5);
    coneY.position = new BABYLON.Vector3(-5, 1, 5);
    coneZ.position = new BABYLON.Vector3(0, 1, -5);

    // Function to orient a cone towards a target
    function orientCone(cone, target) {
        // Calculate the direction vector from the cone to the target
        var direction = target.subtract(cone.position);
        
        // Calculate the length of the direction vector in the XZ plane
        var xzLength = Math.sqrt(direction.x * direction.x + direction.z * direction.z);
        
        // Calculate the angle around the Y axis (azimuth angle)
        // atan2(y, x) gives us the angle relative to the XZ plane (SOH-CAH-TOA)
        var angleY = Math.atan2(direction.x, direction.z); // Angle in radians
        
        // Calculate the angle around the X axis (elevation angle)
        // atan2(z, sqrt(x^2 + y^2)) gives us the angle relative to the XZ plane
        var angleX = Math.atan2(direction.y, xzLength); // Angle in radians
        
        // Apply rotations
        cone.rotation.x = -angleX; // Rotate around the X axis to adjust elevation
        cone.rotation.y = angleY;  // Rotate around the Y axis to adjust azimuth
        cone.rotation.z = 0;
        
        // Since the cone's tip points along the negative Y direction by default,
        // we need to rotate around the X axis by 90 degrees (π/2 radians) to align the tip correctly.
        cone.rotation.x -= Math.PI / 2; // Adjust for the default Y-axis orientation
    }

    // Orient each cone to face the corresponding box
    orientCone(coneX, xsquare.position);
    orientCone(coneY, ysquare.position);
    orientCone(coneZ, zsquare.position);

    // Create and assign materials with colors for the cones
    var redConeMaterial = new BABYLON.StandardMaterial("redConeMaterial", scene);
    redConeMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0); // Red
    coneX.material = redConeMaterial;

    var blueConeMaterial = new BABYLON.StandardMaterial("blueConeMaterial", scene);
    blueConeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1); // Blue
    coneY.material = blueConeMaterial;

    var yellowConeMaterial = new BABYLON.StandardMaterial("yellowConeMaterial", scene);
    yellowConeMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0); // Yellow
    coneZ.material = yellowConeMaterial;

    return scene;
};
