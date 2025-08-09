const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// POST endpoint that always returns error 400
app.post('/api/validate-url', (req, res) => {
    try {
        // Log the request for debugging
        console.log(`🔍 URL Validation Request:`, {
            url: req.body.url,
            timestamp: new Date().toISOString(),
            userAgent: req.get('User-Agent')
        });

        // Always return error 400 regardless of URL validity
        res.status(400).json({
            success: false,
            message: "Invalid URL - Please try again",
            error: "URL_VALIDATION_FAILED",
            details: {
                reason: "URL format is not acceptable",
                suggestion: "Please check your URL and try again",
                timestamp: new Date().toISOString()
            }
        });

        console.log(`❌ Validation failed for: ${req.body.url}`);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            success: false,
            message: "Server error occurred",
            error: "INTERNAL_SERVER_ERROR"
        });
    }
});

// Additional endpoint for testing (also always fails)
app.post('/validate-url', (req, res) => {
    try {
        console.log(`🔍 Alternative validation request for: ${req.body.url}`);
        
        res.status(400).json({
            success: false,
            message: "Invalid URL - Please try again",
            error: "ALTERNATIVE_VALIDATION_FAILED"
        });
    } catch (error) {
        console.error('Alternative endpoint error:', error);
        res.status(500).json({
            success: false,
            message: "Server error occurred",
            error: "INTERNAL_SERVER_ERROR"
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Useless URL Validator is running",
        status: "operational",
        timestamp: new Date().toISOString()
    });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not found",
        error: "NOT_FOUND",
        availableEndpoints: [
            "GET /",
            "POST /api/validate-url",
            "POST /validate-url",
            "GET /health"
        ]
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: "INTERNAL_SERVER_ERROR",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Useless URL Validator running on http://localhost:${PORT}`);
    console.log(`💡 This app will always show "Invalid URL" no matter what you enter!`);
    console.log(`📝 Available endpoints:`);
    console.log(`   - GET  / (main page)`);
    console.log(`   - POST /api/validate-url (always returns error 400)`);
    console.log(`   - POST /validate-url (alternative endpoint)`);
    console.log(`   - GET  /health (health check)`);
    console.log(`🔧 Press Ctrl+C to stop the server`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Server terminated');
    process.exit(0);
});
