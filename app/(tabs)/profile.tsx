import CustomInput from "@/components/CustomInput";
import { account } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      useAuthStore.getState().setIsAuthenticated(false);
      useAuthStore.getState().setUser(null);
      router.replace("/(auth)/sign-in"); 
    } catch (e) {
      console.log("Logout error:", e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.avatarContainer}>
        <Image source={require('../../assets/images/avatar.png')} style={styles.avatar} />
        <TouchableOpacity style={styles.editPencil}>
          <Image source={require('../../assets/icons/pencil.png')} style={styles.pencilIcon} />
        </TouchableOpacity>
      </View>

      <View className="bg-white rounded-lg p-5 mt-5">
        <CustomInput
          placeholder="Enter your email"
          value={form.email}
          onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
          label="Email"
          keyboardType="email-address"
        />
        {/* <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        secureTextEntry={true}
        style={styles.inputMargin}
      /> */}
      </View>

      <TouchableOpacity
        style={[styles.editButton, { top: "65%" }]}
        onPress={() => {
          // Add your edit profile logic here
        }}
      >
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    position: "relative",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#eee",
  },
  editPencil: {
    position: "absolute",
    right: 90 / 2 - 18, // Adjust to sit at bottom right of avatar
    bottom: 0,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 4,
    elevation: 2,
  },
  pencilIcon: {
    width: 24,
    height: 24,
    tintColor: "#333",
  },
  inputMargin: {
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    borderRadius: 8,
    position: "absolute",
    left: 20,
    right: 20,
  },
  editText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#FF5252",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    borderRadius: 8,
    position: "absolute",
    left: 20,
    right: 20,
    top: "75%",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Profile;
