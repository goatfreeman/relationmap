export const generateId = (prefix: string = 'node') => {
  return `${prefix}_${Date.now()}`
}

export const palette = [
  '#4F46E5',
  '#10B981',
  '#3B82F6',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#06B6D4',
  '#FFFFFF',
  '#000000',
]

export const downloadJSON = (data: any, filename: string) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export const exportToPNG = async (nodes: any, edges: any, groups: any) => {
  // TODO: Implement React Flow canvas export
}

export const lineStyleToCSS = (style: 'solid' | 'dotted' | 'dashed') => {
  const map: Record<string, string> = {
    solid: 'solid',
    dotted: 'dotted',
    dashed: 'dashed',
  }
  return map[style] || 'solid'
}
