import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Stethoscope,
  Calendar,
  FileText,
  Video,
  Shield,
  Clock,
  Users,
  Award,
  Heart,
  Activity,
  Pill,
  TestTube,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export function HomePage() {
  const features = [
    {
      icon: Calendar,
      title: "Easy Appointment Booking",
      description: "Book appointments with top doctors in just a few clicks",
    },
    {
      icon: Video,
      title: "Telemedicine",
      description: "Consult with doctors from the comfort of your home",
    },
    {
      icon: FileText,
      title: "Digital Medical Records",
      description: "Access your complete medical history anytime, anywhere",
    },
    {
      icon: Pill,
      title: "E-Prescriptions",
      description: "Get digital prescriptions and medication reminders",
    },
    {
      icon: TestTube,
      title: "Lab Tests",
      description: "Book lab tests and get results online",
    },
    {
      icon: Activity,
      title: "AI Symptom Checker",
      description: "Get instant health insights with AI-powered analysis",
    },
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Patients" },
    { icon: Stethoscope, value: "500+", label: "Expert Doctors" },
    { icon: Award, value: "50+", label: "Specializations" },
    { icon: Heart, value: "99%", label: "Success Rate" },
  ];

  const specializations = [
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Dermatology",
    "Gynecology",
    "Psychiatry",
    "Oncology",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Your Health, Our Priority
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Experience world-class healthcare with AI-powered diagnostics,
                expert doctors, and seamless digital health management.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/find-a-doctor">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Find a Doctor
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/symptom-checker">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Check Symptoms
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-3xl blur-3xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600"
                  alt="Healthcare"
                  className="relative rounded-3xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <stat.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive healthcare solutions at your fingertips
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-t-4 border-t-primary">
                  <CardContent className="p-6">
                    <feature.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Medical Specializations</h2>
            <p className="text-xl text-muted-foreground">
              Expert care across all medical fields
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specializations.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link to={`/find-a-doctor?specialization=${spec}`}>
                  <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Stethoscope className="h-8 w-8 mx-auto mb-3 text-primary" />
                      <p className="font-medium">{spec}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-xl text-muted-foreground">
              Experience healthcare like never before
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "HIPAA Compliant",
                description: "Your data is secure and protected",
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Round-the-clock medical assistance",
              },
              {
                icon: Award,
                title: "Certified Doctors",
                description: "Only verified and experienced professionals",
              },
              {
                icon: CheckCircle,
                title: "Easy Booking",
                description: "Book appointments in seconds",
              },
              {
                icon: Heart,
                title: "Patient Care",
                description: "Personalized treatment plans",
              },
              {
                icon: Activity,
                title: "AI-Powered",
                description: "Advanced diagnostic tools",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of patients who trust us with their health
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/auth/patient">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Sign Up as Patient
              </Button>
            </Link>
            <Link to="/auth/doctor">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Join as Doctor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
