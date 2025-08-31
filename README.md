# Three.js Starter Pro

A modern, interactive Three.js starter project featuring dual viewing modes and real-time 3D controls.

## Features

### Basic View
- Simple green 3D cube rotating in space
- Clean, minimalist interface
- Smooth animations and lighting

### Enhanced View
- Colorful, interactive 3D cube with advanced materials
- Real-time controls for:
  - Rotation speed
  - Cube color
  - Wireframe toggle
  - Scale adjustment
- Mouse interaction (hover and click effects)
- Animated floating particles background
- Dynamic colored lighting system
- Smooth camera movements

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
threejs-starter-pro/
├── src/
│   ├── scenes/
│   │   ├── BasicScene.js     # Basic 3D cube scene
│   │   └── EnhancedScene.js  # Advanced interactive scene
│   ├── styles/
│   │   └── main.css          # Styling and UI
│   └── main.js               # Main application logic
├── index.html                # HTML structure
├── package.json              # Dependencies and scripts
└── vite.config.js           # Vite configuration
```

## Technologies Used

- **Three.js** - 3D graphics library
- **Vite** - Fast build tool and dev server
- **Modern ES6+** - JavaScript modules and classes
- **CSS3** - Advanced styling with gradients and animations

## Controls (Enhanced View)

- **Rotation Speed**: Adjust how fast the cube rotates
- **Cube Color**: Change the cube's color in real-time
- **Wireframe**: Toggle wireframe overlay on/off
- **Scale**: Make the cube larger or smaller
- **Mouse Interaction**: Move mouse to rotate, click for pulse effect

## License

MIT License - feel free to use this as a starting point for your own Three.js projects!

## Contributing

Feel free to submit issues and pull requests to improve this starter template.
