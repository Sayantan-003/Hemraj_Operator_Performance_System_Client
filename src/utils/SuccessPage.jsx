import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Sparkles, Heart } from 'lucide-react';

export default function SuccessPage() {
  const [showContent, setShowContent] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Trigger animations with delays
    setTimeout(() => setShowContent(true), 200);
    setTimeout(() => setShowButtons(true), 800);

    // Create floating particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  const handleGoBack = () => {
    // In a real app, this would navigate back to the form or home page
    window.history.back();
  };

  const handleViewDashboard = () => {
    // In a real app, this would navigate to dashboard
    alert('Navigate to dashboard');
  };

  return (  
      <div className="h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 flex items-center justify-center relative overflow-hidden">
        {/* Animated background particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-32 right-16 w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg rotate-45 opacity-20 animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-25 animate-ping" style={{ animationDuration: '4s' }} />

        {/* Main content container */}
        <div className="max-w-md w-full">
          {/* Success icon with animation */}
          <div className={`text-center mb-8 transform transition-all duration-1000 ${showContent ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-8'}`}>
            <div className="relative inline-block">
              <CheckCircle className="w-24 h-24 text-emerald-500 mx-auto animate-bounce" style={{ animationDuration: '2s' }} />
              <div className="absolute -inset-2 bg-emerald-100 rounded-full animate-ping opacity-75" />
            </div>
          </div>

          {/* Success card */}
          <div className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 transform transition-all duration-1000 ${showContent ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8'}`}>
            <div className="text-center">
              {/* Success message */}
              <div className="flex items-center justify-center gap-2 mb-4">
                {/* <Sparkles className="w-6 h-6 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} /> */}
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  Success!
                </h1>
                {/* <Heart className="w-6 h-6 text-red-500 animate-pulse" /> */}
              </div>
              
              <p className="text-gray-600 text-lg mb-2 font-medium">
                Your form has been submitted successfully!
              </p>
              
              <p className="text-gray-500 mb-8 leading-relaxed">
                Thank you for taking the time to fill out our form. We've received your information.
              </p>
            </div>
          </div>

          {/* Footer message */}
          <div className={`text-center mt-6 transform transition-all duration-1000 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-gray-500 text-sm">
              Questions? Contact our support team anytime.
            </p>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
            }
          }
        `}</style>
      </div>
  );
}