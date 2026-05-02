# RelationMap v11.0 - React Flow Edition

A modern React-based relationship mapping tool built with React Flow for visualizing complex social networks, organizational hierarchies, and interconnected systems.

## Features

✨ **Modern Stack**
- React 18 with TypeScript
- React Flow for node-based visualization
- Zustand for state management
- Tailwind CSS for styling
- Vite for fast development

🎯 **Core Features**
- Create and edit person nodes with custom colors
- Define relationships with customizable connection styles
- Organize people into groups with visual groupings
- Full undo/redo history
- Auto-save to browser localStorage
- Gallery/dashboard for managing multiple maps
- Export to PNG/JPG, JSON, or Mermaid format
- Search and filter functionality

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── nodes/
│   │   └── PersonNode.tsx      # Person node component
│   ├── Sidebar.tsx              # Left sidebar with controls
│   ├── EditPanel.tsx            # Edit panel for nodes/edges
│   └── Dashboard.tsx            # Gallery for managing maps
├── store/
│   └── mapStore.ts              # Zustand state management
├── types/
│   └── index.ts                 # TypeScript type definitions
├── utils/
│   └── helpers.ts               # Utility functions
├── App.tsx                       # Main application
├── main.tsx                      # Entry point
└── index.css                     # Global styles
```

## Usage

### Creating a Map
1. Click **+ Add Person** to create nodes
2. Click **+ Add Group** to create groupings
3. Toggle **Link Mode** and connect people
4. Edit node details in the right panel
5. Customize colors, notes, and relationships

### Saving Your Work
- Your map is **automatically saved** to browser localStorage
- Switch maps using the **📂 Gallery** button
- Export your work as JSON for backup

### Keyboard Shortcuts
- `Delete` - Delete selected node or edge
- `Enter` - Finish editing title
- `Escape` - Close modals

## Technology Stack

### Core
- **React Flow** - Node-based UI library for interactive diagrams
- **Zustand** - Lightweight state management
- **TypeScript** - Type-safe JavaScript

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **React Flow CSS** - Built-in styling

### Build & Dev
- **Vite** - Modern frontend build tool
- **PostCSS** - CSS transformations
- **Autoprefixer** - Cross-browser CSS support

## Migrating from v10.6

The refactor from Cytoscape.js to React Flow offers:

✅ **Better Performance** - React Flow is optimized for modern browsers
✅ **Improved UX** - Smoother interactions and animations
✅ **Easier Customization** - React components are easier to extend
✅ **Future-Ready** - Active community and ongoing development
✅ **Type Safety** - Full TypeScript support

### Data Format
Data from v10.6 can be imported via the JSON load feature. The format is compatible.

##  Contributing

Feel free to fork and submit pull requests for any improvements!

## License

Created by HappyGuy119 - Licensed under MIT

## Credits

Built with ❤️ using React Flow, Zustand, and Tailwind CSS
