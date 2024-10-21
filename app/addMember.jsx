import { View, Text, ActivityIndicator, Alert } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { useSelector } from "react-redux";
import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddMember = () => {
  const { user } = useSelector((state) => state.user);

  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [relation, setRelation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [gender, setGender] = useState(null);

  const handleSubmit = async () => {
    setError("");
    if (!name || !age || !gender || !relation || !contact) {
      setError("Please fill in all the fields");
      return;
    }

    console.log(name, age, gender, relation, contact, user?.email);

    setLoading(true);
    try {
      const response = await fetch(
        "https://trakies-backend.onrender.com/api/member/add-member",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: user?.email,
            name,
            age,
            gender,
            relation,
            contact,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTimeout(() => {
          Alert.alert("Success", "Member added successfully");
        }, 2000);
        router.push("/profile");
      } else {
        throw new Error(data.message || "An error occurred");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="position" enabled>
      <View className="h-full w-full">
        <View className="absolute top-0 left-0 h-full w-full">
          <Image
            className="h-full w-full"
            source="https://images.pexels.com/photos/14190564/pexels-photo-14190564.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          />
        </View>
        <View className="w-full h-full bg-black/60 flex justify-center items-center">
          <View>
            <Text className="text-white text-5xl font-bold text-center mt-28">
              Add Member
            </Text>
          </View>
          <ScrollView
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="z-50 w-full px-12">
              <View className="h-12">
                {error && (
                  <View className="flex justify-center items-center space-x-5">
                    <Ionicons name="warning-outline" size={24} color="red" />
                    <Text className="text-lg font-bold text-red-700 text-center">
                      {error}
                    </Text>
                  </View>
                )}
              </View>
              <View className="mt-5">
                <TextInput
                  placeholder="Enter Name"
                  textContentType="name"
                  autoCapitalize="words"
                  onChangeText={setName}
                  className="text-white text-lg font-semibold w-full mt-5 outline outline-2 outline-green-600 indent-3 border border-green-600 rounded-[10px] p-2"
                  placeholderTextColor={"gray"}
                  value={name}
                />
                <TextInput
                  placeholder="Enter Age"
                  keyboardType="numeric"
                  onChangeText={setAge}
                  className="text-white text-lg font-semibold w-full mt-5 outline outline-2 outline-green-600 indent-3 border border-green-600 rounded-[10px] p-2"
                  placeholderTextColor={"gray"}
                  value={age}
                />
                <TextInput
                  placeholder="Enter Gender"
                  keyboardType="default"
                  onChangeText={setGender}
                  className="text-white text-lg font-semibold w-full mt-5 outline outline-2 outline-green-600 indent-3 border border-green-600 rounded-[10px] p-2"
                  placeholderTextColor={"gray"}
                  value={gender}
                />
                <TextInput
                  placeholder="Enter Relation"
                  onChangeText={setRelation}
                  className="text-white text-lg font-semibold w-full mt-5 outline outline-2 outline-green-600 indent-3 border border-green-600 rounded-[10px] p-2"
                  placeholderTextColor={"gray"}
                  value={relation}
                />
                <TextInput
                  placeholder="Enter Contact Number"
                  keyboardType="phone-pad"
                  onChangeText={setContact}
                  className="text-white text-lg font-semibold w-full mt-5 outline outline-2 outline-green-600 indent-3 border border-green-600 rounded-[10px] p-2"
                  placeholderTextColor={"gray"}
                  value={contact}
                />
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                className="py-3 flex justify-center items-center mt-10 bg-[#228B22] w-full rounded-[10px]"
              >
                {loading ? (
                  <ActivityIndicator size={24} color="#00ff00" />
                ) : (
                  <Text className="text-white text-center font-bold text-lg">
                    Add Member
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.back()}
                className="w-full py-2 px-2 rounded-[10px] border-2 border-[#228B22] mt-5 text-white"
                activeOpacity={0.8}
              >
                <Text className="text-white text-center font-bold text-lg">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddMember;
