import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import AdminModel from "./models/AdminModel.ts";
import DoctorModel from "./models/DoctorModel.ts";
import PatientModel from "./models/PatientModel.ts";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/healthcare";

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await AdminModel.deleteMany({});
    await DoctorModel.deleteMany({});
    await PatientModel.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Create Admin
    const hashedAdminPassword = await bcrypt.hash("admin123", 10);
    const admin = await AdminModel.create({
      name: "Admin User",
      email: "admin@healthcare.com",
      password: hashedAdminPassword,
    });
    console.log("✅ Created Admin:", admin.email);

    // Create Doctors
    const hashedDoctorPassword = await bcrypt.hash("doctor123", 10);
    const doctors = [
      {
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@healthcare.com",
        password: hashedDoctorPassword,
        specialization: "Cardiology",
        phone: "+1234567890",
        experience: 15,
        qualification: "MD, FACC",
        consultationFee: 150,
        bio: "Experienced cardiologist specializing in heart disease prevention and treatment.",
        languages: ["English", "Spanish"],
        isApproved: true,
        rating: 4.8,
        totalReviews: 124,
      },
      {
        name: "Dr. Michael Chen",
        email: "michael.chen@healthcare.com",
        password: hashedDoctorPassword,
        specialization: "Neurology",
        phone: "+1234567891",
        experience: 12,
        qualification: "MD, PhD",
        consultationFee: 180,
        bio: "Neurologist with expertise in brain disorders and neurological conditions.",
        languages: ["English", "Mandarin"],
        isApproved: true,
        rating: 4.9,
        totalReviews: 98,
      },
      {
        name: "Dr. Emily Rodriguez",
        email: "emily.rodriguez@healthcare.com",
        password: hashedDoctorPassword,
        specialization: "Pediatrics",
        phone: "+1234567892",
        experience: 8,
        qualification: "MD, FAAP",
        consultationFee: 120,
        bio: "Pediatrician dedicated to children's health and development.",
        languages: ["English", "Spanish"],
        isApproved: true,
        rating: 4.7,
        totalReviews: 156,
      },
      {
        name: "Dr. James Wilson",
        email: "james.wilson@healthcare.com",
        password: hashedDoctorPassword,
        specialization: "Orthopedics",
        phone: "+1234567893",
        experience: 20,
        qualification: "MD, FAAOS",
        consultationFee: 200,
        bio: "Orthopedic surgeon specializing in joint replacement and sports injuries.",
        languages: ["English"],
        isApproved: true,
        rating: 4.6,
        totalReviews: 87,
      },
      {
        name: "Dr. Priya Patel",
        email: "priya.patel@healthcare.com",
        password: hashedDoctorPassword,
        specialization: "Dermatology",
        phone: "+1234567894",
        experience: 10,
        qualification: "MD, FAAD",
        consultationFee: 130,
        bio: "Dermatologist specializing in skin conditions and cosmetic procedures.",
        languages: ["English", "Hindi"],
        isApproved: true,
        rating: 4.9,
        totalReviews: 203,
      },
      {
        name: "Dr. Robert Brown",
        email: "robert.brown@healthcare.com",
        password: hashedDoctorPassword,
        specialization: "Psychiatry",
        phone: "+1234567895",
        experience: 18,
        qualification: "MD, Psychiatry",
        consultationFee: 160,
        bio: "Psychiatrist helping patients with mental health and emotional well-being.",
        languages: ["English"],
        isApproved: true,
        rating: 4.8,
        totalReviews: 142,
      },
      {
        name: "Dr. Lisa Anderson",
        email: "lisa.anderson@healthcare.com",
        password: hashedDoctorPassword,
        specialization: "General Medicine",
        phone: "+1234567896",
        experience: 7,
        qualification: "MBBS, MD",
        consultationFee: 100,
        bio: "General physician providing comprehensive primary care services.",
        languages: ["English"],
        isApproved: true,
        rating: 4.5,
        totalReviews: 76,
      },
      {
        name: "Dr. David Kim",
        email: "david.kim@healthcare.com",
        password: hashedDoctorPassword,
        specialization: "Cardiology",
        phone: "+1234567897",
        experience: 5,
        qualification: "MD",
        consultationFee: 140,
        bio: "Young cardiologist with modern approach to heart health.",
        languages: ["English", "Korean"],
        isApproved: false, // Pending approval
        rating: 0,
        totalReviews: 0,
      },
    ];

    const createdDoctors = await DoctorModel.insertMany(doctors);
    console.log(`✅ Created ${createdDoctors.length} Doctors`);

    // Create Patients
    const hashedPatientPassword = await bcrypt.hash("patient123", 10);
    const patients = [
      {
        name: "John Doe",
        email: "john.doe@email.com",
        password: hashedPatientPassword,
        phone: "+1234567900",
      },
      {
        name: "Jane Smith",
        email: "jane.smith@email.com",
        password: hashedPatientPassword,
        phone: "+1234567901",
      },
      {
        name: "Alice Johnson",
        email: "alice.johnson@email.com",
        password: hashedPatientPassword,
        phone: "+1234567902",
      },
      {
        name: "Bob Williams",
        email: "bob.williams@email.com",
        password: hashedPatientPassword,
        phone: "+1234567903",
      },
      {
        name: "Carol Martinez",
        email: "carol.martinez@email.com",
        password: hashedPatientPassword,
        phone: "+1234567904",
      },
    ];

    const createdPatients = await PatientModel.insertMany(patients);
    console.log(`✅ Created ${createdPatients.length} Patients`);

    console.log("\n🎉 Seed data created successfully!");
    console.log("\n📝 Test Credentials:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("\n👨‍💼 Admin:");
    console.log("   Email: admin@healthcare.com");
    console.log("   Password: admin123");
    console.log("\n👨‍⚕️ Doctor (Approved):");
    console.log("   Email: sarah.johnson@healthcare.com");
    console.log("   Password: doctor123");
    console.log("\n👨‍⚕️ Doctor (Pending Approval):");
    console.log("   Email: david.kim@healthcare.com");
    console.log("   Password: doctor123");
    console.log("\n👤 Patient:");
    console.log("   Email: john.doe@email.com");
    console.log("   Password: patient123");
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
