import { Search } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { OnboardingSlide } from "../../components/OnboardingSlide";

export default function Onboarding2() {
  const navigation = useNavigation<any>();
  return (
    <OnboardingSlide
      Icon={Search}
      step={1}
      title="Find fair prices"
      description="See real-time market prices and get matched with buyers near you by crop, quantity, and distance."
      ctaLabel="Next"
      onNext={() => navigation.navigate("Onboarding3")}
      onSkip={() => navigation.navigate("RoleSelect")}
    />
  );
}
