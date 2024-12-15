import * as THREE from "three";
import distributeNodes from "../utils/distributeNodes";

interface NodeData {
  id: number;
  name: string;
  screen_name: string;
  city: string;
  sex: number;
}

export default function createNodes(
  scene: THREE.Scene,
  nodesData: NodeData[]
): THREE.Mesh[] {
  const positions = distributeNodes(nodesData);
  const nodes: THREE.Mesh[] = [];

  nodesData.forEach((node, index) => {
    const geometry = new THREE.SphereGeometry(0.2, 32, 32);
    const color = node.sex === 1 ? 0xff69b4 : 0x4169e1; // Pink for female, Blue for male
    const material = new THREE.MeshStandardMaterial({ color });
    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.set(
      positions[index].x,
      positions[index].y,
      positions[index].z
    );
    sphere.userData = { ...node };
    scene.add(sphere);
    nodes.push(sphere);
  });

  return nodes;
}
