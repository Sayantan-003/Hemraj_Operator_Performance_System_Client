import { useState, useEffect } from "react";
import { Eye, EyeOff, User, Lock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      redirectBasedOnRole(user.role);
    }
  }, [user, loading]);

  const redirectBasedOnRole = (role) => {
    switch (role) {
      case "input_user_1":
      case "input_user_2": 
      case "input_user_3":
      case "master_input_user":
        // Input users go to their specific forms
        if (role === "input_user_1") navigate("/refinery-form");
        else if (role === "input_user_2") navigate("/prep-form");
        else if (role === "input_user_3") navigate("/solvent-form");
        else navigate("/refinery-form"); // master_input_user default
        break;
      case "prep_admin":
      case "solvent_admin":
      case "refinery_admin":
      case "admin4":
      case "super_admin":
        // Admins go to dashboards
        navigate("/");
        break;
      default:
        navigate("/");
    }
  };

  const handleLogin = async (e) => {
    e?.preventDefault();
    
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setIsLogging(true);
    setError("");

    try {
      const result = await login(username, password);
      
      if (result.success) {
        // Handle "Remember Me" functionality
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("lastUsername", username);
        } else {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("lastUsername");
        }
        
        redirectBasedOnRole(result.user.role);
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLogging(false);
    }
  };

  // Load remembered username on mount
  useEffect(() => {
    const remembered = localStorage.getItem("rememberMe");
    const lastUsername = localStorage.getItem("lastUsername");
    
    if (remembered === "true" && lastUsername) {
      setUsername(lastUsername);
      setRememberMe(true);
    }
  }, []);

  // Handle Enter key submission
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 border-2 border-blue-200 rounded-full"
            style={{
              left: `${(i % 5) * 25}%`,
              top: `${Math.floor(i / 5) * 30}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-700 hover:shadow-3xl">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left side - Login Form */}
          <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center relative">
            {/* Subtle floating elements */}
            <div
              className="absolute top-8 right-8 w-4 h-4 bg-blue-200 rounded-full opacity-60 animate-bounce"
              style={{ animationDelay: "0s", animationDuration: "3s" }}
            ></div>
            <div
              className="absolute top-20 right-16 w-2 h-2 bg-blue-300 rounded-full opacity-40 animate-bounce"
              style={{ animationDelay: "1s", animationDuration: "4s" }}
            ></div>

            <div className="max-w-md mx-auto w-full">
              {/* Header */}
              <div className="text-center mb-8 transform transition-all duration-500">
                <h2 className="text-4xl font-bold text-gray-800 mb-3 tracking-tight">
                  Welcome Back!
                </h2>
                <p className="text-gray-500 text-lg">Sign in to your account</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Username Field */}
                <div className="relative group">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                      focusedField === "username" ? "opacity-100" : ""
                    }`}
                  ></div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                      <User
                        className={`w-5 h-5 text-white transition-all duration-300 ${
                          focusedField === "username" ? "scale-110" : ""
                        }`}
                      />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setFocusedField("username")}
                      onBlur={() => setFocusedField("")}
                      onKeyPress={handleKeyPress}
                      placeholder="Username"
                      disabled={isLogging}
                      className="w-full pl-16 pr-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                      focusedField === "password" ? "opacity-100" : ""
                    }`}
                  ></div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                      <Lock
                        className={`w-5 h-5 text-white transition-all duration-300 ${
                          focusedField === "password" ? "scale-110" : ""
                        }`}
                      />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField("")}
                      onKeyPress={handleKeyPress}
                      placeholder="Password"
                      disabled={isLogging}
                      className="w-full pl-16 pr-16 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLogging}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        disabled={isLogging}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 border-2 border-gray-300 rounded transition-all duration-300 flex items-center justify-center ${
                          rememberMe
                            ? "bg-blue-500 border-blue-500"
                            : "hover:border-blue-400"
                        } ${isLogging ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {rememberMe && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="ml-3 text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      Remember me
                    </span>
                  </label>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isLogging || !username || !password}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none group relative overflow-hidden text-lg"
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="relative flex items-center justify-center">
                    {isLogging ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Signing In...
                      </div>
                    ) : (
                      "SIGN IN"
                    )}
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* Right side - Welcome Panel */}
          <div className="flex-1 relative overflow-hidden">
            {/* Animated background with blue gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
              {/* Geometric pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                    linear-gradient(45deg, transparent 45%, white 45%, white 55%, transparent 55%),
                    linear-gradient(-45deg, transparent 45%, white 45%, white 55%, transparent 55%)
                  `,
                    backgroundSize: "60px 60px",
                  }}
                ></div>
              </div>

              {/* Floating animated shapes */}
              <div
                className="absolute top-10 right-10 w-20 h-20 border-2 border-white/20 rounded-full animate-pulse"
                style={{ animationDuration: "4s" }}
              ></div>
              <div
                className="absolute top-32 right-32 w-12 h-12 border border-white/30 rounded-full animate-pulse"
                style={{ animationDuration: "3s", animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-20 right-20 w-8 h-8 bg-white/20 rounded-full animate-bounce"
                style={{ animationDuration: "5s", animationDelay: "2s" }}
              ></div>
              <div
                className="absolute bottom-40 right-40 w-6 h-6 bg-white/10 rounded-full animate-ping"
                style={{ animationDelay: "3s" }}
              ></div>
            </div>

            {/* Curved white overlay */}
            <div className="absolute inset-0">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0 C30,20 70,10 100,30 L100,0 Z"
                  fill="white"
                  className="animate-pulse"
                  style={{ animationDuration: "6s" }}
                />
                <path
                  d="M0,100 C30,80 70,90 100,70 L100,100 Z"
                  fill="white"
                  className="animate-pulse"
                  style={{ animationDuration: "8s", animationDelay: "1s" }}
                />
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8 text-white">
              <div className="transform transition-all duration-700 hover:scale-105">
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
                  Welcome Back!
                </h1>
                <p className="text-lg lg:text-xl text-blue-100 max-w-md leading-relaxed">
                  Access your Operator Performance Management System dashboard
                  to monitor, analyze, and optimize operational efficiency.
                </p>

                {/* Role-based access info */}
                <div className="mt-8 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <p className="text-sm text-blue-100">
                    Access levels: Input Forms • Admin Dashboards • Analytics
                  </p>
                </div>

                {/* Subtle animated indicator */}
                <div className="mt-8 flex justify-center">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
                  <div
                    className="w-2 h-2 bg-white/40 rounded-full animate-ping mx-2"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-white/60 rounded-full animate-ping"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}