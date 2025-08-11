    
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
const uri = process.env.MONGODB_URI;

const MockInterviewSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  preparationLevel: {
    type: String, 
    required: true,
  },
  jobResponse: {
    type:  mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  mockId: {
    type: String,
    unique: true,
  },
}, {
  timestamps: true,strict: false 
});

export default mongoose.models.MockInterview || mongoose.model('MockInterview', MockInterviewSchema);

