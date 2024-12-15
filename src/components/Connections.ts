import * as THREE from "three";

interface NodeData {
  id: number;
  name: string;
  city: string;
  sex: number;
}

export default function createConnections(
  scene: THREE.Scene,
  nodes: THREE.Mesh[],
  nodesData: NodeData[]
): void {
  nodesData.forEach((node) => {
    if (!node.city) return; // Skip nodes without city

    // Find all nodes from the same city
    const sameCity = nodesData.filter(
      (n) => n.city === node.city && n.id !== node.id && n.city !== ""
    );

    sameCity.forEach((target) => {
      const node1 = nodes.find((n) => n.userData.id === node.id);
      const node2 = nodes.find((n) => n.userData.id === target.id);

      if (node1 && node2) {
        const material = new THREE.LineBasicMaterial({
          color: 0x00ff00,
          opacity: 0.5,
          transparent: true,
        });
        const geometry = new THREE.BufferGeometry().setFromPoints([
          node1.position,
          node2.position,
        ]);
        const line = new THREE.Line(geometry, material);
        scene.add(line);
      }
    });
  });
}
