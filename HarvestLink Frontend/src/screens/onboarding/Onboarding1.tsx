import { List } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { OnboardingSlide } from "../../components/OnboardingSlide";

export default function Onboarding1() {
  const navigation = useNavigation<any>();
  return (
    <OnboardingSlide
      Icon={List}
      step={0}
      title="Sell your harvest fast"
      description="List your produce in seconds and reach buyers before it spoils — even with no signal."
      ctaLabel="Next"
      onNext={() => navigation.navigate("Onboarding2")}
      onSkip={() => navigation.navigate("RoleSelect")}
    />
  );
}
