import { useState } from 'react'
import { useMapStore } from '../store/mapStore'
import { generateId, palette } from '../utils/helpers'
import { PersonNode } from '../types'
import { InputModal } from './InputModal'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [showPersonModal, setShowPersonModal] = useState(false)
  const [showGroupModal, setShowGroupModal] = useState(false)

  const {
    mapTitle,
    setMapTitle,
    nodes,
    edges,
    groups,
    selectedNodeId,
    undo,
    toggleConnectionMode,
    connectionMode,
    addNode,
    deleteNode,
    addGroup,
    selectNode,
  } = useMapStore()

  const handleAddPerson = (name: string) => {
    const newNode: PersonNode = {
      id: generateId('p'),
      name: name || '?',
      notes: '',
      color: '#4F46E5',
      visible: true,
      noteVisibleSetting: true,
    }
    addNode(newNode)
    selectNode(newNode.id)
    setShowPersonModal(false)
  }

  const handleAddGroup = (name: string) => {
    if (name.trim()) {
      addGroup({
        id: generateId('g'),
        name: name.trim(),
        notes: '',
        color: palette[groups.length % palette.length],
        members: [],
        visible: true,
      })
      setShowGroupModal(false)
    }
  }

  return (
    <>
      {/* Input Modals */}
      <InputModal
        isOpen={showPersonModal}
        title="Add New Person"
        placeholder="Enter person's name..."
        onSubmit={handleAddPerson}
        onCancel={() => setShowPersonModal(false)}
      />

      <InputModal
        isOpen={showGroupModal}
        title="Create New Group"
        placeholder="Enter group name..."
        onSubmit={handleAddGroup}
        onCancel={() => setShowGroupModal(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-80 bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Title */}
        <div className="p-5 border-b border-gray-200">
          <h1
            contentEditable
            onBlur={(e) => setMapTitle((e.currentTarget.textContent || 'Untitled Map').trim())}
            className="text-lg font-bold text-gray-800 outline-none cursor-text"
          >
            {mapTitle}
          </h1>
        </div>

        {/* Controls */}
        <div className="p-5 space-y-3 flex-1 overflow-y-auto">
          {/* Search and actions */}
          <input
            type="text"
            placeholder="Search & Fly..."
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm outline-none focus:border-primary"
          />

          <div className="flex gap-2">
            <button
              onClick={undo}
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50"
            >
              Undo
            </button>
            <button className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50">
              Export
            </button>
            <button className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50">
              Load
            </button>
          </div>

          {/* Management section */}
          <div className="pt-3">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
              Management
            </div>
            <button
              onClick={() => setShowPersonModal(true)}
              className="w-full px-3 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-indigo-600"
            >
              + Add Person
            </button>
            <button
              onClick={() => setShowGroupModal(true)}
              className="w-full mt-2 px-3 py-2 bg-success text-white rounded-lg text-sm font-semibold hover:bg-green-600"
            >
              + Add Group
            </button>
            <button
              onClick={toggleConnectionMode}
              className={`w-full mt-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                connectionMode
                  ? 'bg-success text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Link Mode: {connectionMode ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Stats */}
          <div className="pt-3 text-sm text-gray-600">
            <p>People: {nodes.length}</p>
            <p>Connections: {edges.length}</p>
            <p>Groups: {groups.length}</p>
          </div>
        </div>

        {/* Clear button */}
        <div className="p-5 border-t border-gray-200">
          <button className="w-full px-3 py-2 bg-white border-2 border-red-300 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-50">
            Clear All
          </button>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="fixed left-80 top-1/2 -translate-y-1/2 w-7 h-16 bg-primary text-white rounded-r-lg flex items-center justify-center z-40 transition-all duration-300 shadow-lg"
        style={{
          left: isOpen ? '320px' : '0px',
        }}
      >
        {isOpen ? '◀' : '▶'}
      </button>
    </>
  )
}

export default Sidebar
