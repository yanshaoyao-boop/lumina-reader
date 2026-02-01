import { useState } from 'react';
import Reader from './components/Reader';
import Directory from './components/Directory';
import { materials } from './data/materials';

function App() {
    const [view, setView] = useState('directory'); // 'directory' | 'reader'
    const [currentMaterialId, setCurrentMaterialId] = useState(null);

    const currentMaterial = materials.find(m => m.id === currentMaterialId) || materials[0];

    const handleSelectMaterial = (material) => {
        setCurrentMaterialId(material.id);
        setView('reader');
    };

    const handleBackToDirectory = () => {
        setView('directory');
    };

    const handleNext = () => {
        // Logic to find next material in the whole list
        const currentIndex = materials.findIndex(m => m.id === currentMaterialId);
        const nextIndex = (currentIndex + 1) % materials.length;
        setCurrentMaterialId(materials[nextIndex].id);
    };

    const handlePrev = () => {
        const currentIndex = materials.findIndex(m => m.id === currentMaterialId);
        const prevIndex = (currentIndex - 1 + materials.length) % materials.length;
        setCurrentMaterialId(materials[prevIndex].id);
    };

    return (
        <div style={{ padding: '2rem 1rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1
                    onClick={handleBackToDirectory}
                    style={{
                        fontSize: '3rem',
                        fontWeight: '300',
                        letterSpacing: '-1px',
                        background: 'linear-gradient(to right, #fff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        margin: 0,
                        cursor: 'pointer'
                    }}
                >
                    Lumina Reader
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
                    Master English with Elegance
                </p>
            </header>

            <main>
                {view === 'directory' ? (
                    <Directory
                        materials={materials}
                        onSelect={handleSelectMaterial}
                    />
                ) : (
                    <Reader
                        material={currentMaterial}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        onBack={handleBackToDirectory}
                    />
                )}
            </main>

            <footer style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                <p>© 2026 Lumina Learning. Designed for fluency.</p>
            </footer>
        </div>
    );
}

export default App;
