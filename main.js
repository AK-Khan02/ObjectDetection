import './style.css';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

let model;
let video;
let canvas;
let ctx;

// Color palette for different object classes
const colors = {
    person: '#FF0000',      // Red
    bicycle: '#00FF00',     // Green
    car: '#0000FF',         // Blue
    motorcycle: '#FF00FF',  // Magenta
    airplane: '#00FFFF',    // Cyan
    bus: '#FFFF00',        // Yellow
    train: '#FF8000',      // Orange
    truck: '#8000FF',      // Purple
    boat: '#0080FF',       // Light Blue
    'traffic light': '#FF0080', // Pink
    'fire hydrant': '#80FF00',  // Lime
    'stop sign': '#FF3333',     // Light Red
    'parking meter': '#33FF33', // Light Green
    bench: '#3333FF',          // Light Blue
    bird: '#FF9933',          // Orange
    cat: '#99FF33',          // Yellow-Green
    dog: '#3399FF',          // Sky Blue
    horse: '#FF3399',        // Pink
    sheep: '#33FF99',        // Turquoise
    cow: '#9933FF',          // Purple
};

// Get a color for an object class
function getColorForClass(className) {
    return colors[className.toLowerCase()] || generateColorFromText(className);
}

// Generate a unique color based on text
function generateColorFromText(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
}

// Draw detection box and label
function drawDetection(prediction) {
    const [x, y, width, height] = prediction.bbox;
    const className = prediction.class.toLowerCase();
    const color = getColorForClass(className);
    
    // Draw box
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, width, height);
    
    // Prepare label text
    const label = `${prediction.class} (${Math.round(prediction.score * 100)}%)`;
    
    // Draw label background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    const textWidth = ctx.measureText(label).width;
    ctx.fillRect(x, y - 25, textWidth + 10, 25);
    
    // Draw label text
    ctx.fillStyle = color;
    ctx.font = 'bold 16px Arial';
    ctx.fillText(label, x + 5, y - 5);
}

// Initialize the application
async function init() {
    // Get DOM elements
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    const status = document.getElementById('status');

    try {
        // Load COCO-SSD model
        status.textContent = 'Loading model...';
        model = await cocoSsd.load();
        status.textContent = 'Model loaded successfully!';

        // Get webcam access
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: 640,
                height: 480,
                facingMode: 'user'
            }
        });
        video.srcObject = stream;
        
        // Wait for video to be loaded
        await new Promise((resolve) => {
            video.onloadedmetadata = () => {
                video.play();
                resolve();
            };
        });

        // Set canvas size to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Start detection
        status.textContent = 'Running detection...';
        detectObjects();
    } catch (err) {
        status.textContent = 'Error: ' + err.message;
        console.error('Initialization error:', err);
    }
}

// Detect objects in video stream
async function detectObjects() {
    if (!model || !video.readyState) {
        requestAnimationFrame(detectObjects);
        return;
    }
    
    try {
        // Run detection
        const predictions = await model.detect(video);
        
        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw predictions
        predictions.forEach(prediction => {
            drawDetection(prediction);
        });
        
        // Update status with detection count
        const status = document.getElementById('status');
        if (predictions.length > 0) {
            status.textContent = `Detected ${predictions.length} object${predictions.length !== 1 ? 's' : ''}`;
            status.className = 'success';
        }
        
    } catch (error) {
        console.error('Detection error:', error);
    }
    
    // Continue detection
    requestAnimationFrame(detectObjects);
}

// Start the application when page loads
window.addEventListener('load', init);
