import { useState, useEffect } from 'react';
import { Languages, ChevronLeft, ChevronRight, Type } from 'lucide-react';

export default function Reader({ material, onNext, onPrev, onBack }) {
    const [showTranslation, setShowTranslation] = useState(false);
    const [fontSize, setFontSize] = useState(1); // Default size in rem

    const sizes = [1, 1.25, 1.5, 1.75]; // Available sizes

    const toggleSize = () => {
        const nextIndex = (sizes.indexOf(fontSize) + 1) % sizes.length;
        setFontSize(sizes[nextIndex]);
    };

    useEffect(() => {
        // Reset state when material changes if we had any
    }, [material]);

    return (
        <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '1.5rem', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={onBack}
                        className="btn-icon"
                        style={{ width: 'auto', padding: '0 0.75rem', fontSize: '0.875rem', gap: '0.25rem', borderRadius: '8px' }}
                    >
                        ← Library
                    </button>
                    <span style={{
                        background: 'rgba(245, 158, 11, 0.2)',
                        color: 'var(--color-primary)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        fontWeight: 'bold'
                    }}>
                        {material.level}
                    </span>
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                        {material.type}
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={onPrev} className="btn-icon" title="Previous Article">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={onNext} className="btn-icon" title="Next Article">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem', lineHeight: '1.3' }}>{material.title}</h1>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-glass-border)' }}>
                <button
                    className="btn-icon"
                    onClick={() => setShowTranslation(!showTranslation)}
                    style={{
                        width: 'auto',
                        padding: '0 1rem',
                        background: showTranslation ? 'rgba(255,255,255,0.1)' : 'transparent'
                    }}
                >
                    <Languages size={18} style={{ marginRight: '0.5rem' }} />
                    {showTranslation ? 'Hide CN' : 'Show CN'}
                </button>

                <button
                    className="btn-icon"
                    onClick={toggleSize}
                    style={{
                        width: 'auto',
                        padding: '0 1rem'
                    }}
                >
                    <Type size={18} style={{ marginRight: '0.5rem' }} />
                    Size: {sizes.indexOf(fontSize) + 1}
                </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {material.content_en.map((sentence, index) => (
                    <div
                        key={index}
                        style={{
                            marginBottom: '0.75rem', // Reduced margin
                        }}
                    >
                        <p className="text-reader" style={{ margin: 0, marginBottom: '0.25rem', fontSize: `${fontSize}rem`, transition: 'font-size 0.2s ease' }}>
                            {sentence}
                        </p>
                        <p className={`text-cn ${showTranslation ? '' : 'hidden'}`} style={{ margin: 0, fontSize: '0.95rem' }}>
                            {material.content_cn[index]}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
