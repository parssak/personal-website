import { Text } from "components/display/Text";
import { Button } from "components/inputs/Button";

export default function Home() {
  return (
    <>
      <main className="container min-h-screen grid md:items-center relative">
        <div className="absolute top-0 right-0 h-96 w-full md:w-3/4 bg-slate-400"></div>
        <div className="pt-64 text-center md:text-left relative">
          <Text variant="h1">Hi. I'm Parssa</Text>
          <Text className="md:ml-0.5" variant="h2">
            Frontend Developer @ Watershed
          </Text>

          <Text className="mt-12 md:max-w-xl" variant="body1">
            <span className="hidden md:inline">
              I love to build awesome things through software.
            </span>{" "}
            I'm passionate about building tools and products that improve people's lives.
          </Text>

          <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2">
            <Button size="xl" theme="primary">
              Get in touch
            </Button>
            <Button size="xl" theme="ghost">
              Learn More
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
