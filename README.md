# AI Interview Assistant 🤖

An intelligent AI-powered platform designed to help job seekers prepare for technical interviews through realistic mock interviews, personalized feedback, and comprehensive performance analysis.

## 🌟 Features

### Core Functionality
- **AI-Powered Mock Interviews**: Practice with AI interviewers that simulate real interview scenarios
- **Real-time Feedback**: Get instant feedback on your responses and interview performance
- **Comprehensive Analytics**: Track your progress with detailed performance metrics
- **Voice Recognition**: Speak naturally with built-in speech-to-text capabilities
- **Video Recording**: Record your interviews for later review and analysis

### Interview Categories
- **Technical Interviews**: Programming, system design, and technical concepts
- **Behavioral Interviews**: STAR method practice and soft skills assessment
- **Role-Specific**: Tailored questions for different job roles and industries

### Advanced Features
- **Personalized Question Generation**: AI creates questions based on your resume and target role
- **Performance Tracking**: Monitor improvement over time with detailed analytics
- **Interview History**: Access all your past interviews and feedback
- **Resume Analysis**: Upload your resume for customized interview preparation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Google Gemini API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-interview-assistant.git
cd ai-interview-assistant
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
MONGODB_URI=your_mongodb_connection_string
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture

### Tech Stack

#### Frontend
- **Framework**: Next.js 15 (Full-stack React framework)
- **UI Library**: React 19
- **Styling**: Tailwind CSS, Radix UI
- **Authentication**: Clerk
- **Speech Recognition**: React Speech Recognition
- **Video Recording**: React Webcam

#### Backend
- **Runtime**: Node.js (via Next.js API routes)
- **Database**: MongoDB with Mongoose ODM
- **API Framework**: Next.js API Routes (built-in backend)
- **AI Integration**: Google Gemini API
- **File Storage**: MongoDB GridFS (for audio/video files)
- **Session Management**: Clerk (JWT-based authentication)

#### Infrastructure
- **Deployment**: Vercel (serverless functions)
- **CDN**: Vercel Edge Network
- **Database Hosting**: MongoDB Atlas
- **Environment**: Serverless architecture

### Project Structure
```
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── api/             # API routes
│   ├── dashboard/       # Main application
│   ├── HowItWorks/      # Documentation pages
│   └── globals.css      # Global styles
├── components/
│   └── ui/              # Reusable UI components
├── lib/
│   └── utils.js         # Utility functions
├── utils/
│   ├── database.js      # Database connection
│   └── model.js         # Mongoose models
└── public/              # Static assets
```

## 📖 Usage Guide

### Getting Started
1. **Sign Up**: Create an account using Clerk authentication
2. **Upload Resume**: Let AI analyze your resume for personalized questions
3. **Choose Interview Type**: Select technical, behavioral, or role-specific interviews
4. **Start Interview**: Begin your mock interview with AI
5. **Review Feedback**: Get detailed analysis and improvement suggestions

### Interview Process
1. **Question Generation**: AI creates questions based on your profile
2. **Response Recording**: Answer questions via text, voice, or video
3. **Real-time Analysis**: Get immediate feedback on your responses
4. **Performance Report**: Receive comprehensive evaluation after completion

## 🔧 API Endpoints

### Interview Management
- `POST /api/save-interview` - Save new interview session
- `GET /api/get-interview/:id` - Retrieve specific interview
- `PATCH /api/update-interview/:id` - Update interview details
- `DELETE /api/delete-interview/:id` - Delete interview

### Question Handling
- `POST /api/questions` - Generate interview questions
- `POST /api/save-response` - Save candidate response
- `PATCH /api/update-response/:id` - Update existing response
- `GET /api/get-feedback/:interviewId` - Get interview feedback

### AI Integration
- `POST /api/gemini` - Process with Google Gemini AI
- `POST /api/gemini/feedback` - Generate AI feedback
- `PATCH /api/gemini/update-feedback/:id` - Update AI feedback

## 🎯 Key Components

### Dashboard Components
- **HeroSection**: Landing page introduction
- **Features**: Showcase of platform capabilities
- **HowItWorks**: Step-by-step usage guide
- **UserInterviewList**: Display all user interviews
- **AddInterview**: Create new interview sessions

### Interview Components
- **RecordAnswer**: Audio/video recording interface
- **ShowQuestions**: Display interview questions
- **Testimonial**: User success stories
- **CTA**: Call-to-action sections

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run swagger      # Generate API documentation
```

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google AI API key | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |

## 🔍 Troubleshooting

### Common Issues

**Speech Recognition Not Working**
- Ensure microphone permissions are granted
- Check browser compatibility for Web Speech API
- Try using Chrome for best results

**Video Recording Issues**
- Verify camera permissions
- Check browser support for getUserMedia API
- Ensure HTTPS in production

**API Errors**
- Verify all environment variables are set
- Check Google AI API quota limits
- Ensure MongoDB connection is active

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google for Gemini AI API
- Clerk for authentication services

## 📞 Support

- **Documentation**: Check our [How It Works](app/HowItWorks/page.jsx) page
- **Issues**: Report bugs using GitHub Issues

---


