import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// Início da importação de bibliotecas e módulos necessários para o projeto Three.js.
// 'THREE' é a principal biblioteca para gráficos 3D, 'OrbitControls' é da camera

//-----------------------------------Base-----------------------------------//
// Canvas
const canvas = document.querySelector('canvas.webgl');
// Selecionamos o elemento HTML com a classe 'webgl' e o consideramos como o canvas para renderizar

// Scene
const scene = new THREE.Scene();
// Criamos uma instância da cena Three.js, que é onde todos os objetos 3D serão colocados e renderizados.

// Fog
const fog = new THREE.Fog('#262837', 1, 15);
scene.fog = fog;
// Define um efeito de neblina para a cena, com uma cor, distância inicial e distância final.

//-----------------------------------Textures-----------------------------------//

// Carrega texturas para serem usadas nos objetos 3D na cena.
const textureLoader = new THREE.TextureLoader();

// Carrega a textura das partículas
const particleTexture = textureLoader.load('textures/particles/4.png')

// Carrega texturas para a porta
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

// Carrega texturas para tijolos
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg');
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg');
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg');
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg');

// Carrega texturas para a grama
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg');
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg');
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg');

// Configuração de repetição e envoltório (wrap) das texturas de grama
grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

// Carrega texturas para o caminho de pedra
const stonePathColorTexture = textureLoader.load('/textures/stonePath/color.jpg');
const stonePathAmbientOcclusionTexture = textureLoader.load('/textures/stonePath/ambientOcclusion.jpg');
const stonePathNormalTexture = textureLoader.load('/textures/stonePath/normal.jpg');
const stonePathRoughnessTexture = textureLoader.load('/textures/stonePath/roughness.jpg');
const stonePathHeightTexture = textureLoader.load('/textures/stonePath/height.png');

// Configuração de repetição e envoltório (wrap) das texturas do caminho de pedra
stonePathColorTexture.repeat.set(1, 16);
stonePathAmbientOcclusionTexture.repeat.set(1, 16);
stonePathNormalTexture.repeat.set(1, 16);
stonePathRoughnessTexture.repeat.set(1, 16);

stonePathColorTexture.wrapS = THREE.RepeatWrapping;
stonePathAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
stonePathNormalTexture.wrapS = THREE.RepeatWrapping;
stonePathRoughnessTexture.wrapS = THREE.RepeatWrapping;

stonePathColorTexture.wrapT = THREE.RepeatWrapping;
stonePathAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
stonePathNormalTexture.wrapT = THREE.RepeatWrapping;
stonePathRoughnessTexture.wrapT = THREE.RepeatWrapping;

// Cada conjunto de texturas é carregado com diferentes mapas, como cores, mapas de oclusão 
// ambiente, mapas normais, mapas de aspereza, etc., que são usados para adicionar detalhes
// realistas aos objetos.
//-----------------------------------GLTF-----------------------------------//

const gltfLoader = new GLTFLoader(); // Cria um carregador de modelos 3D GLTF

gltfLoader.load('/assets/rocket/Rocket_Ship_01.gltf', (gltf) => {
    // Função de retorno chamada após o carregamento bem-sucedido do modelo.

    // Adicione o modelo à cena
    const model = gltf.scene;
    scene.add(model);

    // Você pode ajustar a escala, posição e rotação do modelo conforme necessário
    model.scale.set(0.01, 0.01, 0.01);
    model.position.set(10, 10, 10);
    model.rotation.set(0, Math.PI, 0);
});

//-----------------------------------House-----------------------------------//
 
// Criamos um grupo chamado 'house' para agrupar objetos relacionados à casa na cena.
const house = new THREE.Group();
scene.add(house);

//-----------------------------------Walls-----------------------------------//

// Criamos as paredes da casa usando uma geometria de caixa (BoxGeometry) e um material padrão.
// O material usa as texturas carregadas para definir a cor, oclusão ambiente, normal e aspereza.
// Cria um objeto 3D 'walls' que representa as paredes da casa.
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4), // Cria uma geometria de caixa para as paredes com dimensões 4x2.5x4.
    new THREE.MeshStandardMaterial({ // Define um material para as paredes com texturas específicas.
        map: bricksColorTexture, // A textura de cor das paredes é definida com base na textura de tijolos.
        aoMap: bricksAmbientOcclusionTexture, // A textura de oclusão ambiente é definida para sombrear as áreas afetadas pela luz.
        normalMap: bricksNormalTexture, // A textura normal é usada para simular detalhes de relevo.
        roughnessMap: bricksRoughnessTexture // A textura de aspereza controla o quão áspera ou suave a superfície aparece.
    })
)

// Define os atributos de UV2 para a geometria, que afetam como as texturas são mapeadas nas paredes.
walls.geometry.setAttribute('uv2', 
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
)

// Define a posição vertical (altura) das paredes para que fiquem no meio da altura da casa.
walls.position.y = 2.5 / 2

// Adiciona as paredes à instância da casa.
house.add(walls);
//-----------------------------------Roof-----------------------------------//

// Criamos o telhado da casa usando uma geometria cônica (ConeGeometry) e um material de cor sólida.
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4), // cria a geometria
    new THREE.MeshStandardMaterial({ color: '#b35f45'}) // define o material e a cor
)
roof.position.y = 2.5 + 0.5; // define a posição do telhado, 2.5 de altura acima do cubo
roof.rotation.y = Math.PI / 4; // rotação em torno do eixo
house.add(roof); // adiciona

//-----------------------------------Esferas-----------------------------------//

const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: '#ff0000' }); // Cor da esfera

const sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
const sphere3 = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Defina as posições iniciais das esferas em torno da casa
sphere1.position.set(4, 2.2, 3); // Ajuste as coordenadas conforme necessário
sphere2.position.set(4, 2.2, 4); // Ajuste as coordenadas conforme necessário
sphere3.position.set(4, 2.2, 5); // Ajuste as coordenadas conforme necessário

scene.add(sphere1, sphere2, sphere3);

//-----------------------------------Door-----------------------------------//

// Criamos a porta da casa usando uma geometria plana (PlaneGeometry) e um material que utiliza texturas
// para adicionar detalhes realistas à porta.
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({ 
        map: doorColorTexture, // Define a textura de cor da porta usando a variável "doorColorTexture".
        transparent: true, // Torna o material transparente para que possamos ver através da porta.
        alphaMap: doorAlphaTexture,  // Define a textura alfa que controla a transparência da porta.
        aoMap: doorAmbientOcclusionTexture, // Define a textura de oclusão ambiental da porta.
        displacementMap: doorHeightTexture, // Define a textura de deslocamento que afeta a geometria da porta.
        displacementScale: 0.1, // Define a escala do deslocamento da geometria da porta.
        normalMap: doorNormalTexture,  // Define a textura de mapas normais que afeta a iluminação da porta.
        metalnessMap: doorMetalnessTexture, // Define a textura de metalness que afeta as propriedades de metal da porta.
        roughnessMap: doorRoughnessTexture // Define a textura de rugosidade que afeta as propriedades de rugosidade da porta.
    })
)
door.geometry.setAttribute('uv2', 
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

//-----------------------------------Bushes-----------------------------------//

// Cria arbustos ao redor da casa, usando uma geometria esférica (SphereGeometry) e o material verde.
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.01, 2.6);

house.add(bush1, bush2, bush3, bush4);

//-----------------------------------Graves-----------------------------------//

// Criamos um grupo para agrupar objetos relacionados aos tumulos.
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.5, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

// Criamos várias sepulturas em posições aleatórias, usando uma geometria de caixa e um material cinza.
for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 6
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.3, z);
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    graves.add(grave);
    grave.castShadow = true;
}

//-----------------------------------Stone path-----------------------------------//

// Criamos um caminho de pedra na cena, usando uma geometria plana e um material com texturas para
// adicionar detalhes realistas ao caminho de pedra.
const stonePath = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 1000, 1000),
    new THREE.MeshStandardMaterial({ 
        map: stonePathColorTexture,
        aoMap: stonePathAmbientOcclusionTexture,
        displacementMap: stonePathHeightTexture,
        displacementScale: 0.03,
        normalMap: stonePathNormalTexture,
        roughnessMap: stonePathRoughnessTexture
    })
)
stonePath.geometry.setAttribute('uv2', 
    new THREE.Float32BufferAttribute(stonePath.geometry.attributes.uv.array, 2)
)

stonePath.position.set(0, 0.001, 5);
stonePath.scale.y = 5;
stonePath.scale.x = 0.5;
stonePath.rotation.x = - Math.PI * 0.5

scene.add(stonePath);

//-----------------------------------Floor-----------------------------------//

// Criamos o chão da cena usando uma geometria plana e um material com texturas para adicionar detalhes
// realistas ao chão.
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)
floor.geometry.setAttribute('uv2', 
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

//-----------------------------------Particles-----------------------------------//

// Criamos partículas na cena usando uma geometria buffer (BufferGeometry) e gera posições aleatórias
// para as partículas.

// Este é uma das principais etapas do código. Cada seção se concentra em criar ou definir
// elementos específicos na cena, como a casa, as texturas, os objetos de cena e as partículas.
const particlesGeometry = new THREE.BufferGeometry();
const count = 100;

// Cria um array de números de ponto flutuante de precisão simples para armazenar as posições das partículas.
const positions = new Float32Array(count * 3); 

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 17;
}

// Cria um array de números de ponto flutuante de precisão simples para armazenar as posições das partículas.
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

//-----------------------------------Material -----------------------------------//

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.09,
    sizeAttenuation: true
})
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture;
particlesMaterial.depthWrite = false;
particlesMaterial.blending = THREE.AdditiveBlending

//-----------------------------------Points / Particles-----------------------------------//

const particles = new THREE.Points(particlesGeometry, particlesMaterial);

scene.add(particles);

//-----------------------------------Lights-----------------------------------//

//-----------------------------------Ambient light-----------------------------------//
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.08)
scene.add(ambientLight)

//-----------------------------------Directional light-----------------------------------//
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.08)
moonLight.position.set(4, 5, - 2)
scene.add(moonLight)

//-----------------------------------Door light-----------------------------------//
const doorLight = new THREE.PointLight('#ff7d46', 1, 7);
doorLight.position.set(0, 2.2, 2.7);

house.add(doorLight);

//-----------------------------------Ghosts-----------------------------------//
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight('#00ffff', 2, 3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight('#ffff00', 2, 3);
scene.add(ghost3);

//-----------------------------------Sizes-----------------------------------//
// Cria um objeto "sizes" para armazenar as dimensões da janela.
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Atualiza as dimensões (largura e altura) com os novos valores da janela.
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

   // Atualiza o aspect ratio da câmera com base nas novas dimensões.
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Atualiza o tamanho do renderizador para se ajustar às novas dimensões da janela.
    renderer.setSize(sizes.width, sizes.height)

    // Define o fator de pixel do renderizador para ser o mínimo entre o dispositivo e 2.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//-----------------------------------Camera-----------------------------------//

//-----------------------------------Base camera-----------------------------------//
// Cria uma câmera de perspectiva com um campo de visão de 75 graus,
// um plano de corte próximo de 0,1 e um plano de corte distante de 100.
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

// Define a posição inicial da câmera no espaço 3D.
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

//-----------------------------------Controls-----------------------------------//
// Cria um objeto de controles de órbita que permite interagir com a cena usando o mouse.
const controls = new OrbitControls(camera, canvas)

// Habilita o efeito de amortecimento nos controles, o que suaviza o movimento da câmera.
controls.enableDamping = true

//-----------------------------------Renderer-----------------------------------//
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#262837');

//-----------------------------------Shadows-----------------------------------//

// Habilita a renderização de sombras para o renderizador e define o tipo de mapeamento de sombras.
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Ativa a capacidade de lançar sombras para diferentes elementos da cena.
moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

// Define elementos que podem receber sombras.
floor.receiveShadow = true;
stonePath.receiveShadow = true;

// Configuração das sombras da luz da porta.
doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

// Configuração das sombras para o "ghost1".
ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

// Configuração das sombras para o "ghost2".
ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

// Configuração das sombras para o "ghost3".
ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

//-----------------------------------Animate-----------------------------------//

// Função de animação principal, atualiza a rotação das partículas, a posição dos fantasmas, os controles da câmera
// e renderiza a cena em um loop de animação contínuo.

const clock = new THREE.Clock() // Cria um relógio para controlar o tempo da animação.

const tick = () => // Define uma função "tick" que será chamada a cada quadro da animação.
{
    const elapsedTime = clock.getElapsedTime() // Obtém o tempo decorrido desde o início da animação.

    //-----------------------------------Update particles-----------------------------------//
    particles.rotation.y = elapsedTime * 0.02;

    // Blink every particle every 0.1 seconds
    // for (let i = 0; i < count; i++) {
    //     particles[i].material.opacity = (Math.sin(elapsedTime * 3) + 1) / 2;
    // }

    // Atualize a posição das esferas para fazê-las girar em torno da casa
    const sphereRotationSpeed = 0.5; // Ajuste a velocidade de rotação das esferas conforme necessário

    sphere1.position.x = 4 + Math.cos(elapsedTime * sphereRotationSpeed) * 1; // Ajuste o raio da órbita conforme necessário
    sphere1.position.z = 3 + Math.sin(elapsedTime * sphereRotationSpeed) * 1; // Ajuste o raio da órbita conforme necessário

    sphere2.position.x = 4 + Math.cos(elapsedTime * sphereRotationSpeed + Math.PI / 3) * 1; // Ajuste o raio da órbita conforme necessário
    sphere2.position.z = 4 + Math.sin(elapsedTime * sphereRotationSpeed + Math.PI / 3) * 1; // Ajuste o raio da órbita conforme necessário

    sphere3.position.x = 4 + Math.cos(elapsedTime * sphereRotationSpeed + (2 * Math.PI) / 3) * 1; // Ajuste o raio da órbita conforme necessário
    sphere3.position.z = 5 + Math.sin(elapsedTime * sphereRotationSpeed + (2 * Math.PI) / 3) * 1; // Ajuste o raio da órbita conforme necessário

    // ...

    //-----------------------------------Update Ghosts-----------------------------------//
    // Atualiza a posição dos fantasmas com base no tempo decorrido.
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(elapsedTime * 3);

    const ghost2Angle = - elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    const ghost3Angle = - elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * ( 7 + Math.sin(elapsedTime * 0.32));
    ghost3.position.z = Math.sin(ghost3Angle) * ( 7 + Math.sin(elapsedTime * 0.5));
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    //-----------------------------------Update controls-----------------------------------//
    // Atualiza os controles de órbita, permitindo ao usuário interagir com a cena.
    controls.update()

    //-----------------------------------Render-----------------------------------//
    // Renderiza a cena com a câmera atual.
    renderer.render(scene, camera)

    // Chame novamente no próximo quadro
    window.requestAnimationFrame(tick)
}
tick()