## Problem
Learning from YouTube playlists is often distracting and poorly organized.

## Solution
Clean YouTube provides a minimal interface to manage playlists,
watch videos sequentially, and track favorite and recent playlists.

## Live Demo
Live Site: https://clean-youtube-xi.vercel.app/

## Project Overview
This project was built to make playlist-based learning from YouTube more focused and organized. Instead of jumping through YouTube’s default interface, users can add a playlist by URL or playlist ID, browse videos, mark playlists as favorites, revisit recently opened playlists, and continue learning in a simplified UI.

## Key Features
- Add playlists using either a YouTube playlist URL or playlist ID
- Validate playlist input before fetching data
- Fetch playlist details and all videos from the YouTube Data API
- Watch individual playlist videos inside the app
- Save playlists locally for persistence
- Mark playlists as favorites
- Track recently opened playlists
- Delete playlists from local storage
- Responsive interface built with Material UI
- Clean error and success feedback using Snackbar alerts

## Tech Stack
- React
- Vite
- Easy Peasy
- React Router
- Material UI
- Axios
- React YouTube
- LocalStorage
- YouTube Data API v3

## State Management
This project uses Easy Peasy for state management with persisted store models.

### Store Modules
- `playlists`: stores fetched playlist data, loading state, and errors
- `favorites`: stores favorite playlist IDs
- `recents`: stores recently opened playlist IDs

## How It Works
1. User pastes a playlist URL or playlist ID
2. The app validates the input
3. Playlist data is fetched from the YouTube Data API
4. All playlist items are collected, including paginated results
5. The playlist is saved into persisted app state
6. User can open the playlist, watch videos, and manage favorites/recents

## Project Structure
```bash
src/
├── api/
├── components/
├── hooks/
├── store/
├── App.jsx
├── main.jsx
└── index.css
````

## Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
```

## Installation

```bash
git clone https://github.com/mkasiam/clean-youtube.git
cd clean-youtube
npm install
npm run dev
```

## Build for Production

```bash
npm run build
npm run preview
```

## What I Practiced in This Project

* Building a real-world React application with Vite
* Managing app-wide state using Easy Peasy
* Persisting user data in LocalStorage
* Working with external APIs using Axios
* Handling playlist pagination from the YouTube API
* Creating reusable UI flows with Material UI
* Building a clean content-consumption interface around a real user problem

## Future Improvements

* Add search inside a playlist
* Add user authentication
* Sync playlists across devices
* Add note-taking per video
* Add progress tracking for completed videos

## Author

M K A Siam

GitHub: [https://github.com/mkasiam](https://github.com/mkasiam)
