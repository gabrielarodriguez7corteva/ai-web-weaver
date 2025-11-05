# AI Web Weaver 🚀

AI Web Weaver is an innovative serverless application built for the Google Cloud Run Hackathon. It embodies the spirit of the "AI Studio Category" by allowing users to "vibe-code" a web page concept into existence using the power of Google's Gemini model.

## 🌟 Project Summary

**Mission:** To bridge the gap between idea and implementation by providing a tool that instantly translates natural language descriptions into functional, beautifully styled web pages.

**How it works:**
1.  **Describe:** The user types a description of a webpage they want to build.
2.  **Weave:** The application sends this prompt to the Gemini API.
3.  **Visualize:** Gemini, acting as an expert Tailwind CSS developer, generates a complete HTML file.
4.  **Interact:** The application displays a live preview and the raw HTML source code, ready to be copied and used.

This project was created for the purposes of entering the **#CloudRunHackathon**.

## 🛠️ Tech Stack & Architecture

-   **Frontend:** React 18 with TypeScript, Vite, and Tailwind CSS (via CDN).
-   **AI Model:** Google Gemini (`gemini-2.5-flash`) via the `@google/genai` SDK.
-   **Deployment:** Docker container deployed as a Google Cloud Run Service.

### Architecture Diagram

```
[User's Browser] <--> [React Frontend (Nginx on Google Cloud Run)] <--> [Google Gemini API]
      |                                  |
      |---(Enters Prompt)----------------|
      |                                  |
      |<--(Renders HTML/CSS)-------------|
```

The application is a single-page application (SPA) built into static assets and served by an Nginx web server inside a Docker container on Cloud Run. Client-side logic handles the API call to Gemini.

## ✅ Hackathon Requirements Checklist

-   [x] **Category:** AI Studio Category.
-   [x] **AI Studio Usage:** The core concept is a direct implementation of AI Studio's "vibe-coding" ethos, turning ideas into code.
-   [x] **Deployed on Cloud Run:** The project is containerized with Docker and configured for seamless deployment to Google Cloud Run.
-   [x] **Use of Google AI Models:** Core functionality is powered by the Gemini model.

## 🚀 How to Run Locally

**Prerequisites:**
-   Node.js and npm installed.
-   A Gemini API key.

**Steps:**

1.  **Clone the repository.**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the root directory and add your Gemini API key:
    ```
    API_KEY=your_gemini_api_key_here
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## ☁️ How to Deploy to Cloud Run

**Prerequisites:**
-   A Google Cloud Project with Billing enabled.
-   `gcloud` CLI installed and authenticated.
-   APIs enabled: Cloud Build, Artifact Registry, Cloud Run.

**Steps:**

1.  **Clone the repository.**
2.  **Set up Artifact Registry (only needs to be done once per project):**
    ```bash
    gcloud artifacts repositories create my-react-app --repository-format=docker --location=us-central1
    ```
3.  **Submit the build to Cloud Build:**
    The `cloudbuild.yaml` file is configured to build the Docker image, pass your API key securely, push the image to Artifact Registry, and deploy it to Cloud Run.

    Replace `your_gemini_api_key_here` with your actual key in the command below:
    ```bash
    gcloud builds submit --config cloudbuild.yaml --substitutions=_API_KEY="your_gemini_api_key_here" .
    ```

This command automates the entire deployment process. Your AI Web Weaver will be live in minutes!
