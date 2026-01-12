import React from 'react';
import { View, Text, TouchableOpacity, StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic here
    console.log('Google Sign-In pressed');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      
      <View className="flex-1 items-center px-6 pt-20">
        {/* Decorative dots in background */}
        <View className="absolute top-32 left-10 w-2 h-2 rounded-full bg-gray-300" />
        <View className="absolute top-28 right-16 w-2.5 h-2.5 rounded-full bg-gray-300" />
        <View className="absolute top-52 left-20 w-2 h-2 rounded-full bg-gray-300" />
        <View className="absolute top-44 right-8 w-3 h-3 rounded-full bg-gray-300" />
        <View className="absolute top-60 right-24 w-2 h-2 rounded-full bg-gray-300" />

        {/* Logo Container with Circle Background */}
        <View className="mb-10">
          <View className="w-48 h-48 rounded-full items-center justify-center" style={{backgroundColor: '#2381ff'}}>
            {/* Card with Key Icon */}
            <View className="w-32 h-32 bg-white rounded-2xl items-center justify-center relative shadow-lg">
              {/* Key Icon */}
              <View className="items-center">
                {/* Key head */}
                <View className="w-8 h-8 rounded-full bg-yellow-400 border-4 border-yellow-500 mb-1" />
                {/* Key body */}
                <View className="w-1 h-10 bg-yellow-500 rounded-full" />
                {/* Key teeth */}
                <View className="flex-row absolute bottom-0 left-1/2 -ml-2">
                  <View className="w-2 h-3 bg-yellow-500" />
                  <View className="w-2 h-3 bg-white" />
                  <View className="w-2 h-3 bg-yellow-500" />
                </View>
              </View>

              {/* List items on the right */}
              <View className="absolute right-6 top-10 space-y-2">
                <View className="flex-row items-center">
                  <View className="w-3 h-0.5 bg-gray-300 rounded-full" />
                  <View className="w-6 h-0.5 bg-gray-300 rounded-full ml-1" />
                </View>
                <View className="flex-row items-center">
                  <View className="w-3 h-0.5 bg-gray-300 rounded-full" />
                  <View className="w-6 h-0.5 bg-gray-300 rounded-full ml-1" />
                  <View className="w-1.5 h-1.5 rounded-full ml-1" style={{backgroundColor: '#2381ff'}} />
                </View>
              </View>

              {/* Decorative dots */}
              <View className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <View className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-red-500" />
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="w-full items-center">
          <Text className="text-3xl font-bold text-gray-900 mb-3">
            Welcome Back
          </Text>
          <Text className="text-base text-gray-500 text-center mb-8 px-4">
            Sign in with Google to continue
          </Text>


          {/* Google Sign-In Button */}
          <TouchableOpacity 
            className="w-full rounded-2xl py-4 flex-row items-center justify-center shadow-lg mb-6"
            style={{backgroundColor: '#2381ff'}}
            onPress={handleGoogleSignIn}
            activeOpacity={0.8}
          >
            <View className="w-10 h-10 bg-white rounded-full items-center justify-center mr-3">
              <Text className="text-2xl font-bold" style={{color: '#2381ff'}}>G</Text>
            </View>
            <Text className="text-white text-lg font-semibold">
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Privacy Text */}
          <Text className="text-xs text-gray-400 text-center px-8 leading-4">
            By continuing, you agree to our{' '}
            <Text className="font-semibold">Terms of Service</Text>
            {' '}and{' '}
            <Text className="font-semibold">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}