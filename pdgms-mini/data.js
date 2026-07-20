
/**
 * PDGMS Mini - Seed Data
 * Structures: Commitments (◈), Specs (◎), Tickets (◧), Reflections (◌)
 * Coordinates: V1-V5 (Authority), H1-H5 (Value Creation)
 */

const SEED_DATA = [
  // Commitments (◈)
  {
    id: 'c1',
    type: 'commitment',
    title: 'Standardize Design System',
    description: 'Establish a unified design language across all V-layers to ensure consistency.',
    vLayer: 5,
    hStage: 1,
    timestamp: Date.now() - 86400000 * 5
  },
  {
    id: 'c2',
    type: 'commitment',
    title: 'Optimize API Response Time',
    description: 'Reduce latency by 20% for all core endpoints.',
    vLayer: 5,
    hStage: 4,
    timestamp: Date.now() - 86400000 * 2
  },

  // Specs (◎)
  {
    id: 's1',
    type: 'spec',
    title: 'Authentication Module Spec',
    description: 'Detailed definition of OAuth2 implementation and token management.',
    vLayer: 2,
    hStage: 2,
    parentId: 't3',
    timestamp: Date.now() - 86400000 * 4
  },
  {
    id: 's2',
    type: 'spec',
    title: 'Grid Rendering Engine',
    description: 'Specification for the 5x5 dynamic coordinate mapping system.',
    vLayer: 4,
    hStage: 1,
    parentId: 'c1',
    timestamp: Date.now() - 86400000 * 1
  },

  // Tickets (◧)
  {
    id: 't1',
    type: 'ticket',
    title: 'Implement Sidebar Navigation',
    description: 'Build the vertical navigation bar with icon-only and expanded states.',
    status: 'done',
    vLayer: 1,
    hStage: 3,
    parentId: 's1',
    timestamp: Date.now() - 86400000 * 3
  },
  {
    id: 't2',
    type: 'ticket',
    title: 'Setup LocalStorage Hook',
    description: 'Create a synchronization layer for data persistence.',
    status: 'in-progress',
    vLayer: 2,
    hStage: 3,
    parentId: 'c2',
    timestamp: Date.now() - 86400000 * 1
  },
  {
    id: 't3',
    type: 'ticket',
    title: 'Design Modal Components',
    description: 'Create reusable UI for item creation and detail viewing.',
    status: 'backlog',
    vLayer: 3,
    hStage: 2,
    parentId: 's2',
    timestamp: Date.now()
  },

  // Reflections (◌)
  {
    id: 'r1',
    type: 'reflection',
    title: 'Initial Grid Concept',
    content: 'Found that mapping organizational authority to a vertical axis clarifies decision paths significantly.',
    vLayer: 4,
    hStage: 5,
    timestamp: Date.now() - 86400000 * 6
  }
];

if (typeof window !== 'undefined') {
  window.SEED_DATA = SEED_DATA;
}
