# Real-Time Object Detection Web Application

## Access
- The project can be accessed at: https://ak-khan-object-detection.vercel.app/

## Project Overview
- A web-based application for real-time object detection using webcam input.
- Built with modern web technologies for a responsive and user-friendly interface.

## Technical Stack
- **Frontend:** Vanilla JavaScript
- **Build Tool:** Vite.js for development and bundling
- **Object Detection Library:** TensorFlow.js with COCO-SSD model
- **Deployment:** Client-side web application

## Key Features
- Real-time detection of multiple objects using the webcam.
- Visualization enhancements including bounding boxes and confidence scores.
- Dynamic color coding for different object classes.

## Implementation Details
- **Video Processing:** Utilizes the WebRTC API to access the webcam and stream video.
- **Model Loading:** COCO-SSD model is loaded using TensorFlow.js for object detection.
- **Canvas Rendering:** HTML5 Canvas is used to overlay detection results on the video stream.
- **Responsive Design:** The application is optimized for both desktop and mobile browsers.

## How to Run the Code
1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies:**
   Ensure you have Node.js (version 16+) installed, then run:
   ```bash
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```

4. **Open the Application:**
   - Navigate to `http://localhost:3000` (or the specified port) in your web browser.
   - Allow camera access when prompted.

5. **Usage:**
   - The application will start detecting objects in real-time using your webcam.
   - Detected objects will be highlighted with bounding boxes and labels.

## Future Improvements
- Model selection options for different object detection models.
- Object tracking capabilities.
- Export/save detection results feature.

## License
- This project is licensed under the MIT License.

![image](https://github.com/user-attachments/assets/d60f6d3b-08de-4326-a993-50408d1c0166)

---
