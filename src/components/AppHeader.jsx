import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Header({ history }) {
    const navigate = useNavigate();

    return (
        <header>
            <div className="header-container">
                <div className="logo">Image Picker</div>
                <div className="elements">
                    <a href="/">Tools</a>
                    <a href="/">Go Pro</a>
                    <a href="/">Sign in</a>
                    <a href="/">Sign up</a>
                    {history.length > 0 && (
                        <button
                            className="historyBtn"
                            onClick={() => navigate('/history')}
                        >
                            View History
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

