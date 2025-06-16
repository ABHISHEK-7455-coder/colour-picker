

import Header from "./components/AppHeader";
import ColorExtractor from "./components/ColourExtractor";

function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <Header />
            <ColorExtractor />
        </div>
    );
}

export default App;