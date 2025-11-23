import { useState } from "react";
import { Navbar } from "@/components/Shared/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertCircle, CheckCircle, X, Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const commonSymptoms = [
  "Fever",
  "Cough",
  "Headache",
  "Fatigue",
  "Sore Throat",
  "Body Ache",
  "Nausea",
  "Dizziness",
  "Chest Pain",
  "Shortness of Breath",
  "Abdominal Pain",
  "Diarrhea",
];

export function SymptomCheckerPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState("");
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState<"mild" | "moderate" | "severe">("moderate");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const addCustomSymptom = () => {
    if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom.trim())) {
      setSelectedSymptoms([...selectedSymptoms, customSymptom.trim()]);
      setCustomSymptom("");
    }
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) return;

    setLoading(true);
    // Simulate AI analysis
    setTimeout(() => {
      setResults({
        possibleConditions: [
          {
            name: "Common Cold",
            probability: 75,
            severity: "mild",
            description: "A viral infection of the upper respiratory tract",
          },
          {
            name: "Influenza (Flu)",
            probability: 60,
            severity: "moderate",
            description: "A contagious respiratory illness caused by influenza viruses",
          },
          {
            name: "Viral Infection",
            probability: 45,
            severity: "mild",
            description: "General viral infection affecting the body",
          },
        ],
        urgencyLevel: severity === "severe" ? "high" : severity === "moderate" ? "medium" : "low",
        recommendations: [
          "Rest and stay hydrated",
          "Take over-the-counter pain relievers if needed",
          "Monitor your symptoms",
          "Consult a doctor if symptoms worsen",
        ],
        specialistRecommendation: "General Physician",
      });
      setLoading(false);
    }, 2000);
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-500/10 text-red-600 dark:text-red-400";
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
      case "low":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Activity className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">AI Symptom Checker</h1>
            <p className="text-xl text-muted-foreground">
              Get instant health insights powered by artificial intelligence
            </p>
          </motion.div>

          {/* Symptom Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Select Your Symptoms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Common Symptoms */}
              <div>
                <p className="text-sm font-medium mb-3">Common Symptoms:</p>
                <div className="flex flex-wrap gap-2">
                  {commonSymptoms.map((symptom) => (
                    <Badge
                      key={symptom}
                      variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => toggleSymptom(symptom)}
                    >
                      {symptom}
                      {selectedSymptoms.includes(symptom) && (
                        <CheckCircle className="ml-2 h-3 w-3" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Custom Symptom */}
              <div>
                <p className="text-sm font-medium mb-3">Add Custom Symptom:</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter symptom..."
                    value={customSymptom}
                    onChange={(e) => setCustomSymptom(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCustomSymptom()}
                  />
                  <Button onClick={addCustomSymptom}>Add</Button>
                </div>
              </div>

              {/* Selected Symptoms */}
              {selectedSymptoms.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-3">Selected Symptoms:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map((symptom) => (
                      <Badge key={symptom} variant="secondary" className="gap-2">
                        {symptom}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => toggleSymptom(symptom)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Duration */}
              <div>
                <p className="text-sm font-medium mb-3">How long have you had these symptoms?</p>
                <Input
                  placeholder="e.g., 2 days, 1 week"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              {/* Severity */}
              <div>
                <p className="text-sm font-medium mb-3">Severity Level:</p>
                <div className="flex gap-2">
                  {(["mild", "moderate", "severe"] as const).map((level) => (
                    <Button
                      key={level}
                      variant={severity === level ? "default" : "outline"}
                      onClick={() => setSeverity(level)}
                      className="capitalize flex-1"
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Analyze Button */}
              <Button
                onClick={analyzeSymptoms}
                disabled={selectedSymptoms.length === 0 || loading}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Analyze Symptoms
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Urgency Level */}
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Urgency Level</p>
                        <Badge className={getUrgencyColor(results.urgencyLevel)}>
                          {results.urgencyLevel.toUpperCase()}
                        </Badge>
                      </div>
                      <AlertCircle className="h-12 w-12 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                {/* Possible Conditions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Possible Conditions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {results.possibleConditions.map((condition: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold">{condition.name}</h3>
                          <Badge variant="outline">{condition.probability}% match</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {condition.description}
                        </p>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${condition.probability}%` }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {results.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Specialist Recommendation */}
                <Card className="bg-primary/5">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Recommended Specialist
                        </p>
                        <p className="text-lg font-semibold">{results.specialistRecommendation}</p>
                      </div>
                      <Button onClick={() => window.location.href = "/find-a-doctor"}>
                        Find Doctor
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Disclaimer */}
                <Card className="border-yellow-500/50 bg-yellow-500/5">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Important Disclaimer</p>
                        <p className="text-muted-foreground">
                          This AI symptom checker is for informational purposes only and should not
                          replace professional medical advice. Please consult with a healthcare
                          provider for accurate diagnosis and treatment.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
