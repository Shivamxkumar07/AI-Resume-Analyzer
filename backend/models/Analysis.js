const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
    // In the future, we can link this to the user's Clerk ID
    userId: { 
        type: String, 
        default: 'guest_user' 
    },
    fileName: {
        type: String,
        required: true
    },
    targetRole: { 
        type: String, 
        default: 'Full Stack Developer' 
    },
    atsScore: { 
        type: Number, 
        required: true 
    },
    foundSkills: [{ 
        type: String 
    }],
    missingSkills: [{ 
        type: String 
    }],
    // Store the date so we can show a history chart on the dashboard later
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Analysis', analysisSchema);