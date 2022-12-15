import './Home.css';
import medImg from './meditation.png'
import { Update } from './Update';
import Navbar from './Navbar';

function Home() {
  return (
     <div className="container mt-3">
      <div className="row">
        <div className="col-md-5">
          <Update />
        </div>
        <div className="col-md-7 my-auto">
          <img className="img-fluid w-20" src={medImg} alt="Responsive image" width="600" height="600"/>
        </div>
      </div>
    </div>
  );
}

export default Home;