interface Position {
  x: number;
  y: number;
  z: number;
}

export default function distributeNodes(nodes: any[]): Position[] {
  const positions: Position[] = [];
  const radius = 5;

  nodes.forEach((_, index) => {
    const theta = Math.acos(-1 + (2 * index) / nodes.length);
    const phi = Math.sqrt(nodes.length * Math.PI) * theta;

    const x = radius * Math.cos(phi) * Math.sin(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(theta);

    positions.push({ x, y, z });
  });

  return positions;
}
