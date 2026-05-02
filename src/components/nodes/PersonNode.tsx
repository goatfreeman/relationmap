import { Handle, Position } from 'reactflow'
import { useMapStore } from '../../store/mapStore'
import { PersonNode as PersonNodeType } from '../../types'

function PersonNode({ data }: { data: { label: string; node: PersonNodeType } }) {
  const { node } = data
  const { selectNode } = useMapStore()

  return (
    <div
      className="px-4 py-2 rounded-lg shadow-md border-2 border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
      style={{
        backgroundColor: node.color,
        borderColor: node.color,
        opacity: node.visible ? 1 : 0.5,
      }}
      onClick={() => selectNode(node.id)}
    >
      <Handle type="target" position={Position.Top} />
      <div className="text-white font-bold text-center text-sm w-16 break-words">
        {node.name}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default PersonNode
