import { Card } from "../../../components/ui/Card.jsx";

// Thin re-export so every auth screen shares one card style with the
// rest of the app (see src/components/ui/Card.jsx for the design source).
export function AuthCard({ children, className = "" }) {
  return <Card className={className}>{children}</Card>;
}
