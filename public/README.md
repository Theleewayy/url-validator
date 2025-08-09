<img width="3188" height="1202" alt="frame (3)" src="https://github.com/user-attachments/assets/517ad8e9-ad22-457d-9538-a9e62d137cd7" />


# useless url validator🎯


## Basic Details
### Team Name: code red


### Team Members
- Team Lead: Leena Hasoon- SOE
- Member 2: Jithu K- SOE

### Project Description
A web application that always rejects URLs regardless of their validity. Perfect for testing error handling, demonstrating "useless" applications, or just having a laugh!
### The Problem (that doesn't exist)
urls should always work
### The Solution (that nobody asked for)
url doesnt work no matter what
## Technical Details
### Technologies/Components Used
**Request:**
```json
{
  "url": "https://www.google.com"
}
```

**Response:**
```json
{
  "success": false,
  "message": "Invalid URL - Please try again",
  "error": "URL_VALIDATION_FAILED",
  "details": {
    "reason": "URL format is not acceptable",
    "suggestion": "Please check your URL and try again",
    "timestamp": "2024-01-XX..."
  }
}
```

### GET `/health`
**Server health check**

**Response:**
```json
{
  "success": true,
  "message": "Useless URL Validator is running",
  "status": "operational",
  "timestamp": "2024-01-XX..."
}
```

### POST `/validate-url`
**Alternative endpoint (also always fails)**

## 🎨 Customization

### Changing Error Messages
Edit the `uselessMessages` array in `script.js`:

```javascript
const uselessMessages = [
    "Invalid URL - Please try again",
    "URL format is not acceptable",
    "This URL doesn't meet our standards",
    // Add your own messages here
];
```

### Modifying Server Response
Edit the response in `server.js`:

```javascript
res.status(400).json({
    success: false,
    message: "Your custom error message here",
    error: "CUSTOM_ERROR_CODE"
});
```

### Styling Changes
Modify `style.css` to change colors, fonts, or layout:

```css
:root {
    --primary-color: #667eea;
    --error-color: #e53e3e;
    --background-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Implementation
For Software:
# Installation
1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd useless-url-validator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   # For production
   npm start
   

# Run
**Open your browser**
   Navigate to https://url-validator-ni7k-git-main-leenas-projects-afa3b228.vercel.app

### Project Documentation
For Software:

# Screenshots (Add at least 3)


# Diagrams

For Hardware:

# Schematic & Circuit
![Circuit](Add your circuit diagram here)
*Add caption explaining connections*

![Schematic](Add your schematic diagram here)
*Add caption explaining the schematic*

# Build Photos
![Components](Add photo of your components here)
*List out all components shown*

![Build](Add photos of build process here)
*Explain the build steps*

![Final](Add photo of final product here)
*Explain the final build*

### Project Demo
# Video
[Add your demo video link here]
*Explain what the video demonstrates*

# Additional Demos
[Add any extra demo materials/links]

## Team Contributions
- [Name 1]: [Specific contributions]
- [Name 2]: [Specific contributions]
- [Name 3]: [Specific contributions]

---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--25-25?link=https%3A%2F%2Fwww.tinkerhub.org%2Fevents%2FQ2Q1TQKX6Q%2FUseless%2520Projects)


