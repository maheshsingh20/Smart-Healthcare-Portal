import { useState } from "react";
import { Navbar } from "@/components/Shared/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pill, Search, ShoppingCart, Info } from "lucide-react";
import { motion } from "framer-motion";

const medicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: 5.99,
    description: "Effective pain and fever relief",
    inStock: true,
    prescription: false,
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    category: "Antibiotic",
    price: 12.99,
    description: "Broad-spectrum antibiotic",
    inStock: true,
    prescription: true,
  },
  {
    id: 3,
    name: "Ibuprofen 400mg",
    category: "Pain Relief",
    price: 7.99,
    description: "Anti-inflammatory pain reliever",
    inStock: true,
    prescription: false,
  },
  {
    id: 4,
    name: "Omeprazole 20mg",
    category: "Digestive",
    price: 15.99,
    description: "Reduces stomach acid",
    inStock: true,
    prescription: true,
  },
  {
    id: 5,
    name: "Cetirizine 10mg",
    category: "Allergy",
    price: 8.99,
    description: "Antihistamine for allergies",
    inStock: true,
    prescription: false,
  },
  {
    id: 6,
    name: "Metformin 500mg",
    category: "Diabetes",
    price: 18.99,
    description: "Blood sugar control",
    inStock: false,
    prescription: true,
  },
];

const categories = ["All", "Pain Relief", "Antibiotic", "Digestive", "Allergy", "Diabetes"];

export function MedicinesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<number[]>([]);

  const filteredMedicines = medicines.filter(
    (med) =>
      (selectedCategory === "All" || med.category === selectedCategory) &&
      med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (id: number) => {
    setCart([...cart, id]);
  };

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
            <Pill className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Online Pharmacy</h1>
          <p className="text-xl text-muted-foreground">
            Order medicines online and get them delivered to your doorstep
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search medicines..."
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

        {/* Cart Summary */}
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-primary/5">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="font-medium">{cart.length} items in cart</span>
                </div>
                <Button>View Cart</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Medicines Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((medicine, index) => (
            <motion.div
              key={medicine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{medicine.name}</CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        {medicine.category}
                      </Badge>
                    </div>
                    {medicine.prescription && (
                      <Badge variant="outline" className="bg-yellow-500/10">
                        Rx
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{medicine.description}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">${medicine.price}</p>
                      <p className="text-xs text-muted-foreground">per pack</p>
                    </div>
                    {medicine.inStock ? (
                      <Badge className="bg-green-500/10 text-green-600">In Stock</Badge>
                    ) : (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      disabled={!medicine.inStock}
                      onClick={() => addToCart(medicine.id)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>

                  {medicine.prescription && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      Prescription required for purchase
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <Pill className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No medicines found</p>
          </div>
        )}
      </div>
    </div>
  );
}
