import Nav from "@/components/ui/link-btn";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                Welcome to Soul Seed Buddies
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Find Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Perfect Match
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              Connect with like-minded individuals, discover meaningful
              relationships, and grow together in our thriving community.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Nav to="/register" variant="primary" className="text-center">
                Get Started
              </Nav>
              <Nav to="/login" variant="tertiary" className="text-center">
                Sign In
              </Nav>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
              <div>
                <p className="text-2xl font-bold text-gray-900">10K+</p>
                <p className="text-sm text-gray-600">Active Members</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">5K+</p>
                <p className="text-sm text-gray-600">Matches Made</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">98%</p>
                <p className="text-sm text-gray-600">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-96">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-3xl opacity-20 blur-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 to-blue-400 rounded-3xl opacity-10 blur-2xl transform translate-x-10 translate-y-10"></div>

              {/* Main illustration area */}
              <div className="relative z-10 bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col justify-center items-center border border-gray-100">
                <div className="text-6xl mb-4">💚</div>
                <h3 className="text-2xl font-bold text-gray-900 text-center">
                  Connect & Grow Together
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the best platform to find genuine connections
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-2xl">
              🔒
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Secure & Safe
            </h3>
            <p className="text-gray-600">
              Your privacy and security are our top priorities with verified
              profiles and encrypted connections.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 text-2xl">
              ⚡
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Smart Matching
            </h3>
            <p className="text-gray-600">
              Our advanced algorithm matches you with compatible individuals
              based on interests and values.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-2xl">
              💬
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Easy Communication
            </h3>
            <p className="text-gray-600">
              Chat, and share moments with real-time messaging and rich media
              support.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Match?</h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of people finding meaningful connections
          </p>
          <Nav
            to="/register"
            variant="primary"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Create Your Account Today
          </Nav>
        </div>
      </section>
    </div>
  );
};

export default Landing;
