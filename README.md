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
<img width="960" height="504" alt="url-1" src="https://github.com/user-attachments/assets/9e0742d3-7622-46fb-a157-21f50548b4fa" />
<img width="960" height="504" alt="url-3" src="https://github.com/user-attachments/assets/a9d14654-bf43-4b17-9a82-4df99be8151f" />
<img width="960" height="504" alt="url-2" src="https://github.com/user-attachments/assets/0b253053-abdd-4a74-804f-c480d8e05cf1" />


# Diagrams


# Build Photos

<img width="960" height="504" alt="build 1" src="https://github.com/user-attachments/assets/f2da0b80-6321-4a4f-925b-a66624d160d8" />



### Project Demo
# Video
https://drive.google.com/file/d/1a__vmINubcw-fduR1IhgBkE-A4nIPYHE/view?usp=drivesdk

# Additional Demos
[Add any extra demo materials/links]

## Team Contributions
- Leena: Front end
- Jithu: Back end

---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--25-25?link=https%3A%2F%2Fwww.tinkerhub.org%2Fevents%2FQ2Q1TQKX6Q%2FUseless%2520Projects)

