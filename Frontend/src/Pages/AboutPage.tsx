import { Navbar } from "@/components/Shared/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, Target, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Patient-Centric Care",
      description: "We put patients at the heart of everything we do",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Your health data is protected with enterprise-grade security",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Leveraging AI and technology for better healthcare",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to the highest standards of medical care",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    },
    {
      name: "Dr. Michael Chen",
      role: "Head of Cardiology",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Head of Pediatrics",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
    },
    {
      name: "Dr. James Wilson",
      role: "Head of Neurology",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to make quality healthcare accessible to everyone through
            technology and compassionate care.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  To revolutionize healthcare delivery by combining cutting-edge technology
                  with personalized medical care, making quality healthcare accessible,
                  affordable, and convenient for all.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-8">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground">
                  To be the world's most trusted healthcare platform, where patients receive
                  exceptional care, doctors have the best tools, and healthcare becomes
                  seamlessly integrated into daily life.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <value.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold mb-2">10,000+</p>
                <p className="text-white/80">Happy Patients</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">500+</p>
                <p className="text-white/80">Expert Doctors</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">50+</p>
                <p className="text-white/80">Specializations</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">99%</p>
                <p className="text-white/80">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
