import { Modal, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AutoCompleteTextField from "../textfield/AutoCompleteTextField";

type AddPlaceModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    coords: [number, number];
  }) => void;
};

export default function AddPlaceModal({
  visible,
  onClose,
  onSave,
}: AddPlaceModalProps) {
  const [destinationCoords, setDestinationCoords] = useState<
    [number, number] | null
  >(null);
  const [destinationName, setDestinationName] = useState("");
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Overlay */}
      <Pressable
        className="flex-1 bg-black/60 justify-center"
        onPress={onClose}
      >
        {/* Modal Content */}
        {/* if we just use a view here, it can't listen to press events so cannot stop propagation and touch is handled 
        by outer pressable, meaning it closes the modal */}
        <Pressable
          className="bg-[#121212] rounded-lg p-5 border border-gray-800"
          onPress={() => {}}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-lg font-interMedium">
              Add a new Place
            </Text>
            <Ionicons
              name="close"
              size={22}
              color="#9CA3AF"
              onPress={onClose}
            />
          </View>

          {/* Body */}
          <AutoCompleteTextField
            setDestinationCoords={setDestinationCoords}
            setDestinationName={setDestinationName}
          />
          {/* Footer */}
          <Pressable
            className="bg-white rounded-xl py-3 items-center mt-4"
            onPress={() => {
             if(!destinationCoords || !destinationName) return;
              onSave({
                name: destinationName,
                coords: destinationCoords,
              });
              // Reset state
              setDestinationName("");
              setDestinationCoords(null);
              onClose();
            }}
          >
            <Text className="text-black font-interMedium">Add Place</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
