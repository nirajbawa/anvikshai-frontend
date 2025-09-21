import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Users, 
  BookOpen, 
  Star,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  MapPin,
  Clock,
  Award,
  Zap,
  Shield,
  Globe,
  Sparkles,
  Rocket,
  Eye,
  Heart
} from 'lucide-react';

function CarrierHomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-6000"></div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-300 rounded-full opacity-40 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${20 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl border-b border-purple-100 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                AnvikshAI
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-purple-700 hover:text-purple-500 transition-all duration-300 font-medium relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#how-it-works" className="text-purple-700 hover:text-purple-500 transition-all duration-300 font-medium relative group">
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#about" className="text-purple-700 hover:text-purple-500 transition-all duration-300 font-medium relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <button className="text-purple-700 hover:text-purple-500 transition-all duration-300 font-medium relative group">
                Login
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Sign Up Free
                </div>
              </button>
            </div>

            <button 
              className="md:hidden text-purple-700 hover:text-purple-500 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-purple-100 shadow-lg">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <a href="#features" className="block py-3 text-purple-700 hover:text-purple-500 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="block py-3 text-purple-700 hover:text-purple-500 transition-colors font-medium">How It Works</a>
              <a href="#about" className="block py-3 text-purple-700 hover:text-purple-500 transition-colors font-medium">About</a>
              <button className="block py-3 text-purple-700 hover:text-purple-500 transition-colors font-medium">Login</button>
              <button className="w-full mt-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                Sign Up Free
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 min-h-screen flex items-center">
        {/* Grid Background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(147, 51, 234, 0.1) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              {/* Badge */}
              <div className="inline-flex items-center space-x-3 bg-white backdrop-blur-md border border-purple-200 text-purple-700 px-6 py-3 rounded-full text-sm font-medium shadow-lg hover:shadow-purple-200 transition-all duration-500 group">
                <div className="relative">
                  <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
                  <div className="absolute inset-0 bg-purple-400 rounded-full blur-sm opacity-50 animate-ping"></div>
                </div>
                <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent font-semibold">
                  AI-Powered Career Intelligence
                </span>
              </div>
              
              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                  <span className="text-purple-900">
                    Your AI Career
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                    Advisor for India
                  </span>
                </h1>
                
                {/* Underline */}
                <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full shadow-lg shadow-purple-300 animate-pulse"></div>
              </div>
              
              <p className="text-xl lg:text-2xl text-purple-700 leading-relaxed font-light">
                Navigate India's evolving job market with confidence. Our AI maps your unique skills, 
                analyzes market trends, and creates <span className="text-purple-600 font-semibold">personalized career roadmaps</span> tailored for Indian students.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <button className="group relative" onClick={() => navigate('/chatbot')}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-purple-500 to-purple-700 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3">
                    <Rocket className="w-6 h-6" />
                    <span>Start Career Assessment</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                
                <button className="group relative bg-white backdrop-blur-md border border-purple-200 text-purple-700 px-10 py-5 rounded-full font-semibold text-lg hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg">
                  <Eye className="w-6 h-6" />
                  <span>Watch Demo</span>
                </button>
              </div>
              
              {/* Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                <div className="flex items-center space-x-3 bg-white backdrop-blur-md border border-purple-100 rounded-2xl p-4 hover:bg-purple-50 transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-purple-700 font-medium">100% Free Assessment</span>
                </div>
                <div className="flex items-center space-x-3 bg-white backdrop-blur-md border border-purple-100 rounded-2xl p-4 hover:bg-purple-50 transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-purple-700 font-medium">AI-Powered Insights</span>
                </div>
                <div className="flex items-center space-x-3 bg-white backdrop-blur-md border border-purple-100 rounded-2xl p-4 hover:bg-purple-50 transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-purple-700 font-medium">Personalized Roadmaps</span>
                </div>
              </div>
            </div>
            
            {/* Hero Image Section */}
            <div className="relative lg:ml-8">
              {/* Main Card */}
              <div className="relative group">
                {/* Glowing background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-200 to-purple-100 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-pulse"></div>
                
                {/* Container */}
                <div className="relative bg-white backdrop-blur-md border border-purple-100 rounded-3xl p-8 shadow-xl hover:shadow-purple-200 transition-all duration-500">
                  <img 
                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Indian students using AI technology for career planning"
                    className="rounded-2xl w-full h-80 object-cover shadow-lg"
                  />
                  
                  {/* Floating Cards */}
                  <div className="absolute -top-6 -left-6 bg-white backdrop-blur-md border border-purple-100 p-4 rounded-2xl shadow-xl animate-float hover:scale-110 transition-transform duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-purple-700">Career Growth</div>
                        <div className="text-xs text-purple-500">+85% Success Rate</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-6 -right-6 bg-white backdrop-blur-md border border-purple-100 p-4 rounded-2xl shadow-xl animate-float-delay hover:scale-110 transition-transform duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-purple-700">Skill Mapping</div>
                        <div className="text-xs text-purple-500">500+ Skills Tracked</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional floating element */}
                  <div className="absolute top-1/2 -right-8 bg-white backdrop-blur-md border border-purple-100 p-3 rounded-xl shadow-xl animate-bounce">
                    <Heart className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-white to-purple-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="relative bg-white backdrop-blur-md border border-purple-100 rounded-3xl p-8 hover:bg-purple-50 hover:border-purple-200 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-100">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="text-4xl md:text-5xl font-black text-purple-700 mb-3">50K+</div>
                  <div className="text-purple-600 text-sm md:text-base font-medium">Students Guided</div>
                </div>
              </div>
            </div>
            <div className="text-center group">
              <div className="relative bg-white backdrop-blur-md border border-purple-100 rounded-3xl p-8 hover:bg-purple-50 hover:border-purple-200 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-100">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="text-4xl md:text-5xl font-black text-purple-700 mb-3">1000+</div>
                  <div className="text-purple-600 text-sm md:text-base font-medium">Career Paths</div>
                </div>
              </div>
            </div>
            <div className="text-center group">
              <div className="relative bg-white backdrop-blur-md border border-purple-100 rounded-3xl p-8 hover:bg-purple-50 hover:border-purple-200 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-100">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="text-4xl md:text-5xl font-black text-purple-700 mb-3">95%</div>
                  <div className="text-purple-600 text-sm md:text-base font-medium">Accuracy Rate</div>
                </div>
              </div>
            </div>
            <div className="text-center group">
              <div className="relative bg-white backdrop-blur-md border border-purple-100 rounded-3xl p-8 hover:bg-purple-50 hover:border-purple-200 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-100">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="text-4xl md:text-5xl font-black text-purple-700 mb-3">24/7</div>
                  <div className="text-purple-600 text-sm md:text-base font-medium">AI Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-purple-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-white backdrop-blur-md border border-purple-200 text-purple-700 px-6 py-3 rounded-full text-sm font-medium shadow-lg mb-8">
              <Zap className="w-5 h-5 text-purple-500 animate-pulse" />
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent font-semibold">
                Powered by Advanced AI
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black mb-6">
              <span className="text-purple-900">
                Advanced AI Features for
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Career Success
              </span>
            </h2>
            <p className="text-xl text-purple-700 max-w-4xl mx-auto leading-relaxed">
              Our cutting-edge AI platform combines machine learning with deep insights into India's 
              job market to provide <span className="text-purple-600 font-semibold">unparalleled career guidance</span>.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 to-purple-300 rounded-3xl blur-lg opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white backdrop-blur-md border border-purple-100 p-8 rounded-3xl hover:bg-purple-50 hover:border-purple-200 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-100">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-300 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-purple-800 mb-4 group-hover:text-purple-600 transition-colors">Smart Skill Analysis</h3>
                <p className="text-purple-700 leading-relaxed group-hover:text-purple-800 transition-colors">
                  Advanced AI algorithms analyze your technical and soft skills, identifying strengths 
                  and growth opportunities based on current market demands.
                </p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 to-purple-300 rounded-3xl blur-lg opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white backdrop-blur-md border border-purple-100 p-8 rounded-3xl hover:bg-purple-50 hover:border-purple-200 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-100">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-300 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-purple-800 mb-4 group-hover:text-purple-600 transition-colors">Personalized Career Paths</h3>
                <p className="text-purple-700 leading-relaxed group-hover:text-purple-800 transition-colors">
                  Get customized career recommendations that align with your interests, aptitude, 
                  and the evolving needs of India's job market.
                </p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 to-purple-300 rounded-3xl blur-lg opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white backdrop-blur-md border border-purple-100 p-8 rounded-3xl hover:bg-purple-50 hover:border-purple-200 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-100">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-300 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-purple-800 mb-4 group-hover:text-purple-600 transition-colors">Market Intelligence</h3>
                <p className="text-purple-700 leading-relaxed group-hover:text-purple-800 transition-colors">
                  Real-time analysis of job trends, salary insights, and emerging opportunities 
                  across different sectors in India's economy.
                </p>
              </div>
            </div>

            {/* Feature Card 4 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 to-purple-300 rounded-3xl blur-lg opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white backdrop-blur-md border border-purple-100 p-8 rounded-3xl hover:bg-purple-50 hover:border-purple-200 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-100">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-300 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-purple-800 mb-4 group-hover:text-purple-600 transition-colors">Learning Roadmaps</h3>
                <p className="text-purple-700 leading-relaxed group-hover:text-purple-800 transition-colors">
                  Curated learning paths with courses, certifications, and practical projects 
                  to build the exact skills needed for your target career.
                </p>
              </div>
            </div>

            {/* Feature Card 5 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 to-purple-300 rounded-3xl blur-lg opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white backdrop-blur-md border border-purple-100 p-8 rounded-3xl hover:bg-purple-50 hover:border-purple-200 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-100">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-300 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-purple-800 mb-4 group-hover:text-purple-600 transition-colors">Industry Mentorship</h3>
                <p className="text-purple-700 leading-relaxed group-hover:text-purple-800 transition-colors">
                  Connect with experienced professionals and industry leaders who provide 
                  practical guidance and career insights.
                </p>
              </div>
            </div>

            {/* Feature Card 6 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 to-purple-300 rounded-3xl blur-lg opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white backdrop-blur-md border border-purple-100 p-8 rounded-3xl hover:bg-purple-50 hover:border-purple-200 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-100">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-300 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-purple-800 mb-4 group-hover:text-purple-600 transition-colors">Progress Tracking</h3>
                <p className="text-purple-700 leading-relaxed group-hover:text-purple-800 transition-colors">
                  Monitor your skill development journey with detailed analytics and 
                  milestone celebrations to keep you motivated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-purple-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-white backdrop-blur-md border border-purple-200 text-purple-700 px-6 py-3 rounded-full text-sm font-medium shadow-lg mb-8">
              <Rocket className="w-5 h-5 text-purple-500 animate-pulse" />
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent font-semibold">
                Simple 4-Step Process
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black mb-6">
              <span className="text-purple-900">
                How AnvikshAI
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-xl text-purple-700 max-w-4xl mx-auto leading-relaxed">
              Four simple steps to discover your ideal career path and build the skills 
              you need for success in <span className="text-purple-600 font-semibold">India's dynamic job market</span>.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 to-purple-300 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-start space-x-6 bg-white backdrop-blur-md border border-purple-100 p-6 rounded-3xl hover:bg-purple-50 transition-all duration-500">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-300 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                    <div className="relative flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-purple-800 mb-3 group-hover:text-purple-600 transition-colors">Complete AI Assessment</h3>
                    <p className="text-purple-700 leading-relaxed group-hover:text-purple-800 transition-colors">
                      Take our comprehensive 15-minute assessment that analyzes your interests, skills, 
                      personality traits, and career aspirations using advanced AI algorithms.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 to-purple-300 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-start space-x-6 bg-white backdrop-blur-md border border-purple-100 p-6 rounded-3xl hover:bg-purple-50 transition-all duration-500">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-300 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                    <div className="relative flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-purple-800 mb-3 group-hover:text-purple-600 transition-colors">Get AI-Powered Insights</h3>
                    <p className="text-purple-700 leading-relaxed group-hover:text-purple-800 transition-colors">
                      Our AI analyzes your profile against 1000+ career paths and current market trends 
                      to provide personalized recommendations with detailed career insights.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 to-purple-300 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-start space-x-6 bg-white backdrop-blur-md border border-purple-100 p-6 rounded-3xl hover:bg-purple-50 transition-all duration-500">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-300 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                    <div className="relative flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-purple-800 mb-3 group-hover:text-purple-600 transition-colors">Follow Custom Roadmap</h3>
                    <p className="text-purple-700 leading-relaxed group-hover:text-purple-800 transition-colors">
                      Receive a personalized learning roadmap with specific courses, certifications, 
                      and practical projects tailored to your chosen career path.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 to-purple-300 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-start space-x-6 bg-white backdrop-blur-md border border-purple-100 p-6 rounded-3xl hover:bg-purple-50 transition-all duration-500">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-300 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                    <div className="relative flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-purple-800 mb-3 group-hover:text-purple-600 transition-colors">Track & Achieve Goals</h3>
                    <p className="text-purple-700 leading-relaxed group-hover:text-purple-800 transition-colors">
                      Monitor your progress with AI-powered analytics, connect with mentors, 
                      and receive continuous guidance as you advance toward your career goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative lg:ml-8">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-200 to-purple-100 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-pulse"></div>
                
                <div className="relative bg-white backdrop-blur-md border border-purple-100 rounded-3xl p-8 shadow-xl hover:shadow-purple-200 transition-all duration-500">
                  <img 
                    src="https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Indian students planning their career with AI technology"
                    className="rounded-2xl w-full h-80 object-cover shadow-lg"
                  />
                  
                  {/* Process Indicators */}
                  <div className="absolute top-12 left-12 bg-white backdrop-blur-md border border-purple-100 p-4 rounded-2xl shadow-xl animate-float">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-pulse shadow-lg"></div>
                      <span className="text-sm font-bold text-purple-700">AI Processing...</span>
                    </div>
                  </div>
                  
                  {/* Additional floating elements */}
                  <div className="absolute bottom-12 right-12 bg-white backdrop-blur-md border border-purple-100 p-3 rounded-xl shadow-xl animate-bounce">
                    <Sparkles className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-purple-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-white backdrop-blur-md border border-purple-200 text-purple-700 px-6 py-3 rounded-full text-sm font-medium shadow-lg mb-8">
              <Heart className="w-5 h-5 text-purple-500 animate-pulse" />
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent font-semibold">
                Student Success Stories
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black mb-6">
              <span className="text-purple-900">
                Success Stories from
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Indian Students
              </span>
            </h2>
            <p className="text-xl text-purple-700 max-w-4xl mx-auto leading-relaxed">
              See how CareerGuru AI has <span className="text-purple-600 font-semibold">transformed career journeys</span> across India
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 to-purple-300 rounded-3xl blur-lg opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white backdrop-blur-md border border-purple-100 p-8 rounded-3xl hover:bg-purple-50 hover:border-purple-200 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-100">
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current drop-shadow-lg" />
                  ))}
                </div>
                <p className="text-purple-700 mb-8 text-lg leading-relaxed italic group-hover:text-purple-800 transition-colors">
                  "CareerGuru AI helped me discover my passion for data science. The personalized 
                  roadmap was exactly what I needed to transition from engineering to my dream career."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-300 rounded-full blur opacity-50"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      P
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-purple-800 text-lg group-hover:text-purple-600 transition-colors">Priya Sharma</div>
                    <div className="text-purple-600 group-hover:text-purple-700 transition-colors">Data Scientist, Bangalore</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 to-purple-300 rounded-3xl blur-lg opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white backdrop-blur-md border border-purple-100 p-8 rounded-3xl hover:bg-purple-50 hover:border-purple-200 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-100">
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current drop-shadow-lg" />
                  ))}
                </div>
                <p className="text-purple-700 mb-8 text-lg leading-relaxed italic group-hover:text-purple-800 transition-colors">
                  "The AI assessment revealed skills I didn't even know I had. Now I'm successfully 
                  working in UX design, a field I never considered before using this platform."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-300 rounded-full blur opacity-50"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      R
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-purple-800 text-lg group-hover:text-purple-600 transition-colors">Rahul Patel</div>
                    <div className="text-purple-600 group-hover:text-purple-700 transition-colors">UX Designer, Mumbai</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 to-purple-300 rounded-3xl blur-lg opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white backdrop-blur-md border border-purple-100 p-8 rounded-3xl hover:bg-purple-50 hover:border-purple-200 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-100">
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current drop-shadow-lg" />
                  ))}
                </div>
                <p className="text-purple-700 mb-8 text-lg leading-relaxed italic group-hover:text-purple-800 transition-colors">
                  "As a first-generation college student, I had no guidance. CareerGuru AI became 
                  my mentor and helped me land a job at a top tech company."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-300 rounded-full blur opacity-50"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      A
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-purple-800 text-lg group-hover:text-purple-600 transition-colors">Anita Singh</div>
                    <div className="text-purple-600 group-hover:text-purple-700 transition-colors">Software Engineer, Hyderabad</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-purple-50"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/2 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-white backdrop-blur-md border border-purple-100 rounded-3xl p-12 shadow-xl hover:shadow-purple-200 transition-all duration-500">
            <div className="inline-flex items-center space-x-2 bg-white backdrop-blur-md border border-purple-200 text-purple-700 px-6 py-3 rounded-full text-sm font-medium shadow-lg mb-8">
              <Rocket className="w-5 h-5 text-purple-500 animate-pulse" />
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent font-semibold">
                Start Your Journey Today
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-black mb-8">
              <span className="text-purple-900">
                Ready to Discover Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Perfect Career Path?
              </span>
            </h2>
            
            <p className="text-xl text-purple-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join over <span className="text-purple-600 font-bold">50,000 Indian students</span> who have transformed their careers with AI-powered guidance. 
              Start your personalized assessment today and <span className="text-purple-600 font-semibold">unlock your potential</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
              <button className="group relative" onClick={() => navigate('/chatbot')}>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-purple-500 to-purple-700 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3">
                  <Rocket className="w-6 h-6" />
                  <span>Start Free Assessment</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              
              <button className="group relative bg-white backdrop-blur-md border border-purple-200 text-purple-700 px-10 py-5 rounded-full font-semibold text-lg hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg">
                <Eye className="w-6 h-6" />
                <span>Schedule Demo</span>
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-purple-700">
              <div className="flex items-center space-x-3 bg-white backdrop-blur-md border border-purple-100 rounded-2xl px-6 py-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">Secure & Private</span>
              </div>
              <div className="flex items-center space-x-3 bg-white backdrop-blur-md border border-purple-100 rounded-2xl px-6 py-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">Available in 10+ Languages</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-50 via-white to-purple-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl blur opacity-75 animate-pulse"></div>
                  <div className="relative w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  CareerGuru AI
                </span>
              </div>
              <p className="text-purple-700 leading-relaxed">
                Empowering Indian students with AI-powered career guidance for a brighter, 
                more successful future in the evolving job market.
              </p>
              <div className="flex space-x-4">
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative w-10 h-10 bg-white backdrop-blur-md border border-purple-100 rounded-full flex items-center justify-center hover:bg-purple-50 transition-all duration-300 cursor-pointer">
                    <span className="text-purple-700 text-sm font-bold">f</span>
                  </div>
                </div>
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative w-10 h-10 bg-white backdrop-blur-md border border-purple-100 rounded-full flex items-center justify-center hover:bg-purple-50 transition-all duration-300 cursor-pointer">
                    <span className="text-purple-700 text-sm font-bold">t</span>
                  </div>
                </div>
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative w-10 h-10 bg-white backdrop-blur-md border border-purple-100 rounded-full flex items-center justify-center hover:bg-purple-50 transition-all duration-300 cursor-pointer">
                    <span className="text-purple-700 text-sm font-bold">in</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-purple-800 font-bold mb-6 text-lg">Platform</h4>
              <div className="space-y-3">
                <a href="#" className="block text-purple-700 hover:text-purple-500 transition-colors font-medium hover:translate-x-1 transform duration-300">Career Assessment</a>
                <a href="#" className="block text-purple-700 hover:text-purple-500 transition-colors font-medium hover:translate-x-1 transform duration-300">Skill Mapping</a>
                <a href="#" className="block text-purple-700 hover:text-purple-500 transition-colors font-medium hover:translate-x-1 transform duration-300">Learning Paths</a>
                <a href="#" className="block text-purple-700 hover:text-purple-500 transition-colors font-medium hover:translate-x-1 transform duration-300">Mentorship</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-purple-800 font-bold mb-6 text-lg">Support</h4>
              <div className="space-y-3">
                <a href="#" className="block text-purple-700 hover:text-purple-500 transition-colors font-medium hover:translate-x-1 transform duration-300">Help Center</a>
                <a href="#" className="block text-purple-700 hover:text-purple-500 transition-colors font-medium hover:translate-x-1 transform duration-300">Contact Us</a>
                <a href="#" className="block text-purple-700 hover:text-purple-500 transition-colors font-medium hover:translate-x-1 transform duration-300">Community</a>
                <a href="#" className="block text-purple-700 hover:text-purple-500 transition-colors font-medium hover:translate-x-1 transform duration-300">Resources</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-purple-800 font-bold mb-6 text-lg">Company</h4>
              <div className="space-y-3">
                <a href="#" className="block text-purple-700 hover:text-purple-500 transition-colors font-medium hover:translate-x-1 transform duration-300">About Us</a>
                <a href="#" className="block text-purple-700 hover:text-purple-500 transition-colors font-medium hover:translate-x-1 transform duration-300">Careers</a>
                <a href="#" className="block text-purple-700 hover:text-purple-500 transition-colors font-medium hover:translate-x-1 transform duration-300">Privacy Policy</a>
                <a href="#" className="block text-purple-700 hover:text-purple-500 transition-colors font-medium hover:translate-x-1 transform duration-300">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-purple-100 mt-12 pt-8">
            <div className="bg-white backdrop-blur-md border border-purple-100 rounded-2xl p-6 text-center">
              <p className="text-purple-700 text-lg">
                2025 <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent font-bold">CareerGuru AI</span>. All rights reserved. 
                <br className="sm:hidden" />
                <span className="text-purple-600">Proudly made in India for Indian students.</span> 
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }

        /* Floating particles animation */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-40px) translateX(-5px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-20px) translateX(-10px);
            opacity: 0.5;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        /* Floating cards animations */
        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(1deg);
          }
        }

        @keyframes float-gentle-delay {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-1deg);
          }
        }

        .animate-float {
          animation: float-gentle 3s ease-in-out infinite;
        }

        .animate-float-delay {
          animation: float-gentle-delay 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(147, 51, 234, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #8b5cf6, #7c3aed);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #7c3aed, #6d28d9);
        }

        /* Performance optimizations */
        .gpu-accelerated {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Smooth transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Focus states for accessibility */
        .focus-visible:focus-visible {
          outline: 2px solid #8b5cf6;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}

export default CarrierHomePage;