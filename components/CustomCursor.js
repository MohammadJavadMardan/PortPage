function CustomCursor() {
    const cursorRef = React.useRef();
    const cursorDotRef = React.useRef();

    React.useEffect(() => {
        try {
            const cursor = cursorRef.current;
            const cursorDot = cursorDotRef.current;

            const moveCursor = (e) => {
                const x = e.clientX;
                const y = e.clientY;
                
                cursor.style.transform = `translate3d(${x - cursor.offsetWidth/2}px, ${y - cursor.offsetHeight/2}px, 0)`;
                cursorDot.style.transform = `translate3d(${x - 2}px, ${y - 2}px, 0)`;
            };

            const handleMouseOver = () => {
                cursor.classList.add('hover');
            };

            const handleMouseOut = () => {
                cursor.classList.remove('hover');
            };

            document.addEventListener('mousemove', moveCursor);

            const interactiveElements = document.querySelectorAll('a, button, .profile-frame');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseover', handleMouseOver);
                el.addEventListener('mouseout', handleMouseOut);
            });

            return () => {
                document.removeEventListener('mousemove', moveCursor);
                interactiveElements.forEach(el => {
                    el.removeEventListener('mouseover', handleMouseOver);
                    el.removeEventListener('mouseout', handleMouseOut);
                });
            };
        } catch (error) {
            reportError(error);
        }
    }, []);

    return (
        <div data-name="custom-cursor">
            <div ref={cursorRef} className="custom-cursor"></div>
            <div ref={cursorDotRef} className="custom-cursor-dot"></div>
        </div>
    );
}
