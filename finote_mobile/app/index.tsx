import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        // Immediately redirect to splash screen
        router.replace('/splashscreen/splashscreen');
    }, []);

    return null;
}
