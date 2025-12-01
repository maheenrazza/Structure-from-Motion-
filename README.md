# Structure-from-Motion-
This project implements a complete Structure from Motion (SfM) pipeline, transforming a collection of 2D photographs into an interactive 3D experience, including sparse point cloud generation and a virtual tour viewer for seamless navigation between camera viewpoints.

# Key-Features: 
- Two-View SfM: Initial reconstruction from two images, utilizing feature matching, epipolar geometry, and triangulation.
- Incremental SfM: Extension to handle a sequence of images, refining the 3D map and camera poses through Perspective-n-Point (PnP) and Bundle Adjustment.
- Interactive Virtual Tour: A viewer built using Three.js for smooth transitions between camera poses, providing a seamless 3D navigation experience.

# Phases: 
- Two-View Foundation: Implemented feature detection, essential matrix estimation, and triangulation for initial sparse 3D point cloud generation.
- Incremental SfM and Refinement: Extended the pipeline to process multiple views, incorporating global optimization to reduce drift.
- Interactive Visualization: Built a web-based virtual tour application with smooth animations between camera positions and 3D point cloud rendering.

# Tools-and-Libraries:
- Python: Core programming language for implementing the pipeline.
- OpenCV: Used for feature detection, matching, and geometric calculations.
- Open3D: Visualization and debugging of 3D point clouds.
- Three.js: For rendering the interactive virtual tour.

# Setup-Instructions:
1. Clone the repository.
2. Install the required dependencies.
3. Capture your image dataset as per the project guidelines and place them in the appropriate directory.
4. Run the pipeline using the provided scripts and visualize the outputs.

# Milestones
- Week 1: Feature matching between two images.
- Week 2: Two-view reconstruction and triangulation.
- Week 3: Incremental SfM with map refinement.
