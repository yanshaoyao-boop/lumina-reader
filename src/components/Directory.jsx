import { BookOpen } from 'lucide-react';

export default function Directory({ materials, onSelect }) {
    // Group materials by level
    const groupedMaterials = materials.reduce((acc, item) => {
        if (!acc[item.level]) acc[item.level] = [];
        acc[item.level].push(item);
        return acc;
    }, {});

    const levels = ['A2', 'B1', 'B2', 'C1']; // Start with A2, end with C1

    const getLevelColor = (level) => {
        switch (level) {
            case 'A2': return '#10b981'; // Emerald
            case 'B1': return '#3b82f6'; // Blue
            case 'B2': return '#f59e0b'; // Amber
            case 'C1': return '#ec4899'; // Pink
            default: return '#94a3b8';
        }
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{
                textAlign: 'center',
                fontSize: '2rem',
                marginBottom: '3rem',
                fontWeight: '300',
                color: 'var(--color-text-primary)'
            }}>
                Library
            </h2>

            {levels.map(level => (
                groupedMaterials[level] && (
                    <div key={level} style={{ marginBottom: '4rem' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginBottom: '1.5rem',
                            borderBottom: '1px solid var(--color-glass-border)',
                            paddingBottom: '0.5rem'
                        }}>
                            <span style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: getLevelColor(level)
                            }}>{level}</span>
                            <span style={{ color: 'var(--color-text-secondary)' }}>Level Collection</span>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            {groupedMaterials[level].map(item => (
                                <div
                                    key={item.id}
                                    className="glass-panel"
                                    onClick={() => onSelect(item)}
                                    style={{
                                        padding: '1.5rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.filter = 'brightness(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.filter = 'brightness(1)';
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <span style={{
                                            background: `${getLevelColor(level)}20`,
                                            color: getLevelColor(level),
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700'
                                        }}>
                                            {item.type}
                                        </span>
                                    </div>

                                    <h3 style={{ margin: 0, fontSize: '1.25rem', lineHeight: '1.4' }}>{item.title}</h3>

                                    <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                                        <BookOpen size={14} />
                                        <span>{item.content_en.length} sentences</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}
