import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login/index" />
      <Stack.Screen name="signup/index" />
      <Stack.Screen name="forgotPassword/index" />

      {/* Pastikan nama ini sesuai dengan folder fisik Anda */}
      {/* Jika foldernya 'verifyOtp', gunakan verifyOtp/index */}
      <Stack.Screen name="verifyOtp/index" />

      {/* Jika foldernya 'verify-otp', gunakan verify-otp/index */}
      {/* <Stack.Screen name="verify-otp/index" /> */}

      <Stack.Screen name="resetPassword/index" />
    </Stack>
  );
}
