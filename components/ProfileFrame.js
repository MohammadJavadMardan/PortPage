function ProfileFrame() {
    try {
        return (
            <div data-name="profile-frame" className="profile-frame floating w-64 h-64 rounded-xl overflow-hidden mx-auto mt-20 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
                <div className="w-full h-full flex items-center justify-center text-white">
                    Upload your photo here
                </div>
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
