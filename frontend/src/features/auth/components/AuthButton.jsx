import { Button } from "../../../components/ui/Button.jsx";

// Thin re-export so every auth screen shares one button style with the
// rest of the app (see src/components/ui/Button.jsx for the design source).
export function AuthButton(props) {
  return <Button {...props} />;
}
