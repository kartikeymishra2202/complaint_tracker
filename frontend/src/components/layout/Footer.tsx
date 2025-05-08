
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-muted py-6 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">EduComplaint</h3>
            <p className="text-sm text-muted-foreground">
              A secure platform for educational institutes to manage and track complaints efficiently.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigate("/")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/track")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Track Complaint
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/login")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Login
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-sm text-muted-foreground">
              Email: support@educomplaint.example.com
            </p>
            <p className="text-sm text-muted-foreground">
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {year} EduComplaint. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
