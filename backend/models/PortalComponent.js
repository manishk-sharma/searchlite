import mongoose from 'mongoose';

const portalComponentSchema = new mongoose.Schema({
    type: { 
        type: String, 
        required: true, 
        enum: ['carousel', 'testimonial', 'team_member', 'timeline_milestone'] 
    },
    title: { type: String, required: true },
    subtitle: { type: String },
    content: { type: String },
    imageUrl: { type: String },
    linkUrl: { type: String },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    meta: { type: Map, of: String }, // Flexible for extra data like 'role' for team or 'year' for timeline
}, { timestamps: true });

export default mongoose.model('PortalComponent', portalComponentSchema);
