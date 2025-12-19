import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login/index" />
      <Stack.Screen name="signup/index" />
      <Stack.Screen name="forgot-password/index" />

      {/* Pastikan nama ini sesuai dengan folder fisik Anda */}
      {/* Jika foldernya 'verifyOtp', gunakan verifyOtp/index */}
      <Stack.Screen name="verify-otp/index" />

      {/* Jika foldernya 'verify-otp', gunakan verify-otp/index */}
      {/* <Stack.Screen name="verify-otp/index" /> */}

      <Stack.Screen name="reset-password/index" />
    </Stack>
  );
}
