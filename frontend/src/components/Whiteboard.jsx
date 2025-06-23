import React, { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "./Button";
import io from "socket.io-client";
import { Eraser, Trash2, Paintbrush } from "lucide-react";

const socket = io("https://toolnest-t568.onrender.com"); // Adjust to match backend

const colors = [
  "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF",
  "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080",
  "#FFC0CB", "#A52A2A", "#808080", "#000080", "#008000",
  "#800000", "#008080", "#C0C0C0", "#FFD700", "#FF69B4",
  "#32CD32"
];

export default function Whiteboard() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(3);
  const [theme, setTheme] = useState("light");

  const getCanvasContext = () => canvasRef.current?.getContext("2d");

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const getBackgroundColor = () => (theme === "dark" ? "#1a1a1a" : "#FFFFFF");

  const startDrawing = (e) => {
    const ctx = getCanvasContext();
    if (!ctx) return;

    const pos = getMousePos(e);
    setIsDrawing(true);

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";

    socket.emit("start", {
      x: pos.x,
      y: pos.y,
      color: currentColor,
      size: brushSize,
    });
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = getCanvasContext();
    if (!ctx) return;

    const pos = getMousePos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    socket.emit("draw", {
      x: pos.x,
      y: pos.y,
      color: currentColor,
    });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = getCanvasContext();
    ctx?.beginPath(); // Reset path to prevent connecting lines
    socket.emit("stop");
  };

  const handleColorChange = (color) => {
    const bgColor = getBackgroundColor();
    const selectedColor = color === "#FFFFFF" ? bgColor : color;
    setCurrentColor(selectedColor);
    socket.emit("colorChange", selectedColor);
  };

  const handleBrushSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setBrushSize(size);
    socket.emit("brushSizeChange", size);
  };

  const clearCanvas = () => {
    const ctx = getCanvasContext();
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.fillStyle = getBackgroundColor();
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    socket.emit("clear", { theme });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = getBackgroundColor();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [theme]);

  useEffect(() => {
    const ctx = getCanvasContext();
    if (!ctx) return;

    const onStart = ({ x, y, color, size }) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineCap = "round";
    };

    const onDraw = ({ x, y, color }) => {
      ctx.strokeStyle = color;
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const onStop = () => {
      ctx.beginPath(); // Prevent connecting lines
    };

    const onClear = ({ theme }) => {
      ctx.clearRect(0, 0, 800, 600);
      ctx.fillStyle = theme === "dark" ? "#1a1a1a" : "#FFFFFF";
      ctx.fillRect(0, 0, 800, 600);
    };

    socket.on("start", onStart);
    socket.on("draw", onDraw);
    socket.on("stop", onStop);
    socket.on("clear", onClear);

    return () => {
      socket.off("start", onStart);
      socket.off("draw", onDraw);
      socket.off("stop", onStop);
      socket.off("clear", onClear);
    };
  }, []);

  return (
    <div className={`flex min-h-screen items-center justify-center transition-colors ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      <div className="flex flex-col items-center p-4">
        <h1 className="text-3xl font-bold mb-6">Interactive Whiteboard</h1>

        <div className="flex flex-wrap gap-2 mb-4 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
          <Button variant="outline" size="sm" onClick={() => handleColorChange("#FFFFFF")} className="flex items-center gap-2">
            <Eraser className="w-4 h-4" /> Eraser
          </Button>
          <Button variant="default" size="sm" onClick={clearCanvas} className="flex items-center gap-2">
            <Trash2 className="w-4 h-4" /> Clear
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-4 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
          <label className="text-sm font-medium">Brush Size:</label>
          <input type="range" min="1" max="20" value={brushSize} onChange={handleBrushSizeChange} className="w-32" />
          <span className="text-sm w-8">{brushSize}px</span>
        </div>

        <div className="grid grid-cols-10 gap-2 mb-6 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-3 aspect-square rounded-full transition-all ${currentColor === color ? "border-2 border-gray-800 scale-100" : "border border-gray-300 scale-90"}`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)}
              title={color}
            />
          ))}
        </div>

        <div className="flex justify-center items-center w-full h-full mt-6">
          <div className="relative border-4 rounded-lg shadow-lg border-gray-300 dark:border-gray-600" style={{ width: "800px", height: "600px" }}>
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="cursor-crosshair absolute top-0 left-0 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
