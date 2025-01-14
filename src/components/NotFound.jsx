import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="container">
            <h1>Not Found</h1>
            <p>This route is not defined</p>
            <Link>Go to Home</Link>
    </div>
  )
}