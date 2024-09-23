const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'provider',
    },
    averageRating: {  
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    
    services: [{
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }],
    
}
,{
  timestamps: true
});

module.exports = mongoose.model('Provider', ProviderSchema);
