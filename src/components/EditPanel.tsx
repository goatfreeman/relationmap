import { useMapStore } from '../store/mapStore'
import { palette } from '../utils/helpers'

function EditPanel() {
  const {
    selectedNodeId,
    selectedEdgeId,
    nodes,
    edges,
    updateNode,
    updateEdge,
    deleteNode,
    deleteEdge,
  } = useMapStore()

  const selectedNode = selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) : null
  const selectedEdge = selectedEdgeId ? edges.find((e) => e.id === selectedEdgeId) : null

  if (!selectedNode && !selectedEdge) return null

  return (
    <div className="absolute right-5 top-20 w-80 max-h-96 bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto z-20">
      {selectedNode && (
        <div className="p-4">
          <h3 className="font-bold text-gray-800 mb-3">Edit Person</h3>

          {/* Name */}
          <div className="mb-3">
            <label className="text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              value={selectedNode.name}
              onChange={(e) => updateNode(selectedNode.id, { name: e.target.value })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-primary"
            />
          </div>

          {/* Notes */}
          <div className="mb-3">
            <label className="text-sm font-semibold text-gray-700">Notes</label>
            <textarea
              value={selectedNode.notes}
              onChange={(e) => updateNode(selectedNode.id, { notes: e.target.value })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-primary h-20 resize-none"
            />
          </div>

          {/* Color picker */}
          <div className="mb-3">
            <label className="text-sm font-semibold text-gray-700">Color</label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {palette.map((color) => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedNode.color === color ? 'border-gray-800' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => updateNode(selectedNode.id, { color })}
                />
              ))}
            </div>
          </div>

          {/* Delete button */}
          <button
            onClick={() => deleteNode(selectedNode.id)}
            className="w-full px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200"
          >
            Delete Person
          </button>
        </div>
      )}

      {selectedEdge && (
        <div className="p-4">
          <h3 className="font-bold text-gray-800 mb-3">Edit Connection</h3>

          {/* Label */}
          <div className="mb-3">
            <label className="text-sm font-semibold text-gray-700">Relationship</label>
            <input
              type="text"
              value={selectedEdge.label}
              onChange={(e) => updateEdge(selectedEdge.id, { label: e.target.value })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-primary"
            />
          </div>

          {/* Notes */}
          <div className="mb-3">
            <label className="text-sm font-semibold text-gray-700">Notes</label>
            <textarea
              value={selectedEdge.notes}
              onChange={(e) => updateEdge(selectedEdge.id, { notes: e.target.value })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-primary h-20 resize-none"
            />
          </div>

          {/* Line style */}
          <div className="mb-3">
            <label className="text-sm font-semibold text-gray-700">Style</label>
            <div className="flex gap-2 mt-2">
              {['solid', 'dotted', 'dashed'].map((style) => (
                <button
                  key={style}
                  className={`flex-1 px-2 py-1 rounded text-sm ${
                    selectedEdge.lineStyle === style
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => updateEdge(selectedEdge.id, { lineStyle: style as any })}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Delete button */}
          <button
            onClick={() => deleteEdge(selectedEdge.id)}
            className="w-full px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200"
          >
            Delete Connection
          </button>
        </div>
      )}
    </div>
  )
}

export default EditPanel
