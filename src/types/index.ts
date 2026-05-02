export type NodeType = 'person' | 'note'

export interface PersonNode {
  id: string
  name: string
  notes: string
  color: string
  visible: boolean
  noteVisibleSetting: boolean
}

export interface Edge {
  id: string
  source: string
  target: string
  label: string
  notes: string
  lineStyle: 'solid' | 'dotted' | 'dashed'
  arrow: boolean
  sArrow: boolean
}

export interface Group {
  id: string
  name: string
  notes: string
  color: string
  members: string[]
  visible: boolean
}

export interface Map {
  id: string
  title: string
  nodes: PersonNode[]
  edges: Edge[]
  groups: Group[]
  lastUpdated: number
}
