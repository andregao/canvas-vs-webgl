# Web Canvas vs WebGL
## Compares canvas API performance with WebGL via PixiJS

A typical Canvas 2D animation implementation uses javascript and browser's requestAnimationFrame API to re-draw the shapes as often as the user's screen refreshes. 

WebGL optimizes this process by working directly with the device's GPU hardware to rasterize complex compositions, 
provide data buffering, and efficiently renders shapes using shaders.
This helps lower the web page's CPU usage especially as animation complexity grows.

This project demonstrates this by implementing the same interactive floating circles effects using these two different approaches. By going to Window - Task Manager in Chrome, 
one can easily tell the efficiency of WebGL animations.

Project hosted at https://canvas-webgl.netlify.com/
