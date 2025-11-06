
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About PAC Tracker
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transparent tracking of political advertising across major digital platforms
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PAC Tracker is dedicated to bringing transparency to political advertising in the digital age. 
              We aggregate and analyze data from multiple platforms to provide comprehensive insights into 
              how political committees and super PACs are spending their funds to influence voters.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In an era where digital advertising plays a crucial role in elections, we believe citizens 
              have the right to know who is trying to influence their votes and how much they are spending 
              to do so.
            </p>
          </div>

          {/* Data Sources */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Sources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-lg">📘</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Facebook Ad Library</h3>
                  <p className="text-gray-600 text-sm">
                    Comprehensive database of political ads run on Facebook and Instagram
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-lg">📺</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Google Transparency Report</h3>
                  <p className="text-gray-600 text-sm">
                    Political advertising data from Google, YouTube, and other Google platforms
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-lg">🐦</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Twitter Ads Transparency</h3>
                  <p className="text-gray-600 text-sm">
                    Political campaign ads and issue ads from Twitter&apos;s transparency center
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-lg">💰</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">OpenSecrets API</h3>
                  <p className="text-gray-600 text-sm">
                    Campaign finance data and PAC spending information
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Comprehensive Ad Library</h3>
                  <p className="text-gray-600 text-sm">
                    Search and filter through thousands of political ads across multiple platforms
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Advanced Analytics</h3>
                  <p className="text-gray-600 text-sm">
                    Detailed spending analysis, platform breakdowns, and performance metrics
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Real-time Data</h3>
                  <p className="text-gray-600 text-sm">
                    Regular updates from platform APIs to ensure data accuracy and timeliness
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Export Capabilities</h3>
                  <p className="text-gray-600 text-sm">
                    Download data for further analysis or reporting in multiple formats
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team/Contact */}
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Involved</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">For Researchers</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Access our API for academic research and analysis. We support researchers studying 
                  political advertising and campaign finance.
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm">
                  API Documentation
                </button>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">For Journalists</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Use our data for investigative reporting. We provide tools and data to help 
                  journalists track political spending and advertising campaigns.
                </p>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 text-sm">
                  Media Resources
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}