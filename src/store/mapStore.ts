import { create } from 'zustand'
import { PersonNode, Edge, Group, Map } from '../types'

interface MapStore {
  currentMapId: string
  mapTitle: string
  nodes: PersonNode[]
  edges: Edge[]
  groups: Group[]
  undoHistory: any[]
  selectedNodeId: string | null
  selectedEdgeId: string | null
  selectedGroupId: string | null
  connectionMode: boolean
  
  // Node operations
  addNode: (node: PersonNode) => void
  updateNode: (id: string, updates: Partial<PersonNode>) => void
  deleteNode: (id: string) => void
  toggleNodeVisibility: (id: string) => void
  
  // Edge operations
  addEdge: (edge: Edge) => void
  updateEdge: (id: string, updates: Partial<Edge>) => void
  deleteEdge: (id: string) => void
  
  // Group operations
  addGroup: (group: Group) => void
  updateGroup: (id: string, updates: Partial<Group>) => void
  deleteGroup: (id: string) => void
  toggleGroupMember: (groupId: string, personId: string) => void
  
  // Selection
  selectNode: (id: string | null) => void
  selectEdge: (id: string | null) => void
  selectGroup: (id: string | null) => void
  
  // Map operations
  setMapTitle: (title: string) => void
  setCurrentMapId: (id: string) => void
  
  // History
  recordState: () => void
  undo: () => void
  
  // Connection mode
  toggleConnectionMode: () => void
}

export const useMapStore = create<MapStore>((set, get) => ({
  currentMapId: localStorage.getItem('active_map_id') || 'map_' + Date.now(),
  mapTitle: 'Untitled Map',
  nodes: [],
  edges: [],
  groups: [],
  undoHistory: [],
  selectedNodeId: null,
  selectedEdgeId: null,
  selectedGroupId: null,
  connectionMode: false,

  addNode: (node) => set((state) => {
    state.recordState()
    return { nodes: [...state.nodes, node] }
  }),

  updateNode: (id, updates) => set((state) => {
    state.recordState()
    return {
      nodes: state.nodes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
    }
  }),

  deleteNode: (id) => set((state) => {
    state.recordState()
    return {
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
      groups: state.groups.map((g) => ({
        ...g,
        members: g.members.filter((m) => m !== id),
      })),
    }
  }),

  toggleNodeVisibility: (id) => set((state) => {
    state.recordState()
    return {
      nodes: state.nodes.map((n) =>
        n.id === id ? { ...n, visible: !n.visible } : n
      ),
    }
  }),

  addEdge: (edge) => set((state) => {
    state.recordState()
    return { edges: [...state.edges, edge] }
  }),

  updateEdge: (id, updates) => set((state) => {
    state.recordState()
    return {
      edges: state.edges.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    }
  }),

  deleteEdge: (id) => set((state) => {
    state.recordState()
    return { edges: state.edges.filter((e) => e.id !== id) }
  }),

  addGroup: (group) => set((state) => {
    state.recordState()
    return { groups: [...state.groups, group] }
  }),

  updateGroup: (id, updates) => set((state) => {
    state.recordState()
    return {
      groups: state.groups.map((g) => (g.id === id ? { ...g, ...updates } : g)),
    }
  }),

  deleteGroup: (id) => set((state) => {
    state.recordState()
    return { groups: state.groups.filter((g) => g.id !== id) }
  }),

  toggleGroupMember: (groupId, personId) => set((state) => {
    state.recordState()
    return {
      groups: state.groups.map((g) => {
        if (g.id !== groupId) return g
        const members = g.members.includes(personId)
          ? g.members.filter((m) => m !== personId)
          : [...g.members, personId]
        return { ...g, members }
      }),
    }
  }),

  selectNode: (id) => set({ selectedNodeId: id, selectedEdgeId: null, selectedGroupId: null }),
  selectEdge: (id) => set({ selectedEdgeId: id, selectedNodeId: null, selectedGroupId: null }),
  selectGroup: (id) => set({ selectedGroupId: id, selectedNodeId: null, selectedEdgeId: null }),

  setMapTitle: (title) => set({ mapTitle: title || 'Untitled Map' }),
  setCurrentMapId: (id) => set({ currentMapId: id }),

  recordState: () => set((state) => ({
    undoHistory: [...state.undoHistory, {
      nodes: JSON.parse(JSON.stringify(state.nodes)),
      edges: JSON.parse(JSON.stringify(state.edges)),
      groups: JSON.parse(JSON.stringify(state.groups)),
    }].slice(-20),
  })),

  undo: () => set((state) => {
    if (state.undoHistory.length === 0) return state
    const previousState = state.undoHistory[state.undoHistory.length - 1]
    return {
      nodes: previousState.nodes,
      edges: previousState.edges,
      groups: previousState.groups,
      undoHistory: state.undoHistory.slice(0, -1),
    }
  }),

  toggleConnectionMode: () => set((state) => ({
    connectionMode: !state.connectionMode,
  })),
}))
