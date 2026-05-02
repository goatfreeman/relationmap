import { useState, useEffect } from 'react'
import ReactFlow, {
  Node,
  Edge as FlowEdge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
} from 'reactflow'
import 'reactflow/dist/style.css'

import { useMapStore } from './store/mapStore'
import { PersonNode, Edge, Group } from './types'
import Sidebar from './components/Sidebar'
import PersonNode from './components/nodes/PersonNode'
import EditPanel from './components/EditPanel'
import Dashboard from './components/Dashboard'
import { generateId } from './utils/helpers'

const nodeTypes = {
  person: PersonNode,
}

function App() {
  const [showDashboard, setShowDashboard] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const {
    currentMapId,
    mapTitle,
    nodes: storeNodes,
    edges: storeEdges,
    selectedNodeId,
    selectedEdgeId,
    setCurrentMapId,
    setMapTitle,
    addNode,
    addEdge: addStoreEdge,
    updateNode,
  } = useMapStore()

  // Load initial data from localStorage
  useEffect(() => {
    const mapIdFromUrl = new URLSearchParams(window.location.search).get('id')
    if (mapIdFromUrl) {
      setCurrentMapId(mapIdFromUrl)
    }

    const saved = localStorage.getItem(`map_${currentMapId}`)
    if (saved) {
      const data = JSON.parse(saved)
      // Load nodes and edges from saved data
      setMapTitle(data.title)
    }
  }, [])

  // Convert store nodes to React Flow nodes
  useEffect(() => {
    const flowNodes: Node[] = storeNodes.map((node) => ({
      id: node.id,
      data: { label: node.name, node },
      position: JSON.parse(localStorage.getItem(`node_pos_${node.id}`) || '{"x": 0, "y": 0}'),
      type: 'person',
    }))
    setNodes(flowNodes)
  }, [storeNodes, setNodes])

  // Convert store edges to React Flow edges
  useEffect(() => {
    const flowEdges: FlowEdge[] = storeEdges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      data: { edge },
    }))
    setEdges(flowEdges)
  }, [storeEdges, setEdges])

  // Handle node position changes
  const handleNodesChange = (changes: any) => {
    changes.forEach((change: any) => {
      if (change.type === 'position' && change.position) {
        localStorage.setItem(
          `node_pos_${change.id}`,
          JSON.stringify(change.position)
        )
      }
    })
    onNodesChange(changes)
  }

  const handleConnect = (connection: Connection) => {
    const newEdge: Edge = {
      id: `edge_${Date.now()}`,
      source: connection.source!,
      target: connection.target!,
      label: '',
      notes: '',
      lineStyle: 'solid',
      arrow: true,
      sArrow: false,
    }
    addStoreEdge(newEdge)
  }

  const handleAddNode = (position: { x: number; y: number }) => {
    const newNode: PersonNode = {
      id: `p${Date.now()}`,
      name: '?',
      notes: '',
      color: '#4F46E5',
      visible: true,
      noteVisibleSetting: true,
    }
    addNode(newNode)
    localStorage.setItem(`node_pos_${newNode.id}`, JSON.stringify(position))
  }

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = {
        title: mapTitle,
        nodes: storeNodes,
        edges: storeEdges,
        groups: [],
        lastUpdated: Date.now(),
      }
      localStorage.setItem(`map_${currentMapId}`, JSON.stringify(data))
      localStorage.setItem('active_map_id', currentMapId)
    }, 1000)

    return () => clearTimeout(timer)
  }, [mapTitle, storeNodes, storeEdges, currentMapId])

  if (showDashboard) {
    return <Dashboard onClose={() => setShowDashboard(false)} onMapSelect={() => setShowDashboard(false)} />
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main canvas area */}
      <div className="flex-1 flex flex-col relative">
        {/* Top controls */}
        <div className="absolute top-5 right-5 z-10 flex gap-2">
          <button
            onClick={() => setShowDashboard(true)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50"
          >
            📂 Gallery
          </button>
        </div>

        {/* React Flow Canvas */}
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={handleConnect}
            nodeTypes={nodeTypes}
            onPaneClick={(e) => {
              if (e.target === e.currentTarget) {
                // Add node on canvas click
                const bounds = (e.currentTarget as HTMLElement).getBoundingClientRect()
                const x = e.clientX - bounds.left
                const y = e.clientY - bounds.top
                // TODO: Implement proper position conversion
              }
            }}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>

        {/* Edit panels */}
        <EditPanel />

        {/* Save indicator */}
        <div className="absolute bottom-5 left-5 text-xs text-gray-400 pointer-events-none">
          Cloud Sync Ready
        </div>

        {/* Credits */}
        <div className="absolute top-2 left-2 text-xs text-gray-400 bg-white/70 px-2 py-1 rounded pointer-events-none">
          RelationMap v11.0 Created by HappyGuy119
        </div>
      </div>
    </div>
  )
}

export default App
