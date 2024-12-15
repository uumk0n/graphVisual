import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { getAllNodes } from "./services/api";
import createNodes from "./components/Nodes";
import createConnections from "./components/Connections";

export default async function App(): Promise<void> {
  // Сцена
  const scene = new THREE.Scene();

  // Камера
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 10;

  // Рендерер
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Контроллеры
  const controls = new OrbitControls(camera, renderer.domElement);

  // Освещение
  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  // Получение данных из API
  const nodesData = await getAllNodes();

  // Создание узлов
  const nodes = createNodes(scene, nodesData);

  // Создание связей
  createConnections(scene, nodes, nodesData);

  // Рендеринг
  function animate(): void {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}
