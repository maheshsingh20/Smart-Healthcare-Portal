/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserX, UserCheck, Mail } from "lucide-react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export function UserManagement() {
  const { token } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams();
      if (roleFilter !== "all") params.append("role", roleFilter);
      if (search) params.append("search", search);

      const res = await fetch(`${API}/admin/users?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.data.users);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId: string, status: string) => {
    try {
      const res = await fetch(`${API}/admin/users/${userId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/10 text-red-600 dark:text-red-400";
      case "doctor":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "patient":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by email or name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchUsers()}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["all", "admin", "doctor", "patient"].map((role) => (
                <Button
                  key={role}
                  variant={roleFilter === role ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRoleFilter(role)}
                  className="capitalize"
                >
                  {role}
                </Button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-2">
              {users.map((user, index) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{user.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getRoleBadgeColor(user.role)}>
                                {user.role}
                              </Badge>
                              <Badge
                                variant={user.isActive ? "default" : "destructive"}
                              >
                                {user.isActive ? "Active" : "Suspended"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {user.isActive ? (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => updateUserStatus(user._id, "suspended")}
                            >
                              <UserX className="h-4 w-4 mr-2" />
                              Suspend
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => updateUserStatus(user._id, "active")}
                            >
                              <UserCheck className="h-4 w-4 mr-2" />
                              Activate
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
