import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah K.",
    avatar: "SK",
    title: "Life-saver!",
    quote:
      "The AI checker was scarily accurate. It told me to see a specialist, and I got diagnosed and treated so much faster. I can't thank this platform enough.",
  },
  {
    name: "Michael B.",
    avatar: "MB",
    title: "So convenient",
    quote:
      "Booking an appointment at 10 PM on a Tuesday without making a call is a game-changer. The entire process was seamless from start to finish.",
  },
  {
    name: "Emily R.",
    avatar: "ER",
    title: "Finally, a simple UI",
    quote:
      "Most health websites are a nightmare to navigate. This is clean, fast, and I found a new doctor for my family in under 5 minutes.",
  },
];

// Helper to render star ratings
const renderStars = (rating = 5) => (
  <div className="flex gap-0.5">
    {Array(rating)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-yellow-400 text-yellow-400 drop-shadow-sm"
        />
      ))}
  </div>
);

export function Testimonials() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-sky-100 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950">
      {/* Decorative blurred background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-[500px] w-[500px] rounded-full bg-blue-200/20 blur-3xl dark:bg-blue-900/30" />
      </div>

      <div className="container relative px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 via-blue-600 to-red-500 bg-clip-text text-transparent md:text-5xl">
            Trusted by Patients Like You
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what others are saying about their SmartHealth experience.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card
              key={item.name}
              className="flex flex-col justify-between border border-blue-200/40 bg-white/80 dark:bg-slate-900/60 
              shadow-md backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-400/50"
            >
              <CardHeader>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
                  {item.title}
                </h3>
                {renderStars()}
              </CardHeader>
              <CardContent>
                <blockquote className="italic text-muted-foreground leading-relaxed">
                  "{item.quote}"
                </blockquote>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={`https://placehold.co/40x40/007BFF/FFFFFF?text=${item.avatar}`}
                    />
                    <AvatarFallback>{item.avatar}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{item.name}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
