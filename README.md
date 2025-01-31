# SyncTracker Mobile

A React Native mobile application for tracking student attendance using QR codes.

## Overview

SyncTracker Mobile is a student attendance tracking system that allows students to:

* Login/Register with their academic credentials
* View their profile information
* Scan QR codes to mark attendance for classes
* View and manage their enrolled classes
* Update their profile details

## Features

### Authentication

* User login with email and password
* User registration
* Secure authentication state management using Redux

### Profile Management

* View profile information including:
  * Email
  * Name
  * Student Number
* Edit profile details through modal interfaces
* Change password functionality

### Class Management

* View list of enrolled classes
* Navigate to QR scanner for attendance marking
* Real-time class data fetching from backend

### QR Code Scanning

* Camera integration for QR code scanning
* Real-time attendance marking
* Success/failure feedback
* Permission handling for camera access

## Technical Stack

* **Framework** : React Native with Expo
* **State Management** : Redux
* **Styling** : TailwindCSS (NativeWind)
* **Navigation** : React Navigation
* **UI Components** : React Native Reanimated for animations
* **Forms** : React Hook Form
* **Networking** : Axios
* **Other Tools** :
* Expo Barcode Scanner
* React Native Modal
* React Native Safe Area Context

## Getting Started

1. Install dependencies:

**npm** **install**

2. Start the development server:

**npm** **start**

3. Run on specific platform:

**npm** **run** **android**  **# For Android**

**npm** **run** **ios**      **# For iOS**

**npm** **run** **web**      **# For web browser**

## Project Structure

**syncTracker-Mobile/**

**├── App.js              # Root component**

**├── appNavigator.js     # Navigation configuration**

**├── screens/            # Screen components**

**├── redux/             # Redux state management**

**├── assets/            # Static assets**

**└── package.json       # Project dependencies**

## Contributing

Feel free to contribute to this project by creating pull requests or reporting issues.

## License

TBD
