import {NavLink} from 'react-router-dom';



const Toolbar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">Plovo</NavLink>
        <ul className="navbar-nav flex-nowrap  d-flex flex-row gap-3">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Quotes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/new-quote " className="nav-link">Submit new Quote
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;
