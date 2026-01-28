# NytLyf

NytLyf is a mobile application built using React Native and Expo. It provides a platform for users to explore events, browse various categories, and manage their saved items and profile. This project utilizes Expo Router for navigation and TypeScript for type safety.

## Features

- **Home Feed**: The main landing interface for users.
- **Explore**: Discover new content and events.
- **Categories**: Browse items by specific categories.
- **Saved Items**: Bookmark and view saved content.
- **Profile**: Manage user account and preferences.
- **Search**: Functionality to search across the application.
- **Settings**: Application configuration and options.

## Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **Styling**: React Native StyleSheet / Themed Components
- **Fonts**: Google Fonts (Poppins)

## Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (LTS version recommended)
- npm or yarn package manager

## Installation

1. Navigate to the project directory:

   ```bash
   cd my-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Running the Application

To start the development server, run:

```bash
npx expo start
```

This command will ensure the Expo server is running. You can then:

- Scan the QR code with the Expo Go app on your Android or iOS device.
- Press `a` to run on an Android Emulator.
- Press `i` to run on an iOS Simulator.
- Press `w` to run in the web browser.

## Project Structure

The project follows a standard Expo Router structure:

- **app/**: Contains the main application code and routing logic.
  - **(tabs)/**: Defines the bottom tab navigation screens (Home, Explore, Categories, Saved, Profile).
  - **ui/**: User interface screens and layouts.
- **components/**: Reusable UI components used throughout the application.
- **assets/**: Static assets such as images and fonts.
- **constants/**: Configuration constants and valid property values.
- **hooks/**: Custom React hooks for shared logic.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push to the branch and submit a pull request.
