import { useState } from "react";
import { Navbar } from "@/components/Shared/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TestTube, Search, Calendar, Clock, Info } from "lucide-react";
import { motion } from "framer-motion";

const labTests = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    category: "Blood Test",
    price: 25.00,
    description: "Measures different components of blood",
    duration: "24 hours",
    fasting: false,
    popular: true,
  },
  {
    id: 2,
    name: "Lipid Profile",
    category: "Blood Test",
    price: 35.00,
    description: "Cholesterol and triglycerides test",
    duration: "24 hours",
    fasting: true,
    popular: true,
  },
  {
    id: 3,
    name: "Thyroid Function Test",
    category: "Hormone Test",
    price: 45.00,
    description: "TSH, T3, T4 levels",
    duration: "48 hours",
    fasting: false,
    popular: true,
  },
  {
    id: 4,
    name: "HbA1c (Diabetes)",
    category: "Blood Test",
    price: 30.00,
    description: "Average blood sugar over 3 months",
    duration: "24 hours",
    fasting: false,
    popular: false,
  },
  {
    id: 5,
    name: "Liver Function Test",
    category: "Blood Test",
    price: 40.00,
    description: "Checks liver health",
    duration: "24 hours",
    fasting: true,
    popular: false,
  },
  {
    id: 6,
    name: "Kidney Function Test",
    category: "Blood Test",
    price: 38.00,
    description: "Creatinine and urea levels",
    duration: "24 hours",
    fasting: false,
    popular: false,
  },
  {
    id: 7,
    name: "Vitamin D Test",
    category: "Vitamin Test",
    price: 50.00,
    description: "Vitamin D levels",
    duration: "48 hours",
    fasting: false,
    popular: false,
  },
  {
    id: 8,
    name: "COVID-19 RT-PCR",
    category: "Infection Test",
    price: 60.00,
    description: "COVID-19 detection",
    duration: "12 hours",
    fasting: false,
    popular: true,
  },
];

const categories = ["All", "Blood Test", "Hormone Test", "Vitamin Test", "Infection Test"];

export function LabTestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTests = labTests.filter(
    (test) =>
      (selectedCategory === "All" || test.category === selectedCategory) &&
      test.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <TestTube className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Lab Tests</h1>
          <p className="text-xl text-muted-foreground">
            Book lab tests online and get results delivered digitally
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search lab tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Popular Tests */}
        {selectedCategory === "All" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Popular Tests</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {labTests
                .filter((test) => test.popular)
                .map((test, index) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <TestTube className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <p className="font-medium text-sm">{test.name}</p>
                        <p className="text-lg font-bold text-primary mt-2">${test.price}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* All Tests */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{test.name}</CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        {test.category}
                      </Badge>
                    </div>
                    {test.popular && (
                      <Badge className="bg-yellow-500/10 text-yellow-600">
                        Popular
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{test.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Results in {test.duration}</span>
                    </div>
                    {test.fasting && (
                      <div className="flex items-center gap-2 text-sm text-yellow-600">
                        <Info className="h-4 w-4" />
                        <span>Fasting required</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-2xl font-bold">${test.price}</p>
                      <p className="text-xs text-muted-foreground">per test</p>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Test
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <TestTube className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No lab tests found</p>
          </div>
        )}

        {/* Info Section */}
        <Card className="mt-12 bg-primary/5">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium mb-1">Book Online</p>
                  <p className="text-sm text-muted-foreground">
                    Select your test and choose a convenient time slot
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium mb-1">Sample Collection</p>
                  <p className="text-sm text-muted-foreground">
                    Visit our lab or get home collection service
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium mb-1">Get Results</p>
                  <p className="text-sm text-muted-foreground">
                    Receive digital reports in your dashboard
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
