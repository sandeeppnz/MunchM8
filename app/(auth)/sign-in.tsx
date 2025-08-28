import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Modal, StyleSheet, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPanel, setShowPanel] = useState(false);
  const {isAuthenticated, setIsAuthenticated} = useAuthStore();

  const submit = async () => {
    const { email, password } = form;

    if (!email || !password)
      return Alert.alert(
        "Error",
        "Please enter valid email address & password."
      );

    setIsSubmitting(true);

    try {
      await signIn({ email, password });
      setShowPanel(true); // Show panel after successful sign in
    } catch (error: any) {
      Sentry.captureEvent(error);
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goHome = () => {
    setShowPanel(false);
    setIsAuthenticated(true); 
    router.replace("/"); // Adjust route if needed
  };

  return (
    <>
      <View className="gap-10 bg-white rounded-lg p-5 mt-5">
        <CustomInput
          placeholder="Enter your email"
          value={form.email}
          onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
          label="Email"
          keyboardType="email-address"
        />
        <CustomInput
          placeholder="Enter your password"
          value={form.password}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, password: text }))
          }
          label="Password"
          secureTextEntry={true}
        />

        <CustomButton title="Sign In" isLoading={isSubmitting} onPress={submit} />

        <View className="flex justify-center mt-5 flex-row gap-2">
          <Text className="base-regular text-gray-100">
            Don&apos;t have an account?
          </Text>
          <Link href="/sign-up" className="base-bold text-primary">
            Sign Up
          </Link>
        </View>
      </View>

      <Modal
        visible={showPanel}
        animationType="slide"
        transparent
        onRequestClose={() => setShowPanel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.panel}>
            <Image
              source={require("../../assets/images/success.png")}
              style={{ width: 100, height: 100, marginBottom: 20 }}
            />

            <Text style={styles.panelText}>Sign in successful!</Text>
            <CustomButton
              title="Go to Homepage"
              isLoading={false}
              onPress={goHome}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  panel: {
    backgroundColor: "#fff",
    padding: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: "center",
  },
  panelText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 24,
  },
});

export default SignIn;
