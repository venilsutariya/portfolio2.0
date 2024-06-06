// useProjectTextures.js
import { useTexture } from '@react-three/drei';

// Custom hook to load textures for the projects
export default function useProjectTextures(projects) {
  // Use useTexture for each project source
  return projects.map(project => useTexture(project.src));
}
