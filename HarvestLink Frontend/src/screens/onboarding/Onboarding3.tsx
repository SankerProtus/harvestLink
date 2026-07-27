import { Truck } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { OnboardingSlide } from "../../components/OnboardingSlide";

export default function Onboarding3() {
  const navigation = useNavigation<any>();
  return (
    <OnboardingSlide
      Icon={Truck}
      step={2}
      title="Track every delivery"
      description="Follow your produce from farm gate to market with live GPS tracking and delivery updates."
      ctaLabel="Get Started"
      onNext={() => navigation.navigate("RoleSelect")}
    />
  );
}
