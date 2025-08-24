export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    platform: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAMESPACE,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASEID,
    userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERCOLLECTIONID
}