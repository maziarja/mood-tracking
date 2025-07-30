import Logo from "../_components/_main/Logo";
import OnboardingForm from "../_components/_auth/OnboardingForm";

function Page() {
  return (
    <div className="flex min-h-dvh flex-col items-center gap-8 px-4 py-20 md:gap-12">
      <div>
        <Logo />
      </div>
      <div className="bg-neutral-0 grid rounded-2xl px-4 py-10 md:w-[530px] md:px-8">
        <div className="mb-8 space-y-2">
          <p className="text-preset-3 text-neutral-900">
            Personalize your experience
          </p>
          <p className="text-preset-6-r text-neutral-600">
            Add your name and a profile picture to make Mood yours.
          </p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  );
}

export default Page;
