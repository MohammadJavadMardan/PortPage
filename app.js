function App() {
    try {
        return (
            <div data-name="app" className="min-h-screen text-white relative overflow-hidden pb-24">
                <CustomCursor />
                <Background3D />
                <GlowingOrbs />
                <main className="container mx-auto px-4 py-8">
                    <ProfileFrame />
                    <div data-name="content" className="text-center mt-8 fade-in">
                        <div className="glass-card mx-auto max-w-2xl p-8 rounded-2xl mt-12">
                            <h1 className="text-5xl font-bold mb-4 luxury-text tracking-wider">Your Name</h1>
                            <p className="text-xl text-gray-400 tracking-wide highlight-hover">Creative Developer & Designer</p>
                            <div className="mt-6 text-gray-400">
                                <p className="leading-relaxed highlight-hover">
                                    Crafting digital experiences with elegance and precision
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
                <SocialLinks />
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
