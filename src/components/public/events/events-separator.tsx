export default function EventsSeparator() {
    return (
        <section aria-hidden className="relative h-16 md:h-20 bg-white">
            {/* Wave to transition from white (intro) to gray-50 (page bg) */}
            <svg
                className="absolute bottom-0 left-0 h-full w-full text-gray-50"
                viewBox="0 0 1440 200"
                preserveAspectRatio="none"
                role="img"
                aria-label="decorative separator"
            >
                <path
                    fill="currentColor"
                    d="M0,64L48,74.7C96,85,192,107,288,133.3C384,160,480,192,576,181.3C672,171,768,117,864,90.7C960,64,1056,64,1152,85.3C1248,107,1344,149,1392,170.7L1440,192L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"
                />
            </svg>
        </section>
    );
}
