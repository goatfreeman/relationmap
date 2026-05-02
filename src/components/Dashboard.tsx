import { useState, useEffect } from 'react'
import { useMapStore } from '../store/mapStore'

interface DashboardProps {
  onClose: () => void
  onMapSelect: () => void
}

interface MapListItem {
  id: string
  title: string
  nodeCount: number
  lastUpdated: number
}

function Dashboard({ onClose, onMapSelect }: DashboardProps) {
  const [maps, setMaps] = useState<MapListItem[]>([])
  const { setCurrentMapId } = useMapStore()

  useEffect(() => {
    const mapsList: MapListItem[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('map_')) {
        const data = JSON.parse(localStorage.getItem(key) || '{}')
        mapsList.push({
          id: key.replace('map_', ''),
          title: data.title || 'Untitled Map',
          nodeCount: (data.nodes || []).length,
          lastUpdated: data.lastUpdated || 0,
        })
      }
    }
    setMaps(mapsList.sort((a, b) => b.lastUpdated - a.lastUpdated))
  }, [])

  const handleOpenMap = (id: string) => {
    setCurrentMapId(id)
    onMapSelect()
  }

  const handleDeleteMap = (id: string) => {
    if (window.confirm('Delete this map forever?')) {
      localStorage.removeItem(`map_${id}`)
      setMaps(maps.filter((m) => m.id !== id))
    }
  }

  const handleNewMap = () => {
    if (window.confirm('Start a new map? Your current work is auto-saved.')) {
      const newId = 'map_' + Date.now()
      setCurrentMapId(newId)
      onMapSelect()
    }
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 uppercase">My Gallery</h1>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
          >
            Close
          </button>
        </div>

        <div className="mb-8">
          <button
            onClick={handleNewMap}
            className="px-6 py-3 bg-success text-white rounded-lg font-semibold hover:bg-green-600"
          >
            + New Map
          </button>
        </div>

        {maps.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No maps yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maps.map((map) => (
              <div
                key={map.id}
                className="border border-gray-300 rounded-lg p-6 bg-white hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{map.title}</h3>
                <p className="text-sm text-gray-600 mb-1">People: {map.nodeCount}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(map.lastUpdated).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenMap(map.id)}
                    className="flex-1 px-3 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-indigo-600"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => handleDeleteMap(map.id)}
                    className="flex-1 px-3 py-2 bg-white border-2 border-red-300 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
