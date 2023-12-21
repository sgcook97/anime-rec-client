# SamnRoll
This repository contains the frontend of the Samnroll anime recommendation web app.

Samnroll url: https://samnroll.vercel.app/

<u>**Example user info:**</u><br>
username: testuser<br>
password: testpass123

---

**Description**: The Next.js client, built with TypeScript, interacts with a Flask API backend. Upon registration, users select favorite anime, which the backend uses to generate personalized recommendations.

Upon login, users access the home screen displaying personalized recommendations and top-rated anime. Recommendations are based on the user's training status: new users receive content-based recommendations, while trained users receive collaborative filtering-based suggestions.

Users can search for anime, view details, rate, and access content-based recommendations by clicking on the anime poster.

*Other features will be implented in the future.*

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/sgcook97/anime-recommender-client.git
   cd anime-recommender-client

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install

2. Run the application:
    ```bash
    npm run next-dev
    # or
    yarn next-dev

Access the application at http://localhost:3000 in your web browser.

## Usage

* **Registration/Login**: Register an account or log in to access personalized recommendations.
* **Home Screen**: Explore personalized recommendations and top-rated anime titles.
* **Anime Details and Rating**: Search for anime, view details, and rate titles for improved recommendations.
