//     import { useState } from 'react';
//     import { Link,useNavigate } from 'react-router-dom';
    
// import './CustomDropdown.css'; // Create a CSS file for styles
// const CustomDropdown = ({ user, setUser , history }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();
//   const handleProtectedNav = (path) => {
//     if (!user) {
//       navigate('/auth', { 
//         state: { 
//           from: path,
//           message: 'Please sign in to access this feature'
//         } 
//       });
//     } else {
//       navigate(path);
//     }
//   };
  
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };
//   const menuItems = [
//     { title: 'Palette Generator', description: 'Create your palettes in seconds',link:'/upload' },
   
//     { title: 'Explore Palettes', description: 'Browse millions of trending color schemes' ,link:'/Palettes'},
//     { title: 'Color Picker', description: 'Get beautiful palettes ', link:'/picker'},
//     { title: 'Gradient Maker', description: 'Make gradient that you want',link:'/gradient'},
//     { title: 'Palette Visualizer', description: 'Preview your colors on real designs',link:'/imagePreview'},
//   ];
//   return (
//     <div className="dropdown">
//       <button onClick={toggleDropdown} className="dropdown-toggle">
//         Tools
//       </button>
//        {isOpen && (
//         <div className="dropdown-menu">
//           {history.length > 0 && (
//             <> 
//                 <button 
//                   onClick={() => handleProtectedNav('/history')}
//                   className="nav-link history-btn"
//                   id='HistoryBtn'
//                 >
//                   View History
//                 </button>
//                 <p className='dropdown-itemP'>view history what u have extract from image</p>
//              </>
//           )}
          
//           {menuItems.map((item, index) => (
//             <div key={index} className="dropdown-item">
//               <Link to={item.link}><h4>{item.title}</h4></Link>
//               <p>{item.description}</p>
              
//             </div>
//           ))}
//           {/* <h5>APPS</h5>
//           <div className="dropdown-item">iOS App</div>
//           <div className="dropdown-item">Android App</div>
//           <div className="dropdown-item">Figma Plugin</div>
//           <div className="dropdown-item">Adobe Extension</div> */}
//         </div>
//       )}
//     </div>
//   );
// };
// export default CustomDropdown;

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CustomDropdown.css';

const CustomDropdown = ({ history, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleProtectedNav = (path) => {
    navigate(path);
  };

  const handleOptionClick = (path) => {
    setIsOpen(false);             // ✅ Close the dropdown
    onOptionSelect?.();           // optional callback
    if (path) handleProtectedNav(path);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    onOptionSelect?.();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { title: 'Palette Generator', description: 'Create your palettes in seconds', link: '/upload' },
    { title: 'Explore Palettes', description: 'Browse millions of trending color schemes', link: '/Palettes' },
    { title: 'Color Picker', description: 'Get beautiful palettes', link: '/picker' },
    { title: 'Gradient Maker', description: 'Make gradient that you want', link: '/gradient' },
    { title: 'Palette Visualizer', description: 'Preview your colors on real designs', link: '/imagePreview' },
  ];

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="dropdown-toggle">
        Tools <i className="fa fa-caret-down"></i>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {history.length > 0 && (
            <>
              <button
                onClick={() => handleOptionClick('/history')}
                className="nav-link history-btn"
              >
                View History
              </button>
              <p className="dropdown-itemP">view history what u have extract from image</p>
            </>
          )}

          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="dropdown-item"
              onClick={() => handleOptionClick(item.link)}
            >
              <Link to={item.link}><h4>{item.title}</h4></Link>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
