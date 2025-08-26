import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";

import { images } from "@/constants";
import { CustomHeaderProps } from "@/type";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomHeader = ({ title }: CustomHeaderProps) => {
    const router = useRouter();

    return (
        <SafeAreaView className="custom-header">
            <TouchableOpacity onPress={() => router.back()}>
                <Image
                    source={images.arrowBack}
                    className="size-5"
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {title && <Text className="base-semibold text-dark-100">{title}</Text>}

            <Image source={images.search} className="size-5" resizeMode="contain" />
        </SafeAreaView>
    );
};

export default CustomHeader;