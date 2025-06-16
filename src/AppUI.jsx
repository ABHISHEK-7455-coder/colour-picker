export default function AppUI(){
    return (
        <div className="app-container">
            <header>
                <div className="header-container">
                    <div className="logo">COOLORS</div>
                    <div className="elements">
                        <a href="">Tools</a>
                        <a href="">Go Pro</a>
                        <a href="">Sign in</a>
                        <a href="">Sign up</a>
                    </div>
                </div>
            </header>

            <main>
                <section className="heading">
                    <h1>Image Picker</h1>
                    <p>Extract Beautiful Pallets from your Photos.</p>
                </section>

                <section className="main-section">
                    <div className="options">
                        <div>Picked Palettes</div>
                        <div>Palette</div>
                        <div>Browse Image</div>
                        <div>Export Palette</div>
                    </div>
                    <div className="main-image">Image</div>
                </section>
            </main>
        </div>
    )
}