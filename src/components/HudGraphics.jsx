export const HudGraphics = () => {
    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    left: '0',
                    top: '0',
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}
            >
                <span style={{ color: 'white', padding: '1rem' }}>Riksklubben</span>
                <span style={{ color: 'white', padding: '1rem' }}>&nbsp;</span>
            </div>
            <div
                style={{
                    position: 'fixed',
                    left: '0',
                    bottom: '0',
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}
            >
                <div style={{ padding: '1rem' }}>&nbsp;</div>
                <span style={{ color: 'white', padding: '1rem' }}>Kulturhuset</span>
            </div>
        </>
    )
}
